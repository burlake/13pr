// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: { // у пользователя есть occupation — опишем требования в схеме:
    type: String,
    required: true, // оно должно быть у каждого пользователя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  avatar: { // у пользователя есть avatar — опишем требования в схеме:
    type: String,
    required: true, // оно должно быть у каждого пользователя — обязательное поле
    validate: {
      validator (v) {
        return //.test(v);
      },
      message: 'Введите URL',
    },
  },
}, {versionKey: false});

module.exports = mongoose.model('user', userSchema);