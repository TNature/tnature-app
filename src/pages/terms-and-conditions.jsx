import React from "react";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import Head from "next/head";
import FONTS from "@/styles/fonts";
import styles from "@/styles/scss/legal.module.scss";

const TermsPage = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions - TNature</title>
      </Head>
      <div className={styles.LegalPage}>
        <CustomContainer lg>
          <div className={styles.content}>
            <h1 className={FONTS.font3}>Terms and Conditions</h1>
            
            <section>
              <p>
                For the purpose of these Terms and Conditions, the terms “we”, “us”, and “our” shall refer to 
                <strong> Jaishree Foods</strong>, having its registered/ operational office at 
                Sri Sastha I Floor, 31A, Alamelumangapuram II Cross, Madipakkam, Chennai - 600091, Tamil Nadu, India. 
                The terms “you”, “your”, “user”, or “visitor” shall mean any natural or legal person who visits our 
                website and/or agrees to purchase from us.
              </p>
            </section>

            <section>
              <p>Your use of our website and/or purchase of products is subject to the following Terms and Conditions:</p>
              <ul>
                <li>The content of the website is subject to change without prior notice.</li>
                <li>
                  While we strive to provide accurate and up-to-date information, neither we nor any third party makes any 
                  warranty or guarantee regarding the accuracy, timeliness, performance, completeness, or suitability of 
                  the information and materials available on the website for any specific purpose. 
                </li>
                <li>
                  You acknowledge that such information may contain errors or inaccuracies, and we expressly exclude 
                  liability for such inaccuracies to the fullest extent permitted by law.
                </li>
              </ul>
            </section>

            <section>
              <p>
                Your use of any information, materials, or products on this website is entirely at your own risk. It is 
                your responsibility to ensure that any products, services, or information available through our website 
                meet your specific requirements.
              </p>
            </section>

            <section>
              <p>
                The website contains material owned by or licensed to us, including but not limited to design, layout, 
                appearance, and graphics. Reproduction of such material is prohibited except in accordance with the 
                applicable copyright notice forming part of these Terms.
              </p>
            </section>

            <section>
              <p>
                All trademarks reproduced on this website that are not owned by or licensed to us are duly acknowledged. 
                Unauthorized use of any information or material may result in a claim for damages and/or constitute a 
                criminal offense.
              </p>
            </section>

            <section>
              <p>
                Our website may include links to third-party websites for your convenience. These links do not signify 
                that we endorse such websites, and we hold no responsibility for their content. You may not create a 
                link to our website from another website or document without prior written consent from us.
              </p>
            </section>

            <section>
              <p>
                Any dispute arising out of the use of our website, purchase from us, or any engagement with us shall be 
                governed by the laws of India. 
              </p>
              <p>
                We shall not be liable for any loss or damage arising directly or indirectly due to the decline of 
                authorization for any transaction, including instances where the cardholder has exceeded preset limits 
                agreed with our acquiring bank.
              </p>
            </section>
          </div>
        </CustomContainer>
      </div>
    </>
  );
};

export default TermsPage;
