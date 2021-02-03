require('dotenv').config();
import env from 'env-var';

export const apiPort = env.get('PORT').asString();
export const mongoUrl = env.get('MONGODB_URI').asString();

