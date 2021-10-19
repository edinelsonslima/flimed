import express from 'express';
import dotenv from 'dotenv';
import { routes } from './src/routes';
import { connectMongodb } from './src/config/mongo.config';

dotenv.config();
const app = express();
const port = process.env.PORT || 8980;

connectMongodb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
    console.log(`SERVER is running in port ${port}`);
});
