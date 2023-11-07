import express from 'express';
import { AppRoutes } from './routes/routes';
import path from 'path';
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json()); // raw json
app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded

// Public Folder
app.use(express.static('../public'));

app.use(AppRoutes.routes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(3000, () => {
    console.info(`Server listening on port ${3000}`);
});