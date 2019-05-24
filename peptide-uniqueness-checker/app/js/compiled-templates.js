this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["app/templates/apiCallFail.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"info-box info-red\">\n    <div class=\"info-icon\">\n        <span class=\"glyphicon glyphicon-exclamation-sign\"></span>\n        </div><div class=\"info-content\">\n        <span style=\"font-weight:300\">\n            <span style=\"font-size:20px;font-weight:500\">Impossible to get the data !</span>\n            <span>"
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</span>\n        </span>\n    </div>\n</div>";
},"useData":true});

this["HBtemplates"]["app/templates/limitExceeded.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"info-box info-red\">\n    <div class=\"info-icon\">\n        <span class=\"glyphicon glyphicon-exclamation-sign\"></span>\n        </div><div class=\"info-content\">\n        <span style=\"font-weight:300\">\n            <span style=\"font-size:20px;font-weight:500\">Limit exceeded !</span>\n            <span>You have exceeded the maximum number of <strong>1000</strong> peptides.</span>\n        </span>\n    </div>\n</div>";
},"useData":true});

this["HBtemplates"]["app/templates/matchingEntries.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "proteoWithVariant";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.unless.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.onlyWithVariant : stack1),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "proteoWithoutVariant";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.withoutVariant : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div  class=\"panel panel-success panel-wo-variant"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.pseudoWOV : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" style=\"margin:0px;min-height: 120px;\">\n";
},"8":function(container,depth0,helpers,partials,data) {
    return " panel-pseudo";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.nullWithoutVariant : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    return "<div class=\"panel panel-default panel-wo-variant\" style=\"margin:0px;min-height: 120px;\">\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"panel panel-info panel-wo-variant\" style=\"margin:0px;min-height: 120px;\">\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "                        <li>No entries found</li>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.withoutVariant : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <li class=\"foundIn\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " <em> ( Gene Name : "
    + alias4(((helper = (helper = helpers.geneName || (depth0 != null ? depth0.geneName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneName","hash":{},"data":data}) : helper)))
    + " )</em>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.identicalSeq : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</li>\n";
},"19":function(container,depth0,helpers,partials,data) {
    return " <span style=\"font-weight:900\">*</span>";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n\n"
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.variant : depth0),{"name":"unless","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                        <li class=\"foundIn\">"
    + container.escapeExpression(((helper = (helper = helpers.isoform || (depth0 != null ? depth0.isoform : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"isoform","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.identicalSeq : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</li>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.withVariant : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.program(28, data, 0),"data":data})) != null ? stack1 : "")
    + "\n";
},"26":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div  class=\"panel panel-success panel-w-variant"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.pseudoWV : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" style=\"margin:0px;min-height: 120px;\">\n        ";
},"28":function(container,depth0,helpers,partials,data) {
    return "<div class=\"panel panel-info panel-w-variant\" style=\"margin:0px;min-height: 120px;\">";
},"30":function(container,depth0,helpers,partials,data) {
    return "                        <li>No other entries found</li>\n";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.withVariant : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"33":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <li class=\"variantIntoAccount\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " <em> ( Gene Name : "
    + alias4(((helper = (helper = helpers.geneName || (depth0 != null ? depth0.geneName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"geneName","hash":{},"data":data}) : helper)))
    + " )</em></li>\n";
},"35":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"36":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.variant : depth0),{"name":"if","hash":{},"fn":container.program(37, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"37":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "                        <li class=\"variantIntoAccount\">"
    + alias1(((helper = (helper = helpers.isoform || (depth0 != null ? depth0.isoform : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"isoform","hash":{},"data":data}) : helper)))
    + " ("
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.positions : depth0)) != null ? stack1.first : stack1), depth0))
    + " : "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.variant : depth0)) != null ? stack1.original : stack1), depth0))
    + " →\n                            "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.variant : depth0)) != null ? stack1.variant : stack1), depth0))
    + ")\n                        </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=helpers.blockHelperMissing, alias6=container.lambda, buffer = 
  "<div id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " class=\"col-md-4 peptide "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.withVariant : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.withoutVariant : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n<div id=\"proteoBlock\" class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n        <h5 class=\"text-center\" style=\"margin:0px;\">"
    + alias4(((helper = (helper = helpers.peptide || (depth0 != null ? depth0.peptide : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"peptide","hash":{},"data":data}) : helper)))
    + "</h5>\n    </div>\n<div id=\"proteoBody\" class=\"panel-body\" style=\"padding:0px;height:240px;overflow:auto;\">\n                        \n    <div class=\"pull-right\" style=\"margin-top:8px;margin-right: 15px;\">\n        <button id=\"showIsoforms\" type=\"button\" class=\"btn btn-default btn-xs\">Show isoforms</button>\n    </div>\n    <div id=\"proteomeProperties\">\n        <!--<div style=\"border-bottom:1px solid #E7EAEC;margin-top: -10px;margin-bottom:5px;\">-->\n        <!--<h5 id=\"proteotypicitySentence\"></h5>-->\n        <!--</div>-->\n";
  stack1 = ((helper = (helper = helpers.proteotypicity || (depth0 != null ? depth0.proteotypicity : depth0)) != null ? helper : alias2),(options={"name":"proteotypicity","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.proteotypicity) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "            <div class=\"panel-heading\" style=\"padding:1px 15px\">\n                <h5 style=\"text-align:left;padding-left:25px;\"><span class=\"glyphicon "
    + alias4(alias6(((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.iconWOV : stack1), depth0))
    + "\"></span> Entry mapping</h5>\n            </div>\n            <div class=\"panel-body\">\n                <div class=\"showEntry\" style=\"display:block\">\n                    <ul>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.nullWithoutVariant : stack1),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
  stack1 = ((helper = (helper = helpers.entries || (depth0 != null ? depth0.entries : depth0)) != null ? helper : alias2),(options={"name":"entries","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.entries) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </ul>\n                </div>\n                <div class=\"showIsoform\" style=\"display:none\">\n                    <ul>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.nullWithoutVariant : stack1),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                        ";
  stack1 = ((helper = (helper = helpers.isoforms || (depth0 != null ? depth0.isoforms : depth0)) != null ? helper : alias2),(options={"name":"isoforms","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.isoforms) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </ul>\n                </div>\n            </div>\n        </div>\n";
  stack1 = ((helper = (helper = helpers.proteotypicity || (depth0 != null ? depth0.proteotypicity : depth0)) != null ? helper : alias2),(options={"name":"proteotypicity","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.proteotypicity) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "            <div class=\"panel-heading\" style=\"padding:1px 15px\">\n                <h5><span class=\"glyphicon "
    + alias4(alias6(((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.iconWV : stack1), depth0))
    + "\"></span> Additional mappings with known variants</h5>\n            </div>\n            <div class=\"panel-body\">\n                <div class=\"showEntry\" style=\"display:block\">\n                    <ul>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.nullWithVariant : stack1),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
  stack1 = ((helper = (helper = helpers.entries || (depth0 != null ? depth0.entries : depth0)) != null ? helper : alias2),(options={"name":"entries","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.entries) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "                    </ul>\n                </div>\n                <div class=\"showIsoform\" style=\"display:none\">\n                    <ul>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.proteotypicity : depth0)) != null ? stack1.nullWithVariant : stack1),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                        ";
  stack1 = ((helper = (helper = helpers.isoforms || (depth0 != null ? depth0.isoforms : depth0)) != null ? helper : alias2),(options={"name":"isoforms","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.isoforms) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n    </div>\n    </div>\n    </div>";
},"useData":true});

this["HBtemplates"]["app/templates/notFound.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"info-box info-red\">\n    <div class=\"info-icon\">\n        <span class=\"glyphicon glyphicon-exclamation-sign\"></span>\n        </div><div class=\"info-content\">\n        <span style=\"font-weight:300\">\n            <span style=\"font-size:20px;font-weight:500\">Peptide not found !</span> \n            The peptide <strong>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "</strong> has not been found in our database. Please check again the sequence or enter a new peptide.\n        </span>\n    </div>\n</div>";
},"useData":true});

this["HBtemplates"]["app/templates/warningPanel.tmpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"info-box info-red\">\n    <div class=\"info-icon\">\n        <span class=\"glyphicon glyphicon-exclamation-sign\"></span>\n        </div><div class=\"info-content\">\n        <span style=\"font-weight:300\">\n            <span style=\"font-size:20px;font-weight:500\">Warning !</span>\n            <span>"
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</span>\n        </span>\n    </div>\n</div>";
},"useData":true});