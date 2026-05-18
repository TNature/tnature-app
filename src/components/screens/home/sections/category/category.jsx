import CustomContainer from "@/components/ui/custom_container/custom_container";
import React from "react";
import styles from "./category.module.scss";
import SectionHeading from "@/components/common/section_heading/section_heading";
import Link from "next/link";
import { Image } from "react-bootstrap";
import { useData } from "@/context/DataContext";

const CategorySection = () => {
  const { categories, loading } = useData();

  if (loading) return null;

  return (
    <section className={styles.category}>
      <CustomContainer>
        <SectionHeading head={"Shop By Category"} />
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <Link
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              key={cat.id}
              className={styles.categoryCard}
              data-aos="fade-up"
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={cat.image || "/products/default.png"}
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

