const { PORT, DB } = require('./config.json');

const fs = require('fs');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
	const videos = getVideos();
	res.render('index', { videos });
});

app.post('/upload', (req, res) => {
	const { id, url } = req.body;

	/* const json = JSON.parse(fs.readFileSync(DB));
	json[id] = url;

	fs.writeFileSync(DB, JSON.stringify(json)); */

	res.send('Hello World!');
});

app.get('/upload', (req, res) => {
	res.render('upload', { data: 123 });
});

app.get('/random', (req, res) => {
	const videos = getVideos();
	const randomVideo = videos[Math.floor(Math.random() * videos.length)];

	res.redirect(`/v/${randomVideo.id}`);
});

app.get('/v/:id', (req, res) => {
	if (req.query.size) {
		const ip = req.socket.remoteAddress;
		console.log(ip);
	}

	const { id } = req.params;
	const video = getVideos().find(m => m.id == id);
	res.render('view', { video });
});

app.use((req, res, next) => {
	res.status(404).render('404');
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});


function getVideos() {
	return JSON.parse(fs.readFileSync(DB));
}