import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import OrderDetailsScreen from "@/components/screens/order_details/order_details";

const OrderDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Order Details | TNature</title>
      </Head>
      <OrderDetailsScreen orderId={id} />
    </>
  );
};

export default OrderDetailsPage;
