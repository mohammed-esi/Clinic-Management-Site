import api from '../utils/api';
import {
  GET_APPOINTMENT,
  APPOINTMENT_ERROR,
  CREATE_APPOINTMENT,
  GET_APPOINTMENT_BY_ID,
  DELETE_APPOINTMENT,
  CLEAR_APPOINTMENT,
  UPDATE_APPOINTMENT,
  FILTERED_APPOINTEMNTS,
  CLEAR_FILTER_APPOINTEMNT,
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
  if (window.confirm('Are you sure? This can NOT be undone!')) {
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
  }
};

// Update Appointment
export const updateAppointment = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/api/appointments/${id}`, formData);

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

// Fiter Appointment
export const filterAppointments = (text) => (dispatch) => {
  dispatch({ type: FILTERED_APPOINTEMNTS, payload: text });
};

// Clear filtered
export const clearFilter = () => ({ type: CLEAR_FILTER_APPOINTEMNT });
