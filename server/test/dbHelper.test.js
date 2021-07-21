var assert = require('chai').assert;
var should = require('chai').should
var expect = require('chai').expect;
const dbHelper = require('../dbHelper')

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

// describe('dbHelper', function() {
//   describe('connecting to database', function() {
//     it('should return a pefReadings object', async function() {
//         expect((await dbHelper.createStore()).to.not.throw())
//     });
//   });
// });