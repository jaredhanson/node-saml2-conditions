var conditions = require('index')
  , fs = require('fs');

describe('SAML assertion with a proxy restriction', function() {
    
  var xml = fs.readFileSync(__dirname + '/../data/ProxyRestriction.xml', 'utf8');
  
  it('should be valid', function() {
    var ok = conditions.evaluate(xml);
    expect(ok).to.be.true;
  });
  
});
