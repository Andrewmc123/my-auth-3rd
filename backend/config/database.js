module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    schema: process.env.SCHEMA || 'my_auth',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    seederStorage: 'sequelize',
    logQueryParameters: true,
    typeValidation: true
  }
};