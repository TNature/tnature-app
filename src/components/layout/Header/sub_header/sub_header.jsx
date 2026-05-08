import React, { useState } from "react";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import styles from "./sub_header.module.scss";
import Link from "next/link";
import { ChevronDown, Search } from "react-bootstrap-icons";
import { PAGES } from "@/constants/constants";
import RightMenu from "../menu_button/menu_button";
import { RightButtons } from "../Header";
import Searchbar from "../search_bar/search_bar";
import { CATEGORIES } from "@/constants/products";

const SubHeader = () => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [showSearchbar, setShowSearchbar] = useState(false);

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

            {showCategoryDropdown && (
              <div className={styles.dropdownMenu}>
                <ul className={styles.dropdownList}>
                  {CATEGORIES.map((cat, index) => (
                    <li key={index} className={styles.dropdownItem}>
                      <Link href={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{cat}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {PAGES.map((link, index) => (
                <li key={index} className={styles.navItem}>
                  <Link href={link.href || "#"}>
                    {link.title} {link.dropdown && <ChevronDown className={styles.dropdownIcon} />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.rightMenu}>
            <RightButtons setShowSearchbar={setShowSearchbar} />
          </div>
        </div>
        {
          showSearchbar && <>
            <br />
            <Searchbar />
          </>
        }
      </CustomContainer>
    </div>
  );
};

export default SubHeader;
