const express = require('express');
const fetch = require('node-fetch');
 const mongoose = require('mongoose'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const port =  process.env.PORT||5500;
const app = express();
const hbs = require('hbs');
const request = require('request');


fetch("https://krdo-joke-registry.herokuapp.com/api/services",
 {form:{name:"dumbjokeservice", address:"https://dumbjokeservice.herokuapp.com/",
  secret:"999"}});

app.set('view engine', 'hbs');
app.set('views', __dirname + '/public');
let jokesUrl = 'https://cloud.mongodb.com/v2/5f9a95b038b13109adf71659#clusters/detail/dumb-jokes-services';

async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200) // OK
      throw new Error(respons.status);
  return await respons.json();
}


app.use(express.static(__dirname+'/public'));
app.use(cors());
app.use(express.json());

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



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Fred:admin@dumb-jokes-services.woyzv.mongodb.net/test"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


mongoose.connect('mongodb://localhost/JokeDB', { useNewUrlParser: true, useUnifiedTopology: true });
// test om databasen er tændt
const db = mongoose.connection;
db.on('connection', () => {
    console.log('Databasen er tændt');
});

/**
async function main() {
}
main();

// new shit 
const connect = require("connect");
const applet = connect().use(connect.static(__dirname + '/FrontEnd'));
*/

app.listen(port, () => {
    console.log('app is listening on port: ' + `${port}`);
});
