const bcrypt = require('bcrypt');
const User = require('../models/userModel');

//This allows you to create a static user on local mongo db to use on login api.
const createStaticUser = async () => {
const existing = await User.findOne({ username: 'admin@gmail.com' });
if (!existing) {
const hashed = await bcrypt.hash('password123', 10);
await User.create({ username: 'admin@gmail.com', password: hashed });
console.log('Created default user: admin@gmail.com / password123');
}
};


module.exports = createStaticUser;