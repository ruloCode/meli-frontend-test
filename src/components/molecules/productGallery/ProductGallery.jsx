'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './ProductGallery.module.scss'

export default function ProductGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const visibleThumbnails = 6
  const [hoveredImage, setHoveredImage] = useState(null)

  const showNextThumbnails = () => {
    if (startIndex + visibleThumbnails < images.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const showPreviousThumbnails = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

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
              className={`${styles.thumbnailButton} ${selectedImage === startIndex + index ? styles.selected : ''}`}
            >
              <Image
                src={image}
                fill
                className={styles.thumbnailImage}
              />
            </button>
          ))}
      </div>

      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <Image
          src={images[hoveredImage !== null ? hoveredImage : selectedImage]} // Show hovered image or selected image
          fill
          objectFit='contain'
          className={styles.mainImage}
          priority
        />
      </div>
    </div>
  )
}
