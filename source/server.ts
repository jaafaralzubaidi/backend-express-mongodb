import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config';
import logging from './logging';
import userRoutes from './routes/user';




const NAMESPACE = 'Server';
const router = express();

//CORS middleware
const options: cors.CorsOptions = { origin: "http://localhost:3000" };
router.use(cors(options));
// //enable pre-flight
router.options('*', cors(options));



// Connect to Mongo
mongoose.connect(config.mongo.url)
    .then((result) => {
        logging.print(NAMESPACE, "Connected to MongoDB")
    }).catch(error => {
        logging.print(NAMESPACE, error.message, error);
    });


//Middleware: for overtime an API gets called
router.use((request, response, next) => {
    logging.print(NAMESPACE, `Method: ${request.method}, URL: ${request.url}, IP: ${request.socket.remoteAddress} `);

    response.on('finish', () => {
        logging.print(NAMESPACE, `Method: ${request.method}, URL: ${request.url}, IP: ${request.socket.remoteAddress}, Status: ${response.statusCode} `);

    })
    next();
});


//Middleware: to parse the request 
router.use(bodyParser.json());                           // no have to call JSON.parse || JSON.stringify on the react side
router.use(bodyParser.urlencoded({ extended: false }));   // send nested json to API


// MIddleware: Rules of the API
router.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*'); // the request can come from anywhere
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'GET POST PATCH DELETE');
        return response.status(200).json({});
    }
    next();
});

// Routes
router.use('/users', userRoutes);


//Errors: for overtime an API gets called
router.use((request, response, next) => {
    const error = new Error('Not Found! Where do you think you are going?');

    return response.status(404).json({
        message: error.message
    });
    next();
});




const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    logging.print(NAMESPACE, `Server is running on ${config.server.hostname}:${config.server.port}`)
});


