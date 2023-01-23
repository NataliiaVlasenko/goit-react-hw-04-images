import React, { Component } from 'react';
import { Searchbar } from './Searcbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import {fetchImages} from 'services/api';


export class App extends Component {
  
  state = {
    searchQuery: '',
    page: 1,
    gallery: [],
    error: false,
    status: 'idle',
  };

   
   onSearchSubmit = async searchQuery => {
    try {
      this.setState({ isLoading: true });
      const gallery = await fetchImages(this.state.searchQuery);
      console.log(gallery);
      this.setState({ gallery });
    } catch (error) {
      this.setState({ error: true });
      console.log(error);
    }
  };



  render() {
    return (

<div>

  <Searchbar  onSubmit = {this.onSearchSubmit}/>
  <ImageGallery  gallery = {this.state.gallery}/>

</div>
    );
  }
  };


