import React from 'react';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({ gallery}) => {

return (

    <ul className="gallery">
 
{gallery.map(({id, webformatURL ,largeImageURL}) => (
        <ImageGalleryItem
          key={id}
          url = {webformatURL}
          id={id}
          largeImageURL = {largeImageURL}
          
        />
      ))}
    </ul>
);

}