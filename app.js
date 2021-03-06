const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const {
  sequelize,
} = require('./db/models');
require('dotenv').config();

const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const selectRouter = require('./routes/select_animal');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  store: new FileStore(),
  name: 'user_sid',
  secret: process.env.SESSION_SECRET || 'test',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressSession(sessionConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);
app.use('/formAnimal', selectRouter);

app.get('/', async (req, res) => {
  res.render('index', {
    isAuthorized: req.session?.isAuthorized,
    name: req.session.user?.name,
  });
});

app.listen(PORT, async () => {
  console.log('Сервер запущен на порту', PORT);

  try {
    await sequelize.authenticate();
    console.log('Подключение к БД успешно');
  } catch {
    console.log('Не получилось подключиться к БД');
  }
});
