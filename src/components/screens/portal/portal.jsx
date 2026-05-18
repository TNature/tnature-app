import React, { useState, useEffect } from "react";
import styles from "./portal.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import { Row, Col, Card, Nav, Button, Table, Spinner, Modal, Form } from "react-bootstrap";
import {
  Person,
  BagCheck,
  GeoAlt,
  Gear,
  BoxArrowRight,
  ClockHistory,
  CreditCard,
  PlusLg,
  Trash
} from "react-bootstrap-icons";
import FONTS from "@/styles/fonts";
import Link from "next/link";
import { toast } from "react-toastify";

const PortalScreen = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    full_name: "",
    phone_number: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([fetchOrders(), fetchAddresses()]);
    setIsLoading(false);
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *,
            products (name)
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  const fetchAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error.message);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const { error } = await supabase
        .from("addresses")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Address deleted successfully");
      setAddresses(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      toast.error(error.message);
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

  if (!user) return null;

  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-2 text-muted">Loading your data...</p>
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
      case "orders":
        return (
          <div className={styles.overview}>
            {activeTab === "overview" && (
              <>
                <h3 className={FONTS.font3}>Welcome back, {user.user_metadata?.full_name || 'User'}!</h3>
                <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>

                <Row className="mt-4 g-4">
                  <Col md={4}>
                    <Card className={styles.statCard}>
                      <Card.Body>
                        <div className={styles.iconBox}><BagCheck /></div>
                        <h4>Total Orders</h4>
                        <p>{orders.length}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className={styles.statCard}>
                      <Card.Body>
                        <div className={styles.iconBox}><ClockHistory /></div>
                        <h4>Pending</h4>
                        <p>{pendingOrders}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className={styles.statCard}>
                      <Card.Body>
                        <div className={styles.iconBox}><CreditCard /></div>
                        <h4>Total Spent</h4>
                        <p>₹{totalSpent.toLocaleString()}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </>
            )}

            <div className={styles.recentOrders}>
              <h4 className="mt-5 mb-4">{activeTab === "overview" ? "Recent Orders" : "Order History"}</h4>
              {orders.length > 0 ? (
                <Table responsive hover className={styles.orderTable}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="fw-bold">#{order.id.slice(0, 8).toUpperCase()}</td>
                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[order.payment_status] || styles.pending}`}>
                            {order.payment_status ? order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1) : 'Pending'}
                          </span>
                        </td>

                        <td>₹{Number(order.total_amount).toLocaleString()}</td>
                        <td>
                          <Link href={`/user/order/${order.id}`}>
                            <Button variant="link" size="sm">View Details</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-5 bg-light rounded-3">
                  <BagCheck size={40} className="text-muted mb-3" />
                  <h5>No orders found</h5>
                  <p className="text-muted">You haven&apos;t placed any orders yet.</p>
                  <Button variant="success" href="/shop">Start Shopping</Button>
                </div>
              )}
            </div>
          </div>
        );
      case "profile":
        return (
          <div className={styles.profile}>
            <h3 className={FONTS.font3}>Profile Settings</h3>
            <Card className="mt-4 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-4">
                  <label className="text-muted mb-1">Full Name</label>
                  <h5>{user.user_metadata?.full_name || 'Not provided'}</h5>
                </div>
                <div className="mb-4">
                  <label className="text-muted mb-1">Email Address</label>
                  <h5>{user.email}</h5>
                </div>
                <div className="mb-0">
                  <label className="text-muted mb-1">Member Since</label>
                  <h5>{new Date(user.created_at).toLocaleDateString()}</h5>
                </div>
              </Card.Body>
            </Card>
            <Button variant="primary" className="mt-4">Edit Profile</Button>
          </div>
        );
      case "addresses":
        return (
          <div className={styles.addresses}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className={FONTS.font3}>My Addresses</h3>
              <Button variant="success" size="sm" onClick={() => setShowAddModal(true)}>
                <PlusLg className="me-1" /> Add New
              </Button>
            </div>

            {addresses.length > 0 ? (
              <Row className="g-4">
                {addresses.map((addr) => (
                  <Col md={6} key={addr.id}>
                    <Card className={styles.addressCard}>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold mb-0">{addr.full_name}</h6>
                          <Button
                            variant="link"
                            className="text-danger p-0"
                            onClick={() => handleDeleteAddress(addr.id)}
                          >
                            <Trash />
                          </Button>
                        </div>
                        <p className="mb-1 text-muted small">{addr.phone_number}</p>
                        <p className="mb-0 text-muted small">
                          {addr.address_line}<br />
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-5 bg-light rounded-3">
                <GeoAlt size={40} className="text-muted mb-3" />
                <h5>No addresses saved</h5>
                <p className="text-muted">Save your addresses for a faster checkout experience.</p>
                <Button variant="success" onClick={() => setShowAddModal(true)}>Add Address</Button>
              </div>
            )}
          </div>
        );
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <div className={styles.PortalScreen}>
      <CustomContainer lg>
        <Row className="gy-4">
          <Col lg={3}>
            <div className={styles.sidebar}>
              <div className={styles.userBrief}>
                <div className={styles.avatar}>
                  {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className={styles.nameInfo}>
                  <h4>{user.user_metadata?.full_name || 'User'}</h4>
                  <p>{user.email}</p>
                </div>
              </div>

              <Nav className="flex-column mt-4">
                <Nav.Link
                  className={activeTab === "overview" ? styles.active : ""}
                  onClick={() => setActiveTab("overview")}
                >
                  <BagCheck /> Dashboard
                </Nav.Link>
                <Nav.Link
                  className={activeTab === "orders" ? styles.active : ""}
                  onClick={() => setActiveTab("orders")}
                >
                  <ClockHistory /> My Orders
                </Nav.Link>
                <Nav.Link
                  className={activeTab === "profile" ? styles.active : ""}
                  onClick={() => setActiveTab("profile")}
                >
                  <Person /> Account Settings
                </Nav.Link>
                <Nav.Link
                  className={activeTab === "addresses" ? styles.active : ""}
                  onClick={() => setActiveTab("addresses")}
                >
                  <GeoAlt /> Addresses
                </Nav.Link>
                <Nav.Link className={styles.logout} onClick={signOut}>
                  <BoxArrowRight /> Logout
                </Nav.Link>
              </Nav>
            </div>
          </Col>

          <Col lg={9}>
            <div className={styles.contentArea}>
              {renderContent()}
            </div>
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

export default PortalScreen;
