import express from 'express';
import morgan from 'morgan';
import bodyparser from 'body-parser';
import {v1Routes} from './v1';
import * as path from 'path';

const app = express();
app.use(bodyparser.json());
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));

app.get('/ping', (req, res) => res.json({message: 'pong'}));

app.use('/', v1Routes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Up and running on port ${port} 🚀`);
});
