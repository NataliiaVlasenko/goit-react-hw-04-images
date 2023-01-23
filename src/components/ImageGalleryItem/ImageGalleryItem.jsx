import React from 'react';

export const ImageGalleryItem = ({id, webformatURL ,largeImageURL}) => {

return (

    <li className="gallery-item" ket = {id}>
  <img src={webformatURL} alt="" />
</li>
);

}