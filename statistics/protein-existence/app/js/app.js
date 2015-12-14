var w = 800,
    h = w,
    r = w / 2,
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([60, r]),
//    y = d3.scale.linear().domain([0, 1]).range([0, r]),
    p = 5,
    duration = 1000;

//var color = d3.scale.category20c();
var colorList = ["#f7f7f7","white","white"].concat(colorbrewer.Oranges[9].slice(2,-1),colorbrewer.Greens[9].slice(2,-1),colorbrewer.Blues[9].slice(2,-1),colorbrewer.Purples[9].slice(2,-1));
var color = d3.scale.ordinal()
    .domain(["foo", "bar", "baz"])
    .range(colorList);
console.log(colorList);
console.log(color);
var maxSize = 0;
var maxLevel = 0;
var evLevelColor = {
    "Evidence_at_protein_level":"#f7f7f7",
    "Evidence_at_transcript_level":"#d9d9d9",
    "Inferred_from_homology":"#bdbdbd",
    "Uncertain":"#969696",
    "Predicted":"#737373",
}
var div = d3.select("#vis");

div.select("img").remove();

var svgElem = div.append("svg")
    .attr("width", w + p * 2)
    .attr("height", h + p * 2);

var defs = svgElem.append("defs");

var gradient = defs.append("linearGradient")
    .attr("id","mainCircleGrd")
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
.style("opacity","0.9");

var evInfoTitle = evInfoGroup
.append("text")
.attr("text-anchor","middle")
.attr("class","evTitle")
.attr("x", 45)
.attr("y", -10)
//.style("opacity","1")
.text("");
var evInfoNb = evInfoGroup
.append("text")
.attr("text-anchor","middle")
.attr("class","evNb")
.attr("x", 45)
.attr("y", 30)
//.style("opacity","1")
.text("");
var evInfoUnit = evInfoGroup
.append("text")
.attr("text-anchor","middle")
.attr("class","evNb")
.attr("x", 45)
.attr("y", 60)
//.style("opacity","1")
.text("");

var partition = d3.layout.partition()
    .sort(null)
//    .value(function(d) { return 5.8 - d.depth; });
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });


var applicationName = 'App to show protein existence level by chromosome';
var clientInfo = 'neXtProt Team';
var nx = new Nextprot.Client(applicationName, clientInfo);
var sparqlQuery = "select ?pe ?chr count(?entry) as ?cnt  where { " +
    "    ?entry :existence ?pe; 		 :gene / :chromosome ?chr } " +
    " group by ?chr ?pe order by ?chr desc(?cnt)";
var dataResult = {
    "name": "protein existence by chromosome"
};

var $table = $("#chromosomePETable").stupidtable();

nx.executeSparql(sparqlQuery).then(function (response) {
    var seriesData = {};
    response.results.bindings.forEach(function (data) {
        var pe = data.pe.value.replace("http://nextprot.org/rdf#", "");
        var cnt = parseInt(data.cnt.value);
        var chr = data.chr.value;
        var chrValues = seriesData[chr] || [];
        chrValues.push({
            "name": pe,
            "size": cnt
        });
        seriesData[chr] = chrValues;
        var chrs = "";

        if (chr < 10 && chr > 0){
          chrs = "0" + chr;
        }else {
          chrs = chr;
        }

        $("#tableBody").append("<tr>  <td> " + chrs + "</td>   <td> " + pe + "</td>  <td> " + cnt +  "</td></tr>");

    });

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
  var nodes = partition.nodes(dataResult);

  var path = vis.selectAll("path").data(nodes);
  maxSize = nodes[0].value;
//    var g = svg.datum(dataResult).selectAll("g")
//    .data(partition.nodes)
//    .enter().append("g");
//
  path.enter().append("path")
      .attr("id", function(d, i) { return "path-" + i; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
//      .style("fill", colour)
      .style("fill", function(d) {return d.depth === 0 ? "url(#mainCircleGrd)"  : d.depth === 2 ? evLevelColor[d.name] : color((d.children ? d : d.parent).name); })
      .on("click", click);

  var text = vis.selectAll(".description").data(nodes);
  var textEnter = text.enter().append("text")
      .attr("class","description")
      .style("opacity", 1)
      .style("visibility", function(e) {
        return showText(e) ? "visible" : "hidden";
      })
      .style("fill", function(d) {
        return d.depth === 0 ? "#ddd" : brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
      })
      .attr("class",function(d){return d.depth === 0 ?"title": d.depth === 1 ? "subtitle" :""})
      .attr("text-anchor", function(d) {
        return d.depth === 0 ? "middle" :  x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
      })
      .attr("dy", ".2em")
      .attr("transform", function(d) {
        var multiline = (d.name || "").split(" ").length > 1,
            angle = d.depth <= 0 ? 0 : x(d.x + d.dx / 2) * 180 / Math.PI - 90.5,
            rotate = d.depth <= 0 ? 0 : angle + (multiline ? -.5 : 0),
            shift = d.depth <= 0 ? "-0,-40" : d.depth === 1 ? (y(d.y) + p*5) : (y(d.y) + p);
        return "rotate(" + rotate + ")translate(" + shift + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
      })
      .on("click", click)
//      .each(function (d) {
//          d3.select(this).style("visibility", showText(d) ? null : "hidden");
//      })
  ;
  textEnter.append("tspan")
      .attr("x", 0)
      .text(function(d) { return d.depth === 0 ? d.name.split(" ")[0] + " " + d.name.split(" ")[1]  : d.depth >0 ? d.name.split(" ")[0] : ""; });
  textEnter.append("tspan")
      .attr("x", 0)
      .attr("dy", "1.2em")
      .text(function(d) { return d.depth === 0 ? d.name.split(" ")[2] + " " + d.name.split(" ")[3] : d.depth >0 ? d.name.split(" ")[1] : ""; });

  textEnter.append("tspan")
      .attr("x", 0)
      .attr("dy", "1.2em")
      .text(function(d) { return d.depth === 0 ? "" : d.depth >0 ? d.name.split(" ")[2] || "" : ""; });

  textEnter.append("tspan")
      .attr("x", 0)
      .attr("class","proteinsNb")
      .attr("dy", "2.8em")
      .text(function(d) { return d.depth === 0 ? d.value + " proteins" : d.depth >0 ? d.name.split(" ")[3] : ""; });

  function click(d) {
      console.log("test");
      if (d.depth !== 0) {
        var t0 = evInfoGroup
            .transition().duration(500)
            .style("opacity","0");

        var t1 = t0
            .transition().delay(500).duration(1000)
            .style("opacity","01");

        var evPercent = (d.value/d.parent.value * 100).toFixed(2);

        evInfoTitle.transition().delay(500).text(d.name.split("_").join(" "));
        evInfoTitle.transition().delay(500).style("font-size",function(f) {return d.depth === 2 ? "1.1em" : "60px"});
        evInfoNb.transition().delay(500).text(d.value + " proteins");
        evInfoUnit.transition().delay(500).text("( " + evPercent + "% )");
      }
      else{
          evInfoGroup
            .transition().duration(500)
            .style("opacity","0");
      }

    maxSize = d.value;
    maxLevel = d.depth;

    path.transition()
      .duration(duration)
      .attrTween("d", arcTween(d));

    // Somewhat of a hack as we rely on arcTween updating the scales.
    text
      .style("visibility", function(e) {
        return isParentOf(d, e) ? showText(e) ? "visible" : "hidden" : d3.select(this).style("visibility");
      })
      .transition().duration(duration)
      .attrTween("text-anchor", function(d) {
        return function() {
          return d.depth <= 0 ? "middle" : x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
        };
      })
      .attrTween("transform", function(d) {
        var multiline = (d.name || "").split(" ").length > 1;
        return function() {
          var angle = d.depth <= 0 ? 0 : x(d.x + d.dx / 2) * 180 / Math.PI - 90,
            rotate = d.depth <=  0 ? 0 : angle + (multiline ? -.5 : 0),
            shift = d.depth <= 0 ? "-0,-40" : d.depth === 1 ? (y(d.y) + p*5) : (y(d.y) + p);
          return "rotate(" + rotate + ")translate(" + shift + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
        };
      })
      .style("opacity", function(e) { return isParentOf(d, e) ? showText(e) ? 1 : 1e-6 : 1e-6; })
      .each("end", function(e) {
        d3.select(this).style("visibility", isParentOf(d, e) ? showText(e) ? null : "hidden" : "hidden");
      });
  }
});

function showText(a) {
//    console.log(a);
//    console.log("maxSize : " + maxSize + "; value : " + a.value);
    if (a.depth > maxLevel+1) return false;
    else if (a.value < 1/100*maxSize) return false;
    else return true;
}
function isParentOf(p, c) {
  if (p === c) return true;
  if (p.children) {
    return p.children.some(function(d) {
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
  return function(d) {
    return function(t) {
        x.domain(xd(t));
        y.domain(yd(t)).range(yr(t));
        return arc(d); };
  };
}


function maxY(d) {
  return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
}

// http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
function brightness(rgb) {
  return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
}
