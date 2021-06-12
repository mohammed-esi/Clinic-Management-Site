import api from '../utils/api';
import {
  CREATE_PRESCRIPTION,
  PRESCRIPTION_ERROR,
  CLEAR_PRESCRIPTION,
} from '../utils/constant';

// Add Appointment
export const addPrescription = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/api/prescriptions/', formData);

    dispatch({
      type: CREATE_PRESCRIPTION,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PRESCRIPTION_ERROR,
      payload: err.message,
    });
  }
};

// Clear Prescription
export const clearPrescription = () => ({ type: CLEAR_PRESCRIPTION });
