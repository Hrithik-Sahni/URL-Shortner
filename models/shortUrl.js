const mongoose = require('mongoose');
const shortId = require('shortid'); // this has a single function generate

const shortUrlSchema = new mongoose.Schema({
	full: {
		type: String,
		require: true
	},
	short: {
		type: String,
		required: true,
		default: shortId.generate //it is a function to generate unique id automatically run and generates
	},
	clicks: {
		type: Number,
		required: true,
		default: 0
	}
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
