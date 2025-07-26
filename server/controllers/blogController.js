import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import blog from '../models/blog.js';
import comment from '../models/comment.js';

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
                success: false,
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
            success: true,
            message: "Blog created successfully",
        })


    } 
    catch (error) {
       console.log(error)
        res.json({

            success: false,
            message: error.message
        })
    }
}



export const getAllBlog = async (req, res) => {


    try {

        const blogs = await blog.find({
            isPublished: true
        })

        res.json({
            success: true,
            blogs
        })

    } catch (error) {

        res.json({
            success: false,
            message: error.message
        })
    }
}


export const getBlogById = async (req, res) => {
    try {
       
        const { blogId } = req.params
        const blogs = await blog.findById(blogId)

        if (!blogs) {
              
            return res.json({
                success: false,
                message: "Blog not found"
               
            })
        }
        res.json({
            success: true,
            blogs
        })

    } catch (error) {
        
        res.json({
            status: false,
            message: error.message
        })
    }
}



export const deleteBlogById = async (req, res) => {
    try {

        const { id } = req.body

        await blog.findByIdAndDelete(id)

        //delete all comment associated with this blog
        await comment.deleteMany({blog : id})

        res.json({
            status: true,
            message: "Blog deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.json({
            status: false,
            message: error.message
        })
    }
}

export const togglePublishBlog = async (req, res) => {
    try {
        const { id } = req.body;

        const blogs = await blog.findById(id)
        blogs.isPublished = !blogs.isPublished

        await blogs.save();

        res.json({
            success: true,
            message: "Blog status updated successfully"
        })


    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}


//Comment

export const addComment = async (req, res) => {
    try {
        const { blog, content, name } = req.body;

        await comment.create({
            blog, content, name
        })

        res.json({
            success: true,
            message: "Comment added successfully"
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
export const getBlogComment = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await comment.find({
            blog: blogId, // blog field of commnet model => contain the blogId passed from req.body
            isApproved: true
        }).sort({
            createdAt: -1 // -1 for newly comment and 1 for old comment
        })

        res.json({
            success: true,
            comments
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}