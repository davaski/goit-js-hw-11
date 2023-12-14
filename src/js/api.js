import axios from 'axios';

export const getPhotos = async (q, page) => {
  const options = new URLSearchParams({
    key: '41235765-1de4463aa2d8bd9af50400227',
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });
  const { data } = await axios.get(`https://pixabay.com/api/?${options}`);
  return data;
};
