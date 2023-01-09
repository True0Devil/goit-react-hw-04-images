import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/pixabay.service';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import { IsLoading } from 'components/IsLoading/IsLoading';
import { Modal } from 'components/Modal/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    page: 1,
    isLoading: false,
    modalIsOpen: false,
    isError: false,
  };

  currentSrc = '';
  currentAlt = '';

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;

    if (prevProps.query !== this.props.query) {
      this.setState({ isLoading: true, images: [] });
      try {
        const images = await getImages(query);
        console.log('изменился пропс');
        if (!images.length) {
          throw new Error(`No images were found for "${query}" request`);
        }
        this.setState({ images, page: 1, isError: false });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        this.setState({ isError: true });
      }
      this.setState({ isLoading: false });
    }

    if (prevState.page < this.state.page) {
      this.setState({ isLoading: true });
      try {
        const newImages = await getImages(query, page);

        console.log('изменилась страница');
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
        }));
      } catch (error) {
        toast.error('Something went wrong. Please try again');
      }
      this.setState({ isLoading: false });
    }
  }

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

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
    const { images, isLoading, modalIsOpen, isError } = this.state;
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
          <LoadMoreBtn text="Load More" onClick={this.incrementPage} />
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
