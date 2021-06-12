import api from '../utils/api';
import {
  GET_CONSULTATIONS,
  CONSULTATION_ERROR,
  CREATE_CONSULTATION,
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
