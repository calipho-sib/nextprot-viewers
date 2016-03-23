var AdditionalInfos = (function () {

    var AdditionalInfos = function () {};

    function getKeywordByview(kwFilter, list) {
        var data = {};
        var count=0;
        var dataArray = [];
        list.forEach(function (k) {
            if (kwFilter.type.indexOf(k.cvTermType) >= 0 && kwFilter.exceptions.indexOf(k.cvTermAccessionCode) < 0) {
                if (data[k.cvTermType]) data[k.cvTermType].push(k);
                else data[k.cvTermType] = [k];
            }
        });
        var dataArray = Object.keys(data).map(function (key) {
            var temp = {};
            temp[key] = data[key];
            return temp
        });

        dataArray.sort(function (a, b) {
            var textA = Object.keys(a)[0].toUpperCase();
            var textB = Object.keys(b)[0].toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        dataArray.forEach(function(d){d[Object.keys(d)[0]].forEach(function(d2){count+=1;})});
        return {data:dataArray,
                count: count};
    }

    AdditionalInfos.prototype.compileKeyword = function (entry, nx, keywords, div) {
        nx.getAnnotationsByCategory(entry, "keyword")
            .then(function (data) {
                var keywordList = getKeywordByview(keywords, data.annot);
                var source = $("#entry-template").html();
                var template = HBtemplates['templates/keywords.tmpl'];
                var html = template(keywordList);
                $(div).html(html);

            }).catch(function (err) {
                // catch any error that happened so far
                console.log("Argh, broken: " + err.message);
                console.log("Error at line : " + err.stack);
            });
    };
    function sortAlpha(a,b){
            var textA = Object.keys(a)[0].toUpperCase();
            var textB = Object.keys(b)[0].toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        };
    
    var status = {
             ALT_TERM: 'Different termination', 
             ALT_INIT: 'Different initiation',
             NOT_ANNOTATED_CDS:'No translation available', 
             ALT_SEQ:'Sequence problems', 
             ALT_FRAME:'Frameshift'
    }
    function filterExceptions(typeList) {
        var newTypeList = [];
        for (elem in typeList){
            if (typeList[elem].databaseName === "Ensembl"){
                if (typeList[elem].accession.startsWith("ENST")){
                    if (typeList[elem].properties) {
                        var ensembl = {
                            name: typeList[elem].databaseName,
                            xrefs : [{
                                accession: typeList[elem].accession,
                                url : typeList[elem].resolvedUrl,
                                prefix : "Transcript",
                                suffix : ""
                            }]
                        };
                        typeList[elem].properties.forEach(function(p){
                            if (p.name === "nxmapped protein sequence ID") {
                                var result = $.grep(typeList, function(e){ return e.accession == p.value; })[0];
                                ensembl.xrefs.push({
                                    accession: result.accession,
                                    url : result.resolvedUrl,
                                    prefix : "Protein",
                                    suffix : ""
                                    }
                                );
                            }
                        })
                        typeList[elem].properties.forEach(function(p){
                            if (p.name === "nxmapped gene ID") {
                                var result = $.grep(typeList, function(e){ return e.accession == p.value; })[0];
                                ensembl.xrefs.push({
                                    accession: result.accession,
                                    url : result.resolvedUrl,
                                    prefix : "Gene",
                                    suffix : ""
                                    }
                                );
                            }
                        })
                        newTypeList.push(ensembl);
                    }
                }
            }
            else if (typeList[elem].databaseName === "EMBL"){ //TODO
                if (typeList[elem].properties.length > 0) {
                    var molType = $.grep(typeList[elem].properties, function(e){ return e.name === "molecule type"; })[0];
                    var addInfos = $.grep(typeList[elem].properties, function(e){ return e.name === "status"})[0];
                    var suffix = addInfos ? status[addInfos.value] : "";
                    var embl = {
                        name: typeList[elem].databaseName,
                            xrefs : []
                    };
                    if (molType.value === "mRNA") {
                        embl.xrefs.push({
                                accession: typeList[elem].accession,
                                url : typeList[elem].resolvedUrl,
                                prefix : "mRNA",
                                suffix : ""
                            })
                        var translationID = $.grep(typeList[elem].properties, function(e){ return e.name === "protein sequence ID"; })[0].value;
                        var translation = $.grep(typeList, function(e){ return e.accession == translationID; })[0];
                        embl.xrefs.push({
                                accession: translation.accession,
                                url : translation.resolvedUrl,
                                prefix : "Translation",
                                suffix : suffix
                            })
                    }
                    else if (molType.value === "protein") {
                        var geneIDs = $.grep(typeList[elem].properties, function(e){ return e.name === "genomic sequence ID"; });
                        console.log(geneIDs);
                        geneIDs.forEach(function(g){
                            var gene = $.grep(typeList, function(e){ return e.accession == g.value; })[0];
                            embl.xrefs.push({
                                accession: gene.accession,
                                url : gene.resolvedUrl,
                                prefix : "Genomic DNA",
                                suffix : ""
                            })
                        })
                        embl.xrefs.push({
                                accession: typeList[elem].accession,
                                url : typeList[elem].resolvedUrl,
                                prefix : "Translation",
                                suffix : suffix
                            })
                    }
                    else if (molType.value === "Genomic_DNA" && addInfos.value) {
                        var geneIDs = $.grep(typeList[elem].properties, function(e){ return e.name === "genomic sequence ID"; });
                        console.log(geneIDs);
                        embl.xrefs.push({
                            accession: typeList[elem].accession,
                            url : typeList[elem].resolvedUrl,
                            prefix : "Genomic DNA",
                            suffix : suffix
                        })
                    }
                    if (embl.xrefs.length === 0) {
                        console.log(typeList[elem]);
                        console.log("fdlksfjdslkfmdjqklmfdjslm");
                    }
                    newTypeList.push(embl);
                }
            }
            else if (typeList[elem].databaseName === "RefSeq"){ //TODO
                if (typeList[elem].properties.length > 0) {
                    var nucleotideID = $.grep(typeList[elem].properties, function(e){ return e.name === "nucleotide sequence ID"; })[0].value;
                    var refseq = {
                        name: typeList[elem].databaseName,
                        xrefs : [{
                            accession: typeList[elem].accession,
                            url : typeList[elem].resolvedUrl,
                            prefix : "Protein",
                            suffix : ""
                        }]
                    };
                    var nucleotide = $.grep(typeList, function(e){ return e.accession == nucleotideID; })[0];
                    refseq.xrefs.push({
                        accession: nucleotide.accession,
                        url : nucleotide.resolvedUrl,
                        prefix : "Nucleotide sequence",
                        suffix : ""
                    });
                    newTypeList.push(refseq);
                }
            }
            else {
                var suffix = "";
                if (typeList[elem].properties.length>0){
                    var addInfos = $.grep(typeList[elem].properties, function(e){ return e.name === "entry name" || e.name === "isoform ID" || e.name === "gene designation" || e.name === "taxonomic scope"; })[0];
                    suffix = addInfos ? addInfos.value : "";
                }
                newTypeList.push({
                        name: typeList[elem].databaseName,
                        xrefs : [{
                            accession: typeList[elem].accession,
                            url : typeList[elem].resolvedUrl,
                            prefix : "",
                            suffix : suffix
                        }]
                    }
                )
            }
                
        }
        return newTypeList;
    }
    
    function getXrefByview(xrefFilter, list) {
        var data = {};
        var count = 0;
        var dataArray = [];
        list.forEach(function (k) {
            if (xrefFilter.indexOf(k.databaseName) >= 0) {
                if (data[k.databaseCategory]) data[k.databaseCategory].push(k);
                else data[k.databaseCategory] = [k];
            }
        });
        //sort data alphabetically 
        var dataArray = Object.keys(data).map(function (key) {
            var temp = {};
            temp[key] = data[key];
            return temp
        });
        dataArray.forEach(function(x){x[Object.keys(x)[0]].sort(function (a,b){
            var textA = a.databaseName;
            var textB = b.databaseName;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })})
        dataArray.sort(sortAlpha);
        dataArray = dataArray.map(function(t){
            t[Object.keys(t)[0]] = filterExceptions(t[Object.keys(t)[0]]);
            return t;
        });
        dataArray.forEach(function(d){d[Object.keys(d)[0]].forEach(function(d2){count+=1;})});
        return {data:dataArray,
                count: count};
    }

    AdditionalInfos.prototype.compileXref = function (entry, nx, xrefs, div) {
        nx.getAnnotationsByCategory(entry, "xref")
            .then(function (data) {
            console.log("test");
                var xrefList = getXrefByview(xrefs, Object.keys(data.xrefs).map(function(k) { return data.xrefs[k] }));
                var source = $("#entry-template").html();
                var template = HBtemplates['templates/xrefs.tmpl'];
                var html = template(xrefList);
                $(div).html(html);

            }).catch(function (err) {
                // catch any error that happened so far
                console.log("Argh, broken: " + err.message);
                console.log("Error at line : " + err.stack);
            });
    };
    function getEvidence(ev, xrefs){
        function getUrl(id){
            if (xrefs.hasOwnProperty(id)) {
                return xrefs[id].resolvedUrl;
             }
            return "";
        }
        return ev.map(function(e){
            return {
                "codeName": e.evidenceCodeName,
                "accession": e.resourceAccession,
                "db": e.resourceDb,
                "url": getUrl(e.resourceId)
            }
        })
    }
    function getExtraByview(data) {
        var data_xrefs = [];
        var data_annot = [];
        var count = 0;
        data.forEach(function(d){
            $.merge(data_xrefs, d.xrefs);
            $.merge(data_annot, d.annot);
        })
        var newData = {};
        data_annot.forEach(function (a) {
            if (!newData.hasOwnProperty(a.category)) newData[a.category]=[];
            newData[a.category].push({
                id: a.annotationId,
                description: a.description,
                category: a.category.toUpperCase(),
                evidences: a.evidences ? getEvidence(a.evidences, data_xrefs) : []
            });
        });
        console.log(newData);
        Object.keys(newData).forEach(function(d){count+=newData[d].length;});
        return {data:newData,
                count: count};
        
    }
    AdditionalInfos.prototype.compileExtra = function (entry, nx, extra, div) {
        var apiCall = [];
        extra.forEach(function(a){apiCall.push(nx.getAnnotationsByCategory(entry, a))});
        Promise.all(apiCall)
            .then(function (data) {
            console.log(data);
            var extraData = getExtraByview(data);
            console.log(extraData);
            Handlebars.registerHelper("math", function(lvalue, rvalue, options) {
                lvalue = parseFloat(lvalue);
                rvalue = parseFloat(rvalue);

                return lvalue + rvalue
            });
            var template = HBtemplates['templates/extra.tmpl'];
            var html = template(extraData);
            $(div).html(html);

            }).catch(function (err) {
                // catch any error that happened so far
                console.log("Argh, broken: " + err.message);
                console.log("Error at line : " + err.stack);
            });
    };
    return AdditionalInfos;
}());