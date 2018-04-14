const env = process.env.NODE_ENV; // 'dev' or 'production'

const dev = {
    app: {
        port: process.env.DEV_APP_PORT,
        expiraciontoken: process.env.DEV_EXPIRACION_TOKEN,
        intentosfallidoslogin: process.env.DEV_INTENTOS_FALLIDOS_LOGIN
    },
    secrethash: { 
        key: process.env.DEV_SECRETHASH
    },
    db: {
        strconexion: process.env.DEV_DBMONGO
    }
};

const production = {
    app: {
        port: process.env.PROD_APP_PORT,
        expiraciontoken: process.env.PROD_EXPIRACION_TOKEN,
        intentosfallidoslogin: process.env.PROD_INTENTOS_FALLIDOS_LOGIN
    },
    secrethash: 
    { 
        key: process.env.PROD_SECRETHASH
    },
    db: {
        strconexion: process.env.PROD_DBMONGO
    }
};

const config = {
 dev,
 production
};

module.exports = config[env];
