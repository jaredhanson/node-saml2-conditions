var conditions = require('index');

describe('saml2-conditions', function() {
    
  it('should export evaluate function', function() {
    expect(conditions.evaluate).to.be.a('function');
  });
  
});
