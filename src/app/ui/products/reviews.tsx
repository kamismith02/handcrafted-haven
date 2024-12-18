'use client';

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import styles from '../reviews.module.css';

interface Review {
  reviewId: string;
  userName: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface ReviewsProps {
  reviews: Review[];
}

export default function Reviews({ reviews }: ReviewsProps) {
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session || !session.user) {
      signIn();
      return;
    }

    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        comment,
        rating,
        userId: session.user.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setComment('');
      setRating(1);
      setShowForm(false);
    } else {
      console.error('Failed to submit review');
    }
  };

  if (!reviews.length) return <p className={styles.noReviews}>No reviews yet.</p>;

  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    percentage:
      (reviews.filter((review) => review.rating === star).length / reviews.length) *
      100,
  }));

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsHeader}>
        <div className={styles.averageRating}>
          <h2>{averageRating}</h2>
          <p className={styles.starSymbol}>★★★★☆</p>
          <span>{reviews.length} reviews</span>
        </div>
        {!session ? (
          <button className={styles.addReviewBtn} onClick={() => signIn()}>
            Write a Review
          </button>
        ) : (
          <button
            className={styles.addReviewBtn}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <textarea
            placeholder="Write your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <div className={styles.rating}>
            <label>
              Rating:
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">Submit Review</button>
        </form>
      )}

      <div className={styles.ratingDistribution}>
        {ratingDistribution.map(({ star, percentage }) => (
          <div key={star} className={styles.ratingRow}>
            <span>{star} ★</span>
            <div className={styles.ratingBar}>
              <div
                className={styles.ratingFill}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span>{percentage.toFixed(0)}%</span>
          </div>
        ))}
      </div>

      <div className={styles.commentsSection}>
        {reviews.map((review) => (
          <div key={review.reviewId} className={styles.reviewItem}>
            <p className={styles.userName}>{review.userName}</p>
            <p className={styles.comment}>{review.comment}</p>
            <p className={styles.rating}>Rating: {review.rating}/5</p>
            <p className={styles.date}>
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
