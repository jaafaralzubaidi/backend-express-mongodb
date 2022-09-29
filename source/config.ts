import dotenv from 'dotenv';

dotenv.config(); // loads the environment variables


const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};


const MONGO_USERNAME = process.env.DATABASE_NAME || 'AtlasDB';
const MONGO_PASSWORD = process.env.MONGO_USERNAME || '1234';
const MONGO_DATABASE_NAME = 'UserDB'
// const DATABASE_URL  = process.env.DATABASE_URL || `cluster0.r5sncz6.mongodb.net/`;
// const DATABASE_URL  = process.env.DATABASE_URL || `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.r5sncz6.mongodb.net/${MONGO_DATABASE_NAME}`
const DATABASE_URL  = process.env.DATABASE_URL || 'mongodb://nodejs-mongodb-server:a0vM1Dm9vDD3wB7YXKFmx0unmLYEusqEydeJe095qvO3rqRhRlOaaKRNGDWWoH8c3MNdLA8ApyRogdArRf9wIg==@nodejs-mongodb-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@nodejs-mongodb-server'


const MONGO = {
    // host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    databaseName: MONGO_DATABASE_NAME,
    // url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}${MONGO_DATABASE_NAME}`
    url: DATABASE_URL
};



const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const config = {
    mongo: MONGO,
    server: SERVER
}

export default config;