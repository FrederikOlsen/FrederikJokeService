const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5500;

const app = express();
app.use(express.static(__dirname + '/FrontEnd'));
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost/JokeDB', { useNewUrlParser: true, useUnifiedTopology: true });
// test om databasen er tændt
const db = mongoose.connection;
db.on('connection', () => {
    console.log('Databasen er tændt');
});


async function main() {

}

main();



app.listen(port, () => {
    console.log('app is listening on port: ' + `${port}`);
});
