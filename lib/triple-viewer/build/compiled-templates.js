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
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <tr id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " class=\""
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias2).call(alias1,(depth0 != null ? depth0.category : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " general-info\" >\n            <td>"
    + alias4(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category","hash":{},"data":data}) : helper)))
    + "</td>\n            <td style=\"text-align:right\">"
    + alias4(((helper = (helper = helpers.length || (depth0 != null ? depth0.length : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"length","hash":{},"data":data}) : helper)))
    + "</td>\n            <td style=\"text-align:center\"><a class=\"featPosition\" href=\"javascript:;\">"
    + ((stack1 = (helpers.position || (depth0 && depth0.position) || alias2).call(alias1,(depth0 != null ? depth0.length : depth0),{"name":"position","hash":{},"data":data})) != null ? stack1 : "")
    + "</a></td>\n            <td>"
    + ((stack1 = ((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.variant : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.proteotypicity : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.quality : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.source : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.program(15, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "        </tr>\n        <tr class=\""
    + ((stack1 = (helpers.className || (depth0 && depth0.className) || alias2).call(alias1,(depth0 != null ? depth0.category : depth0),{"name":"className","hash":{},"data":data})) != null ? stack1 : "")
    + " detailed-info\">\n            <td colspan=\"6\" style=\"word-break: break-all\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.source : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n\n            <!--<td>-->\n             <!--"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.evidence : depth0),{"name":"each","hash":{},"fn":container.program(36, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "-->\n            <!--</td>-->\n        </tr>\n        ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.source : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.externalDb : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.crossRef : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.crossRef || (depth0 != null ? depth0.crossRef : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"crossRef","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.crossRef) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return " ; "
    + container.escapeExpression(((helper = (helper = helpers.dbName || (depth0 != null ? depth0.dbName : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"dbName","hash":{},"data":data}) : helper)))
    + " : "
    + ((stack1 = (helpers.linkTo || (depth0 && depth0.linkTo) || alias2).call(alias1,(depth0 != null ? depth0.name : depth0),(depth0 != null ? depth0.url : depth0),{"name":"linkTo","hash":{},"data":data})) != null ? stack1 : "")
    + " ";
},"9":function(container,depth0,helpers,partials,data) {
    return " <span class=\"nonProteotypic\">found in other entries</span>";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span style=\"background:#B6BCC5;color:#fff;padding: 0px 5px;\">•</span><span style=\"background:#DEDEDE;color:#999;padding: 0px 5px;\">"
    + container.escapeExpression(((helper = (helper = helpers.quality || (depth0 != null ? depth0.quality : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"quality","hash":{},"data":data}) : helper)))
    + "</span>";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <td style=\"text-align:right\"><span class=\"evidenceNumber\">"
    + container.escapeExpression(((helper = (helper = helpers.evidenceLength || (depth0 != null ? depth0.evidenceLength : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"evidenceLength","hash":{},"data":data}) : helper)))
    + "</span></td>\n            <td><span style=\"color:black;\">Evidences</span></td>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "            <td></td>\n            <td></td>\n";
},"17":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<div class=\"evidenceLine\"><div class=\"evidenceArrow\">&#10549;</div>  Evidence "
    + alias3((helpers.math || (depth0 && depth0.math) || alias2).call(alias1,(data && data.index),1,{"name":"math","hash":{},"data":data}))
    + "<span class=\"evidenceCodeName\">"
    + alias3(((helper = (helper = helpers.evidenceCodeName || (depth0 != null ? depth0.evidenceCodeName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"evidenceCodeName","hash":{},"data":data}) : helper)))
    + "</span>\n            <span class=\"evidenceSource\">"
    + alias3(((helper = (helper = helpers.assignedBy || (depth0 != null ? depth0.assignedBy : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"assignedBy","hash":{},"data":data}) : helper)))
    + "</span>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.publicationMD5 : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n                <div style=\"padding-left:10px;border-left:1px solid darkgray;margin-right:10px;\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.publicationMD5 : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.program(32, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n                </div>";
},"18":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0["abstract"] : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<button class=\"btn btn-primary btn-xs\" type=\"button\" style=\"margin-left:5px\" data-toggle=\"collapse\" data-target=\"#collapse"
    + alias4(((helper = (helper = helpers.pubId || (depth0 != null ? depth0.pubId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pubId","hash":{},"data":data}) : helper)))
    + alias4(alias5((depths[3] != null ? depths[3].id : depths[3]), depth0))
    + "\"  aria-expanded=\"false\" aria-controls=\"collapse"
    + alias4(((helper = (helper = helpers.pubId || (depth0 != null ? depth0.pubId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pubId","hash":{},"data":data}) : helper)))
    + alias4(alias5((depths[3] != null ? depths[3].id : depths[3]), depth0))
    + "\">\n                    abstract\n                </button>";
},"21":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    <p style=\"color:#6a90d9;\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.authors : depth0),{"name":"each","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p>\n                    <p>"
    + alias4(((helper = (helper = helpers.journal || (depth0 != null ? depth0.journal : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"journal","hash":{},"data":data}) : helper)))
    + " <strong>"
    + alias4(((helper = (helper = helpers.volume || (depth0 != null ? depth0.volume : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"volume","hash":{},"data":data}) : helper)))
    + "</strong>, "
    + alias4(((helper = (helper = helpers.firstPage || (depth0 != null ? depth0.firstPage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstPage","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.lastPage || (depth0 != null ? depth0.lastPage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastPage","hash":{},"data":data}) : helper)))
    + " ("
    + alias4(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"year","hash":{},"data":data}) : helper)))
    + ") "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.dbXrefs : depth0),{"name":"each","hash":{},"fn":container.program(26, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p>\n                    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["abstract"] : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0, blockParams, depths),"inverse":container.program(30, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>";
},"24":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.initials || (depth0 != null ? depth0.initials : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"initials","hash":{},"data":data}) : helper)))
    + ". , ";
},"26":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "["
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " : "
    + ((stack1 = (helpers.linkTo || (depth0 && depth0.linkTo) || alias2).call(alias1,(depth0 != null ? depth0.accession : depth0),(depth0 != null ? depth0.url : depth0),{"name":"linkTo","hash":{},"data":data})) != null ? stack1 : "")
    + "] ";
},"28":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"collapse\" id=\"collapse"
    + alias4(((helper = (helper = helpers.pubId || (depth0 != null ? depth0.pubId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pubId","hash":{},"data":data}) : helper)))
    + alias4(container.lambda((depths[3] != null ? depths[3].id : depths[3]), depth0))
    + "\" style=\"margin-top:5px;\">\n                        <div class=\"panel panel-info\"><div class=\"panel-heading\">\n                            <h3 class=\"panel-title\">Abstract</h3>\n                        </div><div class=\"panel-body\">"
    + alias4(((helper = (helper = helpers["abstract"] || (depth0 != null ? depth0["abstract"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"abstract","hash":{},"data":data}) : helper)))
    + "</div></div>\n                    </div>";
},"30":function(container,depth0,helpers,partials,data) {
    return "No Abstract available";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.crossRef : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options;

  stack1 = ((helper = (helper = helpers.crossRef || (depth0 != null ? depth0.crossRef : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"crossRef","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.crossRef) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { return stack1; }
  else { return ''; }
},"34":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>"
    + ((stack1 = (helpers.linkTo || (depth0 && depth0.linkTo) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.name : depth0),(depth0 != null ? depth0.url : depth0),{"name":"linkTo","hash":{},"data":data})) != null ? stack1 : "")
    + "</p>";
},"36":function(container,depth0,helpers,partials,data) {
    return "-->\n                <!--<div>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div>-->\n                <!--";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div id=\"featuresTableTitle\" style=\"border-bottom: 1px solid #E7EAEC;margin-bottom: 15px;padding-bottom: 5px;\">\n    <div style=\"display:inline-block;\">\n            <span class=\"badge\"\n                  style=\"border-radius:70%;border: 2px solid black;color:#C50063;background-color:white;padding:8px 8px;margin-right:10px;vertical-align:middle;\">"
    + container.escapeExpression(((helper = (helper = helpers.featuresLength || (depth0 != null ? depth0.featuresLength : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"featuresLength","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <h4 id=\"test\" style=\"display:inline-block;vertical-align:middle;\">Features</h4></div>\n<div id=\"featTableScroller\" style=\"height:500px;overflow: auto\">\n    <table id= \"featTable\" class=\"table table-striped table-fixed\" style=\"font-size:11px;\">\n        <thead>\n        <tr>\n            <th class=\"featName\" class=\"col-md-2\">Name</th>\n            <th class=\"col-md-1\"  style=\"text-align:right\">Length</th>\n            <th style=\"text-align:center\" class=\"col-md-2\">Position</th>\n            <th class=\"col-md-5\">Description</th>\n            <th style=\"text-align:center\" colspan=\"2\" class=\"col-md-2\">Evidence</th>\n        </tr>\n        </thead>\n        <tbody>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.features : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tbody>\n    </table>\n</div>";
},"useData":true,"useDepths":true});

this["HBtemplates"]["templates/filter.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "                <label class=\"checkbox-inline\">\n                    <input type=\"checkbox\" id="
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
    + " value=\"option1\" checked>"
    + alias1(container.lambda(depth0, depth0))
    + "\n                </label>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n    <div class=\"panel panel-default\" style=\"margin:20px 20px 0px;display:inline-block\">\n        <div class=\"panel-heading\"\n             style=\"display:inline-block;background:#F8F8F8;padding:0px 15px;width:80px;height:100%;border-color:#F8F8F8;border-right:1px #ddd solid;\">\n            <h5 style=\"color:#777;padding:0px;height:10px\">FILTER </h5></div>\n        <div class=\"panel-body\" style=\"padding:0px;display:inline-block;\">\n            <div id=\"filtering\" style=\"margin-left: 15px;margin-right: 15px\">\n                <label class=\"checkbox-inline\">\n                    <input type=\"checkbox\" id=\"allFilters\" value=\"option0\" checked> All/None\n                </label>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            </div>\n        </div>\n    </div>\n";
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