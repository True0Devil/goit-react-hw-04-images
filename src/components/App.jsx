import { Component } from 'react';
import { Seacrhbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

// const name = "search"

export class App extends Component {
  state = {
    search: '',
  };

  handleSubmit = searchQuery => {
    console.log(searchQuery);
    const search = searchQuery.trim().toLowerCase();

    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <>
        <Seacrhbar onSearch={this.handleSubmit} />
        <ImageGallery query={search} />
      </>
    );
  }
}
