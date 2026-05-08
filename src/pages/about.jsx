import React from "react";
import AboutScreen from "@/components/screens/about/about";
import Head from "next/head";

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us - Jaishree Foods | Our Story & Values</title>
        <meta name="description" content="Learn about the journey of Jaishree Foods, our commitment to 100% natural products, and our mission to bring traditional purity to every home." />
      </Head>
      <AboutScreen />
    </>
  );
};

export default AboutPage;
