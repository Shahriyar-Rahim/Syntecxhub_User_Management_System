import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.config.js';
// import dns from 'dns'

// dns.setServers(['8.8.8.8', '1.1.1.1'])


dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

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