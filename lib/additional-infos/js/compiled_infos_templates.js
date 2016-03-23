this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["templates/extra.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n    <div class=\"row\">\n        <div class=\"col-lg-4 col-md-2 col-sm-2 col-xs-3\">\n            <h4 class=\"hidden-sm hidden-xs\" style=\"font-weight:200;text-align:right;margin-top:2px;\"> "
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h4>\n            <h4 class=\"hidden-lg hidden-md\" style=\"font-weight:200;text-align:left;margin-top:2px;\"> "
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h4>\n        </div>\n        <div class=\"col-lg-8 col-md-10 col-sm-10 col-xs-9\">\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "            <div class=\"row\" style=\"margin-bottom:5px;margin-left:0px;\">\n                <div class=\"col-md-10 col-sm-10 col-xs-9\" style=\"padding:0px;\">\n                    <p style=\"font-size:1em;overflow:hidden;display:block;text-overflow:ellipsis;\">"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n                    <div class=\"collapse hidden-xs "
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.evidences : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                <div class=\"col-md-2 col-sm-2 col-xs-3\">\n                    <a class=\"btn\" style=\"padding:5px 10px;background-color:#dedede;\" type=\"button\" data-toggle=\"collapse\" data-target=\"."
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"false\" aria-controls=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                        <p style=\"color:#999;padding:0px;margin:0px;font-size:1.5em;font-weight:700;line-height:1em\">"
    + alias3(this.lambda(((stack1 = (depth0 != null ? depth0.evidences : depth0)) != null ? stack1.length : stack1), depth0))
    + "</p>\n                        <p style=\"color:#999;padding:0px 5px 0px;margin:0px;font-size:0.9em;line-height:1em;\">ref</p>\n                    </a>\n                </div>\n            </div>\n            <div class=\"collapse hidden-lg hidden-md hidden-sm "
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.evidences : depth0),{"name":"each","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        \n";
},"4":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "                        <div class=\"\">\n                            <div class=\"evidenceArrow\" style=\";transform:rotate(180deg);display:inline-block;font-weight: 900;\">&#10549;</div>  Evidence "
    + alias2((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(data && data.index),1,{"name":"math","hash":{},"data":data}))
    + "\n                            <span class=\"evidenceCodeName\" style=\"background-color:#7cba0f;color:white;padding:2px 6px;border-radius:2px 0px 0px 2px;margin-left:5px\">"
    + alias2(((helper = (helper = helpers.codeName || (depth0 != null ? depth0.codeName : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"codeName","hash":{},"data":data}) : helper)))
    + "</span>\n                            <span class=\"evidenceSource\" style=\"background-color:#dedede;color:#999;padding: 2px 6px;border-radius:0px 2px 2px 0px;\">"
    + alias2(((helper = (helper = helpers.db || (depth0 != null ? depth0.db : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"db","hash":{},"data":data}) : helper)))
    + "</span>\n                        </div>\n                        <div style=\"padding-left:10px;border-left:1px solid darkgray;margin:10px 0px;\">\n                            <a href="
    + alias2(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + ">"
    + alias2(((helper = (helper = helpers.accession || (depth0 != null ? depth0.accession : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"accession","hash":{},"data":data}) : helper)))
    + "</a>\n                        </div>\n";
},"6":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3="function";

  return "                <div class=\"\" style=\"font-size:12px\">\n                    <div class=\"evidenceArrow\" style=\";transform:rotate(180deg);display:inline-block;font-weight: 900;\">&#10549;</div>  Evidence "
    + alias2((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(data && data.index),1,{"name":"math","hash":{},"data":data}))
    + "\n                    <div class=\"evidenceCodeName\" style=\"display:inline-block;background-color:#7cba0f;color:white;padding:2px 6px;border-radius:2px;margin-bottom:3px;\">"
    + alias2(((helper = (helper = helpers.codeName || (depth0 != null ? depth0.codeName : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"codeName","hash":{},"data":data}) : helper)))
    + "</div>\n                    <span class=\"evidenceSource\" style=\"background-color:#dedede;color:#999;padding: 2px 6px;border-radius:2px;\">"
    + alias2(((helper = (helper = helpers.db || (depth0 != null ? depth0.db : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"db","hash":{},"data":data}) : helper)))
    + "</span>\n                </div>\n                <div style=\"padding-left:10px;border-left:1px solid darkgray;margin:10px 0px;\">\n                    <a href="
    + alias2(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + ">"
    + alias2(((helper = (helper = helpers.accession || (depth0 != null ? depth0.accession : depth0)) != null ? helper : alias1),(typeof helper === alias3 ? helper.call(depth0,{"name":"accession","hash":{},"data":data}) : helper)))
    + "</a>\n                </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "<div id=\"xrefs-header\" style=\"border-bottom: 1px solid #E7EAEC;margin-bottom: 15px;padding-bottom: 5px;\">\n    <div style=\"display:inline-block;\">\n            <span class=\"badge\" style=\"border-radius:70%;border: 2px solid black;color:#C50063;background-color:white;padding:8px 8px;margin-right:10px;vertical-align:middle;min-width:32px;\">"
    + this.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <h4 id=\"keywords-title\" style=\"display:inline-block;vertical-align:middle;\">Sequence</h4>\n</div>\n<div style=\"margin-top:20px;\">\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : alias1),(options={"name":"data","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"useData":true});

this["HBtemplates"]["templates/keywords.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n<div class=\"row\">\n    <div class=\"col-md-4 col-sm-4 col-xs-12\">\n        <h4 class=\"hidden-xs\" style=\"font-weight:200;text-align:right;margin-top:2px;\"> "
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h4>\n        <h4 class=\"hidden-lg hidden-md hidden-sm\" style=\"font-weight:200;text-align:left;margin-top:2px; margin-left:15px;\"> "
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h4>\n    </div>\n    <div class=\"col-md-8 col-sm-8 col-xs-12\">\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n<hr style=\"margin:0px 50px 5px\"> ";
},"3":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <div class=\"row\" style=\"margin-bottom:5px;\">\n            <div class=\"col-md-5 col-sm-5 col-xs-5\">\n                <p style=\"font-size:1em;padding:2px 20px 0px; margin-bottom:0px;\">"
    + alias3(((helper = (helper = helpers.cvTermName || (depth0 != null ? depth0.cvTermName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermName","hash":{},"data":data}) : helper)))
    + "</p>\n            </div>\n            <div class=\"col-md-1 col-sm-2 col-xs-1\">\n                <button class=\"btn btn-sm btn-info\" type=\"button\" data-toggle=\"collapse\" data-target=\"#"
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"false\" aria-controls=\""
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\">Definition</button>\n            </div>\n            <div class=\"col-md-3 col-sm-2 col-sm-offset-1 col-xs-1 col-xs-offset-1\">\n                <a class=\"btn btn-sm\" href=\"http://www.nextprot.org/db/term/"
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\" style=\"color:#C50063;border:1px solid #C50063;margin-left:30px;\">"
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "</a>\n            </div>\n        </div>\n        <div class=\"collapse\" id=\""
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\">\n            <div class=\"well\" style=\"background-color:rgba(91, 192, 222, 0.2);margin-right:50px;margin-left:10px;\">\n                "
    + alias3(((helper = (helper = helpers.cvTermDescription || (depth0 != null ? depth0.cvTermDescription : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cvTermDescription","hash":{},"data":data}) : helper)))
    + "\n            </div>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "\n    <div id=\"keywords-header\" style=\"border-bottom: 1px solid #E7EAEC;margin-bottom: 15px;padding-bottom: 5px;\">\n    <div style=\"display:inline-block;\">\n            <span class=\"badge\" style=\"border-radius:70%;border: 2px solid black;color:#C50063;background-color:white;padding:8px 8px;margin-right:10px;vertical-align:middle;min-width:32px;\">"
    + this.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <h4 id=\"keywords-title\" style=\"display:inline-block;vertical-align:middle;\">Keywords</h4></div>\n<div style=\"margin-top:20px;\">\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : alias1),(options={"name":"data","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>";
},"useData":true});

this["HBtemplates"]["templates/xrefs.tmpl"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n    <div class=\"row\">\n        <div class=\"col-lg-4 col-md-2 col-sm-12 col-xs-12\">\n            <h4 class=\"hidden-sm hidden-xs\" style=\"font-weight:200;text-align:right;margin-top:2px;\"> "
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h4>\n            <h4 class=\"hidden-lg hidden-md\" style=\"font-weight:200;text-align:left;margin-top:2px; margin-left:15px;\"> "
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h4>\n        </div>\n        <div class=\"col-lg-8 col-md-10 col-sm-12 col-xs-12\">\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n        </div>\n<hr style=\"margin:0px 50px 5px\">";
},"3":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "            <div class=\"row\" style=\"margin-bottom:5px;\">\n                <div class=\"col-md-3 col-sm-3 col-xs-4\" style=\"padding:0px;\">\n                    <p style=\"font-size:1em;padding:2px 12px 0px 20px; margin-bottom:0px;text-align:right;overflow: hidden;display: block;text-overflow:ellipsis;\">"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\n                </div>\n                <div class=\"col-md-9 col-sm-9 col-xs-8\">\n";
  stack1 = ((helper = (helper = helpers.xrefs || (depth0 != null ? depth0.xrefs : depth0)) != null ? helper : alias1),(options={"name":"xrefs","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.xrefs) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </div>\n            </div>\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                        <div class=\"btn-group hidden-xs\" role=\"group\">\n                            "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.prefix : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                            <a class=\"btn btn-xs\" href=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" style=\"color:#C50063;border:1px solid #C50063;text-align:left;\">"
    + alias3(((helper = (helper = helpers.accession || (depth0 != null ? depth0.accession : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accession","hash":{},"data":data}) : helper)))
    + "</a>\n                                "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.suffix : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                        </div>\n                        <div class=\"row hidden-lg hidden-md hidden-sm\">\n                            <div class=\"btn-group col-xs-12\" role=\"group\" style=\"padding:0px;\">\n                                "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.prefix : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                                <a class=\"btn btn-xs\" href=\""
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" style=\"color:#C50063;border:1px solid #C50063;text-align:left;\">"
    + alias3(((helper = (helper = helpers.accession || (depth0 != null ? depth0.accession : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"accession","hash":{},"data":data}) : helper)))
    + "</a>\n                                "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.suffix : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                            </div>\n                        </div>\n";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "<label class=\"btn btn-xs\" style=\"margin:0px;color:white;border:1px solid #C50063;background-color:rgba(197, 0, 99, 0.75)\">"
    + this.escapeExpression(((helper = (helper = helpers.prefix || (depth0 != null ? depth0.prefix : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"prefix","hash":{},"data":data}) : helper)))
    + "</label>";
},"7":function(depth0,helpers,partials,data) {
    var helper;

  return "<label style=\"margin:0px;font-weight:300;margin-left:5px;padding:1px 5px;border-radius:0px 3px 3px 0px;background-color:#f4f4f4; color:#999;border:1px solid #999;font-size:12px;line-height:18px;\"> "
    + this.escapeExpression(((helper = (helper = helpers.suffix || (depth0 != null ? depth0.suffix : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"suffix","hash":{},"data":data}) : helper)))
    + " </label>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "\n<div id=\"xrefs-header\" style=\"border-bottom: 1px solid #E7EAEC;margin-bottom: 15px;padding-bottom: 5px;\">\n<div style=\"display:inline-block;\">\n        <span class=\"badge\" style=\"border-radius:70%;border: 2px solid black;color:#C50063;background-color:white;padding:8px 8px;margin-right:10px;vertical-align:middle;\">"
    + this.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<h4 id=\"keywords-title\" style=\"display:inline-block;vertical-align:middle;\">External links</h4></div>\n<div style=\"margin-top:20px;\">\n\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : alias1),(options={"name":"data","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>";
},"useData":true});