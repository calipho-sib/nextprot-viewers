/*
* @File: generic-protein-expression-view.js
* @Description: Generic protein expression view for Human Body
* @Author: JinJin Lin
* @Email:   jinjin.lin@outlook.com
* @Date:   2016-03-12 15:20:55
* @Last Modified time: 2016-05-08 20:44:24
* All copyright reserved
*/

;(function(global) {

    'use strict';

    var HeatMapTable = function(argv) {
        return new HeatMapTable.init(argv);
    }

    HeatMapTable.prototype = {

        initHandlebars : function() {
            var self = this;
            //Share template for recursively generate children
            Handlebars.registerPartial('create-children', HBtemplates['templates/heatmap-tree.tmpl']);

            //Create column header
            Handlebars.registerHelper('createHeader', function(columnName, block) {
                var result = {};
                result.columnWidth = self.columnWidth;
                result.columnName = columnName;
                return block.fn(result);
            });

            //Create group header
            Handlebars.registerHelper('createHeaderGroups', function(headerGroups, block) {
                var result = {};
                result.groupWidth = (parseInt(self.columnWidth) * headerGroups.holdColumns) + "px";
                result.groupName = headerGroups.groupName;
                return block.fn(result);
            });

            Handlebars.registerHelper('forCreateCircle', function(values, block) {
                var accum = '';

                for(var i = 0; i < self.header.length; i++) {
                    var result = {};
                    result.columnClass = self.header[i].toLowerCase();
                    result.columnWidth = self.columnWidth;
                    if (values && values[i]) {
                        if (self.valueToColor[values[i]]) {
                            if (self.valueToColor[values[i]].cssClass) {
                                result.circleColorClass = self.valueToColor[values[i]].cssClass;
                            } else if (self.valueToColor[values[i]].color) {
                                result.circleColorStyle = self.valueToColor[values[i]].color;
                            }
                        } else {
                            result.circleColorStyle = "black";
                        }
                    }

                    accum += block.fn(result);
                }
                return accum;
            });

            Handlebars.registerHelper('addDetail', function(detailData) {
                var source   = $('#'+self.detailTemplate).html();
                var template = Handlebars.compile(source);
                return new Handlebars.SafeString(template(detailData));
            });
        },

        showHeatMapSkeleton: function() {
            var template = HBtemplates['templates/heatmap.tmpl'];
            var skeleton = template(this.data);
            $(this.heatmapTable).append(skeleton);
        },

        showRows : function() {
            var rows = HBtemplates['templates/heatmap-tree.tmpl'](this.data);
            $(this.heatmapTable).find(".heatmap-rows").empty().append(rows);

            this.initClickEvent();
        },

        expandByFilterString: function(root, filterString) {
            var children = root.children("li");
            var found = false;
            var rowLabel = root.parent().children(".heatmap-row").children(".heatmap-rowLabel").children(".rowLabel").text();
            for (var i = 0; i < children.length; i++) {
                found |= this.expandByFilterString($(children[i]).children(".heatmap-closed"), filterString);
            }
            if (found) {
                root.show()
                   .toggleClass("heatmap-closed heatmap-opened")
                   .parent().children(".heatmap-row").find(".glyphicon").toggleClass("glyphicon-plus glyphicon-minus");
            }
            return found || rowLabel.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
        },

        initClickEvent : function() {
            var self = this;
            //Collapse the table in the begining
            $(self.heatmapTable).find('.heatmap-rowLabel').parent().parent().children('ul.tree').toggle();

            $(self.heatmapTable).find('.heatmap-rowLabel').click(function () {
                $(this).find(".glyphicon").toggleClass("glyphicon-plus glyphicon-minus")
                $(this).parent().parent().children('ul.tree').toggleClass("heatmap-closed heatmap-opened").toggle(300);
            });

            //Add the click event of collapseAll button
            $(self.heatmapTable).find(".heatmap-collapseAll-btn").click(function() {
                $(self.heatmapTable).find(".heatmap-opened").each(function() {
                    $(this).hide()
                           .toggleClass("heatmap-opened heatmap-closed")
                           .parent().children(".heatmap-row").find(".glyphicon").toggleClass("glyphicon-minus glyphicon-plus");
                });
            });

            // //Add the click event of expandAll button
            $(self.heatmapTable).find(".heatmap-expandAll-btn").click(function() {
                $(self.heatmapTable).find(".heatmap-closed").each(function() {
                    $(this).show()
                           .toggleClass("heatmap-closed heatmap-opened")
                           .parent().children(".heatmap-row").find(".glyphicon").toggleClass("glyphicon-plus glyphicon-minus");
                });
            })

            $(self.heatmapTable).find(".heatmap-reset-btn").click(function() {
                self.data = self.originData;
                self.showRows();
            });

            $(self.heatmapTable).find(".heatmap-filterByRowName-search").click(function() {
                var filterString = $(self.heatmapTable).find(".heatmap-filterByRowName-input").val();
                if (filterString === "") return ;

                self.data = self.filterByRowsLabel(filterString);
                self.showRows();
                self.expandByFilterString($(self.heatmapTable).find(".heatmap-rows"), filterString);
                if (self.data['children'].length === 0) {
                    $(self.heatmapTable).find(".heatmap-rows").append("<p>No result be found.</p>");
                }
            });

            $(self.heatmapTable).find(".heatmap-zoom").each(function() {
                $(this).click(function() {
                    $(this).parent().parent().parent().children(".heatmap-detail").toggle();
                    $(this).toggleClass("glyphicon-zoom-out", "glyphicon-zoom-in");
                });
            });
        },

        loadJSONData : function(data) {
            this.originData = {};
            this.originData['children'] = data.data;
            this.data = this.originData;
            this.data.header = this.header;
            this.data.headerGroups = this.headerGroups;
        },

        loadJSONDataFromURL : function(filePath) {
            var self = this;
            $.getJSON(filePath, function(data) {
                self.loadJSONData(data);
            });
        },

        show : function() {
            this.initHandlebars();
            this.showHeatMapSkeleton();
            this.showRows();
        },

        getValueToColor: function(valuesColorMapping) {
            var valueToColor = {}
            for (var i = 0; i < valuesColorMapping.length; i++) {
                valueToColor[valuesColorMapping[i].value] = {};
                if (valuesColorMapping[i].color) {
                    valueToColor[valuesColorMapping[i].value].color = valuesColorMapping[i].color;
                } else if (valuesColorMapping[i].cssClass) {
                    valueToColor[valuesColorMapping[i].value].cssClass = valuesColorMapping[i].cssClass;
                } else {
                    throw "The value" + values[j].value + "has no color or cssClass";
                }
            }
            return valueToColor
        },

        filterByRowsLabel: function(filterString) {
            return {"children": this.filter(this.originData.children, filterString)};
        },

        filter: function(data, filterString) {
            var newData = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].rowLabel.toLowerCase().indexOf(filterString.toLowerCase()) !== -1) {
                    newData.push(data[i]);
                } else if (data[i].children && data[i].children.length !== 0) {
                    var newChildren = this.filter(data[i].children, filterString);
                    if (newChildren.length !== 0) {
                        data[i].children = newChildren;
                        newData.push(data[i]);
                    }
                }
            }
            return newData;
        },
    }

    HeatMapTable.init = function(argv) {
        this.originData = {};
        this.data = {};
        this.heatmapTable = $("#" + argv.tableID)[0];
        this.header = argv.header;
        if (argv.options) {
            this.detailTemplate = argv.options.detailTemplate;
            this.headerGroups = argv.options.headerGroups;
            this.columnWidth = argv.options.columnWidth || "70px";
            this.valueToColor = this.getValueToColor(argv.options.valuesColorMapping);
        }
    }

    HeatMapTable.init.prototype = HeatMapTable.prototype;

    global.HeatMapTable = HeatMapTable;

}(window));;
this["HBtemplates"] = this["HBtemplates"] || {};

this["HBtemplates"]["templates/heatmap-tree.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>\n    <div class=\"heatmap-row\">\n        <p class=\"heatmap-rowLabel tree-toggler\"><span class=\"glyphicon glyphicon-plus\"></span><span class=\"rowLabel\">"
    + ((stack1 = ((helper = (helper = helpers.rowLabel || (depth0 != null ? depth0.rowLabel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rowLabel","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span><span><a href=\""
    + alias4(((helper = (helper = helpers.linkURL || (depth0 != null ? depth0.linkURL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkURL","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + alias4(((helper = (helper = helpers.linkLabel || (depth0 != null ? depth0.linkLabel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkLabel","hash":{},"data":data}) : helper)))
    + "</a></span></p>\n        <div class=\"pull-right\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.detailData : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.forCreateCircle || (depth0 && depth0.forCreateCircle) || alias2).call(alias1,(depth0 != null ? depth0.values : depth0),{"name":"forCreateCircle","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.detailData : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <ul class=\"tree heatmap-closed\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.children : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                <i class=\"glyphicon glyphicon-zoom-in heatmap-zoom\"></i>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\"heatmap-column "
    + alias4(((helper = (helper = helpers.columnClass || (depth0 != null ? depth0.columnClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"columnClass","hash":{},"data":data}) : helper)))
    + "\", style=\"width:"
    + alias4(((helper = (helper = helpers.columnWidth || (depth0 != null ? depth0.columnWidth : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"columnWidth","hash":{},"data":data}) : helper)))
    + "\">\n                    <i class=\"heatmap-circle "
    + alias4(((helper = (helper = helpers.circleColorClass || (depth0 != null ? depth0.circleColorClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"circleColorClass","hash":{},"data":data}) : helper)))
    + "\" style=\"background-color: "
    + alias4(((helper = (helper = helpers.circleColorStyle || (depth0 != null ? depth0.circleColorStyle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"circleColorStyle","hash":{},"data":data}) : helper)))
    + "\"></i>\n                </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"heatmap-detail\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.detailData : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "                <div>\n                "
    + container.escapeExpression((helpers.addDetail || (depth0 && depth0.addDetail) || helpers.helperMissing).call(depth0 != null ? depth0 : {},depth0,{"name":"addDetail","hash":{},"data":data}))
    + "\n                </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["create-children"],depth0,{"name":"create-children","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.children : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

this["HBtemplates"]["templates/heatmap.tmpl"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.createHeaderGroups || (depth0 && depth0.createHeaderGroups) || helpers.helperMissing).call(depth0 != null ? depth0 : {},depth0,{"name":"createHeaderGroups","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <div class=\"heatmap-group "
    + alias4(((helper = (helper = helpers.columnClass || (depth0 != null ? depth0.columnClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"columnClass","hash":{},"data":data}) : helper)))
    + "\" style=\"width: "
    + alias4(((helper = (helper = helpers.groupWidth || (depth0 != null ? depth0.groupWidth : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"groupWidth","hash":{},"data":data}) : helper)))
    + "\">\n                            "
    + alias4(((helper = (helper = helpers.groupName || (depth0 != null ? depth0.groupName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"groupName","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.createHeader || (depth0 && depth0.createHeader) || helpers.helperMissing).call(depth0 != null ? depth0 : {},depth0,{"name":"createHeader","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <div class=\"heatmap-column "
    + alias4(((helper = (helper = helpers.columnClass || (depth0 != null ? depth0.columnClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"columnClass","hash":{},"data":data}) : helper)))
    + "\" style=\"width: "
    + alias4(((helper = (helper = helpers.columnWidth || (depth0 != null ? depth0.columnWidth : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"columnWidth","hash":{},"data":data}) : helper)))
    + "\">\n                            "
    + alias4(((helper = (helper = helpers.columnName || (depth0 != null ? depth0.columnName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"columnName","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"col-md-5\">\n    <div class=\"input-group\">\n        <input type=\"text\" class=\"heatmap-filterByRowName-input form-control\" placeholder=\"Search for...\">\n        <span class=\"input-group-btn\">\n            <button class=\"btn btn-default heatmap-filterByRowName-search\" type=\"button\"><span class=\"fa fa-search treeBtn\" aria-hidden=\"true\"></span>Search</button>\n        </span>\n    </div>\n</div>\n<button class=\"btn btn-default heatmap-reset-btn\"><span class=\"fa fa-refresh treeBtn\" aria-hidden=\"true\"></span>Reset</button>\n<button class=\"btn btn-default heatmap-collapseAll-btn\"><span class=\"fa fa-compress treeBtn\" aria-hidden=\"true\"></span>CollapseAll</button>\n<button class=\"btn btn-default heatmap-expandAll-btn\"><span class=\"fa fa-expand treeBtn\" aria-hidden=\"true\"></span>ExpandAll</button>\n<div class=\"heatmap-body\">\n    <div style=\"overflow:hidden\">\n        <div style=\"overflow:hidden\">\n            <div class=\"pull-right\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.headerGroups : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </div>\n        <div style=\"overflow:hidden\">\n            <div class=\"pull-right\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.header : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n    <ul class=\"tree heatmap-ul heatmap-rows\">\n    </ul>\n</div>";
},"useData":true});