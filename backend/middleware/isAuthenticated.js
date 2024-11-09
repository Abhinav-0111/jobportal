import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    console.log(req.cookies);
    try {
        const token = req.cookie.token;
        if (!token) {
            return res.status(400).json({ Message: "User not authenticated" });
        }
        const decode = await jwt.verify(token, process.env.SECRETKEY);
        if (!decode) {
            return res.status(400).json({ Message: "Invaild token" });
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};
export default isAuthenticated;
