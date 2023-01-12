import { Component } from 'react';
import { Seacrhbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'services/pixabay.service';
import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoading: false,
    isError: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (prevState.page !== page || prevState.search !== search) {
      this.setState({ isLoading: true });
      try {
        const images = await getImages(search, page);
        if (!images.length) {
          throw new Error(`No images were found for "${search}" request`);
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          isError: false,
        }));
      } catch (error) {
        toast.error(error.message);
        this.setState({ isError: true });
      }
      this.setState({ isLoading: false });
    }
  }

  handleSubmit = searchQuery => {
    const search = searchQuery.trim().toLowerCase();

    if (this.state.search === searchQuery) {
      return;
    }

    this.setState({ search, images: [], page: 1 });
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, isError } = this.state;
    return (
      <>
        <Seacrhbar onSearch={this.handleSubmit} />
        <ImageGallery
          images={images}
          isLoading={isLoading}
          isError={isError}
          incrementPage={this.incrementPage}
        />
      </>
    );
  }
}
