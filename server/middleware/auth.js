import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing or malformed"
            });
        }

        const token = authHeader.split(" ")[1]; 
        
        jwt.verify(token, process.env.JWT_SECRET)
        next();


    } catch (error) {
        console.log(error.message)
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export default auth