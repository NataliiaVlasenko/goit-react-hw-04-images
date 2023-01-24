import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ gallery }) => {
  return (
    <GalleryList className="gallery">
      {gallery.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          id={id}
          largeImageURL={largeImageURL}
        />
      ))}
    </GalleryList>
  );
};
