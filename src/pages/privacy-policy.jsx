import React from "react";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import Head from "next/head";
import FONTS from "@/styles/fonts";
import styles from "@/styles/scss/legal.module.scss";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - TNature</title>
      </Head>
      <div className={styles.LegalPage}>
        <CustomContainer lg>
          <div className={styles.content}>
            <h1 className={FONTS.font3}>Privacy Policy</h1>
            
            <section>
              <p>
                At <strong>Jaishree Foods</strong>, accessible from <a href="https://www.jaishreefoods.com/">https://www.jaishreefoods.com/</a>, 
                the privacy of our visitors is one of our primary priorities. This Privacy Policy document outlines the types of information 
                that are collected and recorded by <strong>Jaishree Foods</strong> and how such information is used.
              </p>
            </section>

            <section>
              <h3>Scope</h3>
              <p>
                This Privacy Policy applies solely to our online activities and is valid for visitors to our website with respect to the 
                information that they share and/or that is collected through the website. It does not apply to any information collected 
                offline or through channels other than this website.
              </p>
            </section>

            <section>
              <h3>Consent</h3>
              <p>
                By accessing or using our website, you hereby consent to this Privacy Policy and agree to its terms.
              </p>
            </section>

            <section>
              <h3>Information We Collect</h3>
              <p>
                The personal information that you may be asked to provide, and the reasons for which such information is requested, 
                will be made clear at the point of collection.
              </p>
            </section>

            <section>
              <h3>Information You Provide Directly</h3>
              <p>
                If you contact us directly, we may collect additional information such as your name, email address, phone number, 
                the contents of your message and/or attachments, and any other information you may choose to provide.
              </p>
            </section>

            <section>
              <h3>Account & Service Information</h3>
              <p>
                When you register for an account or engage with our services, we may collect your contact information, including but 
                not limited to your name, company name, address, email address, and telephone number.
              </p>
            </section>

            <section>
              <h3>How We Use Your Information</h3>
              <p>We use the information we collect in various ways, including to:</p>
              <ul>
                <li>Provide, operate, and maintain our website and services</li>
                <li>Improve, personalize, and expand our services</li>
                <li>Understand and analyze how you use our website</li>
                <li>Communicate with you, including customer service and updates</li>
                <li>Process transactions and fulfill your requests</li>
              </ul>
            </section>

            <section>
              <h3>Contact Us</h3>
              <p>
                If you have any questions or require further information regarding this Privacy Policy, you may contact us through the 
                details provided on our website.
              </p>
            </section>
          </div>
        </CustomContainer>
      </div>
    </>
  );
};

export default PrivacyPolicy;
