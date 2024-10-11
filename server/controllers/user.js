import User from "../models/user.js";
import bcrypt from "bcrypt";
import errorHandler from "../utils/errorHandler.js";
import { createAccessToken } from "../utils/auth.js";

const registerUser = (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        //validation
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)){
            return res.status(400).send({ error: 'Invalid name format'});
        }
        if (!emailRegex.test(email)) {
            return res.status(400).send({ error: 'Invalid Email' });
        }
        if (password.length < 8) {
            return res.status(400).send({ error: 'Password must be at least 8 characters' });
        }

        //check if email already exists
        User.find({ email: email })
        .then(user => {
            if (user.length !== 0) {
                return res.status(400).send({ message: 'Email already exists' });
            }
            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: bcrypt.hashSync(password, 10),
            });

            //save user otherwise
            return newUser.save()
            .then(() => {
                res.status(201).send({ message: 'Registered successfully' });
            })
            .catch(error => errorHandler(error, req, res));
        })
        .catch(error => errorHandler(error, req, res));

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid Email' });
        }

        //check email
        User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(404).send({ error: 'No Email Found' });
            } else if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).send({ error: 'Email and password do not match' });
            } else {
                res.status(200).send({
                    token: createAccessToken(user)
                });
            }
        })
        .catch(error => errorHandler(error, req, res));
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const getUserDetails = (req, res) => {
    try {
        const userId = req.user.id;

        //do not return password, isAdmin
        User.findById(userId, { password: 0, isAdmin: 0 })
        .then(user => {
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            } else {
                return res.status(200).json({ user: user });
            }
        })
        .catch(error => errorHandler(error, req, res));
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const updateUserPassword = (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;


        User.findById(userId)
        .then(user => {

            //check if old and new are the same
            if (!bcrypt.compareSync(oldPassword, user.password)) {
                return res.status(401).send({ error: 'Password do not match' });
            }
            //update password
            return User.findByIdAndUpdate(
                userId,
                { password: bcrypt.hashSync(newPassword, 10) },
                { new: true }
            )
            .then(user => {
                res.status(200).json({
                    message: 'Updated password successfully',
                    user: user
                });
            })
            .catch(error => errorHandler(error, req, res));
        })
        .catch(error => errorHandler(error, req, res));
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

const logoutUser = (req, res) => {
    try {
        //destroy session
        req.session.destroy((err) => {
            if (error) {
                res.status(500).send({
                    message:'Error while destroying session:',
                    error: error
                });
            } else {
                req.logout(() => {
                    res.redirect('/');
                });
            }
        });


    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

//admin
const setUserAdmin = (req, res) => {
    try {
        const userId = req.params.userId;
        const setAdmin = { isAdmin: true };

        User.findByIdAndUpdate(userId, setAdmin, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({ error: 'User not found' })
            } else {
                return res.status(200).json({
                    message: 'User set to admin',
                    user: user
                })
            }
        })
        .catch(error => errorHandler(error, req, res));

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}


export default { registerUser, loginUser, getUserDetails, updateUserPassword, logoutUser, setUserAdmin }
