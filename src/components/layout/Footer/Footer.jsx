import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import styles from "./Footer.module.scss";
import Link from "next/link";
import {
  TelephoneFill,
  Facebook,
  Linkedin,
  Youtube,
  CaretRightFill,
} from "react-bootstrap-icons";
import { PAGES, CATEGORIES } from "@/constants/constants";
import { CONTACT_DETAILS } from "@/constants/conatct";
import FONTS from "@/styles/fonts";

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className={styles.footerRow}>
          <Col lg={3} md={6} sm={12} className={styles.footerCol}>
            <div className={styles.logoSection}>
              <Image
                src="/logo/logo.png"
                alt="T Nature Logo"
                className={styles.logoImage}
              />
              <p className={styles.description}>
                T Nature is committed to providing pure, high-quality organic products directly from nature to your home.
              </p>


              <div className={styles.socialFollow}>
                <span className={styles.followText}>Follow Us -</span>
                <div className={styles.socialIcons}>
                  <a href="#" aria-label="Facebook">
                    <Facebook />
                  </a>
                  <a href="#" aria-label="Linkedin">
                    <Linkedin />
                  </a>
                  <a href="#" aria-label="X">
                    <XIcon />
                  </a>
                  <a href="#" aria-label="Youtube">
                    <Youtube />
                  </a>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={2} md={6} sm={12} className={styles.footerCol}>
            <h4 className={`${styles.widgetTitle} ${FONTS.font2}`}>
              Quick Links
            </h4>
            <ul className={styles.linkList}>
              {PAGES.map((page) => (
                <li key={page.title}>
                  <Link href={page.href || "#"}>
                    <CaretRightFill className={styles.bulletIcon} /> {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={2} md={6} sm={12} className={styles.footerCol}>
            <h4 className={`${styles.widgetTitle} ${FONTS.font2}`}>
              Our Categories
            </h4>

            <ul className={styles.linkList}>
              {CATEGORIES.map((cat) => (
                <li key={cat.title}>
                  <Link href={cat.href || "#"}>
                    <CaretRightFill className={styles.bulletIcon} /> {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={3} md={6} sm={12} className={styles.footerCol}>
            <h4 className={`${styles.widgetTitle} ${FONTS.font2}`}>
              Contact Us
            </h4>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.address}>
                  {CONTACT_DETAILS.address.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
              </li>
              <li className={styles.contactItem}>
                <a href={`tel:+${CONTACT_DETAILS.phone1.number}`}>
                  {CONTACT_DETAILS.phone1.text}
                </a>
              </li>
              <li className={styles.contactItem}>
                <a href={`mailto:${CONTACT_DETAILS.emails[0]}`}>
                  {CONTACT_DETAILS.emails[0]}
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={2} md={6} sm={12} className={styles.footerCol}>
            <h4 className={`${styles.widgetTitle} ${FONTS.font2}`}>
              Opening Hours
            </h4>
            <ul className={styles.contactList}>
              {CONTACT_DETAILS.openingHours.map((hour, index) => (
                <li key={index} className={styles.hourItem}>
                  {hour}
                </li>
              ))}
            </ul>
          </Col>

        </Row>
      </Container>
      <div className={styles.footerBottom}>
        <Container>
          <div className={styles.bottomInner}>
            <p>T Nature © Copyright 2024 | All Rights Reserved.</p>
          </div>
        </Container>
      </div>
    </footer>

  );
};


export default Footer;

