'use client';

import React from 'react';
import styles from '../../ui/product.module.css';

interface Review {
  userId: string;
  userName: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className={styles.reviewsSection}>
      <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <p className={styles.reviewUser}><strong>{review.userName}</strong> — {new Date(review.createdAt).toLocaleDateString()}</p>
            <p className={styles.reviewComment}>{review.comment}</p>
            <div className={styles.reviewRatings}>
              <p>Rating: {review.rating} ⭐</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;
