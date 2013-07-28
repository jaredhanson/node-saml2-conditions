/**
 * Module dependencies.
 */
var Evaluator = require('./evaluator')
  , DOMParser = require('xmldom').DOMParser
  , $ = require('xtraverse');


exports.evaluate = function(xml, options) {
  if (typeof xml === 'string') {
    xml = new DOMParser().parseFromString(xml);
  }
  options = options || {};
  
  var evaluator = new Evaluator(options)
    , conds = $(xml).children('Conditions', 'urn:oasis:names:tc:SAML:2.0:assertion');
  
  //evaluator.use(require('./checks/attributes')(options));
  return evaluator.evaluate(conds, options);
}
