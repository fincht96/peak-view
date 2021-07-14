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

    async getReadingByID({id}){
        const found = await this.store.pefReadings.findAll({
          where: { id },
        });

        if(found.length){
            console.log(found[0])
            return found[0];
        }
        
        return {};
    }

    async getAllReadings(){
        const found = await this.store.pefReadings.findAll();
        return found;
    }

    async addNewReading(reading){
        return (await this.store.pefReadings.create(reading));
    }

    async deleteReading({readingID}){
        return (await this.store.pefReadings.destroy({ where: { readingID } }));
    }

}


module.exports = ReadingAPI;