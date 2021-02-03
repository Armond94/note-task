import User from './user';
import Note from './notes';

export default function initModels(mongoose) {
    User(mongoose);
    Note(mongoose);
}
