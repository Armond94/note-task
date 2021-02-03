import { Router } from 'express';
import noteEndpoints from './endpoints';

export default class UserModule {
    apiRouter;
    router;

    constructor (apiRouter) {
        this.apiRouter = apiRouter;
        this.router = Router();
    }

    createEndpoints() {
        this.assignRouter();
        this.assignEndpoints();
    }

    assignRouter() {
        this.apiRouter.use('/notes', this.router);
    }

    assignEndpoints() {
        noteEndpoints(this.router);
    }
}
