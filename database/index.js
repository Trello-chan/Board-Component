import Sequelize from 'sequelize';

let SQL_connection;

if (process.env.ENV === "production") {
  console.log(`there's a DATABASE`);
  SQL_connection = new Sequelize(process.env.DB_NAME, process.env.USER, process.env.PASSWORD, {
    host: process.env.DATABASE,
    port: 5432,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: 'postgres',
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    define: {
      timestamps: false
    },
    language: 'en'
  })

} else {
  console.log('no process.env.DATABASE');
  SQL_connection = new Sequelize('trello_board', process.env.USERNAME || 'root', process.env.PW || '', {
    host: process.env.host || 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      handleDisconnects: true,
    },
    define: {
      timestamps: false
    }
  })
}

SQL_connection
  .authenticate()
  .then(() => console.log('SQL DB connected!!'))
  .catch(err => console.error('SQL DB error: ', err));

export default SQL_connection;