export function reducerSetState(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        status: action.payload,
      };

    case 'success':
      return {
        ...state,
        images: [...state.images, ...action.payload],
        status: status.FULFILLED,
      };

    case 'error':
      return {
        ...state,
        status: action.payload,
      };

    case 'submit':
      return {
        ...state,
        search: action.payload,
        images: [],
        page: 1,
      };

    case 'incrementPage':
      return {
        ...state,
        page: state.page + action.payload,
      };

    default:
      break;
  }
}

const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  FULFILLED: 'fulfilled',
};
