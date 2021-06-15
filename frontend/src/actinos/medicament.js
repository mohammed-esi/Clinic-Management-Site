import api from '../utils/api';
import {
  CLEAR_MEDICAMENT,
  CREATE_MEDICAMENT,
  GET_MEDICAMENTS,
  GET_MEDICAMENT_BY_ID,
  MEDICAMENT_ERROR,
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
    console.log(res.data);

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
    await api.detele(`/api/medicaments/${id}`);

    dispatch({
      type: CREATE_MEDICAMENT,
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
      type: CREATE_MEDICAMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEDICAMENT_ERROR,
      payload: err.message,
    });
  }
};

// Clear Appointment
export const clearMeidcament = () => ({ type: CLEAR_MEDICAMENT });
