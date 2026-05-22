"use client";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import styles from "./testimonials.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";

const testimonials = [
  {
    name: "Ananya R",
    role: "Regular Customer",
    bgColor: "#f9ebe7",
    text: "The quality feels truly homemade and authentic. Their millet snacks have become a daily favorite in our family.",
  },
  {
    name: "Karthik S",
    role: "Health Enthusiast",
    bgColor: "#e6f3fa",
    text: "Finally found traditional products without artificial taste. Fresh, natural, and beautifully packed.",
  },
  {
    name: "Priya M",
    role: "Food Blogger",
    bgColor: "#eef5e5",
    text: "Jaishree Foods perfectly blends tradition with quality. Every product reminds me of homemade recipes.",
  },
  {
    name: "Rahul K",
    role: "Verified Buyer",
    bgColor: "#f3e8ff",
    text: "Excellent packaging and authentic taste. Feels just like homemade traditional snacks.",
  },
];

export default function TestimonialSection() {
  const responsiveSettings = [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 0,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  return (
    <section className={styles.testimonialSection}>
      <CustomContainer lg>

        <div className={styles.testimonialHeading}>
          <span>Testimonials</span>

          <h2>What Our Customers Say</h2>

          <p>
            Loved by families who value authentic taste, purity, and
            traditional goodness.
          </p>
        </div>

        <Slide
          slidesToScroll={1}
          slidesToShow={3}
          indicators={false}
          arrows={false}
          autoplay
          duration={4000}
          transitionDuration={500}
          responsive={responsiveSettings}
          pauseOnHover={false}
        >
          {[...testimonials, ...testimonials, ...testimonials,...testimonials].map((item, index) => (
            <div className={styles.slide} key={`slide_${index}`}>
              <div
                className={styles.testimonialCard}
                style={{
                  backgroundColor: item.bgColor,
                }}
              >
                <div className={styles.quote}>“</div>

                <p className={styles.testimonialText}>{item.text}</p>

                <div className={styles.testimonialUser}>
                  <div className={styles.avatar}>
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h4>{item.name}</h4>
                    <span>{item.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slide>
      </CustomContainer>
      
    </section>
  );
}