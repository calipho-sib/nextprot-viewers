var w = 600,
    h = w,
    r = w / 2,
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([60, r]),
    //    y = d3.scale.linear().domain([0, 1]).range([0, r]),
    p = 5,
    duration = 1000;

//var color = d3.scale.category20c();
var colorList = ["#ccc", "#ccc", "#ccc"].concat(colorbrewer.Oranges[9].slice(2, -1), colorbrewer.Greens[9].slice(2, -1), colorbrewer.Blues[9].slice(2, -1), colorbrewer.Purples[9].slice(1, -1));
var color = d3.scale.ordinal()
    .domain(["foo", "bar", "baz"])
    .range(colorList);
console.log(colorList);
console.log(color);
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

gradient.append("stop")
    .attr("offset", "0")
    .attr("stop-color", "#98908e")
    .attr("stop-opacity", 1);

gradient.append("stop")
    .attr("offset", "1")
    .attr("stop-color", "#272524")
    .attr("stop-opacity", 1);


var vis = svgElem.append("g")
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
    .attr("x", 35)
    .attr("y", 90)
    .attr("height", 20)
    .attr("width", 20)
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
    "?entry :existence ?pe;" +
    ":gene / :chromosome ?chr ." +
    "?pe :level ?level." +
    "?pe rdfs:label ?label ." +
    "}" +
    "group by ?chr ?pe ?level ?label order by ?chr ?level";
var dataResult = {
    "name": "protein existence by chromosome"
};


nx.executeSparql(sparqlQuery).then(function (response) {
    var seriesData = {};
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
                chrHtml = "<td class=\"chrNumber\" data-sort-value=\"24\" style=\"padding:2px 20px;\"><button type=\"button\" class=\"btn btn-info\">" + chrs + "</button></td>";
                break;
            case "Y":
                chrHtml = "<td class=\"chrNumber\" data-sort-value=\"25\" style=\"padding:2px 20px;\"><button type=\"button\" class=\"btn btn-info\">" + chrs + "</button></td>";
                break;
            case "MT":
                chrHtml = "<td class=\"chrNumber\" data-sort-value=\"23\" style=\"padding:2px 20px;\"><button type=\"button\" class=\"btn btn-info\">" + chrs + "</button></td>";
                break;
            case "unknown":
                chrHtml = "<td class=\"chrNumber\" data-sort-value=\"26\" style=\"padding:2px 20px;\"><button type=\"button\" class=\"btn btn-info\">" + chrs + "</button></td>";
                break;
            default:
                chrHtml = "<td class=\"chrNumber\" data-sort-value=" + chrs + " style=\"padding:2px 20px;\"><button type=\"button\" class=\"btn btn-info\">" + chrs + "</button></td>";
                break;
            }
            var cntHtml = "";
            if (chrValues.length === 5) {
                for (var ev in chrValues) {
                    cntHtml += "<td> " + chrValues[ev].size + "</td>";
                }
            } else {
                var partChr = [];
                partChr.push(chrValues.filter(function (a) {
                    return a.name === "Evidence_at_protein_level"
                })[0]);
                partChr.push(chrValues.filter(function (a) {
                    return a.name === "Evidence_at_transcript_level"
                })[0]);
                partChr.push(chrValues.filter(function (a) {
                    return a.name === "Inferred_from_homology"
                })[0]);
                partChr.push(chrValues.filter(function (a) {
                    return a.name === "Predicted"
                })[0]);
                partChr.push(chrValues.filter(function (a) {
                    return a.name === "Uncertain"
                })[0]);
                partChr.forEach(function (d) {
                    var pex = d ? d.size : 0;
                    cntHtml += "<td> " + pex + "</td>";
                })
            }
            //            console.log("<tr>" + chrHtml + cntHtml + "</tr>");
            //            $("#tableBody").append("<tr>  <td> " + chrs + "</td>   <td> " + pe + "</td>  <td> " + cnt +  "</td></tr>");
            $("#tableBody").append(chrId + chrHtml + cntHtml + "</tr>");
        }

    });
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

    var children = Object.keys(seriesData).map(function (chromosome) {

        var childrenPerChrosome = seriesData[chromosome].map(function (i) {
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


    dataResult.children = children;
    dataResult.name = dataResult.name.charAt(0).toUpperCase() + dataResult.name.slice(1);
    
    function dataStats(data){
        var PEHashMap = {};
        data.forEach(function(chr){
            chr.children.forEach(function(pe){
                if (PEHashMap[pe.name]) PEHashMap[pe.name] += pe.size;
                else PEHashMap[pe.name] = pe.size;
            })
        })
        return PEHashMap;
    }
    
    var nodes = partition.nodes(dataResult);

    var path = vis.selectAll("path").data(nodes);
    maxSize = nodes[0].value;

    var PEStats = dataStats(dataResult.children);
    PEStats["Total"]=dataResult.value;
    var pe1 = (parseInt(PEStats["Evidence_at_protein_level"])/parseInt(PEStats["Total"])).toFixed(2);
    var pe2 = (parseInt(PEStats["Evidence_at_transcript_level"])/parseInt(PEStats["Total"])).toFixed(2);
    var pe3 = (parseInt(PEStats["Inferred_from_homology"])/parseInt(PEStats["Total"])).toFixed(2);
    var pe4 = (parseInt(PEStats["Predicted"])/parseInt(PEStats["Total"])).toFixed(2);
    var pe5 = (parseInt(PEStats["Uncertain"])/parseInt(PEStats["Total"])).toFixed(2);
    var intStats = "<tr><td class=\"chrNumber\" id=\"total\"><button type=\"button\" class=\"btn btn-info\">" + PEStats["Total"] + "</button></td><td>" + PEStats["Evidence_at_protein_level"] + "</td><td>" + PEStats["Evidence_at_transcript_level"] + "</td><td>" + PEStats["Inferred_from_homology"] + "</td><td>" + PEStats["Predicted"] + "</td><td>" + PEStats["Uncertain"] + "</td></tr>";
    var percStats = "<tr><td class=\"chrNumber\" id=\"total\">100%</td><td>" + pe1 + "%</td><td>" + pe2 + "%</td><td>" + pe3 + "%</td><td>" + pe4 + "%</td><td>" + pe5 + "%</td></tr>";
    $("#tableBodyTotal").append(intStats);
    $("#tableBodyTotal").append(percStats);
    $("#total").click(function () {
        $("#path0").d3Click();
    })
    
    path.enter().append("path")
        .attr("id", function (d, i) {
            return d.name.length > 8 ? "path" + i : "path-" + d.name;
        })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        //      .style("fill", colour)
        .style("fill", function (d) {
            return d.depth === 0 ? "url(#mainCircleGrd)" : d.depth === 2 ? evLevelColor[d.name] : color((d.children ? d : d.parent).name);
        })
        .on("click", click);

    var text = vis.selectAll(".description").data(nodes);
    var textEnter = text.enter().append("text")
        .attr("class", "description")
        .style("opacity", 1)
        .style("visibility", function (e) {
            return showText(e) ? "visible" : "hidden";
        })
        .style("fill", function (d) {
            return d.depth === 0 ? "#ddd" : brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
        })
        .attr("class", function (d) {
            return d.depth === 0 ? "title" : d.depth === 1 ? "subtitle" : ""
        })
        .attr("text-anchor", function (d) {
            return d.depth === 0 ? "middle" : x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
        })
        .attr("dy", ".2em")
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
        .style("font-size", function(d){return d.depth > 1 ? "1.1em" : d.depth === 0 ? "0.8em" : "0.9em"})
        .text(function (d) {
            return d.depth === 0 ? d.name.split(" ")[0] + " " + d.name.split(" ")[1] : d.depth === 2 ? d.name.split("_")[0] + " " + (d.name.split("_")[1] || "") : (d.name.split(" ")[0] || "");
        });
    textEnter.append("tspan")
        .attr("x", 0)
        .style("font-size", function(d){return d.depth > 1 ? "1.1em" : d.depth === 0 ? "0.8em" : "0.9em"})
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
        .attr("class", "proteinsNb")
        .style("font-size", "0.6em")
        .attr("dy", "3em")
        .text(function (d) {
            return d.depth === 0 ? d.value + " proteins" : d.depth > 0 ? d.name.split(" ")[3] : "";
        });
    
    function autoScroll(selection,table){
        var ElementTop = $(selection).position().top-220;
            var scrollPosition = $(table).scrollTop();
            var scrollingLength = ElementTop + scrollPosition;
            $(table).animate({scrollTop: scrollingLength}, 1000);
    }
    
    function tableInteraction(elem) {
        if (elem.depth === 0){
            $(".chrSelected").removeClass("chrSelected");
            autoScroll("#chr1", ".chrTable");
        }
        if (elem.depth === 1) {
            $(".chrSelected").removeClass("chrSelected");
            $("#chromosomePETable #chr"+ elem.name).addClass("chrSelected");
            autoScroll(".chrSelected", ".chrTable");
            
        }
        else if (elem.depth === 2){
            $(".chrSelected").removeClass("chrSelected");
            $("#chromosomePETable #chr"+ elem.parent.name).addClass("chrSelected");
            autoScroll(".chrSelected", ".chrTable");
        }
    }

    function click(d) {
        console.log(d);
        console.log("test");
        if (d.depth !== 0) {
            var t0 = evInfoGroup
                .transition().duration(500)
                .style("opacity", "0");

            var t1 = t0
                .transition().delay(500).duration(1000)
                .style("opacity", "1");

            var evPercent = (d.value / d.parent.value * 100).toFixed(2);

            evInfoTitle.transition().delay(500).text(d.depth === 1 ? "chr " + d.name : d.name.split("_").join(" "));
            evInfoTitle.transition().delay(500).style("font-size", function (f) {
                return d.depth === 2 ? "1.1em" : d.name.length > 6 ? "2.4em" : "3.2em"
            });
            evInfoNb.transition().delay(500).text(d.value + " proteins");
            evInfoUnit.transition().delay(500).text("( " + evPercent + "% )");
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
                return isParentOf(d, e) ? showText(e,"begin") ? 1 : 1e-6 : 1e-6;
            })
            .each("end", function (e) {
                d3.select(this).style("visibility", isParentOf(d, e) ? showText(e,"end") ? null : "hidden" : "hidden");
            });
    }
});

function showText(a,step) {
    
    //    console.log(a);
    //    console.log("maxSize : " + maxSize + "; value : " + a.value);
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
    console.log(my);
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