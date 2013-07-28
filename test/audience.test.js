var conditions = require('index')
  , fs = require('fs');

describe('SAML assertion with an audience restriction', function() {
    
  var xml = fs.readFileSync(__dirname + '/data/audience-restriction.xml', 'utf8');
  
  it('should be valid if intended for the audience', function() {
    var ok = conditions.evaluate(xml, { audience: 'http://lucy.localtunnel.me/' });
    expect(ok).to.be.true;
  });
    
  it('should be invalid if not intended for the audience', function() {
    var ok = conditions.evaluate(xml, { audience: 'http://foo.example.com/' });
    expect(ok).to.be.false;
  });
    
  it('should be invalid if audience is not specified', function() {
    var ok = conditions.evaluate(xml);
    expect(ok).to.be.false;
  });
  
  it('should be valid if audience checking is explictly disabled', function() {
    var ok = conditions.evaluate(xml, { audience: null });
    expect(ok).to.be.true;
  });
  
});

describe('SAML assertion with an audience restriction', function() {
    
  var xml = fs.readFileSync(__dirname + '/data/multiple-audiences.xml', 'utf8');
  
  it('should be valid if intended for the first audience', function() {
    var ok = conditions.evaluate(xml, { audience: 'http://lucy.localtunnel.me/' });
    expect(ok).to.be.true;
  });
  
  it('should be valid if intended for the second audience', function() {
    var ok = conditions.evaluate(xml, { audience: 'http://samy.localtunnel.me/' });
    expect(ok).to.be.true;
  });
  
  it('should be invalid if not intended for the audience', function() {
    var ok = conditions.evaluate(xml, { audience: 'http://foo.example.com/' });
    expect(ok).to.be.false;
  });
  
});
