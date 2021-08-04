module.exports = {
    Query: {
      readings: (_, __, { dataSources }) =>
        dataSources.readingAPI.getAllReadings(),
      reading: (_, { id }, { dataSources }) =>
        dataSources.readingAPI.getReadingByID({ id: id  })
    },

    Mutation: {
      addReading: async (_, {pefReading}, { dataSources }) => {
        let res = await dataSources.readingAPI.addNewReading({pefReading});

        if(res){
          console.log(res)
          return {
            success: true,
            message: "Reading added successfully",
            pefReading: res
          }
        }

        return {
          success: false,
          message: "Unable to add reading",
          pefReading: null
        }
      },

      deleteReading: async (_, {id}, { dataSources }) => {

        let res = await dataSources.readingAPI.deleteReading({id: id});

        if(res){
          return {
            success: true,
            message: "Reading deleted successfully",
            pefReading: [res]
          }
        }

        return {
          success: false,
          message: "Unable to delete reading",
        }
      },




    }
    
    
  };