/**
 * Module dependencies.
 */
var moment = require('moment');


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
