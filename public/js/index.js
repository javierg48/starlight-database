(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n<h1>Overview</h1>\n<p> "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"overview") || (depth0 != null ? lookupProperty(depth0,"overview") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"overview","hash":{},"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":4,"column":16}}}) : helper)))
    + " <p/>";
},"useData":true});
})();