module.exports.register = function(hbs) {
  hbs.registerHelper('cssPrefix', function(args) {
    return args.data.root.cssPrefix;
  });
};