// import { Component } from 'react';

// const BASE_URL = '';

export const ImageGalleryItem = ({ smallImg, largeImg, alt }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={smallImg} largeimg={largeImg} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
};
