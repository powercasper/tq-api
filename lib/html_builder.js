var Mustache = require('mustache');
var fs = require('fs');

module.exports = {
  buildHTML: buildHTML
};

function buildHTML(results) {
  var template = fs.readFileSync("./html/mail.template.html", 'utf8');
  var view = {
    results: results
  };
  return Mustache.render(template, view);
}
