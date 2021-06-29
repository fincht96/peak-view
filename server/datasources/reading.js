// create a writable datasource

const { DataSource } = require('apollo-datasource');

class ReadingAPI extends DataSource{
    constructor({store}){
        super();
        this.store = store;
    }

    initialize(config){
        this.config = config.context;
    }

    async getReadingByID({readingID}){

    }

    async getAllReadings(){

    }

    async addNewReading({newReading}){


    }

    async deleteReading({reading}){

    }


}


module.exports = ReadingAPI;