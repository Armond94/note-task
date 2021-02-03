require('dotenv').config();
import env from 'env-var';
import { DEFAULT_PORT, DEFAULT_MONGO_URL } from "../configs/constants";

export const apiPort = env.get('PORT').asString() || DEFAULT_PORT;
export const mongoUrl = env.get('MONGODB_URI').asString() || DEFAULT_MONGO_URL;

