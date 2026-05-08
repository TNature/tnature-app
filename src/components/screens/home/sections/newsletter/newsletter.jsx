import React from "react";
import styles from "./newsletter.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";

const NewsletterSection = () => {
  return (
    <section className={styles.newsletter}>
      <CustomContainer>
        <div className={styles.innerBox} data-aos="fade-up">
          <div className={styles.content}>
            <h2>
              Get <span>25% Discount</span> <br />
              on your first purchase
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst
              amet, metus, sit massa posuere maecenas. At tellus ut nunc amet vel
              egestas.
            </p>
          </div>
          <div className={styles.formWrapper}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <label>Name</label>
                <input type="text" placeholder="Name" />
              </div>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input type="email" placeholder="abc@mail.com" />
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="subscribe" />
                <label htmlFor="subscribe">Subscribe to the newsletter</label>
              </div>
              <button type="submit" className={styles.submitBtn}>Submit</button>
            </form>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default NewsletterSection;
