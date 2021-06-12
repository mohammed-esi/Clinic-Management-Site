import api from '../utils/api';
import { GET_MEDICAMENTS, MEDICAMENT_ERROR } from '../utils/constant';

// Get Medicaments
export const getMedicaments = () => async (dispatch) => {
  try {
    const res = await api.get('/api/medicaments');

    dispatch({
      type: GET_MEDICAMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: MEDICAMENT_ERROR,
      payload: err.message,
    });
  }
};
