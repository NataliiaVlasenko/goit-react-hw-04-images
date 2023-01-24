import React, { Component } from 'react';
import { Searchbar } from '../Searcbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { fetchImages } from 'services/api';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.setState({ status: 'pending' });
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page} = this.state;
    const prevPage = prevState.page;
    const prevSearchQuery = prevState.searchQuery;

    if (prevPage !== page || prevSearchQuery !== searchQuery) {
      this.setState({ status: 'pending' });
      fetchImages(searchQuery, page)
        .then(response => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...response],
            status: 'resolved',
          }));

          if (response.length === 0) {
            this.setState({ gallery: [] });
            return toast.error(
              `Sorry, it's nothing connected with ${searchQuery}`,
              {
                theme: 'colored',
              }
            );
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery gallery={this.state.gallery} />

        {this.state.gallery.length > 0 && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {this.state.status === 'pending' && <Loader />}

        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
