import fs from 'fs'
import imagekit from '../configs/imageKit';
import blog from '../models/blog';

export const addBlog = async (req, res) => {

    try {
        // const {title, subTitle, description, category, isPublished } = req.body.blog 
        // req.body.blog is an object with the blog details

        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog)
        // JSON.parse(req.body.blog) used for convert the string into th bject

        const imageFile = req.file;

        // if all fields are present

        if (!title || !description || !category || !imageFile) {
            return res.json({
                status: false,
                message: "Please fill all the fields",
            })
        }

        const fileBuffer = fs.readFileSync(imageFile.path)
        // fs.readFileSync{} is a node.js module for reading a file
        // imageFile.path is get the path of the local file(picture) uploaded by the user

        // Upload image to imageKit

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        // optimization throught imageKit URL transformation

        const optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto" }, // auto quality and compression
                { format: "webp" }, // Convert to modern format
                { width: "1280" } // Width resizing
            ]
        })

        const image = optimizedImageURL;

        await blog.create({
            title, subTitle, category, description, image, isPublished
        })

        res.json({
            status: true,
            message: "Blog created successfully",
        })


    } catch (error) {
        res.json({
            status : false,
            message : error.message
        })
    }
} 