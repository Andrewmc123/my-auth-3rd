'use strict';

let options = { 
  //  options for the Spots table
 };
 if (process.env.NODE_ENV === 'production') {
   options.schema = process.env.SCHEMA;  
 }

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log('Current Environment:', process.env.NODE_ENV);
      console.log('Current Schema:', options.schema);
      console.log('Database URL:', process.env.DATABASE_URL);

      
      await queryInterface.dropTable('Spots', { cascade: true }).catch(() => {});

      await queryInterface.createTable('Spots', {
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
            model: 'User', 
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
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, options);

      console.log('Spots table created successfully');
    } catch (error) {
      console.error('CRITICAL ERROR in Spots table migration', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        environment: process.env.NODE_ENV,
        schema: options.schema,
        databaseUrl: process.env.DATABASE_URL
      });
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.dropTable(options);
  }
};