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

request.post("https://krdo-joke-registry.herokuapp.com/api/services",
 {form:{name:"dumbjokeservice", address:"https://dumbjokeservice.herokuapp.com/",
  secret:"123"}});



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Christian:Dinmor123@cluster0.vtauz.mongodb.net/JokeDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
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


async function main() {

}

main();



app.listen(port, () => {
    console.log('app is listening on port: ' + `${port}`);
});
