$(function () {
    
    var headerTemplateData  = {header:['Positive',
                                  'NotDetected',
                                  'Positive', 
                                  'High', 
                                  'Medium',
                                  'Low',
                                  'NotDetected']
                              };

    var heatmapTableOptions = {
        valuesSetting: [
            // { value: 'Positive', color: '#FFA10A'},
            { value: 'Positive', color: '#FFA10A'},
            { value: 'NotDetected', color: "lightgray"},
            { value: 'Low', color: '#FFE6BD'},
            { value: 'Medium', color: '#FFC870'},
            { value: 'High', color: '#FFA10A'}
        ],
        columnWidth: "30px",
        detailTemplateID: "detailTemplate",
        headerTemplateID: "headerTemplate",
        headerTemplateData: headerTemplateData,
    }

    var applicationName = 'protein expression app'; //please provide a name for your application
    var clientInfo = 'JinJin'; //please provide some information about you
    var nx = new Nextprot.Client(applicationName, clientInfo);

    // var proteinAccession = 'NX_Q01101'; //Corresponds to Breast cancer protein -> http://www.nextprot.org/db/entry/NX_P38398/expression
    var proteinAccession = nx.getEntryName();

    var heatMapTableName = "heatmap-table";
    var heatMapTable = HeatMapTable({
        tableID: heatMapTableName,
        options: heatmapTableOptions
    });
    heatMapTable.showLoadingStatus();
    DEBUG = false;

    if (DEBUG == true) {
        var experimentalContext = {};
        $.ajax(
            {
                type: "get",
                async: false,
                url: "./data/experimental-context.json",
                success: function (data) {
                    data = data['entry']['experimentalContexts'];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].developmentalStage && data[i].developmentalStage.name != "unknown") {
                            experimentalContext[data[i].contextId] = data[i].developmentalStage.name;
                        }
                    }
                },
                error: function (msg) {
                    console.log(msg);
                }
            }
        );
        data = {};
        $.ajax(
            {
                type: "get",
                url: "/data/expression-profile.json",
                async: false,
                success: function (result) {
                    data = _convertToTupleMap(result);
                },
                error: function (msg) {
                    console.log(msg);
                }
            }
        );

        var heatmapData = convertNextProtDataIntoHeatMapTableFormat(experimentalContext, data);

        heatmapData = filterByEvidences(heatmapData, getFilters());
        console.log(heatmapData);
        activateFilters(heatmapData, heatMapTable);
        heatMapTable.loadJSONData(heatmapData);
        heatMapTable.show();
        heatMapTable.hideLoadingStatus();
    } else {
        nx.getAnnotationsByCategory(proteinAccession, 'expression-profile').then(function (data) {
            var experimentalContext = {};
            $.ajax(
                {
                    type: "get",
                    url: "https://api.nextprot.org/entry/"+proteinAccession+"/experimental-context.json",
                    // url: "./data/experimental-context.json",
                    async: false,
                    success: function (data) {
                        data = data['entry']['experimentalContexts'];
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].developmentalStage && data[i].developmentalStage.name != "unknown") {
                                experimentalContext[data[i].contextId] = data[i].developmentalStage.name;
                            }
                        }
                    },
                    error: function (msg) {
                        console.log(msg);
                    }
                }
            );

            var heatmapData = convertNextProtDataIntoHeatMapTableFormat(experimentalContext, data);

            heatmapData = filterByEvidences(heatmapData, getFilters());
            console.log(heatmapData);
            activateFilters(heatmapData, heatMapTable);
            heatMapTable.loadJSONData(heatmapData);
            heatMapTable.show();
            heatMapTable.hideLoadingStatus();

        });
    }
});

$( document ).ready(function() {
    addSelectAll();
    // activateFilters("", "");
});


function _convertToTupleMap(data) {
    var publiMap = {};
    var xrefMap = {};
    if (data.entry.publications){
        data.entry.publications.forEach(function (p) {
            publiMap[p.md5] = p;
        });
    }
    data.entry.xrefs.forEach(function (p) {
        xrefMap[p.dbXrefId] = p;
    });
    //return data.entry.annotations;
    return {
        annot: data.entry.annotations,
        publi: publiMap,
        xrefs: xrefMap
    };
};

$(function () { 
    
});