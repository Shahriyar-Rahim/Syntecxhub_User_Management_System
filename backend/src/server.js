import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.config.js';
import userRoutes from './routes/user.routes.js';
// import dns from 'dns'

// dns.setServers(['8.8.8.8', '1.1.1.1'])


dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// use rutes here
app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`Server running on localhost:${port}`));

process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
});

// This handles Nodemon restarts specifically
process.on('SIGUSR2', async () => {
    await mongoose.connection.close();
    console.log('MongoDB closed for Nodemon restart.');
    process.kill(process.pid, 'SIGUSR2');
});