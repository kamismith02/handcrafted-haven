import React from 'react';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title }) => {
  return <div className={styles.card}>{title}</div>;
};

export default CategoryCard;