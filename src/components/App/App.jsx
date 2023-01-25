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
    loadMoreButton: false,
  };

  onSearchSubmit = searchQuery => {
        searchQuery !== this.state.searchQuery
    ? this.setState({ searchQuery, page: 1, gallery: [], loadMoreButton: true,})
    : toast.warn(`You have already tried this search`,
     { theme: 'colored',
      }
    );

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
      this.setState({ status: 'pending', loadMoreButton: false, });
      fetchImages(searchQuery, page)
        .then(response => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...response],
            loadMoreButton: true,
            status: 'resolved',
            
          }));

          if (response.length === 0) {
            this.setState({ gallery: [],  loadMoreButton: false, });
            return toast.error(
              `Sorry, it's nothing connected with ${searchQuery}`,
              {
                theme: 'colored',
              }
            );
          }

          if (response.length <= 11) {
            this.setState({ loadMoreButton: false });
          }else {
            this.setState({ loadMoreButton: true });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {

    const {gallery, status, loadMoreButton} = this.state;


    return (
      <Container>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery gallery={gallery} />

        {loadMoreButton && <Button onLoadMore={this.onLoadMore} />
        }

        {status === 'pending' && <Loader />}

        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
