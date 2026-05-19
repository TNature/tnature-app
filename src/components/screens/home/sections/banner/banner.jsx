import React from "react";
import styles from "./banner.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { Image } from "react-bootstrap";
import FONTS from "@/styles/fonts";

const BannerSection = () => {
  return (
    <section className={styles.BannerSection}>
      <CustomContainer lg>
        <div className={styles.wrap}>
          <div className={styles.left}>
            <div
              className={styles.box}
              data-aos="fade-up"
              style={{
                backgroundColor: "#e6f3fa",
              }}
            >
              <div className={styles.text}>
                <h4 className={FONTS.font3}>100% Natural</h4>
                <h1>
                  Jaggery & <br />
                  Jaggery Powder

                </h1>
                <p>
                  Experience the purest sweetness derived directly from nature. Perfect for your healthy lifestyle.
                </p>
                <CustomButton>Shop Now</CustomButton>
              </div>
              <div className={styles.img}>
                <Image src="/products/Jaggery/jaggery.png" fluid alt="jaggery" />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div
              className={styles.box}
              data-aos="fade-up"
              style={{
                backgroundColor: "#eef5e5",
              }}
            >
              <div className={styles.text}>
                <h4 className={FONTS.font3}>100% Natural</h4>
                <h1>
                  Millet Laddu
                </h1>
                <p>
                 Traditional healthy snacks crafted from organically grown millets, combining authentic taste, natural nutrition, and wholesome ingredients to deliver a delicious and guilt-free snacking experience for every age group.

                </p>
              </div>
              <div className={styles.img}>
                <Image src="/products/millet-jars.png" fluid alt="millet laddu" />
              </div>
            </div>
            <div
              className={styles.box}
              data-aos="fade-up"
              style={{
                backgroundColor: "#f9ebe7",
              }}
            >
              <div className={styles.text}>
                <h4 className={FONTS.font3}>100% Natural</h4>
                <h1>
                  Malai Then <br />
                  (Hill Honey)
                </h1>
                <p>
                  Sustainably sourced honey from the deep hill forests.
                </p>
              </div>
              <div className={styles.img}>
                <Image src="/products/Honey Products/hill-honey.png" fluid alt="malai then" />
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default BannerSection;
