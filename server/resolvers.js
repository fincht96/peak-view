module.exports = {
    Query: {
      readings: (_, __, { dataSources }) =>
        dataSources.readingAPI.getAllReadings(),
      reading: (_, { id }, { dataSources }) =>
        dataSources.readingAPI.getReadingByID({ id: id  })
    }
  };