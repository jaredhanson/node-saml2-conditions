/**
 * Module dependencies.
 */
var DOMParser = require('xmldom').DOMParser
  , X = require('xtraverse')
  , IndeterminateError = require('./errors/indeterminateerror');


function Evaluator() {
  this._checks = {};
  this.use(require('./checks/attributes')());
}

Evaluator.prototype.use = function(name, ns, fn) {
  if ('function' == typeof name) {
    fn = name;
    name = undefined;
  }
  var qname = ns + ':' + name;
  if (!name) { qname = '*' }
  
  this._checks[qname] = fn;
}

Evaluator.prototype.evaluate = function(xml, options) {
  options = options || {};
  if (typeof xml === 'string') {
    xml = new DOMParser().parseFromString(xml);
  }
  
  var root = X(xml).children('Conditions', 'urn:oasis:names:tc:SAML:2.0:assertion')
    , checks = this._checks
    , errs = []
    , fwe = options.failWithError || false
    , check, ok, rv;

  check = checks['*'];
  ok = check(root);
  if (ok === false) {
    rv = false;
    errs.push(new Error('SAML assertion is invalid or expired'));
  } else if (ok instanceof Error) {
    if (!ok.indeterminate) { rv = false; }
    errs.push(ok);
  }
  
  var conds = root.children()
    , qname;
  for (var cond = conds.first(); cond.length > 0; cond = cond.next()) {
    qname = cond.ns() + ':' + cond.name();
    
    check = checks[qname];
    if (check) {
      ok = check(cond);
      if (ok === undefined) {
        errs.push(new IndeterminateError('SAML condition is indeterminate: ' + qname));
      } else if (ok === false) {
        rv = false;
        errs.push(new Error('SAML condition is invalid: ' + qname));
      } else if (ok instanceof Error) {
        if (!ok.indeterminate) { rv = false; }
        errs.push(ok);
      }
    } else {
      errs.push(new IndeterminateError('SAML condition not understood: ' + qname));
    }
  }
  
  if (errs.length) {
    return (fwe ? errs[0] : rv);
  }
  return true;
}

module.exports = Evaluator;
