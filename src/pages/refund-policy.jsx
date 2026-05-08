import React from "react";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import Head from "next/head";
import FONTS from "@/styles/fonts";
import styles from "@/styles/scss/legal.module.scss";

const RefundPolicy = () => {
  return (
    <>
      <Head>
        <title>Refund & Return Policy - Jaishree Foods</title>
      </Head>
      <div className={styles.LegalPage}>
        <CustomContainer lg>
          <div className={styles.content}>
            <h1 className={FONTS.font3}>Refund & Return Policy</h1>
            
            <section>
              <p>
                <strong>Jaishree Foods</strong> (“Company”, “we”, “us” or “our”) believes in assisting its customers 
                as far as possible and has therefore adopted a customer-friendly cancellation and refund policy. 
                This Policy governs all orders placed on our platform and, by transacting with us, you (“Customer” or “you”) 
                agree to be bound by the terms set forth herein.
              </p>
            </section>

            <section>
              <h3>Cancellation Policy</h3>
              <p>
                Cancellation requests shall be considered only if made within fifteen (15) days of placing the order. 
                However, such requests may not be entertained if the order has already been processed or communicated 
                to the vendors or merchants and the shipping process has been initiated. The Company reserves the right, 
                at its sole discretion, to accept or reject any cancellation request.
              </p>
            </section>

            <section>
              <h3>Perishable Items</h3>
              <p>
                The Company does not accept cancellation requests for perishable items including, but not limited to, 
                food products, beverages, or other consumable goods. Notwithstanding the foregoing, a refund or 
                replacement may be considered in cases where the Customer establishes, to the satisfaction of the 
                Company, that the product delivered was defective, damaged, or of unsatisfactory quality.
              </p>
            </section>

            <section>
              <h3>Damaged or Defective Products</h3>
              <p>
                In the event that a Customer receives a damaged, defective, or incorrect product, the same must be 
                reported to the Company’s customer service team within forty-eight (48) hours from the time of delivery. 
                The complaint must be supported with proof of purchase and relevant evidence such as photographs or videos. 
                Upon receipt of such complaint, the Company shall review the matter and, subject to verification by 
                the respective merchant or vendor, determine whether a replacement or refund is warranted.
              </p>
            </section>

            <section>
              <h3>Product Expectations</h3>
              <p>
                If the Customer believes that the product received is not as described on the website or does not meet 
                reasonable expectations, such concerns must be brought to the notice of the Company within 
                forty-eight (48) hours of delivery. The Company shall examine the complaint and take an appropriate 
                decision, which may include a replacement or refund, at its sole discretion.
              </p>
            </section>

            <section>
              <h3>Refund Processing</h3>
              <p>
                In the event that a refund is approved by the Company, such refund shall be processed within seven (7) 
                to ten (10) business days from the date of approval. Refunds shall be credited to the original mode of 
                payment used at the time of purchase. The Company shall not be liable for any delays in crediting the 
                refund amount caused by payment gateway providers, banks, or financial institutions.
              </p>
            </section>

            <section>
              <h3>Amendments and Jurisdiction</h3>
              <p>
                The Company reserves the right to amend, modify, or update this Policy at any time without prior notice. 
                Any disputes arising out of or in connection with this Policy shall be subject to the exclusive 
                jurisdiction of the courts located in Chennai, Tamil Nadu.
              </p>
            </section>
          </div>
        </CustomContainer>
      </div>
    </>
  );
};

export default RefundPolicy;
