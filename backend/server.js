const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const db = require('./config/db');

// Import Routes
const patientsRoutes = require('./routes/patient');
const usersRoutes = require('./routes/user');
const appointmentRoutes = require('./routes/appointment');
const medicamentsRoutes = require('./routes/medicament');
const prescribedMedicamentRoutes = require('./routes/prescribed_medicament');
const prescriptionRoutes = require('./routes/prescription');
const consultationRoutes = require('./routes/consultation');

// Test DB
db.authenticate()
  .then(async () => {
    console.log('Connected !');
    require('./seeder');
  })
  .catch((err) => {
    console.error(err.message);
  });

// Init Middleware
app.use(express.json({ extended: false }));

// Enabling cors
app.use(cors());

// Define Routes
app.use('/api/patients', patientsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medicaments', medicamentsRoutes);
app.use('/api/prescribed_medicaments', prescribedMedicamentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/consultations', consultationRoutes);

app.get('/', (req, res) => res.send('Hello from M-Social backend!'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
