require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

/** Подключение к БД */
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
