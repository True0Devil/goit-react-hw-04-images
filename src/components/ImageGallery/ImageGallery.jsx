import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/pixabay.service';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import { IsLoading } from 'components/IsLoading/IsLoading';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;

    if (prevProps.query !== this.props.query) {
      this.setState({ isLoading: true });
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

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {images.map(img => (
            <ImageGalleryItem
              key={img.id}
              smallImg={img.webformatURL}
              largeImg={img.largeImageURL}
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
