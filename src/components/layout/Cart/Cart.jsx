import React from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { useAppContext } from "@/context/AppContext";
import styles from "./Cart.module.scss";
import { Trash, Plus, Dash, CartX, ArrowRepeat, ArrowRight } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import FONTS from "@/styles/fonts";
import CustomButton from "@/components/ui/custom_button/custom_button";

const Cart = () => {
  const {
    isCartOpen,
    toggleCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
  } = useAppContext();

  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    toggleCart();
    if (user) {
      router.push("/checkout");
    } else {
      router.push("/auth?redirect=/checkout");
    }
  };

  return (
    <Offcanvas
      show={isCartOpen}
      onHide={toggleCart}
      placement="end"
      className={styles.cartOffcanvas}

    >
      <Offcanvas.Header closeButton className={styles.header}>
        <Offcanvas.Title className={FONTS.font3}>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={styles.body}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <CartX size={60} />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven&apos;t added anything to your cart yet.</p>
            <Button variant="primary" onClick={toggleCart} className="mt-3">
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.itemList}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemHeader}>
                      <h4>{item.name}</h4>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash />
                      </button>
                    </div>
                    <p className={styles.itemPrice}>₹{item.price}</p>
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Dash />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cartFooter}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <p className={styles.taxNote}>
                Shipping and taxes calculated at checkout.
              </p>
              <Button
                className={styles.checkoutBtn}
                variant="success"
                onClick={handleCheckout}
              >
                Proceed to Checkout <ArrowRight />
              </Button>
              <Button
                variant="outline-secondary"
                className="w-100 mt-2"
                onClick={toggleCart}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
