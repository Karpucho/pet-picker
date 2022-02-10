const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const {
  sequelize,
} = require('./db/models');

// const { Sound, User } = require('./db/models');

const registrationRouter = require('./routes/registration');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
// const profileRouter = require('./routes/profile');
const soundRouter = require('./routes/select_animal');

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
// app.use('/profile', profileRouter);
app.use('/formAnimal', soundRouter);

app.get('/', async (req, res) => {
  // const soundsAll = await Sound.findAll({
  //   include: User,
  // });
  res.render('index', {
    isAuthorized: req.session?.isAuthorized,
    name: req.session.user?.name,
    // soundsAll,
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
