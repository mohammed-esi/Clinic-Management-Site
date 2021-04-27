import { GET_PATIENTS, PAITENT_ERROR, CREATE_PATIENT } from '../utils/constant';

const initialState = {
  patients: [],
  patient: null,
  loading: true,
  error: {},
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
    case CREATE_PATIENT:
      return {
        ...state,
        patients: [payload, ...state.categories],
        loading: false,
      };
    case PAITENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default patientReducer;
