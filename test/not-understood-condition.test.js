var conditions = require('index')
  , fs = require('fs');

describe('SAML assertion with a condition that is not understood', function() {
    
  var xml = fs.readFileSync(__dirname + '/data/not-understood-condition.xml', 'utf8');
    
  it('should be undefined', function() {
    var ok = conditions.evaluate(xml);
    expect(ok).to.be.undefined;
  });
  
  it('should return an error when failWithError is set', function() {
    var ok = conditions.evaluate(xml, { failWithError: true });
    expect(ok).to.be.an.instanceof(Error);
    expect(ok.message).to.be.equal("SAML condition not understood: BarRestriction http://schemas.example.com/foo/");
  });
  
});
