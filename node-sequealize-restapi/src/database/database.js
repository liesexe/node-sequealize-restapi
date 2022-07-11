import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
    'projectsdb',
    'postgres',
    'mysecretpassword',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);