import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/pixabay.service';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import { IsLoading } from 'components/IsLoading/IsLoading';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    modalIsOpen: false,
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
        this.setState({ images, page: 1 });
      } catch (error) {}
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
      } catch (error) {}
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
    const { images, isLoading, modalIsOpen } = this.state;
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
      </>
    );
  }
}
