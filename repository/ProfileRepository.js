const { User } = require('../models');

const getMyProfile = async (id) => {
  const getProfile = await User.findOne({ where: { id } });

  return getProfile;
};

module.exports = {
  getMyProfile,
};
