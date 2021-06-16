import {
  CLEAR_FILTER_MEDICAMENTS,
  CLEAR_MEDICAMENT,
  CREATE_MEDICAMENT,
  DELETE_MEDICAMENT,
  FILTERED_MEDICAMENTS,
  GET_MEDICAMENTS,
  GET_MEDICAMENT_BY_ID,
  MEDICAMENT_ERROR,
  UPDATE_MEDICAMENT,
} from '../utils/constant';

const initialState = {
  medicaments: [],
  filtered: null,
  medicament: null,
  loading: true,
  error: {},
};

function medicamentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MEDICAMENTS:
      return {
        ...state,
        medicaments: payload,
        loading: false,
      };
    case GET_MEDICAMENT_BY_ID:
      return {
        ...state,
        medicament: payload,
      };
    case CREATE_MEDICAMENT:
      return {
        ...state,
        medicaments: [payload, ...state.medicaments],
        loading: false,
      };
    case DELETE_MEDICAMENT:
      return {
        ...state,
        medicaments: state.medicaments.filter(
          (medicament) => medicament.id !== payload
        ),
        loading: false,
      };
    case UPDATE_MEDICAMENT:
      return {
        ...state,
        medicaments: state.medicaments.filter((medicament) =>
          medicament.id === payload.id
            ? {
                name: payload.name,
              }
            : null
        ),
      };
    case MEDICAMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_MEDICAMENT:
      return {
        ...state,
        medicament: null,
      };
    case FILTERED_MEDICAMENTS:
      return {
        ...state,
        filtered: state.medicaments.filter((medicament) => {
          const regex = new RegExp(`${payload}`, 'gi');
          return medicament.name.match(regex);
        }),
      };
    case CLEAR_FILTER_MEDICAMENTS:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
}

export default medicamentReducer;
