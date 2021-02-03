import { NoteController } from './note.controller';
import authMiddlewares from "../../middlewares/authMiddlewares";
import { Upload } from "../../helpers/util";

export default (router) => {
    router.get("", authMiddlewares, NoteController.getNotes);
    router.get("/:id/images", authMiddlewares, NoteController.getImages);
    router.post("", authMiddlewares, NoteController.createNote);
    router.post("/:id/images", authMiddlewares, Upload.single("image"), NoteController.uploadImage);
    router.patch("/:id", authMiddlewares, NoteController.updateNote);
    router.delete("/:id", authMiddlewares, NoteController.deleteNote);
};
