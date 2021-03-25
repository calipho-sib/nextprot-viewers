var w = 600,
    h = w,
    r = w / 2,
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([60, r]),
    //    y = d3.scale.linear().domain([0, 1]).range([0, r]),
    p = 5,
    duration = 1000;

var nodes;
var newNodes;
var path;
var text;
var seriesData = {};
var lastClickDepth = 0;
var proteinTotal;

var ePe1 = "Evidence_at_protein_level",
    ePe2 = "Evidence_at_transcript_level",
    ePe3 = "Inferred_from_homology",
    ePe4 = "Predicted",
    ePe5 = "Uncertain";
var evidences = [ePe1, ePe2, ePe3, ePe4, ePe5];


var env = location.search.split('env=')[1] || "prod";
console.log("env : " + env);
var nXSearch = "https://www.nextprot.org/proteins/search?mode=advanced";
var snorql = "https://snorql.nextprot.org/";
if (env === "alpha") {
    nXSearch = "https://alpha-search.nextprot.org/proteins/search?mode=advanced";
    snorql = "https://alpha-snorql.nextprot.org/";
}
else if (env === "dev") {
    nXSearch = "https://dev-search.nextprot.org/proteins/search?mode=advanced";
    snorql = "https://dev-snorql.nextprot.org/";
}

function getSparqlQuery(chr, pe) {
    var base = nXSearch;
    var selectPe = pe !== "all" ? "?entry :existence :" + pe + ".\n" : "";
    var selectChr = chr !== "all" ? "?entry :gene / :chromosome '" + chr + "'^^xsd:string\n" : "";
    var selectAll = chr === "all" && pe === "all" ? "?entry a :Entry" : "";
    var query = "select distinct ?entry where {\n" + selectPe + selectChr + selectAll +
        "}\n";
    var sparqlEndpoint = base === snorql ? base + "?query=" : base + "&sparql=";

    var url = sparqlEndpoint + encodeURIComponent(query);
    return url;
}

function getTotal(pe) {
    var base = nXSearch;
    var selectPe = "?entry :existence ?pe .\n";
    var query = "select distinct count(?entry) ?pe where {\n" + selectPe +
        "}order by (?pe) \n";
    var pTotal = 0;
    var res = nx.executeSparql(query).then(function (response) {
        var result = response.results.bindings.forEach(function (pe, i, array) {
            var size = pe["callret-0"].value;
            var elem = $("#total a").get(i);
            $(elem).text(size);
            pTotal += parseInt(size);
            if (i === array.length - 1) {
                var lastElem = $("#total a").last();
                $(lastElem).text(pTotal);
                proteinTotal = pTotal;
                $(".proteinsNb").text(pTotal + " proteins");
            }
        })
    });
}

function filterPerEv(data, filters) {
    for (var c in data) {
        for (var e in data[c]) {
            filters.forEach(function (f) {
                if (data[c][e].name === f && data[c][e].size !== 0) data[c][e].size = 0;
            })
        }
    }
    return data;
}

function getStructuredData(data, result) {
    var children = Object.keys(data).map(function (chromosome) {

        var childrenPerChrosome = data[chromosome].map(function (i) {
            return {
                name: i.name,
                size: i.size,
                order: 1
            }
        });
        return {
            "name": chromosome,
            "children": childrenPerChrosome
        }
    });

    result.children = children;
    result.name = result.name.charAt(0).toUpperCase() + result.name.slice(1);

    nodes = partition.nodes(dataResult);
    return nodes;
}

//var color = d3.scale.category20c();
var colorList = ["#ccc", "#ccc", "#ccc"].concat(colorbrewer.Oranges[9].slice(2, -1), colorbrewer.Greens[9].slice(2, -1), colorbrewer.Blues[9].slice(2, -1), colorbrewer.Purples[9].slice(1, -1));
//var colorList = ["#ccc", "#ccc", "#ccc"].concat(colorbrewer.Oranges[9].slice(2, -1), colorbrewer.Greens[9].slice(2, -1), colorbrewer.Blues[9].slice(2, -1), colorbrewer.Purples[9].slice(1, -1));
var color = d3.scale.ordinal()
    .domain(["foo", "bar", "baz"])
    .range(colorList);

var alternatingColorScale = function () {
    var domain, range;

    function scale(x) {
        return range[domain.indexOf(x) % 2];
    }
    scale.domain = function (x) {
        if (!arguments.length) return domain;
        domain = x;
        return scale;
    }
    scale.range = function (x) {
        if (!arguments.length) return range;
        range = x;
        return scale;
    }
    return scale;
}
var colorScale = alternatingColorScale()
    .range(["#bbb", "#ddd"]);
var maxSize = 0;
var maxLevel = 0;
var evLevelColor1 = {
    "Evidence_at_protein_level": "#DBFFD6",
    "Evidence_at_transcript_level": "#DAFFF8",
    "Inferred_from_homology": "#FFFAD2",
    "Predicted": "#FFE7CF",
    "Uncertain": "#FFD3D4",
}
var evLevelColor = {
    "Evidence_at_protein_level": "#C1F3BA",
    "Evidence_at_transcript_level": "#C8F7EE",
    "Inferred_from_homology": "#FFFAD2",
    "Predicted": "#FFE7CF",
    "Uncertain": "#FFD3D4",
}
var evLevelColorDarker = {
    //    "Evidence_at_protein_level": "#8ED484",
    "Evidence_at_protein_level": "#B8ECB0",
    "Evidence_at_transcript_level": "#7FDECC",
    "Inferred_from_homology": "#F5E87E",
    "Predicted": "#FBC794",
    "Uncertain": "#F78A8C",
}
var evLevelColor2 = {
    "Evidence_at_protein_level": "#2AB293",
    "Evidence_at_transcript_level": "#6DAECC",
    "Inferred_from_homology": "#FFE8A2",
    "Predicted": "#FF936F",
    "Uncertain": "#E86859",
}
var evLevelColorGreys = {
    "Evidence_at_protein_level": "#f7f7f7",
    "Evidence_at_transcript_level": "#d9d9d9",
    "Inferred_from_homology": "#bdbdbd",
    "Uncertain": "#737373",
    "Predicted": "#969696",
}
var div = d3.select("#vis");

div.select("img").remove();

var svgElem = div.append("svg")
    .attr("width", w + p * 2)
    .attr("height", h + p * 2);

var defs = svgElem.append("defs");

var gradient = defs.append("linearGradient")
    .attr("id", "mainCircleGrd")
    .attr("y1", "-10%")
    .attr("y2", "30%")
    .attr("x1", "-10%")
    .attr("x2", "30%")
    .attr("spreadMethod", "pad")
    .attr("gradientUnits", "userSpaceOnUse");

// blue gradient
//hsl(215, 100%, 64%) || hsl(215, 100%, 23%)
// green gradient
//hsl(122, 100%, 41%) || hsl(122, 100%, 19%)
// orange gradient
//hsl(30, 100%, 60%) || hsl(30, 100%, 24%)
// orange mate gradient
//hsl(30, 75%, 62%) || hsl(30, 75%, 24%)
// blue mate gradient
//hsl(194, 70%, 62%) || hsl(194, 70%, 24%)
// grey gradient
//hsl(12, 1%, 65%) || hsl(12, 1%, 30%)
// light grey gradient
//hsl(12, 1%, 65%) || hsl(12, 1%, 30%)
gradient.append("stop")
    .attr("offset", "0")
    .attr("stop-color", "hsl(12, 1%, 70%)")
//    .attr("stop-color", "#98908e")
    .attr("stop-opacity", 1);

gradient.append("stop")
    .attr("offset", "1")
    .attr("stop-color", "hsl(12, 1%, 40%)")
//    .attr("stop-color", "#272524")
    .attr("stop-opacity", 1);


var vis = svgElem.append("g")
    .attr("id", "sunburst")
    .attr("transform", "translate(" + (r + p) + "," + (r + p) + ")");

var evInfoGroup = svgElem.append("g")
    .attr("transform", "translate(" + (r - 40) + "," + (r - p) + ")")
    .style("opacity", "0.9");

var evInfoTitle = evInfoGroup
    .append("text")
    .attr("text-anchor", "middle")
    .attr("class", "evTitle")
    .attr("x", 45)
    .attr("y", -10)
    //.style("opacity","1")
    .text("");
var evInfoNb = evInfoGroup
    .append("text")
    .attr("text-anchor", "middle")
    .attr("class", "evNb")
    .attr("x", 45)
    .attr("y", 30)
    //.style("opacity","1")
    .text("");
var evInfoUnit = evInfoGroup
    .append("text")
    .attr("text-anchor", "middle")
    .attr("class", "evNb")
    .attr("x", 45)
    .attr("y", 60)
    //.style("opacity","1")
    .text("");
var evBack = evInfoGroup
    .append("svg:image")
    .attr("text-anchor", "middle")
    .attr("class", "evBack")
    .attr("x", 30)
    .attr("y", 85)
    .attr("height", 30)
    .attr("width", 30)
    .style("fill", "yellow")
    .on("click", "");

var partition = d3.layout.partition()
    .sort(null)
    //    .value(function(d) { return 5.8 - d.depth; });
    .value(function (d) {
        return d.size;
    });

var arc = d3.svg.arc()
    .startAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
    })
    .endAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
    })
    .innerRadius(function (d) {
        return Math.max(0, d.y ? y(d.y) : d.y);
    })
    .outerRadius(function (d) {
        return Math.max(0, y(d.y + d.dy));
    });


var applicationName = 'App to show protein existence level by chromosome';
var clientInfo = 'neXtProt Team';
var nx = new Nextprot.Client(applicationName, clientInfo);
var sparqlQuery = "select ?pe ?label ?level ?chr count(?entry) as ?cnt  where {" +
    "select distinct ?entry ?chr ?pe ?level ?label where {" +
    "?entry :existence ?pe; " +
    ":gene / :chromosome ?chr ." +
    "?pe :level ?level." +
    "?pe rdfs:label ?label . }}" +
    "group by ?chr ?pe ?level ?label order by ?chr ?level";
var dataResult = {
    "name": "protein existence by chromosome"
};


nx.executeSparql(sparqlQuery).then(function (response) {
    //    var seriesData = {};
    var chromosomes = [];
    response.results.bindings.forEach(function (elem, i, data) {
        var pe = elem.pe.value.replace("http://nextprot.org/rdf#", "");
        var cnt = parseInt(elem.cnt.value);
        var chr = elem.chr.value;
        var chrValues = seriesData[chr] || [];
        chrValues.push({
            "name": pe,
            "size": cnt
        });
        seriesData[chr] = chrValues;
        if (!(data[i + 1]) || data[i + 1].chr.value !== chr) {
            var chrs = "";
            if (chr > 100 && chr > 0) {
                chrs = "0" + chr;
            } else {
                chrs = chr;
            }
            var chrId = "<tr id=\"chr" + chr + "\">";
            var chrHtml = "";
            switch (chrs) {
            case "X":
                chrHtml = "<td class=\"chrNumber\" data-sort-value=\"24\"><button type=\"button\" class=\"btn btn-info\">" + chrs + "</button></td>";
                break;
            case "Y":
                chrHtml = "<td class=\"chrNumber\" data-sort-value=\"25\"><button type=\"button\" class=\"btn btn-info\">" + chrs + "</button></td>";
                break;
            case "MT":
                chrHtml = "<td class=\"chrNumber\" data-sort-value=\"23\"><button type=\"button\" class=\"btn btn-info\">" + chrs + "</button></td>";
                break;
            case "unknown":
                chrHtml = "<td class=\"chrNumber\" data-sort-value=\"26\"><button type=\"button\" class=\"btn btn-info\">" + chrs + "</button></td>";
                break;
            default:
                chrHtml = "<td class=\"chrNumber\" data-sort-value=" + chrs + "><button type=\"button\" class=\"btn btn-info\">" + chrs + "</button></td>";
                break;
            }
            var cntHtml = "";
            var pTotal = 0;
            if (chrValues.length === 5) {
                for (var ev in chrValues) {
                    cntHtml += "<td><a href=\"" + getSparqlQuery(chrs, chrValues[ev].name) + "\" target=\"_blank\">" + chrValues[ev].size + "</a></td>";
                    pTotal += chrValues[ev].size;
                }
            } else {
                var partChr = [];
                partChr.push(chrValues.filter(function (a) {
                    return a.name === ePe1
                })[0]);
                partChr.push(chrValues.filter(function (a) {
                    return a.name === ePe2
                })[0]);
                partChr.push(chrValues.filter(function (a) {
                    return a.name === ePe3
                })[0]);
                partChr.push(chrValues.filter(function (a) {
                    return a.name === ePe4
                })[0]);
                partChr.push(chrValues.filter(function (a) {
                    return a.name === ePe5
                })[0]);
                partChr.forEach(function (d, i) {
                    var eVal = d ? d.size : 0;
                    var eName = d ? d.name : evidences[i];
                    pTotal += eVal;
                    cntHtml += "<td><a href=\"" + getSparqlQuery(chrs, eName) + "\" target=\"_blank\">" + eVal + "</a></td>";
                })
            }
            //            $("#tableBody").append("<tr>  <td> " + chrs + "</td>   <td> " + pe + "</td>  <td> " + cnt +  "</td></tr>");
            $("#tableBody").append(chrId + chrHtml + cntHtml + "<td><a href=\"" + getSparqlQuery(chrs, "all") + "\" target=\"_blank\">" + pTotal + "</a></td></tr>");
        }
    });
    for (var c in seriesData) {
        chromosomes.push(c)
    };
    colorScale.domain(chromosomes);
    jQuery.fn.d3Click = function () {
        this.each(function (i, e) {
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

            e.dispatchEvent(evt);
        });
    };
    $("#chromosomePETable").stupidtable();
    $("#chrColumn").stupidsort('asc');
    $("#tableBody tr td:first-child").click(function () {
        var chrSelected = $(this).text().replace(" ", "");
        $("#path-" + chrSelected).d3Click();
    })



    //    var children = Object.keys(seriesData).map(function (chromosome) {
    //
    //        var childrenPerChrosome = seriesData[chromosome].map(function (i) {
    //            return {
    //                name: i.name,
    //                size: i.size,
    //                order: 1
    //            }
    //        });
    //        return {
    //            "name": chromosome,
    //            "children": childrenPerChrosome
    //        }
    //    });
    //
    //    dataResult.children = children;
    //    dataResult.name = dataResult.name.charAt(0).toUpperCase() + dataResult.name.slice(1);


    function dataStats(data) {
        var PEHashMap = {};
        data.forEach(function (chr) {
            chr.children.forEach(function (pe) {
                if (PEHashMap[pe.name]) PEHashMap[pe.name] += pe.size;
                else PEHashMap[pe.name] = pe.size;
            })
        })
        return PEHashMap;
    }

    //    nodes = partition.nodes(dataResult);
    nodes = getStructuredData(seriesData, dataResult);
    var path = vis.selectAll("path").data(nodes);
    maxSize = nodes[0].value;

    var PEStats = dataStats(dataResult.children);
    PEStats["Total"] = dataResult.value;
    var pe1 = (parseInt(PEStats[ePe1]) / parseInt(PEStats["Total"]) * 100).toFixed(2);
    var pe2 = (parseInt(PEStats[ePe2]) / parseInt(PEStats["Total"]) * 100).toFixed(2);
    var pe3 = (parseInt(PEStats[ePe3]) / parseInt(PEStats["Total"]) * 100).toFixed(2);
    var pe4 = (parseInt(PEStats[ePe4]) / parseInt(PEStats["Total"]) * 100).toFixed(2);
    var pe5 = (parseInt(PEStats[ePe5]) / parseInt(PEStats["Total"]) * 100).toFixed(2);
    var intStats = "<tr id=\"total\"><td class=\"chrNumber\"><button type=\"button\" class=\"btn btn-info\">All</button></td>" +
        "<td><a href=\"" + getSparqlQuery("all", ePe1) + "\" target=\"_blank\"></td>" +
        "<td><a href=\"" + getSparqlQuery("all", ePe2) + "\" target=\"_blank\"></td>" +
        "<td><a href=\"" + getSparqlQuery("all", ePe3) + "\" target=\"_blank\"></td>" +
        "<td><a href=\"" + getSparqlQuery("all", ePe4) + "\" target=\"_blank\"></td>" +
        "<td><a href=\"" + getSparqlQuery("all", ePe5) + "\" target=\"_blank\"></td>" +
        "<td><a href=\"" + getSparqlQuery("all", "all") + "\" target=\"_blank\">" + PEStats["Total"] + "</td></tr>";
    var percStats = "<tr><td> </td><td>" + pe1 + "<span class=\"perc\">%</span></td><td>" + pe2 + "<span class=\"perc\">%</span></td><td>" + pe3 + "<span class=\"perc\">%</span></td><td>" + pe4 + "<span class=\"perc\">%</span></td><td>" + pe5 + "<span class=\"perc\">%</span></td><td>100<span class=\"perc\">%</span></td></tr>";
    $("#tableBodyTotal").append(intStats);
    $("#tableBodyTotal").append(percStats);
    $("#total").click(function () {
        $("#path0").d3Click();
    })
    getTotal();


    path.enter().append("path")
        .attr("id", function (d, i) {
            return d.name.length > 8 ? "path" + i : "path-" + d.name;
        })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        //      .style("fill", colour)
        .style("fill", function (d) {
            return d.depth === 0 ? "url(#mainCircleGrd)" : d.depth === 2 ? evLevelColorDarker[d.name] : colorScale(d.name);
            //            return d.depth === 0 ? "url(#mainCircleGrd)" : d.depth === 2 ? evLevelColor[d.name] : color((d.children ? d : d.parent).name);
        })
        .style("cursor", function(d){return d.depth === 2 ? "default" : "pointer"})
        .on("click", click);

    text = vis.selectAll(".description").data(nodes);
    var textEnter = text.enter().append("text")
        .style("opacity", 1)
        .style("visibility", function (e) {
            return showText(e) ? "visible" : "hidden";
        })
        .style("fill", function (d) {
            return d.depth === 0 ? "#f4f4f4" : brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
        })
        .attr("class", function (d) {
            return d.depth === 0 ? "description title" : d.depth === 1 ? "description subtitle" : "description"
        })
        .attr("text-anchor", function (d) {
            return d.depth === 0 ? "middle" : x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
        })
        .attr("dy", ".2em")
        .style("cursor", function(d){return d.depth === 2 ? "default" : "pointer"})
        .attr("transform", function (d) {
            var multiline = (d.name || "").split(" ").length > 1,
                angle = d.depth <= 0 ? 0 : x(d.x + d.dx / 2) * 180 / Math.PI - 90.5,
                rotate = d.depth <= 0 ? 0 : angle + (multiline ? -.5 : 0),
                shift = d.depth <= 0 ? "-0,-40" : d.depth === 1 ? (y(d.y) + p * 5) : (y(d.y) + p);
            return "rotate(" + rotate + ")translate(" + shift + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
        })
        .on("click", click)
        //      .each(function (d) {
        //          d3.select(this).style("visibility", showText(d) ? null : "hidden");
        //      })
    ;
    textEnter.append("tspan")
        .attr("x", 0)
        .style("font-size", function (d) {
            return d.depth > 1 ? "1.1em" : d.depth === 0 ? "0.8em" : "0.9em"
        })
        .text(function (d) {
            return d.depth === 0 ? d.name.split(" ")[0] + " " + d.name.split(" ")[1] : d.depth === 2 ? d.name.split("_")[0] + " " + (d.name.split("_")[1] || "") : (d.name.split(" ")[0] || "");
        });
    textEnter.append("tspan")
        .attr("x", 0)
        .style("font-size", function (d) {
            return d.depth > 1 ? "1.1em" : d.depth === 0 ? "0.8em" : "0.9em"
        })
        .attr("dy", "1.2em")
        .text(function (d) {
            return d.depth === 0 ? d.name.split(" ")[2] + " " + d.name.split(" ")[3] : d.depth === 2 ? (d.name.split("_")[2] || "") + " " + (d.name.split("_")[3] || "") : (d.name.split(" ")[1] || "");
        });

    textEnter.append("tspan")
        .attr("x", 0)
        .attr("dy", "1.2em")
        .text(function (d) {
            return d.depth === 0 ? "" : d.depth > 0 ? d.name.split(" ")[2] || "" : "";
        });

    textEnter.append("tspan")
        .attr("x", 0)
        .attr("class", function(d){return d.depth === 0 ? "proteinsNb" : ""})
        .style("font-size", "0.6em")
        .attr("dy", "3em")
        .text(function (d) {
            return d.depth === 0 ? proteinTotal + " proteins" : d.depth > 0 ? d.name.split(" ")[3] : "";
        });

    function autoScroll(selection, table) {
        var ElementTop = $(selection).position().top - 220;
        var scrollPosition = $(table).scrollTop();
        var scrollingLength = ElementTop + scrollPosition;
        $(table).animate({
            scrollTop: scrollingLength
        }, 1000);
    }

    function tableInteraction(elem) {
        if (elem.depth === 0) {
            $(".chrSelected").removeClass("chrSelected");
            autoScroll("#chr1", ".chrTable");
        }
        if (elem.depth === 1) {
            $(".chrSelected").removeClass("chrSelected");
            $("#chromosomePETable #chr" + elem.name).addClass("chrSelected");
            autoScroll(".chrSelected", ".chrTable");

        } else if (elem.depth === 2) {
            $(".chrSelected").removeClass("chrSelected");
            $("#chromosomePETable #chr" + elem.parent.name).addClass("chrSelected");
            autoScroll(".chrSelected", ".chrTable");
        }
    }

    function click(d) {
        if (d.depth === 2 || d.value === 0) return false;
        lastClickDepth = d.depth;
        if (d.depth !== 0) {
            var t0 = evInfoGroup
                .transition().duration(500)
                .style("opacity", "0");

            var t1 = t0
                .transition().delay(500).duration(1000)
                .style("opacity", "1");

            var evPercent = (d.value / d.parent.value * 100).toFixed(2);

            evInfoTitle.transition().delay(500).text(d.depth === 1 ? "chr " + d.name : d.name.split("_").join(" "));
            evInfoTitle.transition()
                .delay(500).style("font-size", function (f) {
                return d.depth === 2 ? "1.1em" : d.name.length > 6 ? "2.4em" : "3.2em"})
                .style("cursor","default");
            evInfoNb.transition()
                .delay(500).text(d.value + " proteins")
                .style("cursor","default");
            evInfoUnit.transition().delay(500)
                .text("( " + evPercent + "% )")
                .style("cursor","default");
            evBack.transition().delay(500).attr("xlink:href", "Arrow2.png")
                .style("cursor", "pointer");
            evBack.on("click", function (d) {
                $("#path0").d3Click();
            });
        } else {
            evInfoGroup
                .transition().duration(500)
                .style("opacity", "0");
        }

        tableInteraction(d);

        maxSize = d.value;
        maxLevel = d.depth;

        path.transition()
            .duration(duration)
            .attrTween("d", arcTween(d));

        // Somewhat of a hack as we rely on arcTween updating the scales.
        text
            .style("visibility", function (e) {
                return isParentOf(d, e) ? showText(e) ? "visible" : "hidden" : d3.select(this).style("visibility");
            })
            .transition().duration(duration)
            .attrTween("text-anchor", function (d) {
                return function () {
                    return d.depth <= 0 ? "middle" : x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
                };
            })
            .attrTween("transform", function (d) {
                var multiline = (d.name || "").split(" ").length > 1;
                return function () {
                    var angle = d.depth <= 0 ? 0 : x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                        rotate = d.depth <= 0 ? 0 : angle + (multiline ? -.5 : 0),
                        shift = d.depth <= 0 ? "-0,-40" : d.depth === 1 ? (y(d.y) + p * 5) : (y(d.y) + p);
                    return "rotate(" + rotate + ")translate(" + shift + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
                };
            })
            .style("opacity", function (e) {
                return isParentOf(d, e) ? showText(e, "begin") ? 1 : 1e-6 : 1e-6;
            })
            .each("end", function (e) {
                d3.select(this).style("visibility", isParentOf(d, e) ? showText(e, "end") ? null : "hidden" : "hidden");
            });
    }

    function getData() {
        $(".legendIcon").click(function () {
            var delay = 0;
            if (lastClickDepth === 1) {
                delay = 1050;
                $("#path0").d3Click();
            }
            var elem = this;

            setTimeout(function () {
                if ($(elem).hasClass("unselected")) $(elem).removeClass("unselected");
                else if ($(".unselected").length < 4) $(elem).addClass("unselected");
                var idx2 = $(".legendIcon").index($(elem));
                var filterList = [];
                var filterSelected = $(".unselected").each(function (elem) {
                    var index = $(".legendIcon").index(this);
                    filterList.push(evidences[index]);
                });
                var newList = {};
                $.extend(true, newList, seriesData);
                var filteredList = filterPerEv(newList, filterList);

                newNodes = getStructuredData(filteredList, dataResult);

                var test = vis.selectAll("path").data(newNodes);
                test.exit().remove();
                test.transition().duration(500).attr("d", arc);
                test.style("fill", function (d) {
                    return d.depth === 0 ? "url(#mainCircleGrd)" : d.depth === 2 ? evLevelColorDarker[d.name] : colorScale(d.name);
                });

                newtext = vis.selectAll("text").data(newNodes);
                newtext.exit().remove();
                newtext.transition().duration(500)
                    .attrTween("text-anchor", function (d) {
                        return function () {
                            return d.depth <= 0 ? "middle" : x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
                        };
                    })
                    .attr("transform", function (d) {
                        var multiline = (d.name || "").split(" ").length > 1,
                            angle = d.depth === 0 ? 0 : x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                            rotate = d.depth === 0 ? 0 : angle + (multiline ? -.5 : 0),
                            shift = d.depth === 0 ? "-0,-40" : d.depth === 1 ? (y(d.y) + p * 5) : (y(d.y) + p);
                        return "rotate(" + rotate + ")translate(" + shift + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
                    })
            }, delay);
        })
    }
// To activate the filters on the marguerite by PE, uncomment the next line :
//    getData();
});

function showText(a, step) {
    if (a.depth > maxLevel + 1) return false;
    else if (maxLevel === 1 && a.depth === 1 && step === "end") return false;
    else if (a.name.split("_").length < 3 && a.value < 1 / 100 * maxSize || a.name.split("_").length > 2 && a.value < 2 / 100 * maxSize) return false;
    else return true;
}

function isParentOf(p, c) {
    if (p === c) return true;
    if (p.children) {
        return p.children.some(function (d) {
            return isParentOf(d, c);
        });
    }
    return false;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function colour(d) {
    if (d.children) {
        // There is a maximum of two children!
        var colours = d.children.map(colour),
            a = d3.hsl(colours[0]),
            b = d3.hsl(colours[1]);
        // L*a*b* might be better here...
        return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
    }
    return d.colour || "#fff";
}

// Interpolate the scales!
function arcTween(d) {
    var my = maxY(d),
        xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, my]),
        yr = d3.interpolate(y.range(), [d.y ? 120 : 60, r]);
    return function (d) {
        return function (t) {
            x.domain(xd(t));
            y.domain(yd(t)).range(yr(t));
            return arc(d);
        };
    };
}


function maxY(d) {
    return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
}

// http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
function brightness(rgb) {
    return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
}