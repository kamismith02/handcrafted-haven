import React from 'react';
import Image from "next/image";
import styles from './NavBar.module.css';
import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.menuDesktop}>
      <Image
          className={styles.logo}
          src="/mini-logo.webp"
          alt="Handracfted-haven logo"
          width={150}
          height={150}
          priority
          /> 
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/sale">Sale</Link>
        <Link href="/login">Login</Link>
        <Link href="/profile"
          className={styles.profile}>Profile</Link>
      </div>
    </nav>
  );
};

export default NavBar;