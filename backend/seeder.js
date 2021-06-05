console.log('...DB Init Start');
const db = require('./config/db');

const User = require('./models/User');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');
const Medicament = require('./models/Medicament');
const PrescribedMedicament = require('./models/PrescribedMedicament');
const Prescription = require('./models/Prescription');
const Consultation = require('./models/Consultation');

const { DOCTOR, SECRETARY } = require('./utils/roles');

db.sync().then(async () => {
  // Creating doctor if they don't exist
  await User.findOrCreate({
    where: {
      role: DOCTOR,
    },
    defaults: {
      full_name: DOCTOR,
      email: 'doctor@example.com',
      password: await User.hashPassword('123123'),
      role: DOCTOR,
    },
    raw: true,
  });

  // Creating secretary if they don't exist
  await User.findOrCreate({
    where: {
      role: SECRETARY,
    },
    defaults: {
      full_name: SECRETARY,
      email: 'secretary@example.com',
      password: await User.hashPassword('123123'),
      role: SECRETARY,
    },
    raw: true,
  });

  //#region Associations

  // Patient - User
  Patient.belongsTo(User, { foreignKey: 'user_id' });
  User.hasOne(Patient, { foreignKey: 'user_id' });

  // Appointment - User
  Appointment.belongsTo(User, { foreignKey: 'user_id' });
  User.hasOne(Appointment, { foreignKey: 'user_id' });

  // Medicament - User
  Medicament.belongsTo(User, { foreignKey: 'user_id' });
  User.hasOne(Medicament, { foreignKey: 'user_id' });

  // Prescribed Medicament - User
  PrescribedMedicament.belongsTo(User, { foreignKey: 'user_id' });
  User.hasOne(PrescribedMedicament, { foreignKey: 'user_id' });

  // Prescription - User
  Prescription.belongsTo(User, { foreignKey: 'user_id' });
  User.hasOne(Prescription, { foreignKey: 'user_id' });

  // Consultation - User
  Consultation.belongsTo(User, { foreignKey: 'user_id' });
  User.hasOne(Consultation, { foreignKey: 'user_id' });

  // Appointment - Patient
  Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });
  Patient.hasOne(Appointment, { foreignKey: 'patient_id' });

  // Consultation - Appointment
  Consultation.belongsTo(Appointment, { foreignKey: 'app_id' });
  Appointment.hasOne(Consultation, { foreignKey: 'app_id' });

  // Prescribed Medicament - Medicament
  PrescribedMedicament.belongsTo(Medicament, { foreignKey: 'medicament_id' });
  Medicament.hasOne(PrescribedMedicament, { foreignKey: 'medicament_id' });

  // Prescription - Prescribed Medicament
  Prescription.belongsTo(PrescribedMedicament, {
    foreignKey: 'presc_medicament_id',
  });
  PrescribedMedicament.hasOne(Prescription, {
    foreignKey: 'presc_medicament_id',
  });

  // Consultation - Prescription
  Consultation.belongsTo(Prescription, { foreignKey: 'presc_id' });
  Prescription.hasOne(Consultation, { foreignKey: 'presc_id' });

  //#endregion Associations

  console.log('...DB Init End');
});
