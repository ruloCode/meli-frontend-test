'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './ProductGallery.module.scss'

export default function ProductGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const visibleThumbnails = 6

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
                onClick={() => setSelectedImage(startIndex + index)}
                className={`${styles.thumbnailButton} ${selectedImage === startIndex + index ? styles.selected : ''}`}
              >
                <Image
                  src={image}
                
                  fill
                  className={styles.thumbnailImage}
                />
              </button>
            ))}
          {startIndex + visibleThumbnails < images.length && (
            <button
              onClick={showNextThumbnails}
              className={styles.arrowButton}
            >
              <span className="text-sm font-medium">
                +{images.length - (startIndex + visibleThumbnails)}
              </span>
            </button>
          )}
        
      </div>

      {/* Main Image */}
      <div className={styles.mainImageContainer}>
        <Image
          src={images[selectedImage]}
  
          fill
          objectFit='contain'
          className={styles.mainImage}
          priority
        />
      </div>
    </div>
  )
}
