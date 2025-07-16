import multer from "multer";

const upload = multer({
    // multer is an NPM package that handles files (like images, pdf) sent through form-data in Express.js applications.
    storage: multer.diskStorage({})
})

export default upload;