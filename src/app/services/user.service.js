import mongoose from 'mongoose';
const User = mongoose.model('User');


export class UserService {

    constructor() { }

    static async getByQuery (query, options = {}) {
        return User.findOne(query, options);
    }

    static async create(user) {
        return User.create(user);
    }
}
