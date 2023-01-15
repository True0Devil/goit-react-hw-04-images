import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import { IsLoading } from 'components/IsLoading/IsLoading';
import { Modal } from 'components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, status, incrementPage }) => {
  const [modalIsOpen, setModalOpen] = useState(false);

  const currentSrcRef = useRef();
  const currentAltRef = useRef();

  const handleImgClick = e => {
    const { target } = e;

    if (target.nodeName === 'IMG') {
      currentSrcRef.current = target.getAttribute('largeimg');
      currentAltRef.current = target.getAttribute('alt');

      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalIsOpen && (
        <Modal
          src={currentSrcRef.current}
          alt={currentAltRef.current}
          onClose={handleModalClose}
        />
      )}

      {status === 'rejected' && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
          limit={3}
        />
      )}

      <ul className="ImageGallery" onClick={handleImgClick}>
        {images.map(img => (
          <ImageGalleryItem
            key={img.id}
            smallImg={img.webformatURL}
            largeImg={img.largeImageURL}
            alt={img.tags}
          />
        ))}
      </ul>

      {status === 'pending' && <IsLoading />}

      {images.length > 0 && (
        <LoadMoreBtn text="Load More" onClick={incrementPage} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  status: PropTypes.string.isRequired,
  incrementPage: PropTypes.func.isRequired,
};
