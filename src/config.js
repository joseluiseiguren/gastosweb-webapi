const env = process.env.NODE_ENV; // 'dev' or 'production'

const dev = {
    app: {
        port: process.env.DEV_APP_PORT,
        expiraciontoken: process.env.DEV_EXPIRACION_TOKEN,
        intentosfallidoslogin: process.env.DEV_INTENTOS_FALLIDOS_LOGIN
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

const production = {
    app: {
        port: process.env.PROD_APP_PORT,
        expiraciontoken: process.env.PROD_EXPIRACION_TOKEN,
        intentosfallidoslogin: process.env.PROD_INTENTOS_FALLIDOS_LOGIN
    },
    db: {
        host: process.env.PROD_DB_HOST,
        port: process.env.PROD_DB_PORT,
        database: process.env.PROD_DB_NAME,
        user: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PASSWORD
    },
    secrethash: 
    { 
        key: process.env.PROD_SECRETHASH
    }
};

const config = {
 dev,
 production
};

module.exports = config[env];
