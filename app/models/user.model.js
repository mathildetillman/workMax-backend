const mongoose = require('mongoose');

const User = mongoose.model(
	'User',
	new mongoose.Schema({
		username: String,
		email: String,
		password: String,
		score: Number
	}, {
    versionKey: false
  })
);

module.exports = User;
