import cluster from 'cluster';
import * as os from 'os';
import express from 'express';
import {router} from './routes/index'
import * as bodyParser from 'body-parser';
import {connectMongoos} from './db/clients/mondo.client';

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
    
            connectMongoos()

            app.use('/user/api/v1', router)
    
            app.listen(PORT, () => {
                console.log(`Worker ${process.pid} started on port ${PORT}`)
            });
        } catch(error) {
            console.log('Error', error)
        }
    }
}

server()
