var assert = require('chai').assert;
var should = require('chai').should
var expect = require('chai').expect;
const dbHelper = require('../dbHelper')



describe('dbHelper', function() {
  describe('connecting to database', function() {
    it('should not throw an error', async function() {

        expect((await dbHelper.createStore()).to.not.throw())

    });
  });
});