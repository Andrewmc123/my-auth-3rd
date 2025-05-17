module.exports = {
  async up(queryInterface) {
    // Drop tables in reverse order of dependencies
    await queryInterface.dropTable('ReviewImages');
    await queryInterface.dropTable('Images');
    await queryInterface.dropTable('Reviews');
    await queryInterface.dropTable('Spots');
    await queryInterface.dropTable('Users');
  },

  async down(queryInterface) {
    // This is a destructive migration, no need for down
  }
};
