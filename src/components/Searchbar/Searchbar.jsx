import { Component } from 'react';

export class Seacrhbar extends Component {
  state = {
    search: '',
  };

  handleSubmitForm = e => {
    e.preventDefault();

    this.props.onSearch(this.state.search);
    this.setState({ search: '' });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { search } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmitForm}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={search}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
