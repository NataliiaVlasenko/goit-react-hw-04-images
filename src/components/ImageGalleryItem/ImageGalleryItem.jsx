import React from 'react';
import {ImageCard, CardImage} from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({id, webformatURL ,largeImageURL}) => {

    // console.log(webformatURL);
return (

    <ImageCard key = {id}>
  <CardImage src={webformatURL} alt="" />
</ImageCard>
);

}