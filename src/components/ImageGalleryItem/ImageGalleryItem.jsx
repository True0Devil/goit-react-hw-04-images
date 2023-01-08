// import { Component } from 'react';

// const BASE_URL = '';

export const ImageGalleryItem = ({ smallImg, largeImg }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={smallImg} alt="" className="ImageGalleryItem-image" />
    </li>
  );
};
