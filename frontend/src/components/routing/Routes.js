import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Patients from '../patient/Patients';
import PatientForm from '../patient/PatientForm';

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Patients} />
        <Route exact path='/create_patient' component={PatientForm} />
      </Switch>
    </>
  );
}

export default Routes;
