import React, { useEffect, useState } from "react";
import { CONTACT_DETAILS } from "@/constants/conatct";
import Header from "./Header/Header";
import SubHeader from "./Header/sub_header/sub_header";
// import Footer from "./Footer/Footer";
import EnquiryModal from "../common/enquiry_modal/enquiry_modal";
import CustomButton from "../ui/custom_button/custom_button";
import styles from "./layout.module.scss";
import { ChevronUp, Headphones, Headset, Whatsapp } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
import Link from "next/link";
import Footer from "./Footer/Footer";
import Cart from "./Cart/Cart";
import { useRouter } from "next/router";

const EnquireButton = ({ setShow }) => {
  return (
    <div className={styles.enquireButton}>
      <CustomButton variant={2} onClick={() => setShow(true)}>
        <Headset /> <b>Enquire Now</b>
      </CustomButton>
    </div>
  );
};
const WhatsappButton = ({ setShow }) => {
  return (
    <div className={styles.WhatsappButtonWrapper}>
      <Link
        href={`https://wa.me/${CONTACT_DETAILS.whatsapp1.number}?text=${CONTACT_DETAILS.whatsapp1.message}`}
        target="_blank"
        className={styles.WhatsappButton}
      >
        <Image src="/WhatsApp.webp" alt="whatsapp" width={45} />
      </Link>
      <div className={styles.scrollTopButton}
        onClick={() => {

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <ChevronUp />
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  // const [show, setShow] = useState(false);

  // useEffect(() => {

  //   const isEnquiryPopupShown = localStorage.getItem("enquiryPopupShown")

  //   if (!isEnquiryPopupShown) {
  //     const timer = setTimeout(() => {
  //       setShow(true);
  //       localStorage.setItem("enquiryPopupShown", "true");
  //     }, 5000);  
  //     return () => clearTimeout(timer);
  //   }
  // }, [])

  const router = useRouter();

  const isAuthPage = router.pathname.startsWith("/auth");


  if (isAuthPage) {
    return (
      <div className={styles.Layout}>
        {children}
      </div>
    )
  }

  return (
    <div className={styles.Layout}>
      <WhatsappButton />
      <Header />
      <SubHeader />
      {children}
      <Cart />


      <Footer />

    </div>
  );
};

export default Layout;
