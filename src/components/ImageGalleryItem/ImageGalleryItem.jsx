import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ smallImg, largeImg, alt }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={smallImg}
        largeimg={largeImg}
        alt={alt}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
