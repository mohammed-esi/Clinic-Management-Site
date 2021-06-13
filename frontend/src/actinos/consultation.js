import api from '../utils/api';
import {
  GET_CONSULTATIONS,
  GET_CONSULTATION_BY_ID,
  CONSULTATION_ERROR,
  CREATE_CONSULTATION,
  DELETE_CONSULTATION,
  UPDATE_CONSULTATION,
  CLEAR_CONSULTATION,
} from '../utils/constant';

// Get Consultations
export const getConsultations = () => async (dispatch) => {
  try {
    const res = await api.get('/api/consultations');

    dispatch({
      type: GET_CONSULTATIONS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CONSULTATION_ERROR,
      payload: err.message,
    });
  }
};

// Create Consultation
export const createConsultation = (formData) => async (dispatch) => {
  try {
    const res = formData.prescription_id
      ? await api.post(
          `/api/consultations/${formData.app_id}?prescriptionId=${formData.prescription_id}`,
          formData
        )
      : await api.post(`/api/consultations/${formData.app_id}`, formData);

    dispatch({
      type: CREATE_CONSULTATION,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CONSULTATION_ERROR,
      payload: err.message,
    });
  }
};

// Get Consultation By Id
export const getConsultationById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/api/consultations/${id}`);

    dispatch({
      type: GET_CONSULTATION_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONSULTATION_ERROR,
      payload: err.message,
    });
  }
};

// Delete Consultation
export const deleteConsultation = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete(`/api/consultations/${id}`);

      dispatch({
        type: DELETE_CONSULTATION,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: CONSULTATION_ERROR,
        payload: err.message,
      });
    }
  }
};

// Update Consultation
export const updateConsultation = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/api/consultations/${id}`, formData);

    dispatch({
      type: UPDATE_CONSULTATION,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CONSULTATION_ERROR,
      payload: err.message,
    });
  }
};

// Clear Consultation
export const clearConsultation = () => ({ type: CLEAR_CONSULTATION });
