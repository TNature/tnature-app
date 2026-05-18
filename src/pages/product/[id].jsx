import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ProductDetailScreen from "@/components/screens/product_detail/product_detail";
import { useData } from "@/context/DataContext";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { products, loading } = useData();

  // Find product by ID
  const product = products.find((p) => p.id.toString() === id);

  if (!router.isReady || loading) {
    return <LoadingScreen />;
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
