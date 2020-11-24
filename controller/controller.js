const jokesSchema = require('../models/jokeschema');

class jokeController {

    constructor() {}

    /**
     * Method to get all jokes
     */
    async getAllJokes() {
        return await jokesSchema.find();
    }

    /**
     * Method to create a joke
     * @param {*} joke to create
     */
    async createJoke(joke) {
        return await jokesSchema.create(joke);
    }

    /**
     * Method to get joke by id
     * @param {*} id to get joke by 
     */
    async getJokeById(id) {
        return await jokesSchema.findOne({_id: id});
    }

    /**
     * Method to delete joke by id
     * @param {*} id to delete joke by
     */
    async deleteJoke(id) {
        return await jokesSchema.findByIdAndDelete({_id: id});
    }
}


module.exports = jokeController = new jokeController();
