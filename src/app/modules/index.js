import UserRouter from './user';
import NoteRouter from './note';

export default async(router) => {
    const User = new UserRouter(router);
    const Note = new NoteRouter(router);
    User.createEndpoints();
    Note.createEndpoints();
};
