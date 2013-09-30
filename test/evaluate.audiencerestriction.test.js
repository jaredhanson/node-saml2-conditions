var conditions = require('index')
  , fs = require('fs');

describe('evaluate', function() {
  
  describe('assertion with audience restriction', function() {
    var xml = fs.readFileSync(__dirname + '/data/AudienceRestriction.xml', 'utf8');
  
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
  
    it('should return an error when failWithError is set', function() {
      var ok = conditions.evaluate(xml, { audience: 'http://foo.example.com/', failWithError: true });
      expect(ok).to.be.an.instanceof(Error);
      expect(ok.message).to.be.equal("SAML assertion not intended for entity");
      expect(ok.indeterminate).to.be.undefined;
    });
  });

  describe('assertion with audience restriction for multiple entities', function() {
    var xml = fs.readFileSync(__dirname + '/data/AudienceRestrictionWithMultipleAudiences.xml', 'utf8');
  
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
  
    it('should return an error when failWithError is set', function() {
      var ok = conditions.evaluate(xml, { audience: 'http://foo.example.com/', failWithError: true });
      expect(ok).to.be.an.instanceof(Error);
      expect(ok.message).to.be.equal("SAML assertion not intended for entity");
      expect(ok.indeterminate).to.be.undefined;
    });
  });
  
});
