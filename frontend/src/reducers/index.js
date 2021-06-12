import { combineReducers } from 'redux';
import patient from './patient';
import appointment from './appointment';
import auth from './auth';
import medicament from './medicament';
import consultation from './consultation';
import prescription from './prescription';
import prescribed_medicament from './prescribed_medicament';

export default combineReducers({
  patient,
  appointment,
  auth,
  medicament,
  consultation,
  prescription,
  prescribed_medicament,
});
