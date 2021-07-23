    
  const { INTEGER } = require('sequelize');
  const SQL = require('sequelize');



    
    /**
     * Creates a new sequelize instance, connects to postgres database and authenticates the connection.
     */
    
    module.exports.createStore = async () => {   
        
      
        const db = new SQL('postgres://tom:Lemon501@db:5432/pgdb');
        await db.authenticate(); 

        let pefReadings = db.define('pefReading', {
            id: {
              type: SQL.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            createdAt: SQL.DATE,
            pefValue: SQL.INTEGER,
            medication: SQL.STRING,
            medicationTime: SQL.STRING,
            comment: SQL.STRING,
          });

          await db.sync();


        return {pefReadings}
    }


    /**
     * Adds a new reading to pefReading table in postgres db
     */


    module.exports.addReading = async (pefReadings, reading) => {       
      return (await pefReadings.create(reading));
    }



  