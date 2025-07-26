import jwt from 'jsonwebtoken'
import blog from '../models/blog.js'
import comment from '../models/comment.js'

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: 'Invalid email or password',
            })
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET)
        
        return res.json({
            
            success: true,
            
            token
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getAllBlogAdmin = async (req, res) => {
    try {

        const blogs = await blog.find({}).sort({
            createdAt: -1
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

export const getAllComment = async (req, res) => {
    try {
        const comments = await comment.find({}).populate("blog").sort({
            createdAt: -1
        })

        /*{
            "_id": "xyzid",            (without populate)
            "content": "Nice post!",
            "blog": "6541482326595962324461", => blogId only
            "createdAt": "time"
        }*/

        /*{
            "_id": "xyzid",              (with populate)
            "content": "Nice post!",      
            "blog": {                 

                "_id": "6681902a3fd13472b8c5b7f5",   (blogId with all blog bkz we do reference of blog model in comment model)

                "title": "xyz",
                "author": "Aayush",
                "createdAt": "blogCreateTime"
            },
            "createdAt": "commentCreateTime"
        }*/


        res.json({
            success: true,
            comments
        })


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


export const getDashboard = async (req, res) => {
    try {

        const recentBlog = await blog.find({}).sort({
            createdAt: -1
        }).limit(5)

        const blogsCount = await blog.countDocuments()
        const commentCount = await comment.countDocuments()
        const draftsCount = await blog.countDocuments({
            isPublished: false
        })

        const dashboarddata = {
            recentBlog, commentCount, draftsCount, blogsCount
        }

        res.json({
            success: true,
            dashboarddata
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await comment.findByIdAndDelete(id)

        res.json({
            success: true,
            message: "Comment deleted successfully!!"
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        await comment.findByIdAndUpdate(id, {
            isApproved: true
        })

        res.json({
            success: true,
            message: "Comment approved successfully!!"
        })

    } catch (error) {
        res.json({ 
            success: false,
            message: error.message
        })
    }
}