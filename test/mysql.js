var mysql = require('../lib/bin/mysql.js');
var checkSettings = mysql.checkSettings;
var pool = mysql.pool;
var expect = require('chai').expect;
var settings = require('../settings.js');
var badSettings = {
  host: 'host',
  user: 'user',
};

describe('mysql', function() {
  it('should be an object.', function() {
    expect(mysql).to.be.a('object');
  });

  it('has a method called checkSettings', function() {
    expect(mysql).to.have.property('checkSettings');
  });

  describe('mysql.checkSettings method', function() {

    it('should be a function.', function() {
      expect(checkSettings).to.be.a('function');
    });

    it('should expect an argument.', function() {
      expect(checkSettings()).to.equal(false);
    });

    it('should expect the argument to be a properly enumerated settings object.', function() {
      expect(checkSettings(settings)).to.equal(true);
      expect(checkSettings(badSettings)).to.equal(false);
    });

    it('should reject the arguments that are not objects', function() {
      expect(checkSettings('string')).to.equal(false);
      expect(checkSettings(23424)).to.equal(false);
    });
  });

  it('has a method called pool', function() {
    expect(mysql).to.have.property('pool');
  });

  describe('mysql.pool', function() {
    it('should be a function.', function() {
      expect(pool).to.be.a('function');
    });

    it('should expect an argument.', function() {
      expect(pool()).to.equal(false);
    });

    it('should expect the argument to be a properly enumerated settings object.', function() {
      expect(settings).to.be.an('object');
      expect(pool(badSettings)).to.equal(false);
    });

    it('should reject the arguments that are not objects', function() {
      expect(pool('string')).to.equal(false);
      expect(pool(23424)).to.equal(false);
    });

    it('should have a getConnection method', function() {
      expect(pool(settings)).to.have.property('getConnection');
    });

    describe('mysql.pool #getConnection()', function() {
      it('should connect using the settings without error', function(done) {
        var labtech = pool(settings);
        labtech.getConnection(done);
      });

      it('should have access to the tickets table of the labtech server', function(done) {
        var labtech = pool(settings);
        labtech.getConnection(function(err, connection) {
          connection.query('SELECT 1 FROM tickets', function(err, rows) {
            if (err) throw err;
            connection.release();
            done();
          });
        });
      });
    });
  });

});
