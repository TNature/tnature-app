import React, { useState } from "react";
import styles from "./product_detail.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Image } from "react-bootstrap";
import { StarFill, CartPlus, ShieldCheck, Truck, ArrowRepeat, Leaf } from "react-bootstrap-icons";
import FONTS from "@/styles/fonts";
import { useAppContext } from "@/context/AppContext";

const ProductDetailScreen = ({ product }) => {
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return null;

  const handleQuantityChange = (type) => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    } else if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.ProductDetail}>
      <CustomContainer >
        <div className={styles.grid}>
          <div className={styles.imageSection} data-aos="fade-right">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className={styles.mainImage}
              priority
            />
          </div>

          <div className={styles.infoSection} data-aos="fade-left">
            <span className={styles.category}>{product.category}</span>
            <h1 className={`${styles.title} ${FONTS.font3}`}>{product.name}</h1>

            <div className={styles.ratingSection}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <StarFill key={i} color={i < Math.floor(product.rating) ? "#ffb800" : "#e0e0e0"} />
                ))}
              </div>
              <span className={styles.ratingValue}>{product.rating}</span>
              <span className={styles.reviews}>(120+ Reviews)</span>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.price}>₹{product.price}</span>
              <span className={styles.unit}>/ {product.unit}</span>
            </div>

            <p className={styles.description}>
              Experience the pure essence of nature with our {product.name}.
              Sourced from the finest farms and processed with traditional methods to preserve its natural nutrients and authentic flavor.
              100% natural, chemical-free, and perfect for a healthy lifestyle.
            </p>

            <div className={styles.actions}>
              <div className={styles.quantitySelector}>
                <button onClick={() => handleQuantityChange("dec")} disabled={quantity <= 1}>-</button>
                <input type="text" value={quantity} readOnly />
                <button onClick={() => handleQuantityChange("inc")}>+</button>
              </div>

              <button
                className={styles.addToCart}
                onClick={() => addToCart(product, quantity)}
              >
                <CartPlus size={22} />
                Add to Cart
              </button>
            </div>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <div className={styles.icon}><Leaf /></div>
                <div className={styles.text}>
                  <h4>100% Organic</h4>
                  <p>Naturally sourced</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.icon}><ShieldCheck /></div>
                <div className={styles.text}>
                  <h4>Quality Assured</h4>
                  <p>Strict quality checks</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.icon}><Truck /></div>
                <div className={styles.text}>
                  <h4>Fast Delivery</h4>
                  <p>Across the country</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.icon}><ArrowRepeat /></div>
                <div className={styles.text}>
                  <h4>Easy Returns</h4>
                  <p>7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tabsSection} data-aos="fade-up">
          <div className={styles.tabsHeader}>
            <button
              className={activeTab === "description" ? styles.active : ""}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={activeTab === "benefits" ? styles.active : ""}
              onClick={() => setActiveTab("benefits")}
            >
              Key Benefits
            </button>
            <button
              className={activeTab === "how-to-use" ? styles.active : ""}
              onClick={() => setActiveTab("how-to-use")}
            >
              How to Use
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "description" && (
              <div>
                <h3>About the Product</h3>
                <p>
                  Our {product.name} is carefully selected and processed to ensure you get the maximum health benefits.
                  Unlike mass-produced alternatives, we focus on traditional techniques that have been passed down through generations.
                  This ensures that the natural enzymes and minerals are preserved, giving you a product that is not just delicious but also highly nutritious.
                </p>
                <p>
                  We believe in transparency and sustainability. That&apos;s why every batch of our {product.category} is tested for purity and quality.
                  When you choose TNature, you&apos;re choosing health, tradition, and nature in its purest form.
                </p>
              </div>
            )}
            {activeTab === "benefits" && (
              <div>
                <h3>Why Choose Our {product.name}?</h3>
                <ul>
                  <li>Rich in essential minerals and antioxidants.</li>
                  <li>Promotes better digestion and boosts immunity.</li>
                  <li>Free from artificial colors, flavors, and preservatives.</li>
                  <li>Traditional processing methods preserve natural nutrients.</li>
                  <li>Ethically sourced from local farmers.</li>
                </ul>
              </div>
            )}
            {activeTab === "how-to-use" && (
              <div>
                <h3>Suggested Usage</h3>
                <p>
                  This product can be used in various ways depending on your preference:
                </p>
                <ul>
                  <li>Direct consumption as a healthy snack.</li>
                  <li>Added to your favorite beverages for natural sweetness.</li>
                  <li>Incorporated into traditional recipes and desserts.</li>
                  <li>Used as a healthy alternative to refined products in your daily diet.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default ProductDetailScreen;
