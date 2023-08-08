const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// repository
const userRepository = require('../repository/ProfileRepository');

const getMyProfile = async (req, res) => {
  try {
    const myProfile = req.user;

    const findMyProfile = await userRepository.getMyProfile(myProfile.id);

    const data = {
      email: findMyProfile.email,
      fullName: findMyProfile.fullName,
    };

    return res.respondGet(data, 'success get my profile');
  } catch (err) {
    return res.respondServerError(err.message);
  }
};

module.exports = {
  getMyProfile,
};
