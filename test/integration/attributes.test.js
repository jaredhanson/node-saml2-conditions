var conditions = require('index')
  , fs = require('fs');

describe('SAML assertion with unspecified time-based conditions', function() {
  
  var xml = fs.readFileSync(__dirname + '/../data/Conditions.xml', 'utf8');
  
  it('should be valid', function() {
    var ok = conditions.evaluate(xml);
    expect(ok).to.be.true;
  });

});

describe('SAML assertion with expired time-based conditions', function() {
    
  var xml = fs.readFileSync(__dirname + '/../data/ConditionsThatHaveExpired.xml', 'utf8');
    
  it('should not be valid', function() {
    var ok = conditions.evaluate(xml);
    expect(ok).to.be.false;
  });
  
});

describe('SAML assertion with not-yet-active time-based conditions', function() {
    
  var xml = fs.readFileSync(__dirname + '/../data/ConditionsThatAreNotYetActive.xml', 'utf8');
    
  it('should not be valid', function() {
    var ok = conditions.evaluate(xml);
    expect(ok).to.be.false;
  });
  
});
