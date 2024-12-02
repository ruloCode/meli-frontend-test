"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProductGallery.module.scss";

export default function ProductGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const visibleThumbnails = 6;
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <div className={styles.galleryContainer}>
      {/* Thumbnails */}
      <div className={styles.thumbnailsContainer}>
        {images
          .slice(startIndex, startIndex + visibleThumbnails)
          .map((image, index) => (
            <button
              key={startIndex + index}
              onClick={() => setSelectedImage(startIndex + index)} // Set selected image on click
              onMouseEnter={() => setHoveredImage(startIndex + index)} // Set hovered image on hover
              onMouseLeave={() => setHoveredImage(null)} // Reset hover state
              className={`${styles.thumbnailButton} ${
                selectedImage === startIndex + index ? styles.selected : ""
              }`}
            >
              <Image
                src={image}
                alt="thumbnail"
                fill
                className={styles.thumbnailImage}
              />
            </button>
          ))}
      </div>

      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <Image
          src={images[hoveredImage !== null ? hoveredImage : selectedImage]}
          fill
          alt="main"
          objectFit="contain"
          className={styles.mainImage}
          priority
        />
      </div>
    </div>
  );
}
