import React from 'react';
import Image from "next/image";
import styles from './NavBar.module.css'; // CSS Module

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
        <div>
          <a href="/">
          <Image
            className={styles.logo}
            src="/logo-placeholder-image.png"
            alt="logo placeholder"
            width={150}
            height={150}
            priority
            />
          </a>            
        </div>
      <div className={styles.menuDesktop}>
        <a href="/">Home</a>
        <a href="#">Products</a>
        <a href="#">Sale</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
};

export default NavBar;