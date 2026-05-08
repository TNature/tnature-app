import React from "react";
import BannerSection from "./sections/banner/banner";
import CategorySection from "./sections/category/category";
import BestSellersSection from "./sections/best_sellers/best_sellers";
import NewsletterSection from "./sections/newsletter/newsletter";
import OffersSection from "./sections/offers/offers";

const HomeScreen = () => {
  return (
    <>
      <BannerSection />
      <BestSellersSection />
      <OffersSection />
      <CategorySection />
      <NewsletterSection />
    </>
  );
};

export default HomeScreen;



