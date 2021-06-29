    
    const SQL = require('sequelize');
    
    /**
     * Creates a new sequelize instance, connects to postgres database and authenticates the connection.
     */
    
    module.exports.createStore = async () => {       
        const db = new SQL('postgres://tom:Lemon501@database:5432/pgdb');
        await db.authenticate(); 
    }

  