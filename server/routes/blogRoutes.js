import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlog, getBlogById, getBlogComment, togglePublishBlog } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router()

//blog
blogRouter.post('/add', upload.single('image'), auth, addBlog)
blogRouter.get('/all', getAllBlog)
blogRouter.get('/:blogId', getBlogById)
blogRouter.post('/delete', auth , deleteBlogById)
blogRouter.post('/toggle-publish', auth , togglePublishBlog)

//comment
blogRouter.post('/add-comment' , addComment)
blogRouter.post('/comment' , getBlogComment)

//generate content
blogRouter.post('/generateContent', auth, generateContent)

export default blogRouter;