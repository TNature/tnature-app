import React, { useState } from "react";
import { useRouter } from "next/router";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import styles from "./sub_header.module.scss";
import Link from "next/link";
import { ChevronDown, Search } from "react-bootstrap-icons";
import { PAGES } from "@/constants/constants";
import RightMenu from "../menu_button/menu_button";
import { RightButtons } from "../Header";
import Searchbar from "../search_bar/search_bar";

import { useData } from "@/context/DataContext";

const SubHeader = () => {
  const router = useRouter();
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSearchbar, setShowSearchbar] = useState(false);

  const { categories = [] } = useData();

  return (
    <div className={styles.subHeader}>
      <CustomContainer lg>
        <div className={styles.wrapper}>
          <div
            className={styles.departmentDropdown}
            onMouseEnter={() => setShowCategoryDropdown(true)}
            onMouseLeave={() => setShowCategoryDropdown(false)}
          >
            <button className={styles.departmentBtn}>
              Shop by category <ChevronDown />
            </button>

            {showCategoryDropdown && categories?.[0] && (
              <div className={styles.dropdownMenu}>
                <ul className={styles.dropdownList}>
                  {categories.map((cat, index) => (
                    <li key={index} className={styles.dropdownItem}>
                      <Link
                        href={`/shop?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => {
                          setShowCategoryDropdown(false);
                        }}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {PAGES.map((link, index) => (
                <li
                  key={index}
                  className={`${styles.navItem} ${router.pathname === link.href ? styles.active : ""}`}
                >
                  <Link href={link.href || "#"}>
                    {link.title}{" "}
                    {link.dropdown && (
                      <ChevronDown className={styles.dropdownIcon} />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.rightMenu}>
            <RightButtons setShowSearchbar={setShowSearchbar} />
          </div>
        </div>
        {showSearchbar && (
          <>
            <br />
            <Searchbar />
          </>
        )}
      </CustomContainer>
    </div>
  );
};

export default SubHeader;
