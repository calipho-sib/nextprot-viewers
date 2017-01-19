headerTemplateSrc = 
    '<div style="overflow:hidden">\
      <div class="pull-right">\
        {{#each header}}\
          {{#createHeader this}}\
                <div class="heatmap-column {{columnClass}}" style="width: {{columnWidth}}">\
                    {{columnName}}\
                </div>\
          {{/createHeader}}\
        {{/each}}\
      </div>\
    </div>'
  ;

Handlebars.registerHelper('createHeader', function(columnName, block) {
  var result = {};
  result.columnWidth = "120px";
  result.columnName = columnName;
  return block.fn(result);
});

var heatmapTableOptions = {
  valuesSetting: [
    { value: 'NotDetected', color: 'lightgray'},
    { value: 'Positive', color: 'FFA10A'},
    { value: 'High', color: 'red'}
    ],
    columnWidth: "120px",
    headerTemplateSrc: headerTemplateSrc,
    headerTemplateData: {header:['MANotDetected',
                        'MAPositive',
                        'ESTPositive']}
}
var heatMapTable = new HeatMapTable({
                tableID: "heatmap-table-1",
                options: heatmapTableOptions
            });
var data = [
    {
      "rowLabel": "Human anatomical entity",
      "values": ["NotDetected", "High", "Positive"],
      "children": [
        {
          "rowLabel": "Fluid and secretion",
          "values": ["NotDetected", "High", "Positive"],
          "children": [ 
            {
              "rowLabel": "Blood", 
              "values": ["", "High", "Positive"],
              "children": []
            }
          ]
        }
      ], 
    }
  ];
        
heatMapTable.loadJSONData(data);
heatMapTable.show();