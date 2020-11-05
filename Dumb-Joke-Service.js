// gruppeDB.js
const { create } = require('domain');
const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Christian:Dinmor123@cluster0.vtauz.mongodb.net/JokesDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,
useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  console.log("is it working")
});

// response.render i stedet for response.send
const JokeSchema = new mongoose.Schema({
    setUp: String,
    punchLine: String,
});
// vi skal connecte til cloud atlas mongo databasen ikke localhost
//mongoose.connect('mongodb://localhost/Dumb-Jokes',
//   { useNewUrlParser: true, useUnifiedTopology: true });

    const Joke = mongoose.model('Joke', JokeSchema);



async function createJoke(setUp, punchLine) {
    return await Joke.create({ setUp, punchLine });
}

async function getJoke(id) {
    return await Joke.findOne().where(id).eq('_id').exec();
}

async function getJokes() {
    return await Joke.find().exec();
}

async function updateJoke(setUp, punchLine) {
    Joke.setUp = setUp;
    Joke.punchLine = punchLine;
    return await Joke.save();
}

async function deleteJoke(Joke) {
    Person.deleteOne().where('_id').eq(Joke._id).exec();
}


async function main() {
    try {
        let joke1 = await createJoke('Jeg overvejer at gifte mig med en tysker', 'er det over grænsen?');
        let joke2 = await createJoke('Hvad kalder man en, som køber og sælger katte?', 'en mishandler');

        console.log(await getJokes());
    
    } catch (e) {
        console.log(e);
    }
    process.exit();
}

main();