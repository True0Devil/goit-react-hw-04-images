// import { SearchIcon } from './SearchIcon';
import { MdImageSearch } from 'react-icons/md';

export const LoadMoreBtn = ({ text, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="Button">
      {/* <MdImageSearch /> */}
      {/* <SearchIcon /> */}
      {text}
    </button>
  );
};
