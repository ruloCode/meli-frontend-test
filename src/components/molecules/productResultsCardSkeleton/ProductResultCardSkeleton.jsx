import styles from './ProductResultCardSkeleton.modules.scss';

export default function ProductListingSkeleton() {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
      <div className={`${styles.skeletonText} ${styles.short}`}></div>
    </div>
  );
}
