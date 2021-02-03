import { UserController } from './user.controller';

export default (router) => {
    router.post('/signup', UserController.signUp);
    router.post('/login', UserController.login);
};
