/////////////

function TripleViewer(entry) {

    var isoName = entry + "-1";
    var ft;
    var seqView;
    var currentSeq;
    var isoforms;
    var isoformMapping;
    var featuresForViewer= [];
    var featuresByIsoform = [];
    var iFrameWidth=0;
    var activeFiltering;
    var filterOptions = {
        "none":true
    };

    function nxIsoformChoice(isoforms) {
        if ($("#nx-isoformChoice").length > 0) {
            var datas = {
                "isoforms": (function () {
                    var listIsoforms = {
                        "visible": [],
                        "more": []
                    };
                    isoforms.sort(function (a, b) {
                        return parseInt(a.uniqueName.split("-")[1]) - parseInt(b.uniqueName.split("-")[1])
                    }).forEach(function (o, index) {
                        if (index <= 3) listIsoforms.visible.push(o);
                        else listIsoforms.more.push(o);
                    });
                    return listIsoforms;
                }())
            };
            isoName = datas.isoforms.visible[0].uniqueName;
            var template = HBtemplates['templates/isoformChoice.tmpl'];
            var results = template(datas);
            $("#nx-isoformChoice").append(results);
            /////////// EventListener to change isoform
            getInfoForIsoform.isoform();

            $(document).ready(function(){
                $('.isoformNames').tooltip({trigger: "hover"});
            });

            $("#nx-isoformChoice li:first-child").addClass("active");
        }
    }
    //function adjustHeight(div1,div2) {
    //
    //    $(div1).height($(div2).height());
    //}
    function toggleIsoformMap() {
        $(function () {
            $("#isoformMap").click(function () {
                $("#isoformDisplayed #isoContainer").toggle("slow");
            });

            $("#isoformDisplayed #isoContainer").hide();
        });
    }
    var getInfoForIsoform = {
        isoform: function () {
            $(".isoformNames").click(function () {
                isoName = $(this).text();
                getInfoForIsoform.reload(isoName);
            });
            $("#moreIsoforms a").click(function () {
                var parentThis = $(this).text();
                $("#extendIsoformChoice").text(parentThis);
            });
        },
        init: function (oneData,metaData) {
            isoforms=oneData[0];
            nxIsoformChoice(oneData[0]);

            iFrameWidth =$("#visuContainer").width();

            for (var i=1; i<oneData.length-1;i++) {
                var feat = NXUtils.convertMappingsToIsoformMap(oneData[i],metaData[i].name,metaData[i].filter);
                featuresByIsoform.push(feat);
                var featForViewer = NXViewerUtils.convertNXAnnotations(feat,metaData[i]);
                featuresForViewer.push(featForViewer);
            }
            isoformMapping = testAlgoObject(oneData[oneData.length-1]);
            displayIsoform(isoformMapping,"#isoformDisplayed",isoName);
            toggleIsoformMap();


            addFiltering();
            createSVG(isoforms,isoName);
            addFeatures(isoName);
            fillTable(isoName);
            tvSelection();
            eventTV();
            toggleFiltering();
        },
        reload: function (isoID) {
            $("#chart svg").remove();
            createSVG(isoforms,isoID);
            addFeatures(isoID);
            fillTable(isoID);
            applyFiltering();
            tvSelection();
            eventTV();
            displayIsoform(isoformMapping,"#isoformDisplayed",isoID);
            if ($(".zoomUnit").length) $(".zoomUnit").text("1");
            d3.selectAll('div.selectedRect').remove();
            //toggleIsoformMap();
        },
        reloadSVG: function(isoID) {
            $("#chart svg").remove();
            createSVG(isoforms,isoID);
            addFeatures(isoID);
            if ($(".zoomUnit").length) $(".zoomUnit").text("1");
            d3.selectAll('div.selectedRect').remove();
            //tvSelection();
            eventTV();
        }
    };

    function displayIsoform(array,divIsoform,isoIdentifier) {
        $(divIsoform + " #isoContainer").html("");
        if (!$('#isoContainer').length > 0 ) {
            $(divIsoform).append("<div id=\"isoContainer\"></div>");
        }

        //ft2 = new FeatureViewer(33000, "#isoformDisplayed", {
        //    showAxis: true,
        //    showSequence: false,
        //    brushActive: false,
        //    verticalLine: false
        //});

        function getMax(array) {
            var max = 0;
            for (name in array) {
                for (var pos in array[name].positions) {
                    if (array[name].positions[pos].second > max) max = array[name].positions[pos].second;
                }
            }
            return max;
        }
        function getMin(array) {
            var min = 100000000;
            for (name in array) {
                for (var pos in array[name].positions) {
                    if (array[name].positions[pos].first < min) min = array[name].positions[pos].first;
                }
            }
            return min;
        }
        var max = getMax(array);
        var min = getMin(array);
        //var max = Math.max($.merge(array.map(function (o) {
        //    return o.positions.map(function (p) {
        //        return p.second;
        //    })
        //})));
        //console.log($(divIsoform).width());
        var position = 20;

        //$(divIsoform).width()
        var margin = {top: 10, right: 50, bottom: 0, left: 50},
            width =  iFrameWidth - margin.left - margin.right - 17,
            height = 200 - margin.top - margin.bottom;
        var coverageLength = 33000;
        var scaling = d3.scale.linear()
            .domain([min, max])
            .range([0, width]);

        var line = d3.svg.line()
            .interpolate("linear")
            .x(function (d) {
                return scaling(d.x);
            })
            .y(function (d) {
                return d.y + 6;
            });

        var svgIso = d3.select(divIsoform+" #isoContainer").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("z-index","2");
        var svgIsoform = svgIso
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var selectIsoform = function(iso) {

        };

        function fillSVGIsoform(data) {
            //rectangle: function (object, sequence, position) {
            var rectHeight = 12;
            var rectShift = 20;
            var rectsPro = svgIsoform.append("g")
                .attr("class", "rectangle")
                .attr("transform", "translate(0," + position + ")");

            rectsPro.append("path")
                .attr("d", line([{x: min, y: 0}, {x: max, y: 0}]))
                .attr("class", function () {
                    return "line"
                })
                .style("z-index", "0")
                .style("stroke", "#C2DEC8")
                .style("stroke-width", "1px");

            var rectsProGroup = rectsPro.selectAll("." + data.isoformAc + "Group")
                .data(data.positions)
                .enter()
                .append("g")
                .attr("class",  data.isoformAc +"Group")
                .attr("transform", function(d) { return "translate(" + scaling(d.first) + ",0)"});

            rectsProGroup
                .append("rect")
                .attr("class", function () {
                    if (data.isoformAc === isoIdentifier) return "element "+ data.isoformAc +"Rect isoSelected";
                    else return "element "+ data.isoformAc +"Rect";
                })
                //.attr("y", function (d) {
                //    return position
                //})
                .attr("width", function (d) {
                    return (scaling(d.second) - scaling(d.first))})
                .attr("height", 12)
                .style("fill", "#C2DEC8")
                .style("z-index", "13")
                .style("cursor", "pointer")
                .on("click", function () {
                    getInfoForIsoform.reload(data.isoformAc);
                    var isoSelection = $('#nx-isoformChoice a[href=#' + data.isoformAc +']').tab('show');
                    if (isoSelection.parent().parent().is("#moreIsoforms")) $("#extendIsoformChoice").text(data.isoformAc);

                });

            rectsProGroup
                .append("text")
                .attr("class", "element "+ data.isoformAc +"Text")
                .attr("y", 6)
                .attr("dy", "0.35em")
                .style("font-size", "10px")
                .text(function(d) { return data.isoformMainName})
                .style("fill", "black")
                .style("z-index", "15")
                .style("visibility", function(d) {
                    if (data.isoformMainName) {
                        return (scaling(d.second) - scaling(d.first)) > data.isoformMainName.length * 8 ? "visible" : "hidden";
                    }
                    else return "hidden";
                });
            position += 20;
        }
        for (var name in array) {
            fillSVGIsoform(array[name],name);
        }
        svgIso.attr("height", position+10 +"px");



        //var yAxisScale = d3.scale.ordinal()
        //    .domain([0, array.length])
        //    .rangeRoundBands([0, 500], .1);
        //var yAxis = d3.svg.axis()
        //    .scale(yAxisScale)
        //    .tickValues(array.map(function (o) {return o.isoformName})) //specify an array here for values
        //    .tickFormat(function (d) {
        //        return d
        //    })
        //    .orient("left");
        //function addYAxis() {
        //    yAxisSVG = svg.append("g")
        //        .attr("class", "pro axis")
        //        .attr("transform", "translate(0," + margin.top + ")");
        //    updateYaxis();
        //}
        //function updateYaxis() {
        //
        //    yAxisSVGgroup = yAxisSVG
        //        .selectAll(".yaxis")
        //        .data(array.map(function (o) {return o.isoformName}))
        //        .enter()
        //        .append("g");
        //    yAxisSVGgroup
        //        .append("polygon")       // attach a polygon
        //        .style("stroke", "none")  // colour the line
        //        .style("fill", "rgba(95,46,38,0.2)")     // remove any fill colour
        //        .attr("points", function(d) {
        //            return (margin.left-15)+"," + (d.y -3) + ", "+ (margin.left-15)+"," + (d.y +12) + ", "+ (margin.left-7)+"," + (d.y +4.5);  // x,y points
        //        });
        //    yAxisSVGgroup
        //        .append("rect")
        //        .style("fill","rgba(95,46,38,0.2)")
        //        .attr("x", function () {
        //            return margin.left - 95
        //        })
        //        .attr("y", function (d) {
        //            return d.y - 3
        //        })
        //        .attr("width", "80")
        //        .attr("height", "15");
        //    yAxisSVGgroup
        //        .append("text")
        //        .attr("class", "yaxis")
        //        .attr("text-anchor", "end")
        //        .attr("x", function () {
        //            return margin.left - 20
        //        })
        //        .attr("y", function (d) {
        //            return d.y + 8
        //        })
        //        .text(function (d) {
        //            return d.title
        //        });
        //}
    }

    function createSVG(sequences,isoName) {
        sequences.forEach(function (o) {
            if (o.uniqueName === isoName) {
                currentSeq = o.sequence;
                ft = new FeatureViewer(currentSeq, "#chart", {
                    showAxis: true,
                    showSequence: true,
                    brushActive: true,
                    toolbar:true,
                    bubbleHelp:true,
                    zoomMax:10
                });
                seqView = new Sequence(currentSeq,isoName);
                seqView.render('#seqViewer', {
                    'showLineNumbers': true,
                    'wrapAminoAcids': true,
                    'charsPerLine': 50,
                    'search':true,
                    'toolbar':true
                });


            }
        });
    }

    function addFeatures(isoName) {
        for (var i=0;i<featuresForViewer.length;i++) {
            if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName) && filterOptions[featuresForViewer[i][isoName].filter.split(" ").join("_").toLowerCase()] === true) {
                var feature = jQuery.extend({}, featuresForViewer[i][isoName]);
                ft.addFeature(feature);
            }
        }
    }
    function addFiltering() {
        $("#chart").append("<div class=\"svgHeader\" class=\"row\" style=\"margin:0px 20px\"></div>");
        var filterHash = {
            processing: "Processing",
            residue: "Modified residue",
            region: "Region",
            site: "Site",
            variant: "Variant"
        };
        activeFiltering = {
            filters: {}
        };
        for (var i=0;i<featuresForViewer.length;i++) {
            if (Object.keys(featuresForViewer[i]).length !== 0) {
                var filter = featuresForViewer[i][Object.keys(featuresForViewer[i])[0]].filter;
                if (filter !== "none" && (!activeFiltering.filters[filter.split(" ").join("_").toLowerCase()])) {
                    var filterMin = filter.split(" ").join("_").toLowerCase();
                    activeFiltering.filters[filterMin]=filter;
                    filterOptions[filterMin]=true;
                }
            }
        }
        var template = HBtemplates['templates/filter.tmpl'];
        var results = template(activeFiltering);
        $(".svgHeader").html(results);


    }
    function fillTable(isoName) {
        function toggleEvidenceInfos() {
            $(".evidenceNumber").click(function () {
                $(this).parent().parent().next().toggle();
            })
        }

        if ($("#featuresTable").length > 0) {
            var number = 0;
            var features = [];
            featuresByIsoform.forEach( function (d) { if (d.hasOwnProperty(isoName)) features.push(d[isoName])});
            for (feat in featuresByIsoform) if(featuresByIsoform[feat].hasOwnProperty(isoName)) number += featuresByIsoform[feat][isoName].length;
            Handlebars.registerHelper('position', function (length, options) {
                if (length === 1) return this.start;
                else if (this.category === "Disulfide bond") return this.start + "<span style=\"line-height: 0.8; vertical-align:top\">&#x256d;&#x256e;</span>" + this.end;
                else return this.start + " - " + this.end;
            });

            Handlebars.registerHelper('className', function (category, options) {
                return category.replace(' ','')+" "+this.group.split(" ").join("_").toLowerCase();
            });
            Handlebars.registerHelper("math", function(lvalue, rvalue, options) {
                lvalue = parseFloat(lvalue);
                rvalue = parseFloat(rvalue);

                return lvalue + rvalue
            });
            Handlebars.registerHelper("linkTo", function(name, link, options) {
                return "<a href=\"" + link + "\">" + name + "</a>";
            });
            var datas = {
                features: features,
                featuresLength: number
            };

            var template = HBtemplates['templates/featureTable2.tmpl'];
            var results = template(datas);
            $("#featuresTable").html(results);
            toggleEvidenceInfos();
        }
    }
    function testAlgo() {
        //Algorithm to concat exons of each isoform
        //Tetris-like

        var isoforms = [
            [[2,3],[4,6],[8,10],[13,14]],
            [[2,3],[5,7],[8,10],[11,12],[13,14]],
            [[0,1],[2,3],[5,6],[8,9],[13,14]]
        ];
        var positions=[];
        var decalage=[];
        // GET All positions x & y into new array positions
        for (var iso in isoforms) {
            isoforms[iso].forEach(function (o) {
                positions.push(o[0],o[1]);
            })
        }
        // delete double in list of positions
        positions = positions.filter(function(elem, index, self) {
            return index == self.indexOf(elem);});
        // sort positions
        positions.sort(function(a,b) {return a-b});

        //for each interval between position, check if there is something in isoforms
        //if not, add the empty interval to array decalage
        for (var i=0;i<positions.length-1;i++) {
            var presence = false;
            for (var j in isoforms) {
                for (var k in isoforms[j]) {
                    if (isoforms[j][k][0] > positions[i+1]) break;
                    else if (isoforms[j][k][0]<= positions[i] && isoforms[j][k][1] >= positions[i+1]) {
                        presence=true;
                        break;
                    }
                }
                if (presence === true) break;
            }
            if (presence === false) decalage.push({x:positions[i],length:positions[i+1]-positions[i]});
        }
        //For each "hole", apply a shift by adding the length of the hole to the value after the hole
        //In the same time, if i[y] == i+1[x] merge those two
        for (var i=decalage.length-1;i>=0;i--) {
            for (var j in isoforms) {
                for (var k=isoforms[j].length-1;k>=0;k--) {
                    if (isoforms[j][k][0] < decalage[i].x) break;
                    else {
                        isoforms[j][k][0] -= decalage[i].length;
                        isoforms[j][k][1] -= decalage[i].length;
                    }
                    if (k !=isoforms[j].length-1 && isoforms[j][k+1][0] === isoforms[j][k][1]) {
                        isoforms[j][k][1] = isoforms[j][k+1][1];
                        isoforms[j].splice(k+1,1);
                    }
                }
            }
        }
    }
    function testAlgoObject(isoformsMapping) {
        //Algorithm to concat exons of each isoform
        //Tetris-like
        //var isoformsMapping = [];
        ////for (var name in isoformsMap) {
        ////    console.log(name);
        ////    isoformsMapping.push(isoformsMap[name]);
        ////}
        //
        //var isoNamesSorted = Object.keys(isoformsMap).sort();
        //
        //console.log(isoNamesSorted);
        //for (var name in isoNamesSorted) {
        //    console.log(isoNamesSorted[name]);
        //    isoformsMapping.push(isoformsMap[isoNamesSorted[name]]);
        //}
        //var meta = jQuery.extend([], isoformsMapping);
        //isoformsMapping.sort(function (a,b) {
        //    var textA = a.isoformName;
        //    var textB = b.isoformName;
        //    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        //});
        //
        //console.log("metaaa");
        //console.log(meta);
        var positions=[];
        var decalage=[];
        // GET All positions x & y into new array positions
        for (var iso in isoformsMapping) {
            isoformsMapping[iso].positions.forEach(function (o) {
                positions.push(o.first, o.second);
            })
        }
        //delete double in list of positions
        positions = positions.filter(function(elem, index, self) {
            return index == self.indexOf(elem);});
        // sort positions
        positions.sort(function(a,b) {return a-b});

        //for each interval between position, check if there is something in isoforms
        //if not, add the empty interval to array decalage
        for (var i=0;i<positions.length-1;i++) {
            var presence = false;
            for (var j in isoforms) {
                for (var k in isoformsMapping[j].positions) {
                    if (isoformsMapping[j].positions[k].first > positions[i+1]) break;
                    else if (isoformsMapping[j].positions[k].first<= positions[i] && isoformsMapping[j].positions[k].second >= positions[i+1]) {
                        presence=true;
                        break;
                    }
                }
                if (presence === true) break;
            }
            if (presence === false) decalage.push({x:positions[i],length:positions[i+1]-positions[i]});
        }
        ////For each "hole", apply a shift by adding the length of the hole to the values after the hole
        ////In the same time, if i[y] == i+1[x] merge those two
        for (var i=decalage.length-1;i>=0;i--) {
            for (var j in isoformsMapping) {
                for (var k=isoformsMapping[j].positions.length-1;k>=0;k--) {
                    if (isoformsMapping[j].positions[k].first < decalage[i].x) {
                        if (k !=isoformsMapping[j].positions.length-1 && i===0 && isoformsMapping[j].positions[k+1].first === isoformsMapping[j].positions[k].second) {
                            isoformsMapping[j].positions[k].second = isoformsMapping[j].positions[k+1].second;
                            isoformsMapping[j].positions.splice(k+1,1);
                        }
                        break;
                    }
                    else {
                        isoformsMapping[j].positions[k].first -= decalage[i].length;
                        isoformsMapping[j].positions[k].second -= decalage[i].length;
                    }
                    if (k !=isoformsMapping[j].positions.length-1 && isoformsMapping[j].positions[k+1].first === isoformsMapping[j].positions[k].second) {
                        isoformsMapping[j].positions[k].second = isoformsMapping[j].positions[k+1].second;
                        isoformsMapping[j].positions.splice(k+1,1);
                    }
                }
            }
        }
        return isoformsMapping;
    }

    function scrollAuto(elem, container, shiftTop) {
        var ElementTop = $(elem).position().top-shiftTop;
        var scrollPosition = $(container).scrollTop();
        var scrollingLength = ElementTop + scrollPosition;
        $(container).animate({scrollTop: scrollingLength}, 1000);
    }

    function eventTV() {
        ft.onFeatureSelected(function(d){
            fvSelection(d.detail);
        });
    }

    function tvSelection() {
        $(".featPosition").click(function() {
            $(".tableHighlight").removeClass("tableHighlight");
            $(this).parent().parent().addClass("tableHighlight");
            var currentId = $(this).parent().parent().attr("id");
            var position = currentId.split("_").slice(1).map(Number);
            if (position.length === 1) position.push(position[0]);
            var svgId = "#" + "f" + currentId;

            position[0]-=1;
            seqView.selection(position[0],position[1],"#C50063");
            ft.addRectSelection(svgId);

            scrollAuto("#stringSelected", "#scroller",200);
        })
    }

    function fvSelection(d) {
        seqView.selection(d.start,d.end,"#C50063");
        var featSelectedID = "#" + d.id;
        $(".tableHighlight").removeClass("tableHighlight");
        $(featSelectedID).addClass("tableHighlight");

        scrollAuto(featSelectedID, "#featTableScroller",70);
        scrollAuto("#stringSelected", "#scroller",200);

    }
    function toggleFiltering() {
        $("#filtering input:checkbox").on("change", function() {
            if ($(this)[0] === $("#allFilters")[0]) {
                var checked = $(this).prop("checked");

                $(this).parents("#filtering")
                    .first()
                    .find("input[type=checkbox]")
                    .prop("checked", checked);
                if (checked === false) {
                    for(var key in filterOptions) {
                        filterOptions[key] = false;
                    }
                }
                else {
                    for(var key in filterOptions) {
                        filterOptions[key] = true;
                    }
                }
                filterOptions["none"] = true;
            }
            applyFiltering();
            getInfoForIsoform.reloadSVG(isoName);

        });
    }
    function applyFiltering() {

        for (var filter in activeFiltering.filters) {
            if ($("#"+filter).prop("checked")) {
                $("."+filter+".general-info").show();
                filterOptions[filter] = true;
            }
            else {
                $("."+filter).hide();
                filterOptions[filter] = false;
            }
        }

    }

    return {
        init:getInfoForIsoform.init
    }

}

