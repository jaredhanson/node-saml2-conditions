/**
 * Checks the validity of an `<AudienceRestriction>` element.
 *
 * For a detailed description of the processing rules for this element,
 * refer to SAML Core, section 2.5.1.4.
 *
 * References:
 *   - [Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0](http://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */
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
