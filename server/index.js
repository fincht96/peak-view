

// const express = require('express')
// const app = express()
// const port = 3000




const { ApolloServer, gql } = require('apollo-server');

















// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })


// const pefReadings = [
//   {
//     pefValue: 500,
//     medication: "Inhaler",
//     comment: "Feeling well today"
//   },
//   {
//     pefValue: 475,
//     medication: "None",
//     comment: "Little bit out of breath"
//   }
// ]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    pefReadings: () => pefReadings,
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});