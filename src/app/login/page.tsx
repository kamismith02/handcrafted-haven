import { playfairDisplay, dancingScript, lora } from '@/app/ui/fonts';
import "../ui/globals.css";
import styles from "../ui/page.module.css";

export default function Login() {
  return (
    <div className={styles.page}>
      <main className={`${lora.className} ${styles.main}`}>
        login  
        </main>
    </div>
  );
}
