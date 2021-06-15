import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router-dom';

import {
  MainDashboardPage,
  PatientsPage,
  PatientFormPage,
  AppointmentsPage,
  AppointmentFormPage,
  MedicamentsPage,
  MedicamentFormPage,
  ConsultationsPage,
  ChooseAppointmentFormPage,
  ConsultationFormPage,
  CreatePrescriptionFormPage,
  PrescriptedMedicamentFormPage,
} from '../dashboard/PageListAsync';
import DashboardLayout from '../dashboard/DashboardLayout';

const DashboardRouting = ({ match: { path } }) => {
  return (
    <DashboardLayout>
      <Switch>
        <Route exact path={path} component={MainDashboardPage} />
        <Route exact path={`${path}/patients`} component={PatientsPage} />
        <Route
          exact
          path={`${path}/create_patient`}
          component={PatientFormPage}
        />
        <Route
          exact
          path={`${path}/appointments`}
          component={AppointmentsPage}
        />
        <Route
          exact
          path={`${path}/create_appointment`}
          component={AppointmentFormPage}
        />
        <Route exact path={`${path}/medicaments`} component={MedicamentsPage} />
        <Route
          exact
          path={`${path}/consultations`}
          component={ConsultationsPage}
        />
        <Route
          exact
          path={`${path}/choose_appointment`}
          component={ChooseAppointmentFormPage}
        />
        <Route
          exact
          path={`${path}/create_consultation/:id`}
          component={ConsultationFormPage}
        />
        <Route
          exact
          path={`${path}/create_prescription/:id`}
          component={CreatePrescriptionFormPage}
        />
        <Route
          exact
          path={`${path}/create_prescribed_medicament/:id`}
          component={PrescriptedMedicamentFormPage}
        />
        <Route
          exact
          path={`${path}/create_medicament/`}
          component={MedicamentFormPage}
        />
      </Switch>
    </DashboardLayout>
  );
};

DashboardRouting.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DashboardRouting;
