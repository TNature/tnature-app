import CustomContainer from "@/components/ui/custom_container/custom_container";
import React from "react";
import styles from "./category.module.scss";
import SectionHeading from "@/components/common/section_heading/section_heading";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, PRODUCTS } from "@/constants/products";

const CategorySection = () => {
  const categoryData = CATEGORIES.map((catName, index) => {
    const product = PRODUCTS.find((p) => p.category === catName);
    return {
      id: index + 1,
      name: catName,
      image: product?.image || "/products/default.png",
      slug: catName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };
  });

  return (
    <section className={styles.category}>
      <CustomContainer>
        <SectionHeading head={"Shop By Category"} />
        <div className={styles.categoryGrid}>
          {categoryData.map((cat) => (
            <Link
              href={`/category/${cat.slug}`}
              key={cat.id}
              className={styles.categoryCard}
              data-aos="fade-up"
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={300}
                  height={300}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3>{cat.name}</h3>
                <span className={styles.exploreBtn}>Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </CustomContainer>
    </section>
  );
};

export default CategorySection;

