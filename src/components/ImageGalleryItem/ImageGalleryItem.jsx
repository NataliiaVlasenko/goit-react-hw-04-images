import React, { Component } from 'react';

import { ImageCard, CardImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  // console.log(webformatURL);

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { id, webformatURL, largeImageURL } = this.props;
    const { isModalOpen } = this.state;

    return (
      <div>
        <ImageCard key={id} onClick={this.openModal}>
          <CardImage src={webformatURL} alt="" />
        </ImageCard>
        {isModalOpen && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
