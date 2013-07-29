/**
 * Checks the validity of a `<ProxyRestriction>` element.
 *
 * For a detailed description of the processing rules for this element,
 * refer to SAML Core, section 2.5.1.6.
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
    // As outlined by the spec, this condition does not affect validity but is
    // a condition on use.  Applications are expected to implement behavior
    // accordingly.
    return true;
  }
}
