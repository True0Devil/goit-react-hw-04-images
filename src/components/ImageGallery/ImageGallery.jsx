import { Component } from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/pixabay.service';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;

    if (prevProps.query !== this.props.query) {
      const images = await getImages(query);
      console.log('изменился пропс');
      this.setState({ images, page: 1 });
    }

    if (prevState.page < this.state.page) {
      const newImages = await getImages(query, page);

      console.log('изменилась страница');
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
      }));
    }
  }

  // fetchImages = async (query, page) => {
  //   // const { query } = this.props;
  //   // const { page } = this.state;
  //   const images = await getImages(query, page);
  //   console.log(images);
  //   return images;
  // };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images } = this.state;
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

        {images.length > 0 && (
          <LoadMoreBtn text="Load More" onClick={this.incrementPage} />
        )}
      </>
    );
  }
}
