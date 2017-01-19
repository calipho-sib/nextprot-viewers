# neXtProt - The knowledge resource on human proteins

This is a code repository for the SIB - Swiss Institute of Bioinformatics CALIPHO group neXtProt project

See: http://www.nextprot.org/

# neXtProt hierarchic heatmap table component

> A generic componenent to visualize data in a hierarchic table with heat map capabilities

![hierarchic heatmap table](/assets/HHT_SCSHT.png)

**Live demo** : https://cdn.rawgit.com/calipho-sib/hierarchic-heatmap-table-component/v0.0.6/doc/index.html

## Getting Started

**1.** You can get the library in your project using bower or npm
```
//BOWER//
bower install hierarchic-heatmap-table-component

//NODE//
npm install hierarchic-heatmap-table-component
```

Or Include the hierarchic-heatmap-table-component **JS** and **CSS** from rawgit CDN in the header of your html
```html
<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/calipho-sib/hierarchic-heatmap-table-component/v0.0.6/dist/heatmap-table.css">

<script src="https://cdn.rawgit.com/calipho-sib/hierarchic-heatmap-table-component/v0.0.6/dist/heatmap-table-bundle.js"></script>
```

**NOTE** : If you already got the dependencies (Bootstrap & Jquery) in your project, use the simple minified version instead of the bundle :
```html
<script src="https://cdn.rawgit.com/calipho-sib/hierarchic-heatmap-table-component/v0.0.6/dist/heatmap-table.js"></script>
```

**2.** Specify a div in your html
```
<div id="heatmap-table"></div>
```

**3.** Create an instance of HeatmapTable in javascript, the div in which it will be display and the rendering options of your choice.
```javascript

var heatmapTableOptions = {
	valuesSetting: [
	    { value: 'NotDetected', color: 'lightgray'},
	    { value: 'Positive', color: 'FFA10A'},
	    { value: 'High', color: 'red'}
	    ],
	columnWidth: "120px"
}

var heatMapTable = new HeatMapTable({
                tableID: "heatmap-table",
                options: heatmapTableOptions
            });

```

**4.** Load the data
```javascript
var data = [
    {
      "rowLabel": "Human anatomical entity",
      "values": ["NotDetected", "High", "Positive"],
      "children": [
        {
          "rowLabel": "Fluid and secretion",
          "values": ["NotDetected", "High", "Positive"],
          "children": []
        }
      ], 
    }
  ];

heatMapTable.loadJSONData(data);
heatMapTable.show();
```

**5.** Et voila!

![hierarchic heatmap table](/assets/heatmapTable.png)


## Functionalities

* 


* 
 
 
* 

## Options

* columnWidth
* valuesSetting
* headerTemplate
* headerTemplateData
* detailTemplate 
* showExportButton

## Documentation

Check out this page for a better understanding of how to use the hierarchic heatmap table and its possibilities :
* https://cdn.rawgit.com/calipho-sib/hierarchic-heatmap-table-component/v0.0.6/doc/index.html

## Use it with NeXtProt API

<img src="/assets/NextportDemo.png" width="100%" />

It is possible to fill the hierarchic heatmap table with protein features from [NeXtProt](https://search.nextprot.org/), the human protein database.   

- First, find your protein of interest in NeXtProt and get the neXtProt accession (NX_...). (You can find your protein by entering an accession number of another database, like UniProt or Ensembl)   
- Include the hierarchic heatmap table bundle with nextprot to your html  : hierarchic-heatmap-table.nextprot.js
- Finally, create your hierarchic-heatmap-table like this :

```javascript
//initalize nextprot Client
var applicationName = 'demo app'; //please provide a name for your application
var clientInfo='calipho group at sib'; //please provide some information about you
var nx = new Nextprot.Client(applicationName, clientInfo);
        
//var entry = "NX_P01308";
var isoform = "NX_P01308-1";

// hierarchic heatmap table options
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
    detailTemplate: "detailTemplate",
    headerTemplate: "headerTemplate",
    headerTemplateData: headerTemplateData,
}

// Create nextprot hierarchic heatmap table
var heatMapTableName = "heatmap-table";
    var heatMapTable = HeatMapTable({
        tableID: heatMapTableName,
        options: heatmapTableOptions
    });

nx.getAnnotationsByCategory(proteinAccession, 'expression-profile').then(function (data) {
    var experimentalContext = {};

    //load experimental context
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

    //convert the data to the format of heatmap table 
    var heatmapData = convertNextProtDataIntoHeatMapTableFormat(experimentalContext, data);

    heatMapTable.loadJSONData(heatmapData);
    heatMapTable.show();
});

```

## Examples 

https://search.nextprot.org/entry/NX_Q01101/gh/calipho-sib/protein-expression

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/calipho-sib/hierarchic-heatmap-table-component/issues).

## Development

`git clone https://github.com/calipho-sib/hierarchic-heatmap-table-component.git` 

`npm install`  (will install the development dependencies)

`bower install`  (will install the browser dependencies)

...make your changes and modifications...

`grunt prod` (will create the min/bundle js & css in dist/ for node)

`grunt bump` (will push and add a new release)

`npm publish` (will publish in npm)



## License 

Copyright (c) 2016, SIB Swiss Institute of Bioinformatics

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
