const mongoose = require('mongoose');
const fetch = require('node-fetch');


const joke = new mongoose.Schema({
    setup:String,
    punchline:String
});

mongoose.connect('mongodb://localhost/JokeDB',
    { useNewUrlParser: true, useUnifiedTopology: true });
    // test om databasen er tændt
const db = mongoose.connection;
db.on('connection', () => {
    console.log('Databasen er tændt');
});
const jokeUrl ='https://krdo-joke-registry.herokuapp.com/';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Christian:Dinmor123@cluster0.vtauz.mongodb.net/JokesDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,
useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

const Joke = mongoose.model('joke', joke);

async function addJokes() {
    let jokes = await get(jokeUrl);
    let i =0;
    for (jokes.length < i; i++;) {
            await Joke.create({
               setup,
               punchline
            });
        } 
     }

async function main() {
    try {
        await addJokes()
    } catch (e) {
        console.log(e);
    }
    process.exit();
}
//main();