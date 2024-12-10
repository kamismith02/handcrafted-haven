"use client";

import React, { useState, useEffect } from "react";
import styles from "../ui/productList.module.css";
import Link from "next/link";

interface Product {
  _id: string;
  productName: string;
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
  const [maxPrice, setMaxPrice] = useState<number>(1000); // Set a default max price, or adjust based on your data

  
  
useEffect(() => {
  // Fetch products from your backend API
  const fetchProducts = async () => {
  try {
    const response = await fetch("/api/products");
    console.log('API response:', response);  // Log the response
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    console.log('Fetched products:', data);
    setProducts(data.products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

  fetchProducts();
}, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
  };

  // Filter products based on search term, category, and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productName.toLowerCase().includes(searchTerm);
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    const matchesPriceRange =
      product.price >= minPrice && product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  // Get unique categories from products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.filtersContainer}>
        {/* Search Bar */}
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Category Filter */}
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

        {/* Price Range Filter */}
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

      {/* Product Grid */}
      <div className={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <Link href={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.productName}
                  className={styles.productImage}
                />
                <h2 className={styles.productName}>{product.productName}</h2>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                <p className={styles.productCategory}>{product.category}</p>
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
