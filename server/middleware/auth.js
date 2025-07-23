import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        

        console.log("Token:", token);
        
        jwt.verify(token, process.env.JWT_SECRET)
        next()


    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export default auth