import {
  GET_CONSULTATIONS,
  CONSULTATION_ERROR,
  CREATE_CONSULTATION,
} from '../utils/constant';

const initialState = {
  consultations: [],
  consultation: null,
  loading: true,
  error: {},
};

function consultationReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONSULTATIONS:
      return {
        ...state,
        consultations: payload,
        loading: false,
      };
    case CONSULTATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CREATE_CONSULTATION:
      return {
        ...state,
        consultations: [payload, ...state.consultations],
        loading: false,
      };
    default:
      return state;
  }
}

export default consultationReducer;
