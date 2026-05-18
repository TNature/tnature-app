import React, { useState, useEffect } from "react";
import styles from "./checkout.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import { Row, Col, Form, Button, Card, ListGroup, Modal, Spinner } from "react-bootstrap";
import { BagCheck, GeoAlt, CreditCard, ArrowLeft, PlusLg, CheckCircleFill } from "react-bootstrap-icons";
import FONTS from "@/styles/fonts";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CheckoutScreen = () => {
  const { cartItems, clearCart } = useAppContext();
  const { user } = useAuth();
  const router = useRouter();

  const cartSubtotal = 10;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAddress, setNewAddress] = useState({
    full_name: "",
    phone_number: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    setIsLoadingAddresses(true);
    try {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
      if (data?.length > 0) {
        setSelectedAddressId(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.message);
      toast.error("Failed to load addresses");
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("addresses")
        .insert([{ ...newAddress, user_id: user.id }])
        .select();

      if (error) throw error;

      toast.success("Address added successfully");
      setAddresses((prev) => [data[0], ...prev]);
      setSelectedAddressId(data[0].id);
      setShowAddModal(false);
      setNewAddress({
        full_name: "",
        phone_number: "",
        address_line: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setIsSubmitting(true);
    try {
      // Get the session to get the access token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Please log in again to continue");

      if (paymentMethod === "online") {
        // Load Razorpay Script
        const res = await loadRazorpayScript();
        if (!res) {
          throw new Error("Razorpay SDK failed to load. Are you online?");
        }

        // Create Order via API
        const createOrderRes = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: total }),
        });
        const orderData = await createOrderRes.json();

        if (!orderData.success) {
          throw new Error(orderData.message || "Failed to initialize payment");
        }

        // Setup Razorpay Options
        const options = {
          key: orderData.key,
          amount: orderData.amount,
          currency: "INR",
          name: "TNature",
          description: "Order Payment",
          order_id: orderData.order_id,
          handler: async function (response) {
            try {
              setIsSubmitting(true);
              // Send payment success data to backend
              const verifyRes = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: session.access_token,
                  orderData: {
                    address_id: selectedAddressId,
                    total_amount: total,
                    payment_method: paymentMethod,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                  },
                  items: cartItems,
                }),
              });

              const result = await verifyRes.json();
              if (!result.success) throw new Error(result.message);

              toast.success("Payment successful and order placed!");
              clearCart();
              router.push("/order-success");
            } catch (err) {
              console.error("Payment verification failed:", err);
              toast.error("Payment verification failed. Please contact support.");
            } finally {
              setIsSubmitting(false);
            }
          },
          prefill: {
            name: user.user_metadata?.full_name || "",
            email: user.email || "",
          },
          theme: {
            color: "#198754",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function (response) {
          toast.error("Payment failed. Please try again.");
          setIsSubmitting(false);
        });
        paymentObject.open();
      } else {
        // COD Flow
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: session.access_token,
            orderData: {
              address_id: selectedAddressId,
              total_amount: total,
              payment_method: paymentMethod,
            },
            items: cartItems,
          }),
        });

        const result = await response.json();

        if (!result.success) throw new Error(result.message);

        toast.success("Order placed successfully!");
        clearCart();
        router.push("/order-success");
      }
    } catch (error) {
      console.error("Place order error:", error.message);
      toast.error(error.message || "Failed to place order");
      setIsSubmitting(false);
    }
  };

  const shippingCost = 0; // Standard free shipping
  const total = cartSubtotal + shippingCost;

  return (
    <div className={styles.CheckoutScreen}>
      <CustomContainer lg>
        <div className={styles.backLink}>
          <Link href="/shop">
            <ArrowLeft /> Back to Shop
          </Link>
        </div>

        <h2 className={`${FONTS.font3} mb-4`}>Checkout</h2>

        <Row className="gy-4">
          <Col lg={7}>
            <div className={styles.checkoutForm}>
              {/* Address Section */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <div className={styles.icon}><GeoAlt /></div>
                  <h4>Delivery Address</h4>
                  <Button
                    variant="link"
                    className={styles.addBtn}
                    onClick={() => setShowAddModal(true)}
                  >
                    <PlusLg className="me-1" /> Add New
                  </Button>
                </div>

                <div className={styles.addressGrid}>
                  {isLoadingAddresses ? (
                    <div className="text-center py-4">
                      <Spinner animation="border" variant="success" />
                    </div>
                  ) : addresses.length > 0 ? (
                    <Row className="g-3">
                      {addresses.map((addr) => (
                        <Col md={6} key={addr.id}>
                          <div
                            className={`${styles.addressCard} ${selectedAddressId === addr.id ? styles.selected : ""}`}
                            onClick={() => setSelectedAddressId(addr.id)}
                          >
                            <div className={styles.cardHeader}>
                              <span className={styles.name}>{addr.full_name}</span>
                              {selectedAddressId === addr.id && <CheckCircleFill className={styles.checkIcon} />}
                            </div>
                            <p className={styles.phone}>{addr.phone_number}</p>
                            <p className={styles.addressText}>
                              {addr.address_line}, {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <div className={styles.noAddress}>
                      <p>No addresses found. Please add one to proceed.</p>
                      <Button variant="outline-success" onClick={() => setShowAddModal(true)}>
                        Add Your First Address
                      </Button>
                    </div>
                  )}
                </div>
              </section>

              {/* Payment Section */}
              <section className={`${styles.section} mt-5`}>
                <div className={styles.sectionHeader}>
                  <div className={styles.icon}><CreditCard /></div>
                  <h4>Payment Method</h4>
                </div>
                <div className={styles.paymentOptions}>
                  <div
                    className={`${styles.paymentOption} ${paymentMethod === "cod" ? styles.active : ""}`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <Form.Check
                      type="radio"
                      id="cod"
                      label="Cash on Delivery"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      readOnly
                    />
                  </div>
                  <div
                    className={`${styles.paymentOption} ${paymentMethod === "online" ? styles.active : ""}`}
                    onClick={() => setPaymentMethod("online")}
                  >
                    <Form.Check
                      type="radio"
                      id="online"
                      label="Online Payment (UPI, Card, NetBanking)"
                      name="payment"
                      checked={paymentMethod === "online"}
                      readOnly
                    />
                  </div>
                </div>
              </section>
            </div>
          </Col>

          <Col lg={5}>
            <Card className={styles.orderSummary}>
              <Card.Header className="bg-transparent border-0 pt-4 px-4">
                <h4 className={FONTS.font3}>Order Summary</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <ListGroup variant="flush" className={styles.itemList}>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.id} className="px-0 py-3 d-flex gap-3">
                      <div className={styles.itemImage}>
                        <Image src={item.image} alt={item.name} width={60} height={60} objectFit="cover" />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{item.name}</h6>
                        <small className="text-muted">{item.unit} × {item.quantity}</small>
                        <div className="fw-bold mt-1">₹{item.price * item.quantity}</div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className={styles.totals}>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{cartSubtotal}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold">Total</span>
                    <span className="fw-bold fs-4">₹{total}</span>
                  </div>
                  <Button
                    variant="success"
                    className="w-100 py-3 fw-bold"
                    disabled={!selectedAddressId || cartItems.length === 0 || isSubmitting}
                    onClick={handlePlaceOrder}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </CustomContainer>

      {/* Add Address Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className={FONTS.font3}>Add New Address</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddAddress}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    required
                    name="full_name"
                    value={newAddress.full_name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    required
                    name="phone_number"
                    value={newAddress.phone_number}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address Line</Form.Label>
                  <Form.Control
                    required
                    name="address_line"
                    value={newAddress.address_line}
                    onChange={handleInputChange}
                    placeholder="House No, Street, Area"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    name="city"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    placeholder="City"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    required
                    name="state"
                    value={newAddress.state}
                    onChange={handleInputChange}
                    placeholder="State"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    required
                    name="pincode"
                    value={newAddress.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit Pincode"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="success" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner animation="border" size="sm" /> : "Save Address"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CheckoutScreen;
