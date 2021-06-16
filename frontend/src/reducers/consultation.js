import {
  GET_CONSULTATIONS,
  GET_CONSULTATION_BY_ID,
  CONSULTATION_ERROR,
  CREATE_CONSULTATION,
  DELETE_CONSULTATION,
  UPDATE_CONSULTATION,
  CLEAR_CONSULTATION,
  FILTERED_CONSULTATIONS,
  CLEAR_FILTER_CONSULTATION,
} from '../utils/constant';

const initialState = {
  consultations: [],
  filtered: null,
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
    case FILTERED_CONSULTATIONS:
      return {
        ...state,
        filtered: state.consultations.filter((consultation) => {
          const regex = new RegExp(`${payload}`, 'gi');
          return (
            consultation.appointment.patient.first_name.match(regex) ||
            consultation.appointment.patient.last_name.match(regex)
          );
        }),
      };
    case CLEAR_FILTER_CONSULTATION:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
}

export default consultationReducer;
