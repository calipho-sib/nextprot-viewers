this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["templates/evidence.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<div class=\"evidence-container\">\n    <div class=\"evidence-arrow\">&#10549;</div>  Evidence "
    + alias3((helpers.math || (depth0 && depth0.math) || alias2).call(alias1,(data && data.index),1,{"name":"math","hash":{},"data":data}))
    + "\n    <span class=\"evidence-label evidence-code-name\">"
    + alias3(((helper = (helper = helpers.codeName || (depth0 != null ? depth0.codeName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"codeName","hash":{},"data":data}) : helper)))
    + "</span><span class=\"evidence-label evidence-source\">"
    + alias3(((helper = (helper = helpers.source || (depth0 != null ? depth0.source : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"source","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<div class=\"evidence-accession\">\n    <a href="
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + ">"
    + alias3(((helper = (helper = helpers.accession || (depth0 != null ? depth0.accession : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"accession","hash":{},"data":data}) : helper)))
    + "</a>\n</div>\n";
},"useData":true});

this["HBtemplates"]["templates/external-link.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data}) : helper)))
    + "\"  target='_blank'>"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + " <span class=\"glyphicon glyphicon-new-window\" arria-hidden=\"true\"></span></a>";
},"useData":true});

this["HBtemplates"]["templates/extra.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n    <div class=\"row\">\n        <div class=\"col-lg-4 col-md-2 col-sm-2 col-xs-3\">\n            <h4 class=\"hidden-sm hidden-xs\" style=\"font-weight:200;text-align:right;margin-top:2px;\"> "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h4>\n            <h4 class=\"hidden-lg hidden-md\" style=\"font-weight:200;text-align:left;margin-top:2px;\"> "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h4>\n        </div>\n        <div class=\"col-lg-8 col-md-10 col-sm-10 col-xs-9\">\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"row\" style=\"margin-bottom:5px;margin-left:0px;\">\n                <div class=\"col-md-10 col-sm-10 col-xs-9\" style=\"padding:0px;\">\n                    <p style=\"font-size:1em;overflow:hidden;display:block;text-overflow:ellipsis;\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n                    <div class=\"collapse hidden-xs "
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.evidences : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                <div class=\"col-md-2 col-sm-2 col-xs-3\">\n                    <a class=\"btn\" style=\"padding:5px 10px;background-color:#dedede;\" type=\"button\" data-toggle=\"collapse\" data-target=\"."
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"false\" aria-controls=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                        <p style=\"color:#999;padding:0px;margin:0px;font-size:1.5em;font-weight:700;line-height:1em\">"
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.evidences : depth0)) != null ? stack1.length : stack1), depth0))
    + "</p>\n                        <p style=\"color:#999;padding:0px 5px 0px;margin:0px;font-size:0.9em;line-height:1em;\">ref</p>\n                    </a>\n                </div>\n            </div>\n            <div class=\"collapse hidden-lg hidden-md hidden-sm "
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.evidences : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        \n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "                        <div class=\"\">\n                            <div class=\"evidenceArrow\" style=\";transform:rotate(180deg);display:inline-block;font-weight: 900;\">&#10549;</div>  Evidence "
    + alias3((helpers.math || (depth0 && depth0.math) || alias2).call(alias1,(data && data.index),1,{"name":"math","hash":{},"data":data}))
    + "\n                            <span class=\"evidenceCodeName\" style=\"background-color:#7cba0f;color:white;padding:2px 6px;border-radius:2px 0px 0px 2px;margin-left:5px\">"
    + alias3(((helper = (helper = helpers.codeName || (depth0 != null ? depth0.codeName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"codeName","hash":{},"data":data}) : helper)))
    + "</span>\n                            <span class=\"evidenceSource\" style=\"background-color:#dedede;color:#999;padding: 2px 6px;border-radius:0px 2px 2px 0px;\">"
    + alias3(((helper = (helper = helpers.db || (depth0 != null ? depth0.db : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"db","hash":{},"data":data}) : helper)))
    + "</span>\n                        </div>\n                        <div style=\"padding-left:10px;border-left:1px solid darkgray;margin:10px 0px;\">\n                            <a href="
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + ">"
    + alias3(((helper = (helper = helpers.accession || (depth0 != null ? depth0.accession : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"accession","hash":{},"data":data}) : helper)))
    + "</a>\n                        </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "                <div class=\"\" style=\"font-size:12px\">\n                    <div class=\"evidenceArrow\" style=\";transform:rotate(180deg);display:inline-block;font-weight: 900;\">&#10549;</div>  Evidence "
    + alias3((helpers.math || (depth0 && depth0.math) || alias2).call(alias1,(data && data.index),1,{"name":"math","hash":{},"data":data}))
    + "\n                    <div class=\"evidenceCodeName\" style=\"display:inline-block;background-color:#7cba0f;color:white;padding:2px 6px;border-radius:2px;margin-bottom:3px;\">"
    + alias3(((helper = (helper = helpers.codeName || (depth0 != null ? depth0.codeName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"codeName","hash":{},"data":data}) : helper)))
    + "</div>\n                    <span class=\"evidenceSource\" style=\"background-color:#dedede;color:#999;padding: 2px 6px;border-radius:2px;\">"
    + alias3(((helper = (helper = helpers.db || (depth0 != null ? depth0.db : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"db","hash":{},"data":data}) : helper)))
    + "</span>\n                </div>\n                <div style=\"padding-left:10px;border-left:1px solid darkgray;margin:10px 0px;\">\n                    <a href="
    + alias3(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + ">"
    + alias3(((helper = (helper = helpers.accession || (depth0 != null ? depth0.accession : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"accession","hash":{},"data":data}) : helper)))
    + "</a>\n                </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", buffer = 
  "<div id=\"xrefs-header\" style=\"border-bottom: 1px solid #E7EAEC;margin-bottom: 15px;padding-bottom: 5px;\">\n    <div style=\"display:inline-block;\">\n            <span class=\"badge\" style=\"border-radius:70%;border: 2px solid black;color:#C50063;background-color:white;padding:8px 8px;margin-right:10px;vertical-align:middle;min-width:32px;\">"
    + container.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <h4 id=\"keywords-title\" style=\"display:inline-block;vertical-align:middle;\">Sequence</h4>\n</div>\n<div style=\"margin-top:20px;\">\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : alias2),(options={"name":"data","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"useData":true});

this["HBtemplates"]["templates/function.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n    <div class=\"row category-row\">\n        <div class=\"col-lg-1 col-md-12 col-sm-12 col-xs-12\">\n            <h4 class=\"hidden-sm hidden-xs annotation-category-title text-align-right\"> "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</h4>\n            <h4 class=\"hidden-lg hidden-md annotation-category-title text-align-left\"> "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</h4>\n        </div>\n        <div class=\"col-lg-11 col-md-10 col-sm-12 col-xs-12\">\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "            <div class=\"row annotation-row\">\n                <div class=\"col-lg-10 col-md-10 col-sm-9 col-xs-9\">\n                    <div class=\"annotation-title-container\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.cvTermAccessionCode : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.parentXref : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.unlessCond || (depth0 && depth0.unlessCond) || alias2).call(alias1,(depth0 != null ? depth0.cvTermAccessionCode : depth0),"||",(depth0 != null ? depth0.parentXref : depth0),{"name":"unlessCond","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                    <div class=\"collapse\" id=\"collapse"
    + alias3((helpers.substring || (depth0 && depth0.substring) || alias2).call(alias1,(depth0 != null ? depth0.cvTermAccessionCode : depth0),3,{"name":"substring","hash":{},"data":data}))
    + "\">\n                        <div class=\"well blue-well\">\n                            "
    + alias3(((helper = (helper = helpers.cvTermDescription || (depth0 != null ? depth0.cvTermDescription : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"cvTermDescription","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                    </div>\n                    <div class=\"collapse hidden-xs "
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " evidence-container\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.evidences : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                <div class=\"col-lg-2 col-md-3 col-sm-3 col-xs-3\">\n                <div class=\"show-references-button\">\n                    <a class=\"btn\" type=\"button\" data-toggle=\"collapse\" data-target=\"."
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"false\" aria-controls=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                        <p class=\"show-references-button-counter\">"
    + alias3(container.lambda(((stack1 = (depth0 != null ? depth0.evidences : depth0)) != null ? stack1.length : stack1), depth0))
    + "</p>\n                        <p class=\"show-references-button-label\">ref</p>\n                    </a><div class=\"reference-label-container\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.evidenceSources : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n                </div>\n            </div>\n            <div class=\"collapse hidden-lg hidden-md hidden-sm "
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " evidence-container\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.evidences : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "                        <p class=\"annotation-title col-lg-9 col-sm-7 col-xs-6\">"
    + ((stack1 = (helpers.boldPattern || (depth0 && depth0.boldPattern) || alias2).call(alias1,(depth0 != null ? depth0.description : depth0),"Contributes to",{"name":"boldPattern","hash":{},"data":data})) != null ? stack1 : "")
    + "</p>\n                        <div class=\"annotation-labels col-lg-3 col-md-4 col-sm-5 col-xs-6\">\n                            <button class=\"btn btn-sm btn-info\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse"
    + alias3((helpers.substring || (depth0 && depth0.substring) || alias2).call(alias1,(depth0 != null ? depth0.cvTermAccessionCode : depth0),3,{"name":"substring","hash":{},"data":data}))
    + "\" aria-expanded=\"false\" aria-controls=\"collapse"
    + alias3((helpers.substring || (depth0 && depth0.substring) || alias2).call(alias1,(depth0 != null ? depth0.cvTermAccessionCode : depth0),3,{"name":"substring","hash":{},"data":data}))
    + "\">Definition</button>\n                            <a class=\"accession-code-link btn btn-sm selectable\" href=\"/term/"
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "</a>\n                        </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "                            <p class=\"annotation-title col-lg-9 col-sm-7 col-xs-6\">"
    + alias1(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n                            <div class=\"col-lg-3 col-md-4 col-sm-5 col-xs-6 right\">\n                                <a class=\"accession-code-link btn btn-sm selectable\" href=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.parentXref : depth0)) != null ? stack1.resolvedUrl : stack1), depth0))
    + "\">"
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.parentXref : depth0)) != null ? stack1.accession : stack1), depth0))
    + "</a>\n                            </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            <p class=\"annotation-title\">"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.evidence,depth0,{"name":"evidence","hash":{"source":(depth0 != null ? depth0.assignedBy : depth0)},"data":data,"indent":"                            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.publication,depth0,{"name":"publication","hash":{"parentId":(depths[1] != null ? depths[1].id : depths[1])},"data":data,"indent":"                            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"reference-label\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.evidence,depth0,{"name":"evidence","hash":{"source":(depth0 != null ? depth0.db : depth0)},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", buffer = 
  "<div id=\"function-header\" class=\"category-header\">\n    <div class=\"badge-container\">\n        <span class=\"badge counter-badge\">"
    + container.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <h4 id=\"function-title\" class=\"category-title\">Function</h4>\n</div>\n<div class=\"category-main\">\n    ";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : alias2),(options={"name":"data","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n";
},"usePartial":true,"useData":true,"useDepths":true});

this["HBtemplates"]["templates/internal-link.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data}) : helper)))
    + "\"  target='_parent'>"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</a>";
},"useData":true});

this["HBtemplates"]["templates/keywords.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<div class=\"row category-row\">\n    <div class=\"col-lg-2 col-md-2 col-sm-12 col-xs-12\">\n        <h4 class=\"hidden-sm hidden-xs annotation-category-title text-align-right\"> "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</h4>\n        <h4 class=\"hidden-lg hidden-md annotation-category-title text-align-left\"> "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</h4>\n    </div>\n    <div class=\"col-lg-10 col-md-10 col-sm-12 col-xs-12\">\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"row annotation-row\">\n            <div class=\"annotation-title-container\">\n                <p class=\"annotation-title\">"
    + alias4(((helper = (helper = helpers.cvTermName || (depth0 != null ? depth0.cvTermName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cvTermName","hash":{},"data":data}) : helper)))
    + "</p>\n                <div class=\"annotation-labels col-md-6 col-sm-6 col-xs-6\">\n                    <button class=\"btn btn-sm btn-info\" type=\"button\" data-toggle=\"collapse\" data-target=\"#"
    + alias4(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\" aria-expanded=\"false\" aria-controls=\""
    + alias4(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\">Definition</button>\n                    <a class=\"accession-code-link btn btn-sm selectable\" href=\"/db/term/"
    + alias4(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "</a>\n                </div>\n            </div>\n        </div>\n        <div class=\"collapse\" id=\""
    + alias4(((helper = (helper = helpers.cvTermAccessionCode || (depth0 != null ? depth0.cvTermAccessionCode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cvTermAccessionCode","hash":{},"data":data}) : helper)))
    + "\">\n            <div class=\"well blue-well\">\n                "
    + alias4(((helper = (helper = helpers.cvTermDescription || (depth0 != null ? depth0.cvTermDescription : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cvTermDescription","hash":{},"data":data}) : helper)))
    + "\n            </div>\n        </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "\n<hr style=\"margin:0px 50px 5px\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", buffer = 
  "<div id=\"keywords-header\" class=\"category-header\">\n    <div class=\"badge-container\">\n        <span class=\"badge counter-badge\">"
    + container.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <h4 id=\"keywords-title\" class=\"category-title\">Keywords</h4>\n</div>\n<div class=\"category-main\">\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : alias2),(options={"name":"data","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n</div>";
},"useData":true});

this["HBtemplates"]["templates/publication.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, buffer = 
  " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        <p><span class=\"hyperlink-blue\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.authors : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span>\n        "
    + alias4(((helper = (helper = helpers.journal || (depth0 != null ? depth0.journal : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"journal","hash":{},"data":data}) : helper)))
    + " <strong>";
  stack1 = ((helper = (helper = helpers.journalResourceLocator || (depth0 != null ? depth0.journalResourceLocator : depth0)) != null ? helper : alias2),(options={"name":"journalResourceLocator","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.journalResourceLocator) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</strong>, "
    + alias4(((helper = (helper = helpers.firstPage || (depth0 != null ? depth0.firstPage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstPage","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.lastPage || (depth0 != null ? depth0.lastPage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastPage","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.publicationYear || (depth0 != null ? depth0.publicationYear : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publicationYear","hash":{},"data":data}) : helper)))
    + ") "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.dbXrefs : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        </p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.abstractText : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.program(12, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n        <p><a href=\""
    + alias4(((helper = (helper = helpers.localUrl || (depth0 != null ? depth0.localUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"localUrl","hash":{},"data":data}) : helper)))
    + "\"  target='_parent'>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></p>";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.initials || (depth0 != null ? depth0.initials : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initials","hash":{},"data":data}) : helper)))
    + ". , ";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.medAbbrev || (depth0 != null ? depth0.medAbbrev : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"medAbbrev","hash":{},"data":data}) : helper)))
    + " ";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "["
    + container.escapeExpression(((helper = (helper = helpers.databaseName || (depth0 != null ? depth0.databaseName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"databaseName","hash":{},"data":data}) : helper)))
    + " : "
    + ((stack1 = container.invokePartial(partials["external-link"],depth0,{"name":"external-link","hash":{"text":(depth0 != null ? depth0.accession : depth0),"href":(depth0 != null ? depth0.resolvedUrl : depth0)},"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "] ";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "        <button class=\"btn btn-primary btn-xs collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse"
    + alias4(((helper = (helper = helpers.publicationId || (depth0 != null ? depth0.publicationId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publicationId","hash":{},"data":data}) : helper)))
    + alias4(alias5((depths[1] != null ? depths[1].parentId : depths[1]), depth0))
    + "\" aria-expanded=\"false\" aria-controls=\"collapse"
    + alias4(((helper = (helper = helpers.publicationId || (depth0 != null ? depth0.publicationId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publicationId","hash":{},"data":data}) : helper)))
    + alias4(alias5((depths[1] != null ? depths[1].parentId : depths[1]), depth0))
    + "\">\n            <span class=\"pubDisplayStatus\"></span> abstract\n        </button>\n        <div class=\"collapse\" id=\"collapse"
    + alias4(((helper = (helper = helpers.publicationId || (depth0 != null ? depth0.publicationId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publicationId","hash":{},"data":data}) : helper)))
    + alias4(alias5((depths[1] != null ? depths[1].parentId : depths[1]), depth0))
    + "\">\n            <div class=\"panel panel-info\">\n                <div class=\"panel-heading\">\n                    <h3 class=\"panel-title\">Abstract</h3>\n                </div>\n                <div class=\"panel-body\">"
    + alias4(((helper = (helper = helpers.abstractText || (depth0 != null ? depth0.abstractText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"abstractText","hash":{},"data":data}) : helper)))
    + "</div>\n            </div>\n        </div>";
},"12":function(container,depth0,helpers,partials,data) {
    return "No Abstract available";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.crossRef : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = "";

  stack1 = ((helper = (helper = helpers.crossRef || (depth0 != null ? depth0.crossRef : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"crossRef","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.crossRef) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <p>"
    + ((stack1 = (helpers.linkTo || (depth0 && depth0.linkTo) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.name : depth0),(depth0 != null ? depth0.url : depth0),{"name":"linkTo","hash":{},"data":data})) != null ? stack1 : "")
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, buffer = 
  "<div class=\"publication-container\">\n    ";
  stack1 = ((helper = (helper = helpers.publication || (depth0 != null ? depth0.publication : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"publication","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(14, data, 0, blockParams, depths),"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.publication) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
},"usePartial":true,"useData":true,"useDepths":true});

this["HBtemplates"]["templates/xrefs.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n    <div class=\"row\">\n        <div class=\"col-lg-4 col-md-2 col-sm-12 col-xs-12\">\n            <h4 class=\"hidden-sm hidden-xs\" style=\"font-weight:200;text-align:right;margin-top:2px;\"> "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h4>\n            <h4 class=\"hidden-lg hidden-md\" style=\"font-weight:200;text-align:left;margin-top:2px; margin-left:15px;\"> "
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " </h4>\n        </div>\n        <div class=\"col-lg-8 col-md-10 col-sm-12 col-xs-12\">\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", buffer = 
  "            <div class=\"row\" style=\"margin-bottom:5px;\">\n                <div class=\"col-md-3 col-sm-3 col-xs-4\" style=\"padding:0px;\">\n                    <p style=\"font-size:1em;padding:2px 12px 0px 20px; margin-bottom:0px;text-align:right;overflow: hidden;display: block;text-overflow:ellipsis;\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\n                </div>\n                <div class=\"col-md-9 col-sm-9 col-xs-8\">\n";
  stack1 = ((helper = (helper = helpers.xrefs || (depth0 != null ? depth0.xrefs : depth0)) != null ? helper : alias2),(options={"name":"xrefs","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.xrefs) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                </div>\n            </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <div class=\"btn-group hidden-xs\" role=\"group\">\n                            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.prefix : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                            <a class=\"btn btn-xs selectable\" href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"  target=\"_blank\" style=\"color:#C50063;border:1px solid #C50063;text-align:left;\">"
    + alias4(((helper = (helper = helpers.accession || (depth0 != null ? depth0.accession : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"accession","hash":{},"data":data}) : helper)))
    + "</a>\n                                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.suffix : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                        </div>\n                        <div class=\"row hidden-lg hidden-md hidden-sm\">\n                            <div class=\"btn-group col-xs-12\" role=\"group\" style=\"padding:0px;\">\n                                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.prefix : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                                <a class=\"btn btn-xs selectable\" href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"  target=\"_blank\" style=\"color:#C50063;border:1px solid #C50063;text-align:left;\">"
    + alias4(((helper = (helper = helpers.accession || (depth0 != null ? depth0.accession : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"accession","hash":{},"data":data}) : helper)))
    + "</a>\n                                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.suffix : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                            </div>\n                        </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<label class=\"btn btn-xs\" style=\"margin:0px;color:white;border:1px solid #C50063;background-color:rgba(197, 0, 99, 0.75)\">"
    + container.escapeExpression(((helper = (helper = helpers.prefix || (depth0 != null ? depth0.prefix : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"prefix","hash":{},"data":data}) : helper)))
    + " </label>";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<label style=\"margin:0px;font-weight:300;margin-left:5px;padding:1px 5px;border-radius:0px 3px 3px 0px;background-color:#f4f4f4; color:#999;border:1px solid #999;font-size:12px;line-height:18px;\"> "
    + container.escapeExpression(((helper = (helper = helpers.suffix || (depth0 != null ? depth0.suffix : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"suffix","hash":{},"data":data}) : helper)))
    + " </label>";
},"9":function(container,depth0,helpers,partials,data) {
    return "<hr style=\"margin:0px 50px 5px\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", buffer = 
  "\n<div id=\"xrefs-header\" style=\"border-bottom: 1px solid #E7EAEC;margin-bottom: 15px;padding-bottom: 5px;\">\n<div style=\"display:inline-block;\">\n        <span class=\"badge\" style=\"border-radius:70%;border: 2px solid black;color:#C50063;background-color:white;padding:8px 8px;margin-right:10px;vertical-align:middle;min-width:32px;\">"
    + container.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"count","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<h4 id=\"keywords-title\" style=\"display:inline-block;vertical-align:middle;\">Further external links</h4></div>\n<div style=\"margin-top:20px;\">\n\n";
  stack1 = ((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : alias2),(options={"name":"data","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.data) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
},"useData":true});