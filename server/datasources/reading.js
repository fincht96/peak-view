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
            return found[0];
        }
        
        return {};
    }

    async getAllReadings(){
        const found = await this.store.pefReadings.findAll();
        return found;
    }

    async addNewReading({pefReading}){
        let res = await this.store.pefReadings.create(pefReading);
        return res;
    }

    async deleteReading({id}){

        console.log("delete reading id: ", {id})
        let res = await this.store.pefReadings.destroy({ where: {id}  })
        return res;
    }

}


module.exports = ReadingAPI;