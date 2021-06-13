import {
  GET_PRESCRIBED_MEDICAMENTS,
  CREATE_PRESCIBED_MEDICAMENT,
  PRESCIRBED_MEDICAMENT_ERROR,
  DELETE_PRESCIRBED_MEDICAMENT,
} from '../utils/constant';

const initialState = {
  prescribed_medicaments: [],
  prescribed_medicament: {},
  loading: true,
  error: {},
};

function prescribedMedicamentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRESCRIBED_MEDICAMENTS:
      return {
        ...state,
        prescribed_medicaments: payload,
        loading: false,
      };
    case CREATE_PRESCIBED_MEDICAMENT:
      return {
        ...state,
        prescribed_medicaments: [payload, ...state.prescribed_medicaments],
        loading: false,
      };
    case DELETE_PRESCIRBED_MEDICAMENT:
      return {
        ...state,
        prescribed_medicaments: state.prescribed_medicaments.filter(
          (prescribed_medicament) => prescribed_medicament.id !== payload
        ),
        loading: false,
      };
    case PRESCIRBED_MEDICAMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default prescribedMedicamentReducer;
