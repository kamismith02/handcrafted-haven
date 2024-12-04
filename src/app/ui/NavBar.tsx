import React from 'react';
import Image from "next/image";
import styles from './NavBar.module.css';
import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.menuDesktop}>
        <Link href="/" passHref>
          <a>Home</a>
        </Link>
        <Link href="/products" passHref>
          <a>Products</a>
        </Link>
        <Link href="/sale" passHref>
          <a>Sale</a>
        </Link>
        <Link href="/login" passHref>
          <a>Login</a>
        </Link>
        <Link href="/profile" passHref
          className={styles.profile}>
          <a>Profile</a>
        </Link>

        <Image
          className={styles.logo}
          src="/mini-logo.webp"
          alt="Handracfted-haven logo"
          width={150}
          height={150}
          priority
          /> 
      </div>
    </nav>
  );
};

export default NavBar;