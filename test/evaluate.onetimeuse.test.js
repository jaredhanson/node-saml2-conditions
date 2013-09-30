var conditions = require('index')
  , fs = require('fs');

describe('evaluate', function() {
    
  describe('assertion with one-time-use condition', function() {
    var xml = fs.readFileSync(__dirname + '/data/OneTimeUse.xml', 'utf8');
  
    it('should be valid', function() {
      var ok = conditions.evaluate(xml);
      expect(ok).to.be.true;
    });
  });
  
});
