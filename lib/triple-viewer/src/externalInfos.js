$(function () {

    var loadExternalInfo = function (crossRef, nxEntryName) {
        console.log("enter function");
        Handlebars.registerHelper('link_to', function (options) {
            return "<a target='_blank' href='" + this.resolvedLink + "'>" + this.accession + "</a>";
        });

        function getAdditionalInfos(properties){
            if (!properties) return null;
            else {
                var infos=[];
                properties.forEach(function(d) {
                    infos.push({
                        name: d.name != "entry name" ? d.name : null,
                        value: d.value
                    })
                });
                return infos;
            }
        }

        function postProcessing(data){
            for (var property in data) {
                console.log(property);
                if (data.hasOwnProperty(property)) {
                    if (property.startsWith("ENST")) {
                        console.log("WE ARE ALMOOOOST GETTING IN !");
                        var isoformID = "";
                        var geneID = "";
                        console.log(data[property]);
                        if (data[property].additionalInfos.length) {
                            console.log("WE ARE GETTING IN !");
                            data[property].additionalInfos.forEach(function (p) {
                                if (p.name === "gene ID") {
                                    geneID = p.value;
                                }
                                if (p.name === "protein sequence ID") {
                                    isoformID = p.value;
                                }
                            });
                            console.log(isoformID);
                            console.log(geneID);
                            var isoRef = data[isoformID];
                            var geneRef = data[geneID];
                            console.log("new objects : ");
                            console.log(isoRef);
                            console.log(geneRef);
                            data[property].crossLink[0].preLink = "Transcrit";
                            data[property].additionalInfos = "";
                            data[property].crossLink.push({
                                "accession": isoRef.crossLink[0].accession,
                                "link": isoRef.crossLink[0].link,
                                "preLink": "Protein"
                            });
                            data[property].crossLink.push({
                                "accession": geneRef.crossLink[0].accession,
                                "link": geneRef.crossLink[0].link,
                                "preLink": "Gene"
                            });
                            delete data[isoformID];
                            //delete data[geneID];
                        }

                    }
                }
                if (data[property].dBName === "EMBL") {
                    var other = {};
                    var type = "";
                    data[property].additionalInfos.forEach(function(a) {
                        if (a.name === "molecule type") {
                            type = a.value;
                        }
                        else other = {
                            name: a.name,
                            value: a.value
                        }
                    });
                    var mainLink = data[property].crossLink[0].link.slice(0,-2);
                    data[property].crossLink[0].preLink = "Translation";
                    data[property].crossLink[0].resolvedLink = mainLink + data[property].crossLink[0].accession;

                    data[property].crossLink.unshift({
                        "accession": other.value,
                        "link": mainLink,
                        "resolvedLink": mainLink + other.value,
                        "preLink": type === "protein" ? "Genomic DNA" : type
                    });
                    data[property].additionalInfos = null;
                }
            };
            return data;
        }
        function getcrossLink(data){
            var xrefList = [];
            xrefList.push({
                "accession": data.accession,
                "link": data.linkUrl,
                "resolvedLink": data.resolvedUrl,
                "preLink": ""
            });
            return xrefList;
        }

        function linkParser(data) {
            //var parsedData = {};
            var parsedData = {
                "dBName": data.databaseName,
                "crossLink": getcrossLink(data),
                "additionalInfos": data.databaseName  === "Ensembl" || data.databaseName === "EMBL" ? data.properties : getAdditionalInfos(data.properties)
            };
            return parsedData;
        }

        console.log(crossRef);
        $.getJSON("../src/featureConfig.json", function (config) {
            console.log(config);
            console.log(config.proteomics.crossRef);
            var listParam = config.proteomics.crossRef;
            var typeMap = {};
            for (var type in listParam){
                typeMap[type]={};
            };
            crossRef.forEach(function(c) {
                if (typeMap.hasOwnProperty(c.databaseCategory) && listParam[c.databaseCategory].indexOf(c.databaseName) > -1) {
                    typeMap[c.databaseCategory][c.accession] = linkParser(c);
                }
            });
            for (var elem in typeMap) {
                postProcessing(typeMap[elem]);
            }
            var data = {
                type:typeMap
            };
            console.log(data);

            var template = HBtemplates['templates/crossRef.tmpl'];
            var result = template(data);
            $("#nx-crossRef").append(result);
        });




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