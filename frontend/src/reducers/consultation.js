import {
  GET_CONSULTATIONS,
  GET_CONSULTATION_BY_ID,
  CONSULTATION_ERROR,
  CREATE_CONSULTATION,
  DELETE_CONSULTATION,
  UPDATE_CONSULTATION,
  CLEAR_CONSULTATION,
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
    case GET_CONSULTATION_BY_ID:
      return {
        ...state,
        consultation: payload,
      };
    case CONSULTATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_CONSULTATION:
      return {
        ...state,
        consultations: state.consultations.filter((consultation) =>
          consultation.id === payload.id
            ? { motif: payload.motif, observation: payload.observation }
            : null
        ),
      };
    case DELETE_CONSULTATION:
      return {
        ...state,
        consultations: state.consultations.filter(
          (consultation) => consultation.id !== payload
        ),
        loading: false,
      };
    case CREATE_CONSULTATION:
      return {
        ...state,
        consultations: [payload, ...state.consultations],
        loading: false,
      };
    case CLEAR_CONSULTATION:
      return {
        ...state,
        consultation: null,
      };
    default:
      return state;
  }
}

export default consultationReducer;
