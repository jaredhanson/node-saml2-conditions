/**
 * Module dependencies.
 */
var moment = require('moment');


/**
 * Checks the validity of attributes on the  `<Conditions>` element.
 *
 * For a detailed description of the processing rules for these attributes,
 * refer to SAML Core, section 2.5.1.2.
 *
 * References:
 *   - [Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0](http://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */
module.exports = function(options) {
  
  return function(cond) {
    var now = moment();
    
    var nooa = cond.attr('NotOnOrAfter');
    if (nooa) {
      var ended = moment.utc(nooa, 'YYYY-MM-DDTHH:mm:ss');
      if (now.isAfter(ended) || now.isSame(ended)) { return false; }
    }
    
    var nb = cond.attr('NotBefore');
    if (nb) {
      var begins = moment.utc(nb, 'YYYY-MM-DDTHH:mm:ss');
      if (now.isBefore(begins)) { return false; }
    }
    
    return true;
  }
}
