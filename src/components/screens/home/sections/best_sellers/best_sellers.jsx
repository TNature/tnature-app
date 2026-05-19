import React from "react";
import styles from "./best_sellers.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import ProductCard from "@/components/common/product_card/product_card";
import Link from "next/link";
import { useData } from "@/context/DataContext";
import FONTS from "@/styles/fonts";

const BestSellersSection = () => {
  const { products, loading } = useData();
  const bestSellers = products.filter((p) => p.is_best_seller).slice(0, 4);

  if (loading) return null;

  return (
    <section className={styles.bestSellers}>
      <CustomContainer>
        <div className={styles.containerWrapper}>
          <div className={styles.header}>
            <h2 className={`${FONTS.font1} ${styles.title}`}>Trending Products</h2>
            <Link href="/shop" className={styles.viewAllBtn}>
              View all
            </Link>
          </div>
          <div className={styles.productGrid}>
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default BestSellersSection;

