'use strict';

// Enhanced logging function
module.exports = {
  async up(queryInterface, Sequelize) {
    const schema = process.env.SCHEMA || 'my_auth';
    console.log(`Creating Spots table in schema: ${schema}`);

    try {
      await queryInterface.createSchema(schema).catch(() => {});

      await queryInterface.createTable({
        tableName: 'Spots',
        schema: schema
      }, {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { tableName: 'Users', schema: schema },
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
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
      });

      console.log('Spots table created successfully');
    } catch (error) {
      console.error('CRITICAL ERROR in Spots table migration', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    const schema = process.env.SCHEMA || 'my_auth';
    await queryInterface.dropTable({ 
      tableName: 'Spots', 
      schema: schema 
    });
  }
};
