import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
// import dns from 'dns'

// dns.setServers(['8.8.8.8', '1.1.1.1'])


dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => console.log(`Server running on localhost:${port}`));