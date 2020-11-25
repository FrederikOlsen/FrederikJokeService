const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');  
const cors = require('cors');
const bodyParser = require('body-parser');
const port =  process.env.PORT||5500;
const hbs = require('hbs');
const jokesRouter = require('./router/jokerouter');
const handlebars = require('express-handlebars');
const jokesController = require('./controller/controller');
const app = express();

app.set('view engine', 'hbs');
app.set('views','./jokeservice/views');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/',
    defaultLayout: 'index',
    extname: 'hbs',
}));

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




//app.use('/api', jokesRouter);



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
/** 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
*/

app.get('/', (req, res) => {
    res.render('main', {layout: 'index', listExists: true});
});
/** 
fetch("https://krdo-joke-registry.herokuapp.com/api/services",
 {form:{name:"dumbjokeservice", address:"https://dumbjokeservice.herokuapp.com/",
  secret:"123"}});
*/

app.listen(port, () => {
    console.log('app is listening on port: ' + `${port}`);
});

module.exports.app = app;