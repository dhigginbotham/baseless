/**
 * registers custom handlebars helper fn
 * that gives context of `cssPrefix` option
 * passed in from cli args
 */
var conf = require('../../../../config');

module.exports.register = function(hbs) {
  hbs.registerHelper('cssPrefix', function(options) {
    return (conf.cssPrefix ? conf.cssPrefix : 'bs-');
  });
};