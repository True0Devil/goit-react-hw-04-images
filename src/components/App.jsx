import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'services/pixabay.service';
import { reducerSetState } from 'functions/reducerSetState';
import { toast } from 'react-toastify';
import { useReducer } from 'react';
import { useEffect } from 'react';

// idle, pending, rejected, fullfilled
const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  FULFILLED: 'fulfilled',
};

export const App = () => {
  const [state, dispatch] = useReducer(reducerSetState, {
    search: '',
    images: null,
    page: 1,
    status: status.IDLE,
  });

  useEffect(() => {
    if (!state.search) {
      return;
    }

    dispatch({ type: 'loading', payload: status.PENDING });

    getImages(state.search, state.page)
      .then(images => {
        if (!images.length) {
          throw new Error(`No images were found for "${state.search}" request`);
        }
        return images;
      })
      .then(images => dispatch({ type: 'success', payload: images }))
      .catch(error => {
        toast.error(error.message);
        dispatch({ type: 'error', payload: status.REJECTED });
      });
  }, [state.search, state.page]);

  const handleSubmit = searchQuery => {
    const search = searchQuery.trim().toLowerCase();

    if (state.search === searchQuery) {
      return;
    }

    dispatch({ type: 'submit', payload: search });
  };

  const incrementPage = () => {
    dispatch({ type: 'incrementPage', payload: 1 });
  };

  return (
    <>
      <Searchbar onSearch={handleSubmit} />
      {state.search && (
        <ImageGallery
          images={state.images}
          status={state.status}
          incrementPage={incrementPage}
        />
      )}
    </>
  );
};
