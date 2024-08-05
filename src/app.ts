import cluster from 'cluster';
import * as os from 'os';
import express from 'express';
import {router} from './routes/index'
import * as bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors'
import helmet from "helmet";
import {connectMongoos} from './db/clients/mondo.client';
import expressListRoutes from 'express-list-routes';
import { corsOptions } from './config/cors.config';
import { globalLimiterOptions } from 'config/globalRateLimiter.config';

const numCPUs = os.cpus().length

const server = () => {
    if (cluster?.isPrimary) {
        console.log(`Master ${process.pid} is running`)
    
        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
    
        cluster.on('exit', (worker) => {
            console.log(`worker ${worker.process.pid} died`)
        });
    } else {
        try {
            const app = express()
            const PORT = process.env.PORT || 4001

            // parse application/x-www-form-urlencoded
            app.use(bodyParser.urlencoded({ extended: false }))

            // parse application/json
            app.use(bodyParser.json())

            // CORS protection
            app.use(cors(corsOptions));

            // For security purposes
            app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

            //serve static files
            app.use('/', express.static(path.join(__dirname, '/public')));

            //rate limiter
            app.use(globalLimiterOptions)

            connectMongoos()

            app.use('/api/v1/user', router)

            // List down all routes in the terminal on startup
            expressListRoutes(app, { prefix: '/' });

            app.listen(PORT, () => {
                console.log(`Worker ${process.pid} started on port ${PORT}`)
            });
        } catch(error) {
            console.log('Error', error)
        }
    }
}

server()
