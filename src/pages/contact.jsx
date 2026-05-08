import React from "react";
import ContactScreen from "@/components/screens/contact/contact";
import Head from "next/head";

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us - Jaishree Foods | Reach Out to Us</title>
        <meta name="description" content="Get in touch with Jaishree Foods. We're here to answer your questions about our natural products, bulk orders, or any other feedback you have." />
      </Head>
      <ContactScreen />
    </>
  );
};

export default ContactPage;
