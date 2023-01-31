import { useState} from 'react';

import { ImageCard, CardImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export function ImageGalleryItem ({ id, webformatURL, largeImageURL }) {

  const [isModalOpen, setModalOpen] = useState(false);
 
const toggleModal =() => {
  setModalOpen(!isModalOpen);
}
    return (
      <div>
        <ImageCard key={id} onClick={toggleModal}>
          <CardImage src={webformatURL} alt="" />
        </ImageCard>
        {isModalOpen && (
          <Modal largeImageURL={largeImageURL} toggleModal={toggleModal} />
        )}
      </div>
    );
  
}
