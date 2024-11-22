import { Dancing_Script, Playfair_Display, Lora } from 'next/font/google';
 
export const dancingScript = Dancing_Script({ subsets: ['latin'] });
export const playfairDisplay = Playfair_Display({
    weight: ['400', '900'],
    subsets: ['latin'],
  });
export const lora = Lora({
    weight: ['400', '700'],
    subsets: ['latin'],
  });