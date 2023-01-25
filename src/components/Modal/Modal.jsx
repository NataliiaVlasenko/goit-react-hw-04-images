import React, { Component } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = event => {
    if (event.code === 'Escape' || (event.currentTarget === event.target)) {
      this.props.onClose();
    }
  };

 
  render() {
    const { largeImageURL} = this.props;
    return (
      <Overlay onClick={this.handleClose}>
        <ModalImg>
          <img src={largeImageURL} alt="" />
        </ModalImg>
      </Overlay>
    );
  }
}
