const fs = require('fs');
const crypto = require('crypto');

const input = require('./input.json');
const db = require('../db.json');

const output = [];

input.forEach((d, i) => {
	const att = d.attachments[0];
	const emb = d.embeds[0];

	if (att && !db.some(d => d.url == att.proxy_url)) {
		output.push({
			id: crypto.randomUUID().substring(0, 3),
			url: att.proxy_url.split('?')[0],
			type: att.content_type.split('/')[0],
			title: d.id,
		});
	}
	else if (emb && !db.some(d => d.url == emb.url)) {
		output.push({
			id: crypto.randomUUID().substring(0, 3),
			url: emb.url,
			type: emb.type,
			title: d.id,
		});
	}
});

fs.writeFileSync('db2.json', JSON.stringify(output));
console.log('Done', output.length);