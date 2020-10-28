const db = require('../models');
const User = db.user;

exports.allAccess = (req, res) => {
	res.status(200).send('Public Content.');
};

exports.users = (req, res) => {
	User.find().select('_id username score').exec((err, users) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		} else {
			res.status(200).send(users);
		}
	});
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{
			_id: req.body._id
		},
		{
			score: req.body.score
		},
		{
			new: true
		}
	).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (!user) {
			return res.status(404).send({ message: 'User Not found.' });
		}

		res.status(200).send({
			id: user._id,
			username: user.username,
			email: user.email,
			score: user.score
		});
	});
};
