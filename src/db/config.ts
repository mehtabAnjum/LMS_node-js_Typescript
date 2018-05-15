import Sequelize from 'sequelize';

const db = new Sequelize('lms', '', '', {
/*
    host: 'localhost',
*/
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 1,
        idle: 15000
    },
    storage:'./data.db'
});

export {db}
