const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const db = require('./config/db');

const patientsRoutes = require('./routes/patient');
const usersRoutes = require('./routes/user');
const appointmentRoutes = require('./routes/appointment');

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

app.get('/', (req, res) => res.send('Hello from M-Social backend!'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
