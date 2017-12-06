var pepHistogram = function (listPeptides) {
if ($("#nx-histogram").length > 0) {

    var proteoDistribution = [];
    var nonProteoDistribution = [];
    var found;
    listPeptides.forEach(function (o) {
        if (o.properties.proteotypic === true) {
            found = -1;
            for (i = 0; i < proteoDistribution.length; i++) {
                if (proteoDistribution[i].x === o.length) {
                    found = i;
                    break;
                }
            }
            if (found < 0) {
                proteoDistribution.push({y: 1, x: o.length});
            }
            else {
                proteoDistribution[found].y += 1;
            }
        }
        else if (o.properties.natural === true) {
//        else if (o.properties.natural === true || o.properties.synthetic === true) {
            found = -1;
            for (i = 0; i < nonProteoDistribution.length; i++) {
                if (nonProteoDistribution[i].x === o.length) {
                    found = i;
                    break;
                }
            }
            if (found < 0) {
                nonProteoDistribution.push({y: 1, x: o.length});
            }
            else {
                nonProteoDistribution[found].y += 1;
            }
        }
    });


    function sortPositions(listPositions) {
        return listPositions.sort(function (posA, posB) {
            return (posA.x - posB.x);
        })
    }

    //var colors = Highcharts.getOptions().colors;
        //$.each(colors, function (i, color) {
        //    colors[i] =
        //    {
        //        linearGradient: {x1: 0, y1: 0, x2: 1, y2: 0},
        //        stops: [
        //            [0, '#00b7ea'],
        //            [1, '#009ec3']
        //        ]
        //    };
        //});

        // Create the chart
        $('#container').highcharts({

            chart: {
                type: 'column',
                margin: 40,
                marginRight: 40,
                marginLeft: 65,
                marginBottom: 50
            },
            tooltip: {
                useHTML: true,
                headerFormat: '<small>{point.x}</small><table style="font-size:11px;width:150px;";><tr><th style="text-align:right;padding:5px;"><span style="color:{series.color};">Length</span> :</th><td><b>{point.x}</b></td></tr>',
                pointFormat: '<tr><th style="color:{series.options.color};text-align:right;white-space:nowrap;padding:5px;">{series.name} : </th>' +
                '<td style="white-space: nowrap"><b> {point.y} </b>peptides</td></tr>',
                footerFormat: '</table></ul>',
                shared: true
            },
            plotOptions: {
                column: {
                    depth: 65,
                    borderWidth: 0
                }
            },
            colors : [{
                linearGradient: {x1: 0, y1: 0, x2: 1, y2: 0},
                stops: [
                    [0, '#4BD8A5'],
                    [1, '#0AD088']
                ]
            },
                {
                linearGradient: {x1: 0, y1: 0, x2: 1, y2: 0},
                stops: [
                    [0, '#00b7ea'],
                    [1, '#009ec3']
                ]
            }],
            title: {
                text: null
            },
            yAxis: {
                allowDecimals: false,
                type: 'logarithmic',
                title: {
                    text: '<b>Occurrence</b>'
                }
            },
            xAxis: {
                min: 0,
                allowDecimals: false,
                title: {
                    text: '<b>Length<b>'
                }
            },
            exporting: {
                enabled: false
            },
            legend: {enabled: false},
            credits: {enabled: false},
            series: [{
                name: "proteotypic",
                data: sortPositions(proteoDistribution)
            },
            {
                name: "non-proteotypic",
                data: sortPositions(nonProteoDistribution)
            }]

        });
    }
};