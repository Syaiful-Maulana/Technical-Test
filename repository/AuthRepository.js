const { User } = require('../models');

const error = new Error();

const createUser = async (user) => {
  error.code = 400;

  const newUser = user;

  const [createdUser, created] = await User.findOrCreate({
    where: { email: user.email },
    defaults: newUser,
  });

  if (created) return createdUser;
  error.message = 'email already exists';
  throw error;
};

const find = async (json) => {
  const rows = await User.findAll({
    where: json,
  });
  return rows;
};
module.exports = {
  createUser,
  find,
};
