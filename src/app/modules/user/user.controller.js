import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { UserService } from "../../services";
import { BadRequest, NotFound } from "../../errors"
import { USER_ALREADY_EXISTS, NOT_FOUND, JWT_CONFIGS, EMAIL_NOT_VALID } from "../../configs/constants";
import validateEmail from "../../helpers/util";

export class UserController {

    static async signUp (req, res, next) {
        try {
            const { firstName, lastName, email, password } = req.body;

            const user = await UserService.getByQuery({ email });

            if (user) {
                throw new BadRequest(USER_ALREADY_EXISTS);
            }

            if (!validateEmail(email)) {
                throw new BadRequest(EMAIL_NOT_VALID);
            }

            const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
            const newUser = await UserService.create({ firstName, lastName, email: email.toLowerCase(), password: hashedPass });
            return res.status(200).json(newUser);
        } catch (err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserService.getByQuery({ email });

            if (!user || !user.comparePassword(password)) {
                throw new NotFound(NOT_FOUND);
            }
            const token = jwt.sign({ id: user.id }, JWT_CONFIGS.KEY, { expiresIn: JWT_CONFIGS.TOKEN_LIFE });

            return res.status(200).json({ user, token });
        } catch (err) {
            next(err);
        }
    }
}
