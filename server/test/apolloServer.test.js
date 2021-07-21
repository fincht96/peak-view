var assert = require('chai').assert;
var should = require('chai').should
var expect = require('chai').expect;
const dbHelper = require('../dbHelper')



// describe('Apollo server queries and mutations', function() {
//   describe('connecting to database', function() {
//     it('should return a pefReadings object', async function() {

//         const server = new ApolloServer(config);

//         const result = await server.executeOperation({
//           query: GET_USER,
//           variables: { id: 1 }
//         });
//         expect(result.errors).toBeUndefined();
//         expect(result.data?.user.name).toBe('Ida');
        
        

//         expect((await dbHelper.createStore()).to.not.throw())
//     });
//   });
// });