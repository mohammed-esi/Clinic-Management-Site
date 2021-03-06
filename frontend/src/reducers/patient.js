import {
  GET_PATIENTS,
  PAITENT_ERROR,
  CREATE_PATIENT,
  DELETE_PATIENT,
  GET_PATIENT_BY_ID,
  CLEAR_PATIENT,
  UPDATE_PATIENT,
  FILTERED_PATIENTS,
  CLEAR_FILTER_PATIENT,
} from '../utils/constant';

const initialState = {
  patients: [],
  filtered: null,
  patient: null,
  loading: true,
  error: null,
};

function patientReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: payload,
        loading: false,
      };
    case GET_PATIENT_BY_ID:
      return {
        ...state,
        patient: payload,
      };
    case CREATE_PATIENT:
      return {
        ...state,
        patients: [payload, ...state.patients],
        loading: false,
      };
    case DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter((patient) => patient.id !== payload),
        loading: false,
      };
    case UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter((patient) =>
          patient.id === payload.id
            ? {
                first_name: payload.first_name,
                last_name: payload.last_name,
                age: payload.age,
                sex: payload.sex,
                city: payload.city,
                email: payload.email,
                phone_number: payload.phone_number,
                blood_group: payload.blood_group,
              }
            : null
        ),
      };
    case PAITENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PATIENT:
      return {
        ...state,
        patient: null,
      };
    case FILTERED_PATIENTS:
      return {
        ...state,
        filtered: state.patients.filter((patient) => {
          const regex = new RegExp(`${payload}`, 'gi');
          return (
            patient.first_name.match(regex) || patient.last_name.match(regex)
          );
        }),
      };
    case CLEAR_FILTER_PATIENT:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
}

export default patientReducer;
