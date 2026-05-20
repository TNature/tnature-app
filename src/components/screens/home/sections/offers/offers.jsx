import React from "react";
import styles from "./offers.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import OfferBox from "@/components/common/offer_box/offer_box";

const OffersSection = () => {
  return (
    <section className={styles.offers}>
      <CustomContainer lg>
        <div className={styles.grid}>
          <OfferBox
            tag="Upto 25% Off"
            title="Pure Forest Honey"
            description="Experience the natural sweetness of our sustainably harvested forest honey."
            image="/products/Honey Products/hill-honey.png"
            bgColor="#f9ebe7"
            aosDelay={0}
            href="/shop?category=Honey Products"
          />
          <OfferBox
            tag="Upto 25% Off"
            title="Healthy Millet Cookies"
            description="Our traditional millet cookies are the perfect healthy snack for your family."
            image="/products/Millet Cookies/millet-ghee-cookies.png"
            bgColor="#e6f3fa"
            aosDelay={150}
            href="/shop?category=Millet Cookies"
          />
        </div>
      </CustomContainer>
    </section>
  );
};

export default OffersSection;
