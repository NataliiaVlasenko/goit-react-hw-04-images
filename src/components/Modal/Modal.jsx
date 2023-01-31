import { useEffect } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

export function Modal({ largeImageURL, toggleModal }) {
  
  useEffect(() => {
    window.addEventListener('keydown', handleClose);
    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  });

  const handleClose = event => {
    if (event.code === 'Escape' || event.currentTarget === event.target) {
      toggleModal();
    }
    return;
  };

  return (
    <Overlay onClick={handleClose}>
      <ModalImg>
        <img src={largeImageURL} alt="" />
      </ModalImg>
    </Overlay>
  );
}
