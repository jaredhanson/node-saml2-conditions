module.exports = function(options) {
  var entity = options.audience
    , fwe = options.failWithError || false;
  
  return function(cond) {
    // Skip check if `audience` was exlicitly set to null.
    if (entity === null) { return true; }
    // Fail if an `audience` was not specified.
    if (!entity) { return false; }
    
    var auds = cond.children('Audience', 'urn:oasis:names:tc:SAML:2.0:assertion')
      , allow = [];
    for (var aud = auds.first(); aud.length > 0; aud = aud.next()) {
      allow.push(aud.text());
    }
    return (allow.indexOf(entity) !== -1 ?
      true :
      (fwe ?
        new Error('SAML assertion not intended for audience: ' + allow.join(' ')) :
        false));
  }
}
