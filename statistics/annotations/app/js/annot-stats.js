
$.ajaxSetup({
    beforeSend: function(xhr){
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType("application/json");
        }
    }
});

function formatString(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        if (letter.match(/[A-Z]/) && index != 0) {
            return " " + letter.toLowerCase();
        }
        return index == 0 ? letter.toUpperCase() : letter.toLowerCase();
    });
};

function buildCharts(allData, maxElement) {

    // For each group in allData, we construct a chart.
    var index = 0;
    for (var currentGroup in allData) {

        var totalAnnot = 0;
        for (var i = 0; i < allData[currentGroup].length; i += 1) {
            totalAnnot += parseInt(allData[currentGroup][i].y);
        }

        Highcharts.getOptions().lang.thousandsSep = ",";

        $("#annot-stats").append($("<div id=annot-stats-" + index + " class='annot-stats' ></div>"));

        // Build the chart
        $( '#annot-stats-'+index ).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                width: 300,
                height: 190
            },
            title: {
                text: currentGroup + " (" + totalAnnot.toLocaleString("en") + " annot.)",
                style: {
                    fontSize: "12px",
                    fontWeight: "bold"
                }
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.id}: {point.y} annot. ({point.percentage:.1f}%)',
                style: {
                    width: 150
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    size: 100,
                    dataLabels: {
                        enabled: true,
                        distance: 15,
                        format: '{point.name}',
                        style: {
                            width: 90,
                            fontWeight: "normal",
                            fontSize: "10px"
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                data: allData[currentGroup]
            }],
            credits: {
                enabled :false
            }
        });
        index += 1;
    }
}

function defineSourceColor(src) {

    var srcColor = "#000000";
    if (src == "AgBase") {
        srcColor = "#41200A";
    } else if (src == "Alzheimers_University_of_Toronto") {
        srcColor = "#002a5c";
    } else if (src == "Bgee") {
        srcColor = "#BC161D";
    } else if (src == "BHF-UCL") {
        srcColor = "#4C2350";
    } else if (src == "Cosmic") {
        srcColor = "#14559f";
    } else if (src == "dbSNP") {
        srcColor = "#8C0078";
    } else if (src == "DFLAT") {
        srcColor = "#663300";
    } else if (src == "dictyBase") {
        srcColor = "#394a6f";
    } else if (src == "Dyp") {
        srcColor = "#596F80";
    } else if (src == "Ensembl") {
        srcColor = "#333366";
    } else if (src == "FlyBase") {
        srcColor = "#669999";
    } else if (src == "GDB") {
        srcColor = "#006F58";
    } else if (src == "GFP-cDNAEMBL") {
        srcColor = "#008A00";
    } else if (src == "GO_central") {
        srcColor = "#428BCA";
    } else if (src == "GOC") {
        srcColor = "#428BCA";
    } else if (src == "HGNC") {
        srcColor = "#EF981C";
    } else if (src == "Human_protein_atlas") {
        srcColor = "#0083C4";
    } else if (src == "Human_protein_atlas_subcellular_localization") {
        srcColor = "#97CF16";
    } else if (src == "IntAct") {
        srcColor = "#57A7A7";
    } else if (src == "InterPro") {
        srcColor = "#551a8b";
    } else if (src == "LIFEdb") {
        srcColor = "#0047B9";
    } else if (src == "MGI") {
        srcColor = "#002255";
    } else if (src == "MTBbase") {
        srcColor = "#E9F1BE";
    } else if (src == "NextProt") {
        srcColor = "#C50063";
    } else if (src == "NTNU_SB") {
        srcColor = "#006699";
    } else if (src == "ParkinsonsUK-UCL") {
        srcColor = "#29A6C9";
    } else if (src == "PeptideAtlas") {
        srcColor = "#FC7907";
    } else if (src == "PINC") {
        srcColor = "#D3C700";
    } else if (src == "Roslin_Institute") {
        srcColor = "#2865a3";
    } else if (src == "SGD") {
        srcColor = "#544383";
    } else if (src == "SRMAtlas") {
        srcColor = "#FF8700";
    } else if (src == "Uniprot") {
        srcColor = "#71B8D3";
    } else if (src == "WormBase") {
        srcColor = "#6d1b1c";
    }
    return srcColor;
}

// Load/parse json file and manage data
var getMyJSON = function () {

    $.getJSON( "assets/np-annot-typ-src.json", function( data ) {

        var allData = {};

        var maxElement = 6;

        for (var i = 0; i < data.results.bindings.length; i++) {

            //TODO it's assume that counts are ordered desc. for the same group
            // I need to add a check on it

            // Get color source
            var currentColor = defineSourceColor(data.results.bindings[i].src.value.match(/[^\/]*$/)[0]);

            // Get source (src) (for instance, "http://nextprot.org/rdf/source/Uniprot")
            var tmpSource = data.results.bindings[i].src.value.match(/[^\/]*$/)[0];
            var currentSource = tmpSource.replace(/_/g, " ").replace("Human protein atlas", "HPA");

            // Get count (cnt) of one source (src) for one group (pred)
            var currentCount = Number(data.results.bindings[i].cnt.value);

            // Get group name (pred) (for instance, "http://nextprot.org/rdf#function")
            var currentGroup = formatString(data.results.bindings[i].pred.value.match(/[^#]*$/)[0]);


            if (currentGroup in allData) {

                var currentLength = allData[currentGroup].length;
                // If there is already more than 'maxElement' elements for one group,
                // we sum counts in 'Other' sources.
                if (currentLength <= maxElement) {
                    // We add the element at the end of the array,
                    // so if length array equals 3 we should add element to array[3]
                    allData[currentGroup][currentLength] = {
                        name: currentSource,
                        id : currentSource,
                        y: currentCount,
                        color: currentColor
                    };

                } else {
                    // We should create "Other" section
                    var previousData = allData[currentGroup][maxElement];
                    var sum = parseInt(previousData["y"]) + parseInt(currentCount);
                    var legend = previousData["id"];
                    if (legend) {
                        legend += ", "+ currentSource;
                    }
                    allData[currentGroup][maxElement] = {
                        name: "Other",
                        id : legend,
                        y: sum,
                        color: "#CCCCCC"
                    }
                }

            } else {
                // We create an array of maps
                allData[currentGroup] = [{
                    name: currentSource,
                    id : currentSource,
                    y: currentCount,
                    color: currentColor
                }];
            }

        }

        // Build charts according to retrieved data.
        buildCharts(allData, maxElement);
    });
};



$( document ).ready( function(){
    getMyJSON();
});