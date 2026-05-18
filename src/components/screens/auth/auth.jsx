import React, { useState } from "react";
import styles from "./auth.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Person, Envelope, Lock, ArrowRight, Google, Facebook } from "react-bootstrap-icons";
import Link from "next/link";
import FONTS from "@/styles/fonts";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({ email: "", password: "", fullName: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        toast.success("Welcome back!");
        const redirect = router.query.redirect || "/user";
        router.push(redirect);
      } else {
        await signUp(formData.email, formData.password, formData.fullName);
        toast.success("Account created! Please check your email for confirmation.");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.AuthScreen}>
      <CustomContainer >
        <div className={styles.wrapper} data-aos="fade-up">
          <Row className="g-0">
            <Col lg={6} className={styles.infoCol}>
              <div className={styles.infoContent}>
                <h1 className={FONTS.font3}>Welcome to TNature</h1>
                <p>
                  Join our community of nature lovers and get access to exclusive deals,
                  personalized recommendations, and a seamless shopping experience.
                </p>
                <div className={styles.features}>
                  <div className={styles.feature}>
                    <div className={styles.icon}>✓</div>
                    <span>Track your orders easily</span>
                  </div>
                  <div className={styles.feature}>
                    <div className={styles.icon}>✓</div>
                    <span>Exclusive member discounts</span>
                  </div>
                  <div className={styles.feature}>
                    <div className={styles.icon}>✓</div>
                    <span>Faster checkout process</span>
                  </div>
                </div>
                <Button
                  variant="outline-light"
                  className={styles.toggleBtn}
                  onClick={toggleAuthMode}
                >
                  {isLogin ? "Create an Account" : "Login to Your Account"}
                  <ArrowRight className="ms-2" />
                </Button>
              </div>
            </Col>

            <Col lg={6} className={styles.formCol}>
              <div className={styles.formContent}>
                <div className={styles.formHeader}>
                  <h2 className={FONTS.font3}>{isLogin ? "Login" : "Sign Up"}</h2>
                  <p>{isLogin ? "Glad to see you back!" : "Start your natural journey with us."}</p>
                </div>

                <Form className={styles.form} onSubmit={handleSubmit}>
                  {!isLogin && (
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Full Name</Form.Label>
                      <div className={styles.inputGroup}>
                        <Person className={styles.inputIcon} />
                        <Form.Control
                          name="fullName"
                          type="text"
                          placeholder="Enter your name"
                          required={!isLogin}
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <div className={styles.inputGroup}>
                      <Envelope className={styles.inputIcon} />
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <div className="d-flex justify-content-between align-items-center">
                      <Form.Label>Password</Form.Label>
                      {isLogin && (
                        <Link href="#" className={styles.forgotPass}>
                          Forgot Password?
                        </Link>
                      )}
                    </div>
                    <div className={styles.inputGroup}>
                      <Lock className={styles.inputIcon} />
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    className={styles.submitBtn}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      isLogin ? "Login" : "Create Account"
                    )}
                  </Button>
                  <div className={styles.mobileToggle}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span onClick={toggleAuthMode}>
                      {isLogin ? "Sign Up" : "Login"}
                    </span>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </CustomContainer>
    </div>
  );
};

export default AuthScreen;
