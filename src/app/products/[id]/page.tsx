'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../ui/product.module.css';
import Reviews from '../../ui/products/reviews';
import ProductCards from '../../ui/products/ProductCards';
import { useParams } from 'next/navigation';
import { Product } from '../../../types/product';
import { Review } from '../../../types/review'


export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.product);
          setReviews(data.reviews);
        })
        .catch((error) => console.error('Error fetching the product:', error));
    }
  }, [id]);

  useEffect(() => {
    if (product?.category) {
      fetch('/api/products')
        .then((res) => res.json())
        .then((data) => {
          const related = data.products.filter(
            (p: Product) => p.category === product.category && p.id !== product.id
          );
          setRelatedProducts(related.slice(0, 5));
        });
    }
  }, [product?.category]);

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product Added to Cart:', product?.id);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.productContent}>
        <div className={styles.productImages}>
          <Image
            src={product.image}
            alt={product.product_name}
            width={400}
            height={400}
            priority
            className={styles.productImage}
          />
        </div>

        <div className={styles.productDetails}>
          <div>
            <h1 className={styles.productName}>{product.product_name}</h1>
            <div className={styles.reviewsHeader}>
              <div className={styles.averageRating}>
                <p className={styles.starSymbol}>★★★★☆</p>
                <span>{reviews.length} reviews</span>
              </div>
            </div>
          </div>
          <div><p className={styles.productDescription}>{product.description}</p></div>
        </div>

        <div className={styles.footerSection}>
          <h2 className={styles.productPrice}>U$ {Number(product.price).toFixed(2)}</h2>
          <button
            type="button"
            className={styles.addToCartButton}
            onClick={addProduct}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Reviews reviews={reviews} product={product} setReviews={setReviews} />

      <div className={styles.relatedProductsContainer}>
        <h2>Related Products</h2>
        <div className={styles.cardList}>
          {relatedProducts.map((item) => (
            <ProductCards
              key={item.id}
              id={item.id}
              product_name={item.product_name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
