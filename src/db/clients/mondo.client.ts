// db.ts
import mongoose from 'mongoose';
import { getEnvVar } from '../../utils/common.utils';

const MONGO_URI = getEnvVar('MONGO_URI')

export function connectMongoos() {
    mongoose.connect(MONGO_URI, {});

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error(err);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}