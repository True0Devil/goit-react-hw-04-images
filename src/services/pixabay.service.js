import axios from 'axios';

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

const pixabayApi = axios.create({ baseURL: 'https://pixabay.com' });

export const getImages = async (q, page = 1) => {
  const { data } = await pixabayApi.get('/api', {
    params: {
      q,
      page,
      key: '31452557-3b0cbe15b30db98d6cb3606a9',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      proxy: {
        protocol: 'https',
      },
    },
  });

  //   console.log(data);

  return data.hits;
};
