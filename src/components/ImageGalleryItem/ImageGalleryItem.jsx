import React from 'react';
import PropTypes from 'prop-types';
import {ImageCard, CardImage} from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({id, webformatURL ,largeImageURL}) => {

    // console.log(webformatURL);
return (

    <ImageCard key = {id}>
  <CardImage src={webformatURL} alt="" />
</ImageCard>
);

}

ImageGalleryItem.propTypes= {
    id: PropTypes.number.isRequired,
    webformatURL:PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,

  };