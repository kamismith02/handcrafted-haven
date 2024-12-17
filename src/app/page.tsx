import Link from "next/link";
import { playfairDisplay, lora } from "@/app/ui/fonts";
import "./ui/globals.css";
import styles from "./ui/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={`${playfairDisplay.className} ${styles.main}`}>
        <h1 className={styles.welcomeText}>Welcome to</h1>
        <h2 className={styles.title}>Handcrafted Haven</h2>

        <div className={styles.logoSection}>
          <img
            src="/main-logo.webp"
            alt="Handcrafted Haven Logo"
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
          <img
            src="/mini-logo.webp"
            alt="Small Handcrafted Haven Logo"
            className={styles.smallLogo}
          />
        </div>
      </main>
    </div>
  );
}
