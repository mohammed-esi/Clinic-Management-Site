import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router-dom';

import {
  MainDashboardPage,
  PatientsPage,
  PatientFormPage,
  AppointmentsPage,
  AppointmentFormPage,
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
      </Switch>
    </DashboardLayout>
  );
};

DashboardRouting.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DashboardRouting;
