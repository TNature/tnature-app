import React, { useState } from "react";
import styles from "./product_card.module.scss";
import Image from "next/image";
import { Heart, Star, Bag, HeartFill } from "react-bootstrap-icons";
import Link from "next/link";

const ProductCard = ({ product }) => {

  const [isLiked, setIsLiked] = useState(false)

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

        <div className={styles.bottomSection}>
          <div className={styles.details}>
            <span className={styles.price}>₹{product.price}</span>
            <div className={styles.rating}>
              <Star className={styles.starIcon} />
              <Star className={styles.starIcon} />
              <Star className={styles.starIcon} />
              <Star className={styles.starIcon} />
              <Star className={styles.starIcon} />
            </div>
          </div>

          <button className={styles.cartBtn} aria-label="Add to cart">
            <Bag />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

