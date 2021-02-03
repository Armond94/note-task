import path from "path";
import { NoteService } from "../../services";
import { NotFound } from "../../errors";
import { NOT_FOUND, FILE_UPLOAD_PATH } from "../../configs/constants";
import { SUCCESS_CODE } from "../../configs/status-codes";

export class NoteController {
    static async getNotes ({ query, user }, res, next) {
        try {
            const notes = await NoteService.getByQuery(query, user.id);

            return res.status(SUCCESS_CODE).json({ notes });
        } catch (err) {
            next(err);
        }
    }

    static async createNote (req, res, next) {
        try {
            const { title, content, labels } = req.body;

            const note = await NoteService.create({ title, content, labels, owner: req.user.id });

            return res.status(SUCCESS_CODE).json({ note });
        } catch (err) {
            next(err);
        }
    }

    static async updateNote (req, res, next) {
        try {
            let { labels, ...attributes } = req.body;
            const _id = req.params.id;
            const note = await NoteService.getOneByQuery({ _id, owner: req.user.id });

            if (!note) {
                throw new NotFound(NOT_FOUND);
            }

            attributes = NoteService.generateQuery(attributes, labels);
            const result = await NoteService.updateNote({ _id, owner: req.user.id }, attributes);

            return res.status(SUCCESS_CODE).json({ note: result });
        } catch (err) {
            next(err);
        }
    }

    static async deleteNote (req, res, next) {
        try {
            const _id = req.params.id;
            const note = await NoteService.getOneByQuery({ _id, owner: req.user.id });

            if (!note) {
                throw new NotFound(NOT_FOUND);
            }

            await NoteService.delete({ _id, owner: req.user.id })

            return res.status(SUCCESS_CODE).json({ success: true });
        } catch (err) {
            next(err);
        }
    }

    static async uploadImage (req, res, next) {
        try {
            const _id = req.params.id;
            await NoteService.updateNote({ _id, owner: req.user.id },{ $addToSet: { images: req.file.filename }});

            return res.status(SUCCESS_CODE).json({ message: req.file.path });
        } catch (err) {
            next(err)
        }
    }

    static async getImages (req, res, next) {
        try {
            const _id = req.params.id;
            const note = await NoteService.getOneByQuery({ _id, owner: req.user.id });
            const fileName = note.images.find(image => image === req.query.fileName);

            return res.sendFile(path.join(__dirname, FILE_UPLOAD_PATH + fileName));
        } catch (err) {
            next(err)
        }
    }
}
