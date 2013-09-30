var conditions = require('index')
  , fs = require('fs');

describe('evaluate', function() {

  describe('assertion without time-based conditions', function() {
    var xml = fs.readFileSync(__dirname + '/data/Conditions.xml', 'utf8');
  
    it('should be valid', function() {
      var ok = conditions.evaluate(xml);
      expect(ok).to.be.true;
    });
  });

  describe('assertion with expired conditions', function() {
    var xml = fs.readFileSync(__dirname + '/data/ConditionsThatHaveExpired.xml', 'utf8');
    
    it('should not be valid', function() {
      var ok = conditions.evaluate(xml);
      expect(ok).to.be.false;
    });
  });

  describe('assirtion with not-yet-active conditions', function() {
    var xml = fs.readFileSync(__dirname + '/data/ConditionsThatAreNotYetActive.xml', 'utf8');
    
    it('should not be valid', function() {
      var ok = conditions.evaluate(xml);
      expect(ok).to.be.false;
    });
  });

});
