import React from "react";
import styles from "./best_sellers.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import SectionHeading from "@/components/common/section_heading/section_heading";
import ProductCard from "@/components/common/product_card/product_card";
import Link from "next/link";
import { useData } from "@/context/DataContext";

const BestSellersSection = () => {
  const { products, loading } = useData();
  const bestSellers = products.filter((p) => p.is_best_seller);

  if (loading) return null;

  return (
    <section className={styles.bestSellers}>
      <CustomContainer>
        <SectionHeading head={"Our Best Sellers"} />
        <div className={styles.productGrid}>
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className={styles.btnWrapper}>
          <Link href="/products" className={styles.browseBtn}>
            Browse All Products
          </Link>
        </div>
      </CustomContainer>
    </section>
  );
};

export default BestSellersSection;

