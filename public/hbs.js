// hbs.js
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const hbs = require('hbs');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/templates');

let jokesUrl = 'indsæt link til vores cluster her';

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

app.get('/', async (request, response) => {
    try {
        let jokes = await get(jokesUrl);
        response.render('index.hbs', {
            title: 'Jokes',
            jokes
        });
    } catch (e) {
        if (typeof e.message === 'number')
            response.sendStatus(e.message);
        else {
            response.send(e.name + ": " + e.message);
        }
    }
});

app.listen(8080);

console.log('Lytter på port 8080 ...');