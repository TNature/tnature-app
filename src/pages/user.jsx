import React, { useEffect } from "react";
import PortalScreen from "@/components/screens/portal/portal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const PortalPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) return <LoadingScreen />;
  if (!user) return null;

  return (
    <>
      <Head>
        <title>User Portal | TNature</title>
        <meta name="description" content="Manage your orders, profile and addresses at TNature." />
      </Head>
      <PortalScreen />
    </>
  );
};

export default PortalPage;
