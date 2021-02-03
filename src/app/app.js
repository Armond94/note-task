import express from 'express';
import enableModules from './modules';
import errorHandler from './middlewares/errorHandler';

class Application {
    app;
    router;

    constructor() {
        this.app = express();
        this.initApp();
    }
    initApp() {
        this.configApp();
        this.setParams();
        this.setRouter();
        this.enableModules();
        this.setErrorHandler();
    }

    configApp() {
        this.app
            .use(express.json())
            .use(express.urlencoded({ extended: true }))
    }

    setParams() {
        this.app.set('json spaces', 4);
    }

    setRouter() {
        this.router = express.Router();
        this.app.use(`/api`, this.router);
    }

    enableModules() {
        enableModules(this.router);
    }

    setErrorHandler() {
        this.app.use(errorHandler);
    }
}

export default () => new Application().app;
