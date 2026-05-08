import { useEffect, useState } from "react";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import styles from "./Header.module.scss";

import Link from "next/link";
import {
  BellFill,
  Cart2,
  ChevronDown,
  ChevronRight,
  EnvelopeAt,
  EnvelopeAtFill,
  MenuButton,
  Person,
  Search,
  TelephoneFill,
} from "react-bootstrap-icons";
import Logo from "@/components/common/logo/logo";
import { CONTACT_DETAILS } from "@/constants/conatct";
import FONTS from "@/styles/fonts";
import Searchbar from "./search_bar/search_bar";
import RightMenu from "./menu_button/menu_button";
import { PAGES } from "@/constants/constants";

const DropDownItem = ({ item, setParentDropdown }) => {
  const [showSubDropDown, setShowSubDropDown] = useState(false);

  if (item.dropdown) {
    return (
      <div
        className={styles.subDropdown}
        onMouseEnter={() => {
          setShowSubDropDown(true);
        }}
        onMouseLeave={() => {
          setShowSubDropDown(false);
        }}
      >
        <p href={item.href || "#"}>
          {item.title}
          <ChevronRight />
        </p>
        {showSubDropDown && (
          <div className={styles.subDropdownWrap}>
            <div className={`${styles.subDropdown}`}>
              {item.dropdown.map((dd) => {
                return (
                  <DropDownItem
                    item={dd}
                    key={dd.title}
                    setParentDropdown={setParentDropdown}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      onClick={() => {
        setParentDropdown(false);
      }}
    >
      {item.title}
    </Link>
  );
};

const NavItem = ({ item }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  if (item.dropdown) {
    return (
      <li
        onMouseEnter={() => {
          setShowDropDown(true);
        }}
        onMouseLeave={() => {
          setShowDropDown(false);
        }}
      >
        <Link href={item.href || "#"}>
          {item.title}
          &nbsp;
          <ChevronDown />
        </Link>
        {showDropDown && (
          <div className={styles.dropdownWrap}>
            <div className={`${styles.dropdown}`}>
              {item.dropdown.map((dd) => {
                return (
                  <DropDownItem
                    item={dd}
                    key={dd.title}
                    setParentDropdown={setShowDropDown}
                  />
                );
              })}
            </div>
          </div>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link href={item.href || "#"}>{item.title}</Link>
    </li>
  );
};

export const RightButtons = ({ setShowSearchbar }) => {
  return (
    <div className={styles.right}>
      <div>
        <div className={styles.btns}>
          <div>
            <Search
              onClick={() => {
                setShowSearchbar((prev) => !prev);
              }}
            />
          </div>
          <div>
            <Person />
          </div>
          <div>
            <Cart2 />
          </div>

        </div>
      </div>
    </div>
  )
}

const Header = () => {


  return (
    <header className={styles.header}>
      <CustomContainer lg>
        <div className={styles.wrapLg}>
          <Logo />
          <Searchbar />
          <div className={styles.right}>
            <div className={styles.box}>
              <p>For Support?</p>
              <h3 className={FONTS.font2}>{CONTACT_DETAILS.phone1.text}</h3>
            </div>
            <div>
              <div className={styles.btns}>
                <div>
                  <Person />
                </div>
                <div>
                  <Cart2 />
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className={styles.wrapSm}>
          <div>
            <Logo width={110} />
            <RightMenu pages={PAGES} />
          </div>

        </div>
      </CustomContainer>
    </header>
  );
};

export default Header;
