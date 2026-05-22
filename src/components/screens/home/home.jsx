import React from "react";
import BannerSection from "./sections/banner/banner";
import CategorySection from "./sections/category/category";
import BestSellersSection from "./sections/best_sellers/best_sellers";
import NewsletterSection from "./sections/newsletter/newsletter";
import OffersSection from "./sections/offers/offers";
import HeroSection from "./sections/hero/hero_section";
import TestimonialsSection from "./sections/testimonials/testimonials";

const HomeScreen = ({loadingScreen}) => {
  return (
    <>
    {
      !loadingScreen && 
    
      <HeroSection loadingScreen={loadingScreen}/>
    }
      <BannerSection />
      <BestSellersSection />
      
      
      <TestimonialsSection/>
    </>
  );
};

export default HomeScreen;
