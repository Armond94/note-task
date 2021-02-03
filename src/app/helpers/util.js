import multer from "multer";
import path from "path";
import fs from "fs";
const dir = '';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync("./uploads")){
            fs.mkdirSync("./uploads");
        }
        cb(null, 'uploads');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

export const Upload = multer({ storage, fileFilter });

export default function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
