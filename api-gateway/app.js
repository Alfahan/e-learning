require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const chaptersRouter = require('./routes/chapters');
const mediasRouter = require('./routes/medias');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const mentorsRoute = require('./routes/mentors');
const refreshTokensRouter = require('./routes/refreshTokens');

const verifyToken = require('./middlewares/verifyToken');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chapters', verifyToken, chaptersRouter);
app.use('/courses', coursesRouter);
app.use('/medias', verifyToken, mediasRouter);
app.use('/orders', verifyToken, ordersRouter);
app.use('/payments', verifyToken, paymentsRouter);
app.use('/refresh_tokens', refreshTokensRouter);
app.use('/mentors', verifyToken, mentorsRoute);

module.exports = app;
