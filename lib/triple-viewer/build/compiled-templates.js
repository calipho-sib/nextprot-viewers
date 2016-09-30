this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["templates/crossRef.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "            <dl>\n                <dt>"
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</dt>\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </dl>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", buffer = 
  "                <dd>"
    + container.escapeExpression(((helper = (helper = helpers.dBName || (depth0 != null ? depth0.dBName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dBName","hash":{},"data":data}) : helper)))
    + " : ";
  stack1 = ((helper = (helper = helpers.crossLink || (depth0 != null ? depth0.crossLink : depth0)) != null ? helper : alias2),(options={"name":"crossLink","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.crossLink) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.additionalInfos : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</dd>\n\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.preLink : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = ((helper = (helper = helpers.link_to || (depth0 != null ? depth0.link_to : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"link_to","hash":{},"data":data}) : helper))) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.preLink || (depth0 != null ? depth0.preLink : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"preLink","hash":{},"data":data}) : helper)))
    + " : ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.additionalInfos || (depth0 != null ? depth0.additionalInfos : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"additionalInfos","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.additionalInfos) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return " [ "
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"value","hash":{},"data":data}) : helper)))
    + " ]";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"crossRefTitle\">\n    <h2>Further external links</h2>\n</div>\n\n<div id=\"crossRefLinks\">\n    <div class=\"row\">\n        <div class=\"col-md-7 col-xs-6\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.type : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>";
},"useData":true});

this["HBtemplates"]["templates/featureTable2.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "        <tbody>\n        <th colspan=\"6\" class=\""
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias2).call(alias1,(depth0 != null ? depth0.group : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " general-info table-section-header\"><div class=\"grey-x\">"
    + container.escapeExpression(((helper = (helper = helpers.group || (depth0 != null ? depth0.group : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"group","hash":{},"data":data}) : helper)))
    + "</div></th>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.features : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </tbody>";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <tr id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " class=\""
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias2).call(alias1,(depth0 != null ? depth0.category : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " general-info\" >\n            <td>"
    + alias4(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category","hash":{},"data":data}) : helper)))
    + "</td>\n            <td class=\"text-align-right\"><a class=\"featPosition\" href=\"javascript:;\">"
    + ((stack1 = (helpers.position || (depth0 && depth0.position) || alias2).call(alias1,(depth0 != null ? depth0.length : depth0),{"name":"position","hash":{},"data":data})) != null ? stack1 : "")
    + "</a></td>\n            <td class=\"text-align-right\">"
    + alias4(((helper = (helper = helpers.length || (depth0 != null ? depth0.length : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"length","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + ((stack1 = ((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.variant : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.proteotypicity : depth0),{"name":"unless","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = container.invokePartial(partials["quality-label"],depth0,{"name":"quality-label","hash":{"qualityQualifier":(depth0 != null ? depth0.quality : depth0)},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.source : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.program(15, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "        </tr>\n        <tr class=\""
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias2).call(alias1,(depth0 != null ? depth0.category : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " detailed-info\">\n            <td colspan=\"6\" class=\"table-row-evidence\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.source : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </td>\n        </tr>\n        ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.source : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.externalDb : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.crossRef : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.crossRef || (depth0 != null ? depth0.crossRef : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"crossRef","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.crossRef) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return " ; "
    + container.escapeExpression(((helper = (helper = helpers.dbName || (depth0 != null ? depth0.dbName : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"dbName","hash":{},"data":data}) : helper)))
    + " : "
    + ((stack1 = (helpers.linkTo || (depth0 && depth0.linkTo) || alias2).call(alias1,(depth0 != null ? depth0.name : depth0),(depth0 != null ? depth0.url : depth0),{"name":"linkTo","hash":{},"data":data})) != null ? stack1 : "")
    + " ";
},"10":function(container,depth0,helpers,partials,data) {
    return " <span class=\"nonProteotypic\">found in other entries</span>";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "            <td class=\"text-align-right\"><span class=\"evidenceNumber\">"
    + container.escapeExpression(((helper = (helper = helpers.evidenceLength || (depth0 != null ? depth0.evidenceLength : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"evidenceLength","hash":{},"data":data}) : helper)))
    + "</span></td>\n            <td>\n                <div class=\"reference-label-container\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.evidenceSources : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n            </td>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"reference-label\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "            <td></td>\n            <td></td>\n";
},"17":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.evidence,depth0,{"name":"evidence","hash":{"url":((stack1 = (depth0 != null ? depth0.crossRef : depth0)) != null ? stack1.url : stack1),"accession":((stack1 = (depth0 != null ? depth0.crossRef : depth0)) != null ? stack1.name : stack1),"source":(depth0 != null ? depth0.assignedBy : depth0),"codeName":(depth0 != null ? depth0.evidenceCodeName : depth0)},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                    <div class=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.publicationMD5 : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n"
    + ((stack1 = container.invokePartial(partials.publication,depth0,{"name":"publication","hash":{"parentId":(helpers.concat || (depth0 && depth0.concat) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.id : depth0),(depths[1] != null ? depths[1].id : depths[1]),{"name":"concat","hash":{},"data":data})},"data":data,"indent":"                        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                    </div>\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "evidence-publication";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"features-table-title\" class=\"category-header\">\n    <div class=\"badge-container\">\n            <span class=\"badge counter-badge\">"
    + container.escapeExpression(((helper = (helper = helpers.featuresLength || (depth0 != null ? depth0.featuresLength : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"featuresLength","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <h4 id=\"title\" class=\"category-title\">Sequence feature(s)</h4></div>\n<div id=\"featTableScroller\" class=\"section-scroller\">\n    <table id=\"featTable\" class=\"table table-striped table-fixed\">\n        <thead>\n        <tr>\n            <th class=\"featName\" class=\"col-md-2\">Name</th>\n            <th class=\"col-md-2 text-align-right\">Position</th>\n            <th class=\"col-md-1 text-align-right\">Length</th>\n            <th class=\"col-md-5\">Description</th>\n            <th colspan=\"2\" class=\"col-md-2 text-align-left\">Evidence</th>\n        </tr>\n        </thead>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.groupedFeatures : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </table>\n</div>\n";
},"usePartial":true,"useData":true,"useDepths":true});

this["HBtemplates"]["templates/filter.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "                <label class=\"filter-box\">\n                    <input type=\"checkbox\" id="
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
    + " value=\"option1\" checked>"
    + alias1(container.lambda(depth0, depth0))
    + "\n                </label>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n    \n    <div>\n        <div class=\"filter-heading\">\n        <span class=\"fa fa-filter\"></span>\n        <h5>FILTER</h5>\n        </div><div class=\"filter-body\">\n            <div id=\"filtering\">\n                <button class=\"btn btn-default btn-sm\" id=\"allFilters\">All/None</button>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            </div>\n        </div>\n    </div>\n    \n";
},"useData":true});

this["HBtemplates"]["templates/isoformChoice.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <li role=\"presentation\"><a class=\"isoformNames\" href=\"#"
    + alias4(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "\" role=\"tab\" data-toggle=\"tab\" title=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.mainEntityName : depth0)) != null ? stack1.value : stack1), depth0))
    + "\">"
    + alias4(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "</a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <li role=\"presentation\" class=\"dropdown\" style=\"z-index:20\">\n            <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-expanded=\"false\"><span\n                    id=\"extendIsoformChoice\">More</span><span style=\"margin-left:5px;\" class=\"caret\"></span></a>\n            <ul id=\"moreIsoforms\" class=\"dropdown-menu\" role=\"menu\">\n                <li role=\"presentation\"><p href=\"#\" role=\"tab\" data-toggle=\"tab\"\n                                           style=\"pointer-events:none;cursor:default;padding: 3px 20px;\">Others\n                    Isoforms</p></li>\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.more : stack1), depth0),{"name":"isoforms.more","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <li role=\"presentation\"><a class=\"isoformNames\" href=\"#"
    + alias4(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "\" role=\"tab\" data-toggle=\"tab\" title=\""
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.mainEntityName : depth0)) != null ? stack1.value : stack1), depth0))
    + "\">"
    + alias4(((helper = (helper = helpers.uniqueName || (depth0 != null ? depth0.uniqueName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uniqueName","hash":{},"data":data}) : helper)))
    + "</a>\n                </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div role=\"tabpanel\">\n    <div class=\"navbar-brand \" style=\"padding:10px 15px;color:#C50063;height:auto;font-size:20px;\">Isoforms</div>\n    <ul class=\"nav nav-tabs\" role=\"tablist\" style=\"border:none\">\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.visible : stack1), depth0),{"name":"isoforms.visible","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.isoforms : depth0)) != null ? stack1.more : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <li><a id=\"isoformMap\" href=\"javascript:;\" style=\"color:#007800;font-size:16px;padding-top: 8px;\">See isoforms</a></li>\n    </ul>\n</div>";
},"useData":true});