/**
 * Module dependencies.
 */
var Evaluator = require('./evaluator');


/**
 * Evaluates the validity of a SAML assertion.
 *
 * This function evaluates the validity of a SAML assertion according to the
 * constraints put in place by conditions.  Assertions can be determined to be
 * in one of three states: invalid, indeterminate, or valid.  These states
 * correspond to return values of `false`, `undefined`, and `true`,
 * respectively.  Assertions that are invalid or indeterminate must be rejected
 * by a relying party.
 *
 * For a detailed description of the processing rules for conditions, refer to
 * SAML Core, section 2.5.1.1.
 *
 * References:
 *   - [Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0](http://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
 *
 * @param {String|Element} xml
 * @param {Object} options
 * @return {Boolean|undefined}
 * @api public
 */
exports.evaluate = function(xml, options) {
  options = options || {};
  
  var evaluator = new Evaluator(options);
  evaluator.use('AudienceRestriction', 'urn:oasis:names:tc:SAML:2.0:assertion',
                require('./checks/audiencerestriction')(options));
  evaluator.use('OneTimeUse', 'urn:oasis:names:tc:SAML:2.0:assertion',
                require('./checks/onetimeuse')(options));
  evaluator.use('ProxyRestriction', 'urn:oasis:names:tc:SAML:2.0:assertion',
                require('./checks/proxyrestriction')(options));
  return evaluator.evaluate(xml, options);
}


/**
 * Export constructors.
 */
exports.Evaluator = Evaluator;

/**
 * Export checks.
 */
exports.checks = require('./checks');
