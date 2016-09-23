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
                        embl.xrefs.push({
                            accession: typeList[elem].accession,
                            url : typeList[elem].resolvedUrl,
                            prefix : "Genomic DNA",
                            suffix : suffix
                        })
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
        
        dataArray.sort(sortAlpha);
        dataArray = dataArray.map(function(t){
            t[Object.keys(t)[0]] = filterExceptions(t[Object.keys(t)[0]]);
            return t;
        });
        dataArray.forEach(function(x){
            var cat = x[Object.keys(x)[0]];
            cat.forEach(function(x2){count+=1;})
            cat.sort(function (a,b){
                var dbA = a.name.toUpperCase();
                var dbB = b.name.toUpperCase();
                var prefA = a.xrefs[0].prefix.toUpperCase();
                var prefB = b.xrefs[0].prefix.toUpperCase();
                var accA = a.xrefs[0].accession.toUpperCase();
                var accB = b.xrefs[0].accession.toUpperCase();
                if (dbA < dbB) return -1;
                else if (dbA > dbB) return 1;
                else if (prefA < prefB) return -1;
                else if (prefA > prefB) return 1;
                else if (accA < accB) return -1;
                else if (accA > accB) return 1;
                else return 0;
//            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        })
        return {data:dataArray,
                count: count};
    }

    AdditionalInfos.prototype.compileXref = function (entry, nx, xrefs, div) {
        nx.getAnnotationsByCategory(entry, "xref")
            .then(function (data) {
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
    function getEvidence(ev, xrefs, publi){
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
                "assignedBy": e.assignedBy,
                "db": e.resourceDb,
                "negative": e.negativeEvidence,
                "url": getUrl(e.resourceId),
                "publication": getPublication(publi[e.publicationMD5])
            }
        })
    }
    function getPublication(pub){
        if(pub){
            return {
                publicationId: pub.publicationId,
                localUrl: "/publications/"+pub.publicationId,
                title: pub.title,
                authors: pub.authors,
                journalResourceLocator: pub.journalResourceLocator,
                firstPage: pub.firstPage,
                lastPage: pub.lastPage,
                publicationYear: pub.publicationYear,
                dbXrefs: pub.dbXrefs,
                abstractText: pub.abstractText
            }
        }
    }
    function getUniqueListOfEvidenceSources(evidenceList){
        var evidenceSourceList = [];
        evidenceList.forEach(function(evidence){
            if(evidenceSourceList.indexOf(evidence.assignedBy) < 0) {
                evidenceSourceList.push(evidence.assignedBy);
            }
        });
        return evidenceSourceList;
    }
    function getFunctionByview(data) {
        var data_xrefs = [];
        var data_publi = [];
        var data_annot = [];
        var count = 0;
        data.forEach(function(d){
            Object.assign(data_xrefs, d.xrefs);
            Object.assign(data_publi, d.publi);
            $.merge(data_annot, d.annot);
        });
        var newData = {};
        data_annot.forEach(function (a) {
            if (a.category=="function") a.category="overview";
            if (a.description) a.description=a.description.charAt(0).toUpperCase()+ a.description.slice(1);
            if (a.cvTermName) a.cvTermName=a.cvTermName.charAt(0).toUpperCase()+a.cvTermName.slice(1);
            if (!newData.hasOwnProperty(a.category)) newData[a.category]=[];
            a.evidences.forEach(function(obj){if(obj.negativeEvidence==true) a.description = "<b>Not </b>"+a.description})
            newData[a.category].push({
                id: a.annotationId,
                description: a.description || a.cvTermName,
                category: a.category.toUpperCase(),
                cvTermAccessionCode: a.cvTermAccessionCode,
                cvTermDescription: a.cvTermDescription,
                parentXref: a.parentXref,
                evidences: a.evidences ? getEvidence(a.evidences, data_xrefs, data_publi) : [],
                evidenceSources: getUniqueListOfEvidenceSources(a.evidences)
            });
        });
/*        for (i in newData){
            newData[i] = newData[i].sort(function(a, b) {
                return a.description - b.description;
            });
        }*/
        Object.keys(newData).forEach(function(d){count+=newData[d].length;});
        return {data:newData,
            count: count};

    }
    AdditionalInfos.prototype.compileFunction = function (entry, nx, extra, div) {
        var apiCall = [];
        extra.forEach(function(a){apiCall.push(nx.getAnnotationsByCategory(entry, a))});
        Promise.all(apiCall)
            .then(function (data) {
                var extraData = getFunctionByview(data);
                Handlebars.registerHelper("math", function(lvalue, rvalue, options) {
                    lvalue = parseFloat(lvalue);
                    rvalue = parseFloat(rvalue);

                    return lvalue + rvalue
                });
                Handlebars.registerHelper("boldPattern", function (text, pattern) {
                    if (text && text.startsWith(pattern))
                        text=text.replace(pattern, "<b>"+pattern+"</b>");
                    return text;
                });
                Handlebars.registerHelper("substring", function (text, index) {
                    if(text) return text.substring(index);
                });

                Handlebars.registerHelper('unlessCond', function (v1, operator, v2, options) {

                    switch (operator) {
                        case '==':
                            return (v1 == v2) ? options.inverse(this) : options.fn(this);
                        case '===':
                            return (v1 === v2) ? options.inverse(this) : options.fn(this);
                        case '<':
                            return (v1 < v2) ? options.inverse(this) : options.fn(this);
                        case '<=':
                            return (v1 <= v2) ? options.inverse(this) : options.fn(this);
                        case '>':
                            return (v1 > v2) ? options.inverse(this) : options.fn(this);
                        case '>=':
                            return (v1 >= v2) ? options.inverse(this) : options.fn(this);
                        case '&&':
                            return (v1 && v2) ? options.inverse(this) : options.fn(this);
                        case '||':
                            return (v1 || v2) ? options.inverse(this) : options.fn(this);
                        default:
                            return options.fn(this);
                    }
                });
                var template = HBtemplates['templates/external-link.tmpl'];
                Handlebars.registerPartial("external-link", HBtemplates['templates/external-link.tmpl']);
                var template = HBtemplates['templates/evidence.tmpl'];
                Handlebars.registerPartial("evidence", HBtemplates['templates/evidence.tmpl']);
                var template = HBtemplates['templates/function.tmpl'];
                Handlebars.registerPartial("publication", HBtemplates['templates/publication.tmpl']);
                var html = template(extraData);
                $(div).html(html);

            }).catch(function (err) {
                // catch any error that happened so far
                console.log("Argh, broken: " + err.message);
                console.log("Error at line : " + err.stack);
            });
    };
    function getMedicalByview(data){
        var data_xrefs = [];
        var data_annot = [];
        data.forEach(function(d){
            $.merge(data_xrefs, d.xrefs);
            $.merge(data_publi, d.publi);
            $.merge(data_annot, d.annot);
        })

        var newData = {};
        data_annot.forEach(function (a) {
            console.log(a);
            newData[a.category].push({
                id: a.annotationId,
                description: a.description || a.cvTermName,
                category: a.category.toUpperCase(),
                cvTermAccessionCode: a.cvTermAccessionCode,
                cvTermDescription: a.cvTermDescription,
                parentXref: a.parentXref,
                evidences: a.evidences ? getEvidence(a.evidences, data_xrefs, data_publi) : [],
                evidenceSources: getUniqueListOfEvidenceSources(a.evidences)
            });
        });
        Object.keys(newData).forEach(function(d){count+=newData[d].length;});
        return {data:newData,
            count: count};
    }
    AdditionalInfos.prototype.compileMedical = function (entry, nx, extra, div) {
        var apiCall = [];
        extra.forEach(function(a){apiCall.push(nx.getAnnotationsByCategory(entry, a))});
        Promise.all(apiCall)
            .then(function (data) {
                var extraData = getMedicalByview(data);
                var html = template(extraData);
                $(div).html(html);

            }).catch(function (err) {
                // catch any error that happened so far
                console.log("Argh, broken: " + err.message);
                console.log("Error at line : " + err.stack);
            });
    };
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
        Object.keys(newData).forEach(function(d){count+=newData[d].length;});
        return {data:newData,
                count: count};
        
    }
    AdditionalInfos.prototype.compileExtra = function (entry, nx, extra, div) {
        var apiCall = [];
        extra.forEach(function(a){apiCall.push(nx.getAnnotationsByCategory(entry, a))});
        Promise.all(apiCall)
            .then(function (data) {
            var extraData = getExtraByview(data);
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