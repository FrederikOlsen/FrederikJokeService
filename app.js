const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');  
const cors = require('cors');
const bodyParser = require('body-parser');
const port =  process.env.PORT||5500;
const app = express();
const hbs = require('hbs');
const jokesRouter = require('./router/jokerouter');
const handlebars = require('express-handlebars');
const jokesController = require('./controller/controller');


app.set('view engine', 'hbs');
app.set('views', __dirname + '/public');
let jokesUrl = 'indsæt link til vores cluster her';

app.use('/api', jokesRouter);

// app.use(express.static(__dirname + '../FrontEnd/jokeservices.html'));



app.use(express.static(__dirname+'public'));
app.use(cors());
app.use(express.json());


/* Mongoose connection */
const MONGODB_URI = 'mongodb+srv://fred:admin@dumb-jokes-services.woyzv.mongodb.net/test';
mongoose.connect(MONGODB_URI || 'mongodb://localhost/JokeDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
const db = mongoose.connection;
db.on('connected', () => {
    console.log('mongoose is connected!');
});

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

fetch("https://krdo-joke-registry.herokuapp.com/api/services",
 {form:{name:"dumbjokeservice", address:"https://dumbjokeservice.herokuapp.com/",
  secret:"123"}});


app.listen(port, () => {
    console.log('app is listening on port: ' + `${port}`);
});
