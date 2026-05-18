import React, { useEffect } from "react";
import CheckoutScreen from "@/components/screens/checkout/checkout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const CheckoutPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth?redirect=/checkout");
    }
  }, [user, loading, router]);

  if (loading) return <LoadingScreen />;
  if (!user) return null;

  return (
    <>
      <Head>
        <title>Checkout | TNature</title>
        <meta name="description" content="Finalize your order at TNature." />
      </Head>
      <CheckoutScreen />
    </>
  );
};

export default CheckoutPage;
