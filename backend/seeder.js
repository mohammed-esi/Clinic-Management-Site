console.log('...DB Init Start');
const db = require('./config/db');

const User = require('./models/User');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');

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

  // Appointment - Patient
  Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });
  Patient.hasOne(Appointment, { foreignKey: 'patient_id' });

  //#endregion Associations

  console.log('...DB Init End');
});
