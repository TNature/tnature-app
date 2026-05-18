import React, { useState, useEffect } from "react";
import styles from "./order_details.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { supabase } from "@/utils/supabase";
import { Row, Col, Card, Table, Badge, Button, Spinner } from "react-bootstrap";
import { ArrowLeft, BoxSeam, GeoAlt, CreditCard, Calendar3, Files } from "react-bootstrap-icons";
import FONTS from "@/styles/fonts";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { toast } from "react-toastify";

const OrderDetailsScreen = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          addresses (*),
          order_items (
            *,
            products (*)
          )
        `)
        .eq("id", orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingArea}>
        <Spinner animation="border" variant="success" />
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.errorArea}>
        <h3>Order not found</h3>
        <Link href="/user">
          <Button variant="success">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.OrderDetails}>
      <CustomContainer lg>
        <div className={styles.header}>
          <Link href="/user" className={styles.backBtn}>
            <ArrowLeft /> Back to Dashboard
          </Link>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <h2 className={FONTS.font3}>Order #{order.id.slice(0, 8).toUpperCase()}</h2>
              <p className={styles.date}>
                <Calendar3 /> Placed on {new Date(order.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            </div>
            <div className={`${styles.status} ${styles[order.status]}`}>
              {order.status.toUpperCase()}
            </div>
          </div>
        </div>

        <Row className="gy-4 mt-2">
          <Col lg={8}>
            <Card className={styles.itemsCard}>
              <Card.Header className="bg-transparent py-3">
                <h5 className="mb-0 fw-bold"><BoxSeam className="me-2" /> Order Items</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className={styles.itemsTable}>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className={styles.productCell}>
                            <div className={styles.prodImg}>
                              <Image src={item.products.image} alt={item.products.name} width={50} height={50} />
                            </div>
                            <div>
                              <div className="fw-bold">{item.products.name}</div>
                              <small className="text-muted">{item.products.unit}</small>
                            </div>
                          </div>
                        </td>
                        <td>₹{item.price}</td>
                        <td>{item.quantity}</td>
                        <td className="text-end fw-bold">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer className="bg-transparent p-4">
                <div className={styles.totals}>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{order.total_amount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span className="text-success fw-bold">FREE</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold fs-5">Grand Total</span>
                    <span className="fw-bold fs-5 text-success">₹{order.total_amount}</span>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg={4}>
            <div className="d-flex flex-column gap-4">
              <Card className={styles.infoCard}>
                <Card.Header className="bg-transparent py-3">
                  <h5 className="mb-0 fw-bold"><GeoAlt className="me-2" /> Shipping Address</h5>
                </Card.Header>
                <Card.Body>
                  <h6 className="fw-bold mb-2">{order.addresses.full_name}</h6>
                  <p className="mb-1 text-muted">{order.addresses.address_line}</p>
                  <p className="mb-1 text-muted">{order.addresses.city}, {order.addresses.state} - {order.addresses.pincode}</p>
                  <p className="mb-0 mt-3 fw-bold"><small>Phone: {order.addresses.phone_number}</small></p>
                </Card.Body>
              </Card>

              <Card className={styles.infoCard}>
                <Card.Header className="bg-transparent py-3">
                  <h5 className="mb-0 fw-bold"><CreditCard className="me-2" /> Payment Details</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <span className="text-muted d-block mb-1">Method</span>
                    <Badge bg="light" text="dark" className="p-2 border">
                      {order.payment_method === "cod" ? "CASH ON DELIVERY" : "ONLINE PAYMENT"}
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <span className="text-muted d-block mb-1">Status</span>
                    <Badge bg={order.payment_status === 'paid' ? 'success' : 'warning'} className="p-2">
                      {order.payment_status ? order.payment_status.toUpperCase() : 'PENDING'}
                    </Badge>
                  </div>
                  {order.razorpay_payment_id && (
                    <div>
                      <span className="text-muted d-block mb-1">Transaction ID</span>
                      <div className="d-flex align-items-center gap-2 bg-light p-2 rounded border">
                        <small className="font-monospace text-break mb-0">{order.razorpay_payment_id}</small>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="p-1 ms-auto border-0"
                          title="Copy Transaction ID"
                          onClick={() => {
                            navigator.clipboard.writeText(order.razorpay_payment_id);
                            toast.success("Transaction ID copied!");
                          }}
                        >
                          <Files size={14} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </CustomContainer>
    </div>
  );
};

export default OrderDetailsScreen;
