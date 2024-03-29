require('dotenv').config();

const fs = require('fs');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
	const media = getMedia();
	res.render('index', { media });
});

app.get('/random', (req, res) => {
	const media = getMedia();
	const randomMedia = media[Math.floor(Math.random() * media.length)];

	res.redirect(`/v/${randomMedia.id}`);
});

app.get('/v/:id', (req, res) => {
	const { id } = req.params;
	const media = getMedia().find(m => m.id == id);
	res.render('view', { media });
});

app.use((req, res, next) => {
	res.status(404).render('404');
});

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});


function getMedia() {
	return JSON.parse(fs.readFileSync('db.json'));
}
