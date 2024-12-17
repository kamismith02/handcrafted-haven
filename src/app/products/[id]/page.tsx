'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../ui/product.module.css";
import Reviews from "../../ui/products/reviews";
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  price: number;
  sale_info: string;
  product_name: string;
  description: string;
  category: string;
  image: string;
}

interface Review {
  reviewId: string;
  userId: string;
  userName: string
  comment: string;
  rating: number;
  createdAt: string;
}

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setProduct(data.product);
          setReviews(data.reviews);
          setMainImage(data.product.image);
        })
        .catch((error) => console.error("Error fetching the product:", error));
    }
  }, [id]);

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Added to Cart:", product?.id);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.productContent}>
        <div className={styles.productImages}>
          <div className={styles.productImageContainer}>
            <Image
              className={styles.productImage}
              src={mainImage}
              alt={product.product_name}
              width={700}
              height={700}
              priority
            />
          </div>
        </div>

        <div className={styles.productInfo}>
          <h1 className={styles.productPrice}>
            U$ {(Number(product.price) || 0).toFixed(2)}
          </h1>
          <p className={styles.saleInfo}>{product.sale_info}</p>
          <p className={styles.productDescription}>
            {product.description}
          </p>
          <button type="button" className={styles.addToCartButton} onClick={addProduct}>
            Add to cart
          </button>
        </div>
      </div>

      <Reviews reviews={reviews} />
    </div>
  );
}
