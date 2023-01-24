import React, { Component } from 'react';
import { Searchbar } from './Searcbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { fetchImages } from 'services/api';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    gallery: [],
    error: false,
   status: 'idle',
  };

  onSearchSubmit = searchQuery => {
    console.log(searchQuery);
    this.setState({ searchQuery, page: 1, gallery: [] })
  }
  
  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {

      this.setState({ status: 'pending'});

      fetchImages(this.state.searchQuery)

        .then(response => {
          this.setState(prevState => 
            ({
            gallery: [...prevState.gallery, ...response],
            status: 'resolved',
                    }))}
          );
    }


  }

  

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery gallery={this.state.gallery} />
      </div>
    );
  }
}
