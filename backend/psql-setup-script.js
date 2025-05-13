const { sequelize } = require('./db/models');

const schemaName = process.env.SCHEMA || 'my_auth';

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(schemaName)) {
    await sequelize.createSchema(schemaName);
  }
});
