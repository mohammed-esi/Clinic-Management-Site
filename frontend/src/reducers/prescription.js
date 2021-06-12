import {
  CREATE_PRESCRIPTION,
  PRESCRIPTION_ERROR,
  CLEAR_PRESCRIPTION,
} from '../utils/constant';

const initialState = {
  prescription: {},
  error: {},
};

function prescriptionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PRESCRIPTION:
      return {
        ...state,
        prescription: payload,
      };
    case PRESCRIPTION_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_PRESCRIPTION:
      return {
        ...state,
        prescription: {},
      };
    default:
      return state;
  }
}

export default prescriptionReducer;
