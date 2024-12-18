'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../productCards.module.css';
import Link from "next/link";

interface ProductCardProps {
  id: string;
  product_name: string;
  price: number;
  image: string;
  onClick?: () => void;
}

export default function ProductCards({
  id,
  product_name,
  price,
  image,
  onClick,
}: ProductCardProps) {
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <Link href={`/products/${id}`}>
          <Image
            src={image}
            alt={product_name}
            width={300}
            height={300}
            className={styles.productImage}
          />
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product_name}</h3>
            <p className={styles.productPrice}>U$ {Number(price).toFixed(2)}</p>
          </div>
      </Link>
    </div>
  );
}
