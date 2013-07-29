/**
 * `IndeterminateError` error.
 *
 * @api public
 */
function IndeterminateError(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'IndeterminateError';
  this.message = message;
  this.indeterminate = true;
};

/**
 * Inherit from `Error`.
 */
IndeterminateError.prototype.__proto__ = Error.prototype;


/**
 * Export `IndeterminateError`.
 */
module.exports = IndeterminateError;
