'use strict';

const { log } = console;

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA || 'my_auth';
  log('Production Schema:', options.schema);
}

module.exports = {
  async up(queryInterface, Sequelize) {
    log('Creating Spots table with options:', JSON.stringify(options));
    const schemaName = options.schema || 'public';
    log('Using Schema:', schemaName);
    
    // Ensure schema exists
    try {
      await queryInterface.createSchema(schemaName);
    } catch (error) {
      log('Schema might already exist:', error.message);
    }

    await queryInterface.createTable('Spots', {
      schema: schemaName,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: options.schema ? { tableName: 'Users', schema: options.schema } : 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      address: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      lng: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.dropTable(options);
  }
};
