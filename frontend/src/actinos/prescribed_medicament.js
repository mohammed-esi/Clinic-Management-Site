import api from '../utils/api';
import {
  GET_PRESCRIBED_MEDICAMENTS,
  CREATE_PRESCIBED_MEDICAMENT,
  PRESCIRBED_MEDICAMENT_ERROR,
  DELETE_PRESCIRBED_MEDICAMENT,
} from '../utils/constant';

// Get Prescrbed Medicaments
export const getPrescribedMedicaments = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/api/prescribed_medicaments/${id}`);

    dispatch({
      type: GET_PRESCRIBED_MEDICAMENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PRESCIRBED_MEDICAMENT_ERROR,
      payload: err.message,
    });
  }
};

// Add Prescirbed Medicament
export const addPrescribedMedicament = (formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `/api/prescribed_medicaments/${formData.medicament_id}/${formData.prescription_id}`,
      formData
    );

    dispatch({
      type: CREATE_PRESCIBED_MEDICAMENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PRESCIRBED_MEDICAMENT_ERROR,
      payload: err.message,
    });
  }
};

// Delete Prescirbed Medicament
export const deletePrescribedMedicament = (id) => async (dispatch) => {
  try {
    await api.delete(`/api/prescribed_medicaments/${id}`);

    dispatch({
      type: DELETE_PRESCIRBED_MEDICAMENT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: PRESCIRBED_MEDICAMENT_ERROR,
      payload: err.message,
    });
  }
};
