import { GET_MEDICAMENTS, MEDICAMENT_ERROR } from '../utils/constant';

const initialState = {
  medicaments: [],
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
    case MEDICAMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default medicamentReducer;
