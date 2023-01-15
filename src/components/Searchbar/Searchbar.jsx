import { useState } from 'react';
import { MdImageSearch } from 'react-icons/md';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSubmitForm = e => {
    e.preventDefault();

    onSearch(search);
    setSearch('');
  };

  const handleInputChange = e => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmitForm}>
        <button type="submit" className="SearchForm-button">
          <MdImageSearch size="35px" />
        </button>

        <input
          value={search}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}