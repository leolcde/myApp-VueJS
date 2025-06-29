import jwt from 'jsonwebtoken'
const secret = process.env.SECRET;

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send({ msg: "Token is not valid" });
    }
};

export default verifyToken;
