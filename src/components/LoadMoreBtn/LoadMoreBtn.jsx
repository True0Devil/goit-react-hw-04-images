import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ text, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="Button">
      {text}
    </button>
  );
};

LoadMoreBtn.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}