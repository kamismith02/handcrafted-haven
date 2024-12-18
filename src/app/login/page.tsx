import LoginForm from "@/app/ui/login-form";
import { lora } from '@/app/ui/fonts';
import "../ui/globals.css";
import styles from "../ui/page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <main className={`${lora.className} ${styles.main}`}>
        <LoginForm /> 
        </main>
    </div>
  );
}
