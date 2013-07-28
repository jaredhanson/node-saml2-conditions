var conditions = require('index')
  , fs = require('fs');

describe('SAML assertion with expired time-based conditions', function() {
    
  var xml = fs.readFileSync(__dirname + '/data/expired.xml', 'utf8');
    
  it('should not be valid', function() {
    var ok = conditions.evaluate(xml);
    expect(ok).to.be.false;
  });
  
});

describe('SAML assertion with not-yet-active time-based conditions', function() {
    
  var xml = fs.readFileSync(__dirname + '/data/not-yet-active.xml', 'utf8');
    
  it('should not be valid', function() {
    var ok = conditions.evaluate(xml);
    expect(ok).to.be.false;
  });
  
});

describe('SAML assertion with unspecified time-based conditions', function() {
    
  var xml = fs.readFileSync(__dirname + '/data/forever-active.xml', 'utf8');
    
  it('should be valid', function() {
    var ok = conditions.evaluate(xml);
    expect(ok).to.be.true;
  });
  
});
