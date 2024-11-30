'use client';

import React, { useState } from "react";
import Image from "next/image";
import styles from "../../ui/product.module.css";

export default function Page() {

    const [mainImage, setMainImage] = useState<string>("/mini-logo.webp");

    const thumbnails = [
        //list of images to be shown on the miniatures
        //this code will need to change when database is set and products are added to it
        "/mini-logo.webp",
        "/pexels-jessbaileydesign-730708.jpg",
        "/pexels-marta-nogueira-589022975-19390430.jpg",
        "/pexels-othmar-774379.jpg",
        "/main-logo.webp",
    ];

    const handleThumbnailClick = (image: string) => {
        // update the image when click on the miniature
        setMainImage(image);
    };

    const addProduct = (e: React.FormEvent) => {
        e.preventDefault();
        //code to handle the add to cart button, database action needed
        console.log("Product Added to Cart");
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.productContent}>
                <div className={styles.productImages}>
                    <div className={styles.productMinContainer}>
                        {thumbnails.map((thumb, index) => (
                            <Image
                            key={index}
                            className={styles.productImageMin}
                            src={thumb}
                            alt={`Thumbnail ${index + 1}`}
                            width={50}
                            height={50}
                            priority
                            onClick={() => handleThumbnailClick(thumb)}
                            />
                        ))}
                    </div>
                    <div className={styles.productImageContainer}>
                        <Image
                        className={styles.productImage}
                        src={mainImage}
                        alt="Main product image"
                        width={700}
                        height={700}
                        priority
                        />
                    </div>
                </div>
                <div className={styles.productInfo}>
                    <h1 className={styles.productPrice}>BRL 42.79+ (35% off)</h1>
                    <p className={styles.saleInfo}>Sale ends on December 17</p>
                    <p className={styles.productDescription}>
                    Brief Description of the Product
                    </p>
                    <button type="button" className={styles.addToCartButton} onClick={addProduct}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

