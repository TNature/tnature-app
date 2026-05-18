import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: "Failed to create order" });
    }

    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID, // Send key so frontend can use it
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
