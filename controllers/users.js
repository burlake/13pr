const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUsersById = (req, res) => {
  if (req.params.userId.length === 24) {
    User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({message: 'Произошла ошибка. Пользователь с ID не найден'});
        return;
      }
      res.send(user);
    })
    .catch(() => res.status(404).send({message: 'Произошла ошибка. Пользователь с ID не найден'}));
  } else {
    res.status(400).send({message: 'Произошла ошибка. ID некорректный'});
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
