import express from 'express';
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogAdmin, getAllComment, getDashboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router()

adminRouter.post("/login", adminLogin)
adminRouter.get("/allcomment", auth, getAllComment)
adminRouter.get("/allblog", auth, getAllBlogAdmin)
adminRouter.post("/delete-comment", auth, deleteCommentById)
adminRouter.post("/approve-comment", auth, approveCommentById)
adminRouter.get("/dashboard", auth, getDashboard)

export default adminRouter