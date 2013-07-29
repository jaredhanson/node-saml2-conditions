var conditions = require('index')
  , fs = require('fs');

describe('SAML assertion with a one time use condition', function() {
    
  var xml = fs.readFileSync(__dirname + '/../data/OneTimeUse.xml', 'utf8');
  
  it('should be valid', function() {
    var ok = conditions.evaluate(xml, { audience: 'http://lucy.localtunnel.me/' });
    expect(ok).to.be.true;
  });
  
});
