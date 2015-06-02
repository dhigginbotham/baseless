/**
 * registers custom handlebars helper fn
 * that gives context of `cssPrefix` option
 * passed in from cli args
 */
module.exports.register = function(hbs) {
  hbs.registerHelper('cssPrefix', function(args) {
    return args.data.root.cssPrefix;
  });
};