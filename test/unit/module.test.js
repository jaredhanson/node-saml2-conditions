var conditions = require('index');

describe('saml2-conditions', function() {
    
  it('should export evaluate function', function() {
    expect(conditions.evaluate).to.be.a('function');
  });
  
  it('should export Evaluator constructor', function() {
    expect(conditions.Evaluator).to.be.a('function');
  });
  
  it('should export checks', function() {
    expect(Object.keys(conditions.checks)).to.have.length(3);
    expect(conditions.checks.audienceRestriction).to.be.a('function');
    expect(conditions.checks.oneTimeUse).to.be.a('function');
    expect(conditions.checks.proxyRestriction).to.be.a('function');
  });
  
});
