import {
  GET_APPOINTMENT,
  APPOINTMENT_ERROR,
  CREATE_APPOINTMENT,
  GET_APPOINTMENT_BY_ID,
} from '../utils/constant';

const initialState = {
  appointments: [],
  appointment: null,
  loading: true,
  error: {},
};

function appointmentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_APPOINTMENT:
      return {
        ...state,
        appointments: payload,
        loading: false,
      };
    case GET_APPOINTMENT_BY_ID:
      return {
        ...state,
        appointment: payload,
        loading: false,
      };
    case CREATE_APPOINTMENT:
      return {
        ...state,
        appointments: [payload, ...state.appointments],
        loading: false,
      };
    case APPOINTMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default appointmentReducer;
