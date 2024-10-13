import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createAccessToken = (user) => {
    try {
        const data = {
            id: user._id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin
        };
        return jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "12h"});
    } catch (error) {
        res.status(500).json({
            error: 'token creation failed',
            message: error.message
        });
    }
}

export const verifyUser = (req, res, next) => {
    try {
        const userToken = req.headers.authorization;

        if (typeof userToken === 'undefined') {
            return res.status(401).send({ auth: 'no token' });
        } else {
            const encryptedToken = userToken.slice(7, userToken.length);

            jwt.verify(encryptedToken, process.env.JWT_SECRET_KEY, (error, decodedToken) => {
                if (error) {
                    return res.status(403).send({
                        error: 'unauthorized',
                        message: error.message
                    });
                } else {
                    req.user = decodedToken;
                    next();
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
}

export const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({
            error: 'unauthorized',
            message: 'action forbidden'
        });
    }
};
