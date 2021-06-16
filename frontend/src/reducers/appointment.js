import {
  GET_APPOINTMENT,
  APPOINTMENT_ERROR,
  CREATE_APPOINTMENT,
  GET_APPOINTMENT_BY_ID,
  DELETE_APPOINTMENT,
  CLEAR_APPOINTMENT,
  UPDATE_APPOINTMENT,
  FILTERED_APPOINTEMNTS,
  CLEAR_FILTER_APPOINTEMNT,
} from '../utils/constant';

const initialState = {
  appointments: [],
  filtered: null,
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
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment.id !== payload
        ),
        loading: false,
      };
    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter((appointment) =>
          appointment.id === payload.id
            ? {
                patient_id: payload.patient_id,
                appointment_date: payload.appointment_date,
                appointment_hour: payload.appointment_hour,
              }
            : null
        ),
      };
    case CLEAR_APPOINTMENT:
      return {
        ...state,
        appointment: null,
      };
    case APPOINTMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case FILTERED_APPOINTEMNTS:
      return {
        ...state,
        filtered: state.appointments.filter((appointment) => {
          const regex = new RegExp(`${payload}`, 'gi');
          return (
            appointment.patient.first_name.match(regex) ||
            appointment.patient.last_name.match(regex)
          );
        }),
      };
    case CLEAR_FILTER_APPOINTEMNT:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
}

export default appointmentReducer;
