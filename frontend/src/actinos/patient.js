import api from '../utils/api';
import { GET_PATIENTS, PAITENT_ERROR, CREATE_PATIENT } from '../utils/constant';

// Get Patients
export const getPatients = () => async (dispatch) => {
  try {
    const res = await api.get('/api/patients');
    console.log(res.data);

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
  try {
    const res = await api.post('/api/patients', formData);
    console.log(res.data);

    dispatch({
      type: CREATE_PATIENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PAITENT_ERROR,
      payload: err.message,
    });
  }
};
