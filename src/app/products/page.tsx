"use client";

import React, { useState, useEffect } from "react";
import styles from "../ui/productList.module.css";
import Link from "next/link";
import Image from 'next/image';

interface Product {
  id: string;
  product_name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryFilter(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchTerm);
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    const matchesPriceRange =
      product.price >= minPrice && product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.filtersContainer}>
        <div className={styles.filterPrice}>
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            className={styles.searchBar}
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className={styles.filterCategory}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={categoryFilter}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterPrice}>
          <label htmlFor="minPrice">Price Range:</label>
          <div>
            <input
              type="number"
              id="minPrice"
              placeholder="Min Price"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            -
            <input
              type="number"
              id="maxPrice"
              placeholder="Max Price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.product_name}
                  width={400}
                  height={400}
                  priority
                  className={styles.productImage}
                />
                <h2 className={styles.productName}>{product.product_name}</h2>
                <p className={styles.productPrice}>
                  ${Number(product.price).toFixed(2)}
                </p>
                <p className={styles.productCategory}>{product.category}</p>
                <p className={styles.productCategory}>{product.description}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No products match your criteria.</p>
        )}
      </div>
    </div>
  );
}
