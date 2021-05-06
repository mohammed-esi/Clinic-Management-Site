import React, { Suspense, lazy } from 'react';

// Page Patients
const Patients = lazy(() => import('../patient/Patients'));
const PatientForm = lazy(() => import('../patient/PatientForm'));

// Page Patients
const Appointments = lazy(() => import('../appointment/Appointments'));
const AppointmentForm = lazy(() => import('../appointment/AppointmentFrom'));

// Main Page Of Dashboard
const MainDashboard = lazy(() => import('../dashboard/MainDashboard'));

export const PatientsPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Patients />
  </Suspense>
);
export const MainDashboardPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <MainDashboard />
  </Suspense>
);
export const PatientFormPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PatientForm />
  </Suspense>
);
export const AppointmentsPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Appointments />
  </Suspense>
);
export const AppointmentFormPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AppointmentForm />
  </Suspense>
);
