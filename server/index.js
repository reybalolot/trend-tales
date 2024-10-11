import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from "express-session";
import passport from "passport";
import "./utils/passport.js";

//routes
import userRoutes from './routes/user.js';

//configs
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
    origin: '*',
    methods: '*',
    credentials: true,
    optionSuccessStatus: 200
}

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

//mongodb connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

//routes
app.use('/user', userRoutes);
app.get('/', (req, res) => {
    res.send("TrendTales API")
});

//listen to port
app.listen(port, () => {
    console.log(`Server now running on: ${port}`)
});
