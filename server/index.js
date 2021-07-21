

const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const { createStore } = require('./dbHelper');
const resolvers = require('./resolvers');


const ReadingAPI = require('./datasources/reading');

createStore().then((store) => {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      readingAPI: new ReadingAPI({store})
    })
  });
  
  server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
  }).catch(e => {
    console.log(e)
  })
}).catch(e => {
  console.log(e)
})








