import React, { Suspense, lazy } from 'react';

// Page Patients
const Patients = lazy(() => import('../patient/Patients'));
const PatientForm = lazy(() => import('../patient/PatientForm'));

// Page Appointemnts
const Appointments = lazy(() => import('../appointment/Appointments'));
const AppointmentForm = lazy(() => import('../appointment/AppointmentFrom'));

// Page Medicaments
const Medicaments = lazy(() => import('../medicament/Medicaments'));
const MedicamentForm = lazy(() => import('../medicament/MedicamentForm'));

// Page Prescription
const CreatePrescriptionForm = lazy(() =>
  import('../prescription/CreatePrescriptionForm')
);

// Page Prescribed Medicament
const PrescriptedMedicamentForm = lazy(() =>
  import('../prescribed_medicament/PrescribedMedicamentForm')
);

// Page Consultations
const Consultations = lazy(() => import('../consultation/Consultations'));
const ChooseAppointmentForm = lazy(() =>
  import('../consultation/ChooseAppointmentForm')
);
const ConsultationForm = lazy(() => import('../consultation/ConsultationForm'));

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
export const MedicamentsPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Medicaments />
  </Suspense>
);
export const MedicamentFormPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <MedicamentForm />
  </Suspense>
);
export const ConsultationsPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Consultations />
  </Suspense>
);
export const ChooseAppointmentFormPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ChooseAppointmentForm />
  </Suspense>
);
export const ConsultationFormPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ConsultationForm />
  </Suspense>
);
export const CreatePrescriptionFormPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreatePrescriptionForm />
  </Suspense>
);
export const PrescriptedMedicamentFormPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PrescriptedMedicamentForm />
  </Suspense>
);
