import { mongoUrl } from '../helpers/config';
import models from '../models/index';
import mongoose from 'mongoose';

(async () => {
    (async () => {
        const timeout = 30 * 1000;
        const options = {
            connectTimeoutMS: timeout,
            keepAlive: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        };

        return await mongoose.connect(mongoUrl, options);
    })();

    models(mongoose);

    mongoose.connection.on("error", (err) => {
        console.error("Mongoose connection: error - " + err);
    });

    mongoose.connection.on("connected", () => {
        console.info("Mongoose connection: connected");
    });

    return mongoose;
})();
