import { useState, useEffect } from 'react';
import { Searchbar } from '../Searcbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { fetchImages } from 'services/api';
import { Loader } from '../Loader/Loader';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadMoreButton, setloadMoreButton] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchQuery === '') {
      setloadMoreButton(false);
      return;
    }
    setStatus('pending');
    setloadMoreButton(false);
    fetchImages(searchQuery, page)
      .then(response => {
        setGallery(prevState => [...prevState, ...response]);
        setStatus('resolved');
        setloadMoreButton(true);
        if (response.length === 0) {
          setGallery([]);
          setloadMoreButton(false);
          return toast.error('it`s nothing have found, try again', {
            theme: 'colored',
          });
        }

        if (response.length <= 11) {
          setloadMoreButton(false);
        } else {
          setloadMoreButton(true);
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  },[page, searchQuery, error]);

  const onLoadMore = () => {
    setStatus('pending');
    setPage(prevPage => prevPage + 1);
  };

  const onSearchSubmit = value => {
    if (searchQuery === value) {
      return;
    }
    setSearchQuery(value);
    setPage(1);
    setGallery([]);
  };

  return (
    <Container>
      <Searchbar onSubmit={onSearchSubmit} />
      <ImageGallery gallery={gallery} />

      {loadMoreButton && <Button onLoadMore={onLoadMore} />}

      {status === 'pending' && <Loader />}

      <ToastContainer autoClose={3000} />
    </Container>
  );
}
