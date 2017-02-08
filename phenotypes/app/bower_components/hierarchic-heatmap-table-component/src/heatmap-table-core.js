;(function(global) {

    'use strict';

    var HeatMapTable = function(argv) { 
        return new HeatMapTable.init(argv);
    }

    HeatMapTable.prototype = {

        initHandlebars : function() {
            var self = this;
            //Share template for recursively generate children
            Handlebars.registerPartial('create-children', HBtemplates['templates/src/heatmap-tree.tmpl']);

            Handlebars.registerHelper('createRow', function(data) {
                var rowTemplate = HBtemplates['templates/src/heatmap-row.tmpl']
                
                var iconHtml = null;
                var result = {};
                result.rowLabel = data.rowLabel;
                result.linkURL = data.linkURL;
                result.linkLabel = data.linkLabel;

                if (data.children.length > 0 || (data.detailData && data.detailData.length > 0)) {
                    result.iconHtml = '<span class="glyphicon glyphicon-plus"></span>';
                } else {
                    result.class = "heatmap-no-cursor";
                    result.iconHtml ='<span class="glyphicon glyphicon-record"></span>';
                }
                return new Handlebars.SafeString(rowTemplate(result));
            }); 

            Handlebars.registerHelper('for', function(n, block) {
                var accum = '';
                for(var i = 0; i < n; ++i)
                    accum += block.fn(i);
                return accum;
            });

            Handlebars.registerHelper('showValue', function(value, block) {
                var valueCssClass = "";
                if (value.hasOwnProperty("value")) {
                    valueCssClass = value['cssClass'];
                    value = value.value;
                }

                var valueTemplate = HBtemplates['templates/src/heatmap-value.tmpl'];
                var circleTemplate = HBtemplates['templates/src/heatmap-circle.tmpl'];

                var result = {};

                result.tip = value;
                result.columnWidth = self.columnWidth;
                result.valueCssClass = valueCssClass;
                if (self.valueToStyle[value]) {
                    if (self.valueToStyle[value].cssClass) {
                        result.circleColorClass = self.valueToStyle[value].cssClass;
                    } else if (self.valueToStyle[value].color) {
                        result.circleColorStyle = self.valueToStyle[value].color;
                    } else if (self.valueToStyle[value].html) {
                        result.valueStyle = self.valueToStyle[value].html;
                        return new Handlebars.SafeString(valueTemplate(result));
                    } else {
                        result.circleColorStyle = "black";
                        return new Handlebars.SafeString(valueTemplate(result));
                    }
                } else {
                    return new Handlebars.SafeString(valueTemplate(result));
                }

                result.valueStyle = circleTemplate(result);

                return new Handlebars.SafeString(valueTemplate(result));
            });

            Handlebars.registerHelper('addDetail', function(detailData) {
                return new Handlebars.SafeString(self.detailTemplate(detailData));
            });

           Handlebars.registerHelper('heatmapCreateHeader', function() {
                if (self.headerTemplate) {
                    return new Handlebars.SafeString(self.headerTemplate(self.headerTemplateData));
                }
            });
        },

        showHeatmapBody: function() {
            $(this.heatmapTable).find(".heatmap-body").remove();

            if (this.heatmapBody) {
                $(this.heatmapTable).append(this.heatmapBody);
            } else {
                var template = HBtemplates['templates/src/heatmap-body.tmpl'];
                this.heatmapBody = template();
                $(this.heatmapTable).append(this.heatmapBody);
            }
        },

        showHeatmapSkeleton: function() {
            var template = HBtemplates['templates/src/heatmap-skeleton.tmpl'];
            var setting = {};
            setting.isShowExportButton = this.isShowExportButton;
            $(this.heatmapTable).append(template(setting));
        },

        showHeatmapRows : function() {
            var self = this;

            this.showLoadingStatus();

            $(this.heatmapTable).find(".heatmap-rows").empty()
           
            var heatmapRowsHTML = $('<ul class="tree heatmap-ul heatmap-rows"></ul>');
            for (var i = 0; i < this.data.length; i++) {
                var row = this.createRow(this.data[i]);
                heatmapRowsHTML.append(row);
            }

            $(this.heatmapTable).find(".heatmap-body").append(heatmapRowsHTML);

            $(this.heatmapTable).find('.heatmap-rowLabel').click(function () {
                $(this).find(".glyphicon").toggleClass("glyphicon-plus glyphicon-minus")
                $(this).parent().parent().children('ul.tree').toggleClass("heatmap-closed heatmap-opened").toggle(300);
            });

            this.hideLoadingStatus();

            $('[data-toggle="tooltip"]').tooltip();
        },

        createRow: function(data) {
            if (data.html) return data.html;

            data.childrenHTML = [];
            if (data.children && data.children.length > 0) {
                for (var i = 0; i < data.children.length; i++) {
                    var childreRowsHTML = new Handlebars.SafeString(this.createRow(data.children[i]));
                    data.childrenHTML.push(childreRowsHTML);
                }
            }
            data.html = this.heatmapTreeTmpl(data);
            return data.html;

        },

        initSearchBoxSource: function (data) {
            this.initSearchBoxSourceList(data);
            this.rowLabelList = [];
            for (var key in this.rowLabelDict) {
                this.rowLabelList.push(key);
            }
            var self = this;
            $.typeahead({
                input: '.heatmap-filterByRowName-input',
                source: {
                    data: this.rowLabelList
                },
                callback: {
                    onClick: function() {
                        $(self.heatmapTable).find(".heatmap-filterByRowName-search").click();
                    }
                }
            });
        },

        initSearchBoxSourceList: function(data) {
            for (var i = 0; i < data.length; i++) {
                this.rowLabelDict[data[i].rowLabel.toLowerCase()] = true;
                if (data[i].children && data[i].children.length > 0) {
                    this.initSearchBoxSourceList(data[i].children);
                }
            }
        },

        expandByFilterString: function(root, filterString, isRoot) {
            var children = root.children("li");
            var found = false;
            var rowLabel = root.parent().children(".heatmap-row").children(".heatmap-rowLabel").children(".rowLabel").text();
            for (var i = 0; i < children.length; i++) {
                found |= this.expandByFilterString($(children[i]).children(".heatmap-closed"), filterString, false);
            }
            if (found && isRoot === false) {
                root.show()
                   .toggleClass("heatmap-closed heatmap-opened")
                   .parent().children(".heatmap-row").find(".glyphicon").toggleClass("glyphicon-plus glyphicon-minus");
            }
            return found || rowLabel.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
        },

        initClickEvent : function() {
            var self = this;

            //Add the click event of collapseAll button
            $(self.heatmapTable).find(".heatmap-collapseAll-btn").click(function() {
                self.showLoadingStatus();
                $(self.heatmapTable).find(".heatmap-opened").each(function() {
                    $(this).hide()
                           .toggleClass("heatmap-opened heatmap-closed")
                           .parent().children(".heatmap-row").find(".glyphicon").toggleClass("glyphicon-minus glyphicon-plus");
                });
                self.hideLoadingStatus();
            });

            //Add the click event of expandAll button
            $(self.heatmapTable).find(".heatmap-expandAll-btn").click(function() {
                self.showLoadingStatus();
                $(self.heatmapTable).find(".heatmap-closed").each(function() {
                    $(this).show()
                           .toggleClass("heatmap-closed heatmap-opened")
                           .parent().children(".heatmap-row").find(".glyphicon").toggleClass("glyphicon-plus glyphicon-minus");
                });
                self.hideLoadingStatus();
            })

            $(self.heatmapTable).find(".heatmap-reset-btn").click(function() {
                self.data = self.originData;
                self.resetHeatMap();
            });

            $(self.heatmapTable).find(".heatmap-filterByRowName-input").keydown(function(e) {
                if(e.keyCode==13){
                    $(self.heatmapTable).find(".heatmap-filterByRowName-search").click();
                }
            });


             $(self.heatmapTable).find(".heatmap-filterByRowName-input").keyup(function(e) {
                if ($(self.heatmapTable).find(".heatmap-filterByRowName-input").val() === "") {
                    self.data = self.originData;
                    self.showHeatmapBody();
                    self.showHeatmapRows();
                }
            });

            $(self.heatmapTable).find(".heatmap-filterByRowName-search").click(function() {
                var filterString = $(self.heatmapTable).find(".heatmap-filterByRowName-input").val();
                if (filterString === "") return ;

                self.showLoadingStatus();
                self.data = self.filterBySearch(self.originData, filterString);
                self.hideLoadingStatus();

                self.showHeatmapBody();
                self.showHeatmapRows();

                self.expandByFilterString($(self.heatmapTable).find(".heatmap-rows"), filterString, true);
                if (self.data.length === 0) {
                    $(self.heatmapTable).find(".heatmap-rows").append("<p>No result be found.</p>");
                }

            });

            if (self.isShowExportButton) {
                $(self.heatmapTable).find(".heatmap-export-btn").click(function() {
                    self.download();
                });
            }

            $.fn.preBind = function (type, data, fn) {
                this.each(function () {
                    var $this = $(this);

                    $this.bind(type, data, fn);

                    var currentBindings = $._data(this, 'events')[type];
                    if ($.isArray(currentBindings)) {
                        currentBindings.unshift(currentBindings.pop());
                    }
                });
                return this;
            };

            //reset heatmap
            $(".typeahead__cancel-button").preBind("mousedown", function() {
                self.data = self.originData;
                self.resetHeatMap();
            })

        },

        loadJSONData : function(data) {
            this.originData = data;
            this.data = this.originData;
            this.initSearchBoxSource(this.data);
        },

        loadJSONDataFromURL : function(filePath) {
            var self = this;
            $.getJSON(filePath, function(data) {
                self.loadJSONData(data);
            });
            this.initSearchBoxSource(this.data);
        },

        initInitialState: function() {
            $(".heatmap-filterByRowName-input").text("");
        },

        clear: function() {
            $(this.heatmapTable).empty();
        },

        resetHeatMap: function() {
            this.clear();
            this.showHeatmapSkeleton();
            this.initInitialState();
            // this.show(true);
            this.showHeatmapBody();
            this.showHeatmapRows();
            this.initSearchBoxSource(this.data);
            this.initClickEvent();
        },

        show : function() {
            this.showHeatmapBody();
            this.showHeatmapRows();
            this.initClickEvent();
            if (this.data.length === 0) {
                this.showNoFoundInfo();
                return;
            }
            $(this.heatmapTable).find(".heatmap-filterByRowName-search").click();
        },

        showNoFoundInfo: function() {
            $(this.heatmapTable).find(".heatmap-rows").append("<p>No result be found.</p>");
        },

        getValueToStyle: function(valuesSetting) {
            var valueToStyle = {}
            for (var i = 0; i < valuesSetting.length; i++) {
                valueToStyle[valuesSetting[i].value] = {};
                if (valuesSetting[i].color) {
                    valueToStyle[valuesSetting[i].value].color = valuesSetting[i].color;
                } else if (valuesSetting[i].cssClass) {
                    valueToStyle[valuesSetting[i].value].cssClass = valuesSetting[i].cssClass;
                } else if (valuesSetting[i].html) {
                    valueToStyle[valuesSetting[i].value].html = valuesSetting[i].html;
                } else {
                    throw "The value" + values[j].value + "has no color or cssClass";
                }
            }
            return valueToStyle
        },

        filterBySearch: function(data, filterString) {
            var newDataList = [];

            for (var i = 0; i < data.length; i++) {
                var curNewData = {};
                for (var key in data[i]) {
                    curNewData[key] = data[i][key];
                }

                curNewData.childrenHTML = null;
                curNewData.html = null;

                if (curNewData.rowLabel.toLowerCase().indexOf(filterString.toLowerCase()) !== -1) {
                    newDataList.push(curNewData);
                } else if (data[i].children && data[i].children.length !== 0) {
                    var newChildren = this.filterBySearch(data[i].children, filterString);
                    if (newChildren.length !== 0) {
                        curNewData.children = newChildren;
                    } else {
                        curNewData.children = [];
                    }
                    if (curNewData.children && curNewData.children.length !== 0) {
                        newDataList.push(curNewData);
                    }
                }
            }
            return newDataList;
        },

        showLoadingStatus: function() {
            $(".heatmap-info").show();
        },

        hideLoadingStatus: function() {
            $(".heatmap-info").hide();
        },

        download: function() {
            var csvData = this.getHeaderCsvData();
            csvData += this.getRowCsvData(this.data);
            this.downloadFile("data.csv", csvData);
        },
    
        downloadFile: function(fileName, csvData) {
            var aLink = document.createElement('a');
            var blob = new Blob([csvData]);
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.dispatchEvent(evt);
        },

        getHeaderCsvData: function() {
            var headerData = "";
            headerData += "rowLabel";
            for (var i = 0; i < this.headerTemplateData.header.length; i++) {
                headerData += "," + this.headerTemplateData.header[i];
            }
            headerData += "\n";
            return headerData;
        },

        getRowCsvData: function(data) {
            var csvData = "";
            for (var i = 0; i < data.length; i++) {
                csvData += data[i].rowLabel;
                for (var j = 0; j < data[i].values.length; j++) {
                    csvData += "," + data[i].values[j];
                }
                csvData += "\n";
                if (data[i].children && data[i].children.length > 0) {
                    csvData += this.getRowCsvData(data[i].children);
                }
            }
            return csvData;
        },

        hoverEvent: function() {

        },

        activeHoverEvent: function() {

        }
    }

    HeatMapTable.init = function(argv) {
        this.heatmapTreeTmpl = HBtemplates['templates/src/heatmap-tree.tmpl'];
        this.heatmapRowsHTML = null;
        this.dataIndexToHtml = {};
        this.rowLabelList = [];
        this.rowLabelDict = {};

        this.originData = [];
        this.data = [];
        this.heatmapTable = $("#" + argv.tableID)[0];
        if (argv.options) {
            this.detailTemplateSrc = argv.options.detailTemplateSrc || null;
            this.headerTemplateSrc = argv.options.headerTemplateSrc || null;

            this.detailTemplateID = argv.options.detailTemplateID || null;
            this.headerTemplateID = argv.options.headerTemplateID || null;

            this.headerTemplateData = argv.options.headerTemplateData || {header: [""]};
            this.columnWidth = argv.options.columnWidth || "70px";
            this.valueToStyle = this.getValueToStyle(argv.options.valuesSetting);
            this.isShowExportButton = argv.options.showExportButton || false;
        }

        this.initHandlebars();
        this.showHeatmapSkeleton();
        this.initInitialState();

        if (this.detailTemplateID) {
            var source   = $('#'+this.detailTemplateID).html();
            this.detailTemplate = Handlebars.compile(source);
        }
        if (this.headerTemplateID) {
            var source   = $('#'+this.headerTemplateID).html();
            this.headerTemplate = Handlebars.compile(source);
        }
        if (this.detailTemplateSrc) {
            this.detailTemplate = Handlebars.compile(this.detailTemplateSrc);
        }
        if (this.headerTemplateSrc) {
            this.headerTemplate = Handlebars.compile(this.headerTemplateSrc);
        }
    }

    HeatMapTable.init.prototype = HeatMapTable.prototype;

    global.HeatMapTable = HeatMapTable;

}(window));