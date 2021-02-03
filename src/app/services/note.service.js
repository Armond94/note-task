import mongoose from 'mongoose';
const Note = mongoose.model('Note');

export class NoteService {

    constructor() { }

    static async getByQuery (options, owner) {
        // TODO pagination
        const query = {
            owner
        };
        if (options.labels) {
            query.labels = { $in: options.labels.split(",") }
        }
        return Note.find(query);
    }

    static async getOneByQuery (query) {
        return Note.findOne(query);
    }

    static async create (note) {
        return Note.create(note);
    }

    static async updateNote (query, attributes) {
        const options = { new: true };

        return Note.findOneAndUpdate(query, attributes, options);
    }

    static async delete (query) {
        Note.deleteOne(query);
    }

    static generateQuery (query, labels) {
        if (labels && labels.add) {
            query.$addToSet = { labels: labels.fields };
        }
        if (labels && labels.remove) {
            query.$pull = { labels: labels.fields };
        }
        return query;
    }
}
