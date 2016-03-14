this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["templates/keywords.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n<div class=\"row\">\n    <div class=\"col-md-4 col-sm-4 col-xs-12\">\n        <h3 class=\"hidden-xs\" style=\"font-weight:200;text-align:right;margin-top:0px;\"> "
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h3>\n        <h3 class=\"hidden-lg hidden-md hidden-sm\" style=\"font-weight:200;text-align:left;margin-top:0px; margin-left:15px;\"> "
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h3>\n    </div>\n    <div class=\"col-md-8 col-sm-8 col-xs-12\">\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n<hr style=\"margin:10px 50px\"> ";
},"3":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div class=\"row\" style=\"margin-top:10px;\">\n            <div class=\"col-md-5 col-sm-5 col-xs-5\">\n                <p style=\"font-size:1.3em;padding:0px 20px\">"
    + alias3(((helper = (helper = helpers.cvTermName || (depth0 != null ? depth0.cvTermName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermName","hash":{},"data":data}) : helper)))
    + "</p>\n            </div>\n            <div class=\"col-md-1 col-sm-2 col-xs-1\">\n                <button class=\"btn btn-info\" type=\"button\" data-toggle=\"collapse\" data-target=\"#"
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"false\" aria-controls=\""
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\">Definition</button>\n            </div>\n            <div class=\"col-md-3 col-sm-2 col-sm-offset-1 col-xs-1 col-xs-offset-1\">\n                <a class=\"btn\" style=\"color:#C50063;border:1px solid #C50063;margin-left:20px;\">"
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "</a>\n            </div>\n        </div>\n        <div class=\"collapse\" id=\""
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\">\n            <div class=\"well\" style=\"background-color:rgba(91, 192, 222, 0.2);margin-right:50px;margin-left:10px;margin-top:10px;\">\n                "
    + alias3(((helper = (helper = helpers.cvTermDescription || (depth0 != null ? depth0.cvTermDescription : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermDescription","hash":{},"data":data}) : helper)))
    + "\n            </div>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<h1 style=\"margin:40px 40px;\">KeyWord</h1> "
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});