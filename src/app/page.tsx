import Carousel from './ui/Carousel';
import CategoryCard from './ui/CategoryCard';
import { playfairDisplay, lora } from '@/app/ui/fonts';
import "./ui/globals.css";
import styles from "./ui/page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={`${playfairDisplay.className} ${styles.main}`}>
        
          <div className="category-grid">
            <CategoryCard title="Category 1" />
            <CategoryCard title="Category 2" />
            <CategoryCard title="Category 3" />
            <CategoryCard title="Category 4" />
          </div>
          <div className={`${lora.className} carousel-section`}>
            <Carousel />
          </div>
        
        </main>
    </div>
  );
}
