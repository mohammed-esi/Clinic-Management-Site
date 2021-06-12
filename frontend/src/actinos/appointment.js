import api from '../utils/api';
import {
  GET_APPOINTMENT,
  APPOINTMENT_ERROR,
  CREATE_APPOINTMENT,
  GET_APPOINTMENT_BY_ID,
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
