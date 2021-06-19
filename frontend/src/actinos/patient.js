import api from '../utils/api';
import { toast } from 'react-toastify';
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

// Get Patients
export const getPatients = () => async (dispatch) => {
  try {
    const res = await api.get('/api/patients');

    dispatch({
      type: GET_PATIENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PAITENT_ERROR,
      payload: err.message,
    });
  }
};

// Add Patient
export const addPatient = (formData) => async (dispatch) => {
  const res = await api.post('/api/patients', formData);

  if (res.data.status_code === 200) {
    dispatch(
      {
        type: CREATE_PATIENT,
        payload: res.data.data,
      },
      toast.success('Added new patient successfuly!')
    );
  } else {
    dispatch(
      {
        type: PAITENT_ERROR,
        payload: res.data.msg,
      },
      toast.error(res.data.msg)
    );
  }
};

// Delete patient
export const deletePatient = (id) => async (dispatch) => {
  try {
    await api.delete(`/api/patients/${id}`);

    dispatch({
      type: DELETE_PATIENT,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PAITENT_ERROR,
      payload: err.message,
    });
  }
};

// Get Patient By Id
export const getPatientById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/api/patients/${id}`);

    dispatch({
      type: GET_PATIENT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PAITENT_ERROR,
      payload: err.message,
    });
  }
};

// Update patient
export const updatePatient = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/api/patients/${id}`, formData);

    dispatch({
      type: UPDATE_PATIENT,
      payload: id,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PAITENT_ERROR,
      payload: err.message,
    });
  }
};

// Clear Consultation
export const clearPatient = () => ({ type: CLEAR_PATIENT });

// Fiter patients
export const filterPatients = (text) => (dispatch) => {
  dispatch({ type: FILTERED_PATIENTS, payload: text });
};

// Clear filtered
export const clearFilter = () => ({ type: CLEAR_FILTER_PATIENT });
