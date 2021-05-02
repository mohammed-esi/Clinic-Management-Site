console.log('...DB Init Start');
const db = require('./config/db');

const User = require('./models/User');

const { DOCTOR } = require('./utils/roles');

db.sync().then(async () => {
  // Creating admin if they don't exist
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

  console.log('...DB Init End');
});
