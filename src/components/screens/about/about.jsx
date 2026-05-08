import React from "react";
import Image from "next/image";
import styles from "./about.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import FONTS from "@/styles/fonts";
import { Award, Leaf, ShieldCheck, Heart, Truck, Droplet } from "react-bootstrap-icons";

const AboutScreen = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.heroSection} data-aos="fade-up">
        <CustomContainer lg>
          <h1 className={FONTS.font3} data-aos="fade-up" data-aos-delay="200">Our Journey to Purity</h1>
          <p data-aos="fade-up" data-aos-delay="400">
            At Jaishree Foods, we are dedicated to bringing the finest, 100% natural and traditional products
            from the heart of nature to your table.
          </p>
        </CustomContainer>
      </section>

      <section className={styles.contentSection}>
        <CustomContainer lg>
          <div className={styles.storyGrid}>
            <div className={styles.imageWrapper} data-aos="fade-right">
              <Image 
                src="/products/Honey Products/hill-honey-500g.jpeg" 
                alt="Natural Purity" 
                width={600} 
                height={400} 
                className={styles.image}
              />
            </div>
            <div className={styles.textContent} data-aos="fade-left">
              <h2 className={FONTS.font3}>The Jaishree Foods Story</h2>
              <p>
                Founded with a vision to rediscover the authentic flavors and health benefits of traditional
                Indian foods, Jaishree Foods has grown into a trusted name for quality and purity. Our
                commitment started with a simple belief: nature provides everything we need for a healthy life.
              </p>
              <p>
                From sourcing premium Jaggery and Rock Salt to crafting traditional snacks and healthy cookies,
                every product in our collection is a testament to our dedication. We work closely with farmers
                and producers who share our passion for chemical-free and sustainable practices.
              </p>
            </div>
          </div>
        </CustomContainer>
      </section>

      <section className={styles.valuesSection}>
        <CustomContainer lg>
          <div className={styles.sectionTitle} data-aos="fade-up">
            <h2 className={FONTS.font3}>Our Core Values</h2>
            <p>What drives us every single day</p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard} data-aos="zoom-in" data-aos-delay="100">
              <div className={styles.iconWrapper}>
                <Leaf />
              </div>
              <h3>100% Natural</h3>
              <p>We strictly avoid artificial colors, flavors, and preservatives. Everything you get is as nature intended.</p>
            </div>
            <div className={styles.valueCard} data-aos="zoom-in" data-aos-delay="300">
              <div className={styles.iconWrapper}>
                <ShieldCheck />
              </div>
              <h3>Uncompromised Quality</h3>
              <p>Rigorous quality checks at every stage ensure that only the best products reach our customers.</p>
            </div>
            <div className={styles.valueCard} data-aos="zoom-in" data-aos-delay="500">
              <div className={styles.iconWrapper}>
                <Award />
              </div>
              <h3>Authentic Heritage</h3>
              <p>We preserve traditional recipes and processing methods that have been passed down through generations.</p>
            </div>
          </div>
        </CustomContainer>
      </section>

      <section className={styles.contentSection}>
        <CustomContainer lg>
          <div className={styles.storyGrid}>
            <div className={styles.textContent} data-aos="fade-right">
              <h2 className={FONTS.font3}>Our Promise to You</h2>
              <p>
                When you choose Jaishree Foods, you&apos;re not just buying a product; you&apos;re investing in your health
                and supporting a ecosystem of sustainable agriculture.
              </p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
                <div style={{ textAlign: 'center' }} data-aos="zoom-in" data-aos-delay="200">
                  <Heart style={{ fontSize: '2rem', color: '#ed1b24', marginBottom: '10px' }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>Healthy Choice</p>
                </div>
                <div style={{ textAlign: 'center' }} data-aos="zoom-in" data-aos-delay="400">
                  <Truck style={{ fontSize: '2rem', color: '#ed1b24', marginBottom: '10px' }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>Reliable Delivery</p>
                </div>
                <div style={{ textAlign: 'center' }} data-aos="zoom-in" data-aos-delay="600">
                  <Droplet style={{ fontSize: '2rem', color: '#ed1b24', marginBottom: '10px' }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>Pure & Simple</p>
                </div>
              </div>
            </div>
            <div className={styles.imageWrapper} data-aos="fade-left">
              <Image 
                src="/products/Millet Laddu/pearl-millet-laddu-box.jpeg" 
                alt="Quality Promise" 
                width={600} 
                height={400} 
                className={styles.image}
              />
            </div>
          </div>
        </CustomContainer>
      </section>
    </div>
  );
};

export default AboutScreen;
