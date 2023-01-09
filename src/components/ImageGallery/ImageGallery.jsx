import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import { IsLoading } from 'components/IsLoading/IsLoading';
import { Modal } from 'components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    incrementPage: PropTypes.func.isRequired,
  };

  state = {
    modalIsOpen: false,
  };

  currentSrc = '';
  currentAlt = '';

  handleImgClick = e => {
    const { target } = e;

    if (target.nodeName === 'IMG') {
      this.currentSrc = target.getAttribute('largeimg');
      this.currentAlt = target.getAttribute('alt');

      this.setState({ modalIsOpen: true });
    }
  };

  handleModalClose = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { modalIsOpen } = this.state;
    const { images, isLoading, isError, incrementPage } = this.props;
    return (
      <>
        {modalIsOpen && (
          <Modal
            src={this.currentSrc}
            alt={this.currentAlt}
            onClose={this.handleModalClose}
          />
        )}

        <ul className="ImageGallery" onClick={this.handleImgClick}>
          {images.map(img => (
            <ImageGalleryItem
              key={img.id}
              smallImg={img.webformatURL}
              largeImg={img.largeImageURL}
              alt={img.tags}
            />
          ))}
        </ul>

        {isLoading && <IsLoading />}

        {images.length > 0 && (
          <LoadMoreBtn text="Load More" onClick={incrementPage} />
        )}

        {isError && (
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="colored"
            limit={3}
          />
        )}
      </>
    );
  }
}
