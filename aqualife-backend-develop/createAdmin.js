require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const ADMIN = {
  firstName: 'Super',
  lastName: 'Admin',
  email: 'admin@aqualife.com',
  password: 'Admin@1234',
  phone: '0000000000',
  city: 'Colombo',
  birthdate: new Date('1990-01-01'),
  roles: 'admin',
  status: 1,
};

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: ADMIN.email });
    if (existing) {
      console.log(`Admin already exists: ${ADMIN.email}`);
      process.exit(0);
    }

    const hashedPwd = await bcrypt.hash(ADMIN.password, 10);

    await User.create({
      firstName: ADMIN.firstName,
      lastName: ADMIN.lastName,
      email: ADMIN.email,
      password: hashedPwd,
      phone: ADMIN.phone,
      city: ADMIN.city,
      birthdate: ADMIN.birthdate,
      roles: ADMIN.roles,
      status: ADMIN.status,
    });

    console.log('✅ Admin account created successfully!');
    console.log(`   Email    : ${ADMIN.email}`);
    console.log(`   Password : ${ADMIN.password}`);
    console.log('\n⚠️  Change this password after first login!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
    process.exit(1);
  }
})();
