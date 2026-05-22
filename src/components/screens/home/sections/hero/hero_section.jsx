import React from "react";
import styles from "./hero_section.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import Link from "next/link";
import FONTS from "@/styles/fonts";
import { Image } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";

const HeroSection = ({loadingScreen}) => {
  return (
    <section className={styles.hero}>
      <CustomContainer lg>
        <div className={styles.wrap}>
          <div className={styles.left}>
            <h1 className={FONTS.font1} data-aos="fade-left">
              <span>Pure</span> Tradition,
              <br />
              <span>Naturally</span> Delivered
            </h1>
            <p data-aos="fade-left" data-aos-delay="200">
              At Jaishree Foods, we bring you authentic, 100% natural
              traditional foods crafted with purity, heritage, and care —
              straight from nature to your home.
            </p>
            <Link href={'/shop'} data-aos="fade-left" data-aos-delay="400">
              <CustomButton>Shop Now</CustomButton>
            </Link>
          </div>
          <div className={styles.right}>
            <Image src="/banner/products.png" alt="prods" fluid data-aos="fade-right"/>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default HeroSection;
