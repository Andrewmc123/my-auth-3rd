'use strict';

let options = {};
options.tableName = 'Users';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA || 'my_auth';
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(options, 'firstName', {
      type: Sequelize.STRING(30),
      allowNull: false
    });
    await queryInterface.changeColumn(options, 'lastName', {
      type: Sequelize.STRING(30),
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(options, 'firstName');
    await queryInterface.removeColumn(options, 'lastName');
  }
};
