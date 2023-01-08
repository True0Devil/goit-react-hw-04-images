export const LoadMoreBtn = ({ text, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="Button">
      {text}
    </button>
  );
};
