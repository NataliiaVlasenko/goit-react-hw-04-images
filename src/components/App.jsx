import React, { Component } from 'react';
import { Searchbar } from './Searcbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import {Button} from './Button/Button';
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
    this.setState({ searchQuery, page: 1, gallery: [] });
  };
  onLoadMore =  () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page ||prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ status: 'pending' });

      fetchImages(this.state.searchQuery, this.state.page).then(response => {
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...response],
          status: 'resolved',
          
        }));
      });
    }
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery gallery={this.state.gallery} />
        {this.state.gallery.length > 0 && <Button onLoadMore = {this.onLoadMore}/>}
      </div>
    );
  }
}
