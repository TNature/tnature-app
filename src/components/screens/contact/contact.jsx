import React from "react";
import styles from "./contact.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import FONTS from "@/styles/fonts";
import { GeoAltFill, TelephoneFill, EnvelopeFill, ClockFill } from "react-bootstrap-icons";
import { CONTACT_DETAILS } from "@/constants/conatct";

const ContactScreen = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! Our team will get back to you shortly.");
  };

  return (
    <div className={styles.contactPage}>
      <section className={styles.heroSection} data-aos="fade-up">
        <CustomContainer lg>
          <h1 className={FONTS.font3} data-aos="fade-up" data-aos-delay="200">Get in Touch</h1>
          <p data-aos="fade-up" data-aos-delay="400">
            Have a question about our products or want to know more about our journey? 
            We'd love to hear from you.
          </p>
        </CustomContainer>
      </section>

      <section className={styles.contentSection}>
        <CustomContainer lg>
          <div className={styles.contactGrid}>
            <div className={styles.infoCol} data-aos="fade-right">
              <div className={styles.infoCard}>
                <h2 className={FONTS.font3}>Contact Information</h2>
                
                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <GeoAltFill />
                  </div>
                  <div className={styles.itemText}>
                    <h4>Our Address</h4>
                    {CONTACT_DETAILS.address.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <TelephoneFill />
                  </div>
                  <div className={styles.itemText}>
                    <h4>Phone Number</h4>
                    <p>{CONTACT_DETAILS.phone1.text}</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <EnvelopeFill />
                  </div>
                  <div className={styles.itemText}>
                    <h4>Email Address</h4>
                    {CONTACT_DETAILS.emails.map((email, idx) => (
                      <p key={idx}>{email}</p>
                    ))}
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconBox}>
                    <ClockFill />
                  </div>
                  <div className={styles.itemText}>
                    <h4>Opening Hours</h4>
                    {CONTACT_DETAILS.openingHours.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.mapSection} data-aos="zoom-in" data-aos-delay="300">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8936746816137!2d80.1982!3d12.9717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525df7f7f7f7f7%3A0x1f1f1f1f1f1f1f1f!2sMadipakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1652000000000!5m2!1sen!2sin" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className={styles.formCol} data-aos="fade-left">
              <h2 className={FONTS.font3}>Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" placeholder="Enter your full name" required />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder="Enter your email" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="Enter your phone number" />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" placeholder="What is this regarding?" required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" placeholder="How can we help you?" required></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </CustomContainer>
      </section>
    </div>
  );
};

export default ContactScreen;
