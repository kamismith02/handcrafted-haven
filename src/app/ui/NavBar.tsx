"use client"; 
import React, { useState } from "react";
import Image from "next/image";
import styles from "./NavBar.module.css";
import Link from "next/link";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Image
        className={styles.logo}
        src="/mini-logo.webp"
        alt="Handcrafted Haven logo"
        width={150}
        height={150}
        priority
      />
      
      <button className={styles.hamburger} onClick={toggleMenu}>
        &#9776;
      </button>

      
      <div className={styles.menuDesktop}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/login">Login</Link>
        <Link href="/profile">Profile</Link>
      </div>

      <div
        className={`${styles.menuMobile} ${!isMenuOpen ? styles.menuHidden : ""}`}
      >
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/login">Login</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default NavBar;
