import jwt from 'jsonwebtoken';

import { UserService } from '../services';

import { JWT_CONFIGS } from "../configs/constants";
import { AuthError } from '../errors';

export default async (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').split(' ')[1];

        if (!token) {
            throw new AuthError('please provide token !');
        }

        const decoded = jwt.verify(token, JWT_CONFIGS.KEY);
        if (!decoded) {
            new AuthError('invalid token !');
        }

        // TODO passport-js
        req.user = await UserService.getByQuery({ _id: decoded.id }, { password: 0 });
        next();
    } catch (err) {
        return res.status(401).send(err.message);
    }
};
