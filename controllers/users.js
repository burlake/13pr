const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  if (req.params.userId.length === 24) {
    User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({message: 'Произошла ошибка. Пользователь с id не найден'});
        return;
      }
      res.send(user);
    })
    .catch(() => res.status(404).send({message: 'Произошла ошибка. Пользователь с id не найден'}));
  } else {
    res.status(400).send({message: 'Произошла ошибка. id некорректный'});
  }
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user)) // возвращаем записанные в базу данные пользователю
    .catch((err) => { // если данные не записались, вернём ошибку
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.editUserData = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate (req.user._id, { name, about }, { new: 'true', runValidators: true})
    .then ((user) => res.send(user))
    .catch ((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send ({ message: err.message });
      } else {
        res.status(404).send ({message: 'Произошла ошибка. Пользователь с id не найден'});
      }
    });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports.editUserAvatar = (req, res) => {
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar}, {new: 'true', runValidators: true})
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send ({message: err.message});
      } else {
        res.status(404).send ({ message: 'Произошла ошибка. Пользователь с id не найден' });
      }
    });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};