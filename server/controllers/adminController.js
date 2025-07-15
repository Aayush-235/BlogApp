import jwt from 'jsonwebtoken'

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({
                status: false,
                message: 'Invalid email or password',
            })
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({
            status: true,
            token
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}