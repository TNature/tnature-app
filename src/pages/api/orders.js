import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { orderData, items, token } = req.body;

  if (!orderData || !items || !token) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Create a supabase client with the user's token to respect RLS
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  try {
    // 1. Verify the user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Unauthorized");

    // 2. Handle Razorpay signature verification for online payments
    let payment_status = "pending";
    let razorpay_payment_id = null;
    let razorpay_order_id = null;
    let razorpay_signature = null;

    if (orderData.payment_method === "online") {
      const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = orderData;
      
      if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
        throw new Error("Missing Razorpay payment details");
      }

      // Verify signature
      const body = razorpayOrderId + "|" + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== razorpaySignature) {
        throw new Error("Invalid payment signature");
      }

      payment_status = "paid";
      razorpay_payment_id = razorpayPaymentId;
      razorpay_order_id = razorpayOrderId;
      razorpay_signature = razorpaySignature;
    }

    // 3. Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([{
        user_id: user.id,
        address_id: orderData.address_id,
        total_amount: orderData.total_amount,
        payment_method: orderData.payment_method,
        status: "pending",
        payment_status: payment_status,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Create the order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      // Cleanup order if items fail (optional, but good for data integrity)
      await supabase.from("orders").delete().match({ id: order.id });
      throw itemsError;
    }

    return res.status(200).json({ 
      success: true, 
      orderId: order.id,
      message: "Order placed successfully" 
    });

  } catch (error) {
    console.error("Order error:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: error.message || "Internal server error" 
    });
  }
}
