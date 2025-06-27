// I believe this code is setting up our database configuration
// one for development and one for production

const config = require('./index');

module.exports = {
  // This is the development configuration
  // It uses sqLite (a simple file-based database) for development
  // It logs all database queries and validates types for debugging
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  
  // This is the production configuration
  // It uses PostgreSQL (a more powerful database) for production
  // It uses SSL for secure connections and defines a specific schema
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};