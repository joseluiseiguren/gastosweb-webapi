const env = process.env.NODE_ENV; // 'dev' or 'prod'

const dev = {
    app: {
        port: process.env.DEV_APP_PORT
    },
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        database: process.env.DEV_DB_NAME,
        user: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD
    },
    secrethash: { 
        key: process.env.DEV_SECRETHASH
    }
};

const prod = {
    app: {
        port: 3306
    },
    db: {
        host: process.env.PROD_DB_HOST,
        port: 27017,
        database: 'test',
        user: 'controlgastos',
        password: 'admin'
    },
    secrethash: 
    { 
        key: 'ilovescotchyscotch'
    }
};

const config = {
 dev,
 prod
};

module.exports = config[env];
