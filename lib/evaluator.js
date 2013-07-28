function Evaluator(options) {
  this._checks = {};
  this.use(require('./checks/attributes')(options));
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

Evaluator.prototype.evaluate = function(root, options) {
  options = options || {};
  var checks = this._checks
    , errs = []
    , fwe = options.failWithError || false
    , check, ok, rv;

  check = checks['*'];
  ok = check(root);
  if (ok === undefined) {
    errs.push(new Error('SAML conditions have indeterminate attributes'));
  } else if (ok === false) {
    rv = false;
    errs.push(new Error('SAML conditions have invalid attributes'));
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
      ok = check(root);
      if (ok === undefined) {
        errs.push(new Error('SAML condition is indeterminate: ' + cond.name() + ' ' + cond.ns()));
      } else if (ok === false) {
        rv = false;
        errs.push(new Error('SAML condition is invalid: ' + cond.name() + ' ' + cond.ns()));
      } else if (ok instanceof Error) {
        if (!ok.indeterminate) { rv = false; }
        errs.push(ok);
      }
    } else {
      errs.push(new Error('SAML condition not understood: ' + cond.name() + ' ' + cond.ns()));
    }
  }
  
  if (errs.length) {
    return (fwe ? errs[0] : rv);
  }
  return true;
}

module.exports = Evaluator;
