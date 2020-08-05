const express = require('express');
const moongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

moongoose.connect('mongodb://localhost/urlShortner', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async function(req, res) {
	const shortUrls = await ShortUrl.find();
	res.render('index', { shortUrls: shortUrls });
});

app.post('/shortUrls', async function(req, res) {
	await ShortUrl.create({
		full: req.body.fullURL
	});
	res.redirect('/');
});

app.get('/:shortUrl', async function(req, res) {
	// when we click on the short URL on the table. GET when there is anything ahead of / using req.params. property
	const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl }); //find one based on short property of the schema where short property is req.params.shortUrl

	if (shortUrl == null) {
		// when the shortUrl is not found then
		return res.sendStatus(404);
	}
	shortUrl.clicks++; // increment the value of clicks
	shortUrl.save(); // save in database

	res.redirect(shortUrl.full); // redirect to the full URL using the the found short link
});

app.listen(process.env.PORT || 5000, function() {
	console.log('Server has started !!');
});
