'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const schema = process.env.SCHEMA || 'my_auth';
    console.log(`Attempting to create Spots table in schema: ${schema}`);

    // Explicitly drop the table if it exists to prevent conflicts
    try {
      await queryInterface.dropTable({ tableName: 'Spots', schema });
      console.log('Existing Spots table dropped');
    } catch (dropError) {
      console.log('No existing Spots table to drop:', dropError.message);
    }

    // Attempt to create the schema
    try {
      await queryInterface.createSchema(schema);
      console.log(`Schema ${schema} created or already exists`);
    } catch (schemaError) {
      console.log('Schema creation error:', schemaError.message);
    }

    // Create Spots table with full configuration
    await queryInterface.createTable({
      tableName: 'Spots',
      schema: schema
    }, {
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
