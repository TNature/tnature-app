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
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { Dropdown } from "react-bootstrap";

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
  const { toggleCart, cartCount } = useAppContext();
  const { user, signOut } = useAuth();

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

          {user ? (
            <Dropdown className={styles.userDropdown}>
              <Dropdown.Toggle as="div" className={styles.dropdownIcon}>
                <Person />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Header>Hi, {user.user_metadata?.full_name || 'User'}</Dropdown.Header>
                <Dropdown.Item href="/user">My Profile</Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item onClick={signOut}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className={styles.cartBtn}>
              <Link href="/auth">
                <Person />
              </Link>
            </div>
          )}

          <div className={styles.cartBtn} onClick={toggleCart}>
            <Cart2 />
            {cartCount > 0 && (
              <span className={styles.badge}>{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Header = () => {
  const { toggleCart, cartCount } = useAppContext();
  const { user, signOut } = useAuth();


  return (
    <header className={styles.header}>
      <CustomContainer lg>
        <div className={styles.wrapLg}>
          <Logo />
          <Searchbar />
          <div className={styles.right}>
            <div className={styles.box}>
              <p>For Support?</p>
              <h3 className={FONTS.font2}>
                <Link href={`tel:${CONTACT_DETAILS.phone1.number}`}>{CONTACT_DETAILS.phone1.text}</Link>
              </h3>
            </div>
            <div>
              <div className={styles.btns}>
                {user ? (
                  <Dropdown className={styles.userDropdown}>
                    <Dropdown.Toggle as="div" className={styles.dropdownIcon}>
                      <Person />
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                      <Dropdown.Header>Hi, {user.user_metadata?.full_name || 'User'}</Dropdown.Header>
                      <Dropdown.Item href="/user">My Profile</Dropdown.Item>

                      <Dropdown.Divider />
                      <Dropdown.Item onClick={signOut}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <div className={styles.cartBtn}>
                    <Link href="/auth">
                      <Person />
                    </Link>
                  </div >
                )}
                <div className={styles.cartBtn} onClick={toggleCart}>
                  <Cart2 />
                  {cartCount > 0 && (
                    <span className={styles.badge}>{cartCount}</span>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className={styles.wrapSm}>
          <div>
            <Logo  />
            <RightMenu pages={PAGES} />
          </div>

        </div>
      </CustomContainer>
    </header>
  );
};

export default Header;
