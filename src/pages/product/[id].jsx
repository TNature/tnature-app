import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ProductDetailScreen from "@/components/screens/product_detail/product_detail";
import { PRODUCTS } from "@/constants/products";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Find product by ID
  const product = PRODUCTS.find((p) => p.id.toString() === id);

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
        <button onClick={() => router.push("/shop")}>Back to Shop</button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - TNature | 100% Natural</title>
        <meta name="description" content={`Buy ${product.name} - 100% natural and traditional product from TNature. Category: ${product.category}.`} />
      </Head>
      <ProductDetailScreen product={product} />
    </>
  );
};

export default ProductDetailPage;
