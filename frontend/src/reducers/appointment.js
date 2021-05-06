import {
  GET_APPOINTMENT,
  APPOINTMENT_ERROR,
  CREATE_APPOINTMENT,
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
