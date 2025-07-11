'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'explorer@user.io',
        firstName: 'Lena',
        lastName: 'Travels',
        username: 'WanderQueen',
        hashedPassword: bcrypt.hashSync('explore123')
      },
      {
        email: 'skyline@user.io',
        firstName: 'Marcus',
        lastName: 'Loft',
        username: 'CityDweller',
        hashedPassword: bcrypt.hashSync('urbanlife')
      },
      {
        email: 'cozyvibes@user.io',
        firstName: 'Nina',
        lastName: 'Wood',
        username: 'CabinChic',
        hashedPassword: bcrypt.hashSync('pineforest')
      }
    ], { validate: true });

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['WanderQueen', 'CityDweller', 'CabinChic'] }
    }, {});
  }
};