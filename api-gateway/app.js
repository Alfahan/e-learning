require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const mediasRouter = require('./routes/medias');
const orderPaymentsRouter = require('./routes/orderPayments');
const mentorsRoute = require('./routes/mentors');
const refreshTokensRouter = require('./routes/refreshTokens');
const imageCoursesRouter = require('./routes/imageCourses');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');
const webhookRouter = require('./routes/webhooks');

const verifyToken = require('./middlewares/verifyToken');
const can = require('./middlewares/permission');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/chapters', verifyToken, can('admin'), chaptersRouter);
app.use('/lessons', verifyToken, can('admin'), lessonsRouter);
app.use('/medias', verifyToken, can('admin', 'student'), mediasRouter);
app.use('/orders', verifyToken, can('admin', 'student'), orderPaymentsRouter);
app.use('/refresh_tokens', refreshTokensRouter);
app.use('/mentors', verifyToken, can('admin'), mentorsRoute);
app.use('/image-courses', verifyToken, can('admin'), imageCoursesRouter);
app.use('/my-courses', verifyToken, can('admin'), myCoursesRouter);
app.use('/reviews', verifyToken, can('admin', 'student'), reviewsRouter);
app.use('/webhook', webhookRouter);

module.exports = app;
