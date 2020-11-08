const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port =  process.env.PORT||5500;
const app = express();
const hbs = require('hbs');
const { text } = require('body-parser');

//fetch / post
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


//Mongoose connection________________________________________________________________________________________________________________________
const MONGODB_URI = 'mongodb+srv://fred:admin@dumb-jokes-services.woyzv.mongodb.net/test';
mongoose.connect(MONGODB_URI || 'mongodb://localhost/JokeDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
const db = mongoose.connection;
db.on('connected', () => {
    console.log('mongoose is connected!');
});

//Schema
const Schema = mongoose.Schema;
const JokeSchema = new Schema( {
    setUp: String,
    punchLine: String 
});

//Model
const Joke = mongoose.model('Joke', JokeSchema);

//Saving data to our mongo database
const data = {
    setUp: 'setup test 2',
    punchLine: 'punchline test 2'
};

const newJoke = new Joke(data); //instance of the model

//routes
app.get('/api', (req, res) => {

    Joke.find({ })
    .then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('Error: ', error);
    });

});

function setDefaultJoke() {
    let defaultJokeSetUp = document.getElementById('currentJokeSetUp');
    let defaultJokePunchLine = document.getElementById('currentPunchLine');
    defaultJokeSetUp.textContent = "Hvad kalder man også en som køber og sælger katte?"; //  <--- her ville vi gerne have indsat daten fra vores database frem for denne tekststreng (m. random number generator)
    defaultJokePunchLine.textContent = "En mishandler"; //  <--- her ville vi gerne have indsat daten fra vores database frem for denne tekststreng (m. random number generator)
}


function tellJoke() {
    let defaultJokeSetUp = document.getElementById('currentJokeSetUp');
    let defaultJokePunchLine = document.getElementById('currentPunchLine');
    defaultJokeSetUp.textContent = "Hvad kalder man en kamel med tre pukler?"; //  <--- her ville vi gerne have indsat daten fra vores database frem for denne tekststreng
    defaultJokePunchLine.textContent = "Gravid"; //  <--- her ville vi gerne have indsat daten fra vores database frem for denne tekststreng
}

app.listen(port, () => {
    console.log('app is listening on port: ' + `${port}`);
});
