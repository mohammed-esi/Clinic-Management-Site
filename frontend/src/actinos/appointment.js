import api from '../utils/api';
import {
  GET_APPOINTMENT,
  APPOINTMENT_ERROR,
  CREATE_APPOINTMENT,
  GET_APPOINTMENT_BY_ID,
  DELETE_APPOINTMENT,
  CLEAR_APPOINTMENT,
  UPDATE_APPOINTMENT,
} from '../utils/constant';

// Get Appointments
export const getAppointments = () => async (dispatch) => {
  try {
    const res = await api.get('/api/appointments');

    dispatch({
      type: GET_APPOINTMENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: err.message,
    });
  }
};

// Add Appointment
export const addAppointment = (formData) => async (dispatch) => {
  try {
    const res = await api.post(
      `/api/appointments/${formData.id_patient}`,
      formData
    );

    dispatch({
      type: CREATE_APPOINTMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: err.message,
    });
  }
};

// Delete Appointment
export const deleteAppointment = (id) => async (dispatch) => {
  try {
    await api.delete(`/api/appointments/${id}`);

    dispatch({
      type: DELETE_APPOINTMENT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: err.message,
    });
  }
};

// Update Appointment
export const updateAppointment = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/api/appointments/${id}`, formData);
    console.log(res.data);

    dispatch({
      type: UPDATE_APPOINTMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: err.message,
    });
  }
};

// Get Appointment By Id
export const getAppointmentById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/api/appointments/${id}`);

    dispatch({
      type: GET_APPOINTMENT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: err.message,
    });
  }
};

// Clear Appointment
export const clearAppointment = () => ({ type: CLEAR_APPOINTMENT });
