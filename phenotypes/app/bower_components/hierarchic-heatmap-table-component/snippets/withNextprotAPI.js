Handlebars.registerHelper('createHeader', function(columnName, block) {
    var result = {};
    result.columnWidth = "85px";
    result.columnName = columnName;
    return block.fn(result);
});

headerTemplateSrc = 
    '<div style="overflow:hidden">\
        <div class="pull-left type">Tissue/ Cell type</div>\
        <div class="pull-right">\
            <div style="overflow:hidden">\
                <div class="mRNA-header">mRNA</div><div class="protein-header">Protein</div>\
            </div>\
            <div style="overflow:hidden">\
                <div class="methodology-header MicroArray-header">MA</div><div class="methodology-header EST-header">EST</div><div class="methodology-header IHC-header">IHC</div>\
            </div>\
        </div>\
    </div>'
;

detailTemplateSrc = 
    '<span class="detection-method">{{evidenceCodeName}}</span>  <span class="dbSource">{{dbSource}}</span>  <span class="ensembl-link"><a href="{{ensemblLink}}">{{ensembl}}</a></span>\
    <div>\
        <span class="{{value}} glyphicon glyphicon-stop"></span>\
        <span>{{description}}</span>\
        {{#if qualityQualifier}}\
        <span class="silver">{{qualityQualifier}}</span>\
        {{/if}}\
    </div>'
;

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
    detailTemplateSrc: detailTemplateSrc,
    headerTemplateSrc: headerTemplateSrc,
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

    heatMapTable.loadJSONData(heatmapData);
    heatMapTable.show();
    heatMapTable.hideLoadingStatus();
});