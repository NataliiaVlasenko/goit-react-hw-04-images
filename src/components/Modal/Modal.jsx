import React, { Component } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, onClose } = this.props;
    return (
      <Overlay onClick={onClose}>
        <ModalImg>
          <img src={largeImageURL} alt="" />
        </ModalImg>
      </Overlay>
    );
  }
 
}
