import Link from "next/link";
import { playfairDisplay } from "@/app/ui/fonts";
import "./ui/globals.css";
import Image from 'next/image';
import styles from "./ui/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={`${playfairDisplay.className} ${styles.main}`}>
        <h1 className={styles.welcomeText}>Welcome to</h1>
        <h2 className={styles.title}>Handcrafted Haven</h2>

        <div className={styles.logoSection}>
        <Image
            src="/main-logo.webp"
            alt="Handcrafted Haven Logo"
            width={500}
            height={500}
            priority
            className={styles.logo}
          />
        </div>

        <h3 className={styles.question}>Are you:</h3>

        <div className={styles.buttonSection}>
          <Link href="/login">
            <button className={styles.sellingButton}>SELLING</button>
          </Link>
          <Link href="/products">
            <button className={styles.buyingButton}>BUYING</button>
          </Link>
        </div>

        <div className={styles.footerLogo}>
          <Image
            src="/mini-logo.webp"
            alt="Small Handcrafted Haven Logo"
            width={200}
            height={200}
            priority
            className={styles.smallLogo}
          />
        </div>
      </main>
    </div>
  );
}
