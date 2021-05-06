import { combineReducers } from 'redux';
import patient from './patient';
import appointment from './appointment';
import auth from './auth';

export default combineReducers({
  patient,
  appointment,
  auth,
});
