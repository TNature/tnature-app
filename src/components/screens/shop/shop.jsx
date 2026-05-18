import React, { useState, useMemo, useEffect } from "react";
import styles from "./shop.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import ProductCard from "@/components/common/product_card/product_card";
import { useData } from "@/context/DataContext";
import { Search } from "react-bootstrap-icons";
import FONTS from "@/styles/fonts";
import { useRouter } from "next/router";

const ShopScreen = () => {

  const router = useRouter();


  //   const generateProductSQL = (products) => {
  //     return `
  // INSERT INTO products (
  //     name,
  //     image,
  //     price,
  //     rating,
  //     unit,
  //     category_id,
  //     is_best_seller
  // )
  // VALUES
  // ${products
  //         .map((product) => {
  //           return `(
  //     '${product.name.replace(/'/g, "''")}',
  //     '${product.image}',
  //     ${product.price},
  //     ${product.rating},
  //     '${product.unit}',
  //     (SELECT id FROM categories WHERE name = '${product.category.replace(
  //             /'/g,
  //             "''"
  //           )}'),
  //     ${product.isBestSeller ? "true" : "false"}
  // )`;
  //         })
  //         .join(",\n")};
  // `;
  //   };

  //   // Example usage
  //   const sql = generateProductSQL(PRODUCTS);

  //   console.log(sql);



  const { products, categories, loading: dataLoading } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    if (!router.isReady) return;
    const { category } = router.query;
    if (category) {
      setSelectedCategory(category);
    }
  }, [router.isReady, router.query])







  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, products]);


  return (
    <div className={styles.ShopScreen}>
      <CustomContainer lg>
        <header className={styles.header}>
          <h1 className={FONTS.font3}>Our Shop</h1>
          <p>Discover our range of 100% natural and traditional products</p>
        </header>

        <section className={styles.filtersSection}>
          <div className={styles.topRow}>
            <div className={styles.searchBar}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.sortDropdown}>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A-Z</option>
              </select>
            </div>
          </div>

          <div className={styles.categoryTabs}>
            <button
              className={`${styles.tab} ${selectedCategory === "All" ? styles.active : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.tab} ${selectedCategory === cat.name ? styles.active : ""}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        <main className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className={styles.noResults}>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter to find what you&apos;re looking for.</p>
            </div>
          )}
        </main>
      </CustomContainer>
    </div>
  );
};

export default ShopScreen;
