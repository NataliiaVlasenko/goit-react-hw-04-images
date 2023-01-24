import axios from 'axios';

const API_KEY = '31948719-b1b8a7b96f20b88acc6eb2f9f';
const BASE_URL = 'https://pixabay.com/api';

export const fetchImages = async (searchQuery) => {
  

  const url = `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${1}&per_page=12`;
  try {
    const response = await axios.get(url);
    
    return response.data.hits;
  } catch (error) {
    return new Error(`No images for ${searchQuery}. Please try something else`);
  }
};

