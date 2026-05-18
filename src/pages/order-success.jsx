import React from "react";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import Head from "next/head";
import Link from "next/link";
import { CheckCircleFill, BagCheckFill } from "react-bootstrap-icons";
import FONTS from "@/styles/fonts";
import { Button } from "react-bootstrap";

const OrderSuccessPage = () => {
  return (
    <div style={{ padding: "100px 0", textAlign: "center", backgroundColor: "#f8fcf8", minHeight: "80vh" }}>
      <Head>
        <title>Order Placed Successfully | TNature</title>
      </Head>
      <CustomContainer>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px", background: "#fff", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <CheckCircleFill size={80} color="#2d5a27" className="mb-4" />
          <h1 className={FONTS.font3} style={{ color: "#2d5a27", fontSize: "2.5rem" }}>Order Placed!</h1>
          <p className="mt-3" style={{ fontSize: "1.1rem", color: "#666" }}>
            Thank you for shopping with TNature. Your order has been placed successfully and is being processed.
          </p>
          <div className="mt-5 d-flex flex-column gap-3">
            <Link href="/user">
              <Button variant="success" className="w-100 py-3 fw-bold">
                View My Orders <BagCheckFill className="ms-2" />
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline-success" className="w-100 py-3 fw-bold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default OrderSuccessPage;
