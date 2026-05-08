import React from "react";
import ShopScreen from "@/components/screens/shop/shop";
import Head from "next/head";

const ShopPage = () => {
  return (
    <>
      <Head>
        <title>Shop - TNature | 100% Natural Products</title>
        <meta name="description" content="Browse our wide range of 100% natural and traditional products including Honey, Jaggery, Millet Laddu, and more." />
      </Head>
      <ShopScreen />
    </>
  );
};

export default ShopPage;
