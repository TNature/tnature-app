import React, { useState } from "react";
import styles from "./product_card.module.scss";
import { Image } from "react-bootstrap";
import { Heart, Star, Bag, HeartFill, CheckLg, StarFill, StarHalf } from "react-bootstrap-icons";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useAppContext();
  const [isLiked, setIsLiked] = useState(false)

  const isInCart = cartItems.find((item) => item.id === product.id);

  return (
    <div className={styles.productCard} data-aos="fade-up">
      <div className={styles.imageWrapper}>
        <button className={`${styles.wishlistBtn} ${isLiked ? styles.liked : ""}`} aria-label="Add to wishlist" onClick={() => { setIsLiked(!isLiked) }}>
          {
            isLiked ?
              <HeartFill />
              :
              <Heart />
          }
        </button>
        <Link href={`/product/${product.id}`} className={styles.productLink}>
          <Image
            src={product.image}
            alt={product.name}
            width={250}
            height={250}
            className={styles.image}
          />
        </Link>
      </div>
      <div className={styles.content}>
        <Link href={`/product/${product.id}`}>
          <h3 className={styles.title}>{product.name}</h3>
        </Link>
        <div className={styles.unit}>{product.unit}</div>

        <div className={styles.bottomSection}>
          <div className={styles.details}>
            <span className={styles.price}>₹{product.price}</span>
            <div className={styles.rating}>
              {
                Array.from({ length: 5 }).map((_, index) => {
                  const isFilled = index < Math.floor(product.rating);
                  const isHalf = index === Math.floor(product.rating) && product.rating % 1 !== 0;

                  if (isFilled) {
                    return <StarFill
                      key={index} className={styles.starIcon}
                      color={"#f0c14b"}
                    />
                  }
                  if (isHalf) {
                    return <StarHalf
                      key={index} className={styles.starIcon}
                      color={"#f0c14b"}
                    />
                  }

                  return (
                    <Star key={index} className={styles.starIcon}
                      color={"#e0e0e0"}
                    />
                  )
                })
              }
            </div>
          </div>

          <button
            className={`${styles.cartBtn} ${isInCart ? styles.isInCart : ""}`}
            aria-label={isInCart ? "In cart" : "Add to cart"}
            onClick={() => addToCart(product)}
          >
            {isInCart ? <CheckLg /> : <Bag />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

