import api from '../utils/api';
import {
  CLEAR_MEDICAMENT,
  CREATE_MEDICAMENT,
  DELETE_MEDICAMENT,
  GET_MEDICAMENTS,
  GET_MEDICAMENT_BY_ID,
  MEDICAMENT_ERROR,
  UPDATE_MEDICAMENT,
  FILTERED_MEDICAMENTS,
  CLEAR_FILTER_MEDICAMENTS,
} from '../utils/constant';

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

// Get Medicament By Id
export const getMeidcamentById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/api/medicaments/${id}`);

    dispatch({
      type: GET_MEDICAMENT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEDICAMENT_ERROR,
      payload: err.message,
    });
  }
};

// Create Medicament
export const createMedicament = (formData) => async (dispatch) => {
  try {
    const res = await api.post(`/api/medicaments/`, formData);

    dispatch({
      type: CREATE_MEDICAMENT,
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

// Delete Medicament
export const deleteMedicament = (id) => async (dispatch) => {
  try {
    await api.delete(`/api/medicaments/${id}`);

    dispatch({
      type: DELETE_MEDICAMENT,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: MEDICAMENT_ERROR,
      payload: err.message,
    });
  }
};

// Update Medicament
export const updateMedicament = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/api/medicaments/${id}`, formData);

    dispatch({
      type: UPDATE_MEDICAMENT,
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

// Clear Meidcament
export const clearMeidcament = () => ({ type: CLEAR_MEDICAMENT });

// Fiter Medicament
export const filterMedicaments = (text) => (dispatch) => {
  dispatch({ type: FILTERED_MEDICAMENTS, payload: text });
};

// Clear filtered
export const clearFilter = () => ({ type: CLEAR_FILTER_MEDICAMENTS });
