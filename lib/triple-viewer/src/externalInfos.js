$(function () {
    var loadExternalInfo = function (crossRef, nxEntryName) {
        console.log("enter function");
        Handlebars.registerHelper('link_to', function (options) {
            return "<a target='_blank' href='" + this.link + "'>" + this.accession + "</a>";
        });


        $.getJSON("featureConfig.json", function (config) {
            console.log(config);
            Promise.all(getFeaturesByview(config.proteomics.crossRef,entry))
                .then(function (oneData) {

                    var metaData = getMetadataByView(config.proteomics);

                    var tv = new TripleViewer(entry);
                    tv.init(oneData,metaData);

                }).catch(function (err) {
                    // catch any error that happened so far
                    console.log("Argh, broken: " + err.message);
                    console.log("Error at line : " + err.stack);
                });

        });
        console.log(crossRef);
        var typeMap = {};
        crossRef.forEach(function (c) {
            if (typeMap.hasOwnProperty(c.databaseCategory)) {
                typeMap[c.databaseCategory].push({
                    "dBName": c.databaseName,
                    "accession": c.accession,
                    "link": c.resolvedUrl
                });
            }
            else {
                typeMap[c.databaseCategory] = [{
                    "dBName": c.databaseName,
                    "accession": c.accession,
                    "link": c.resolvedUrl
                }];
            }
        });
        var data = {
            type:typeMap
        };
        console.log(data);

        var template = HBtemplates['templates/crossRef.tmpl'];
        var result = template(data);
        $("#nx-crossRef").append(result);

    };

    if ($("#nx-crossRef")) { // load the overview if it exists
        console.log("div exist");
        var Nextprot = window.Nextprot;
        var nx = new Nextprot.Client("neXtprot crossRef loader", "Calipho Group");
        var nxEntryName = nx.getEntryName();
        nx.getCrossRef().then(function (data) {
            loadExternalInfo(data, nxEntryName);
        });
    }
});