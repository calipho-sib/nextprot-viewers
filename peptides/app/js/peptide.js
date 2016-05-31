/////////////
function initNXDivs() {

    var Nextprot = window.Nextprot;
    var nx = new Nextprot.Client("PeptideViewer", "nextprotTeam");
    var nxEntryName = nx.getEntryName();
    var cpt = 0;
    var isoforms;
    var firstIso;
    var currentIso;
    var matureProtein;
    var proPeptide;
    var seq1 = null;
    var pepMap;

    var pepComp = new PeptideComputation();

    function getFirstIsoform(isoformList) {
        var seqIDs = isoformList.map(function (p) {
            return p.uniqueName;
        }).sort(function (a, b) {
            return parseInt(a.split("-")[1]) - parseInt(b.split("-")[1]);
        });
        return seqIDs[0];
    }

    (function ($) {
        $.fn.hasVerticalScrollBar = function () {
            return this.get(0) ? this.get(0).scrollHeight > this.innerHeight() : false;
        }
    })(jQuery);
    
    function getSources(evidences){
        var sources = {};
        evidences.forEach(function(e){
            var sourceKey = e.assignedBy.match("PMID") || e.assignedBy.match("MDATA") ? "neXtProt" :  e.assignedBy;
            if (sources[sourceKey]) {
                if (e.resourceDb === "PubMed") {
                    if (sources[sourceKey].pubmed !== []) {
                    sources[sourceKey].pubmed.push(e.resourceAccession);
                    }
                    else sources[sourceKey].pubmed = [e.resourceAccession];
                }
                else if (e.resourceDb === "neXtProtSubmission") {
                    if (sources[sourceKey].mdata !== []) {
                    sources[sourceKey].mdata.push(e.resourceAccession);
                    }
                    else sources[sourceKey].mdata = [e.resourceAccession];
                }
            }
            else if (e.resourceDb === "PubMed"){
                var sourceKey = e.assignedBy.match("PMID") ? "neXtProt" :  e.assignedBy;
                sources[sourceKey] = {
                "pubmed" : [e.resourceAccession],
                "mdata" : []
                };
            }
            else if (e.resourceDb === "neXtProtSubmission"){
                sources[sourceKey] = {
                "pubmed" : [],
                "mdata" : [e.resourceAccession]
                };
            }
            else {
                sources[e.assignedBy] = {
                    "pubmed" : [],
                    "mdata" : []
                };
            }
        })
        return sources;
    }


    var getInfoForIsoform = {
        firstLoad: function () {
            renderSequenceForIsoform(isoforms, nxEntryName + "-1");
            renderPeptidesForIsoform(pepMap, nxEntryName + "-1");
        },
        Isoform: function () {
            $(".isoformNames").click(getInfoForIsoform.reload);
            $("#moreIsoforms a").click(function () {
                var parentThis = $(this).text();
                $("#extendIsoformChoice").text(parentThis);
            });
        },
        reload: function (event) {
            var isoID = $(this).text();
            $("#nx-detailedPeptide").html("");
            $("#nx-detailedPeptide").hide("slow");
            renderSequenceForIsoform(isoforms, isoID);
            renderPeptidesForIsoform(pepMap, isoID);
            $("#featureViewer").html("");
            currentIso = isoID;
            createSVG(isoforms, isoID);
            addFeatures(isoID);

        },
        parsePepMapping: function (o,isoName) {
                        var dict = {};
                        var peptideAtlasID = "";
                        o.evidences.forEach(function (q) {
                            if (peptideAtlasID === "" && q.resourceDb === "PeptideAtlas") peptideAtlasID = q.resourceAccession;
                            dict[q.resourceDb] = q.resourceAccession;
                        });
                        var npName = "";
                        var proteo = false;
                        o.properties.forEach(function (p) {
                            if (p.name === "peptide name") npName = p.value;
                            if (p.name === "is proteotypic") proteo = p.value === "Y";
                        });

                        var peptide = {
                            "name": o.uniqueName,
                            "nextprotName": npName,
                            "identifier": "",
                            "position": {
                                "first":o.targetingIsoformsMap[isoName].firstPosition,
                                "second":o.targetingIsoformsMap[isoName].lastPosition
                            },
                            "length": 0,
                            "properties": {
                                "natural": o.category === "peptide mapping" || o.category === "natAndSynth",
                                "synthetic": o.category === "SRM peptide mapping" || o.category === "natAndSynth",
                                "proteotypic": proteo
                            },
                            "isoformProteotypicity": "No",
                            "tissueSpecificity": o.evidences.map(function (p) {
                                return p.assignedBy
                            }).sort(), 
                            "tissueSpecificity2": getSources(o.evidences),
                            "sequence": "",
                            "prePeptide": "",
                            "postPeptide": "",
                            "include": [],
                            "includedIn": [],
                            "sources": dict,
                            "peptideAtlasID": peptideAtlasID
                        };
                        
                        //if (o.natural === true) peptide.properties.push("natural");
                        //else peptide.properties.push("-");
                        if (peptide.properties.proteotypic === true) {
                            //peptide.properties.push("proteotypic");
                            if (Object.keys(o.targetingIsoformsMap).length === 1) peptide.isoformProteotypicity = "Yes";
                        }
                        //else peptide.properties.push("-");
                        //if (o.synthetic === true) peptide.properties.push("synthetic");
                        //else peptide.properties.push("-");

                        peptide.length = peptide.position.second - peptide.position.first + 1;

                        peptide.sequence = getInfoForIsoform.Sequence(isoforms, isoName).slice(peptide.position.first - 1, peptide.position.second);
                        peptide.identifier = (peptide.sequence.length > 22) ? peptide.sequence.substring(0, 10) + ".." + peptide.sequence.substring(peptide.sequence.length - 10) : peptide.sequence;

                        peptide.prePeptide = getInfoForIsoform.Sequence(isoforms, isoName)[peptide.position.first - 2];
                        peptide.postPeptide = getInfoForIsoform.Sequence(isoforms, isoName)[peptide.position.second + 1];
                    
            return peptide;
        },
        mergeSyntheticWithNatural: function (array) {
            for (var i = 0; i < array.length; i++) {
                var isPurelySynthetic = true;
                for (var j = i; j < array.length; j++) {
                    if (array[i].nextprotName === array[j].nextprotName && array[i].position === array[j].position) {
                        if (array[i].properties.natural === array[j].nextprotName && array[i].properties !== array[j].properties) {
                            peptideMappings[i].evidences = peptideMappings[i].evidences.concat(srmPeptideMapping.evidences);
                            isPurelySynthetic = false;
                            break;
                        }
                    }
                }
                if (isPurelySynthetic) {
                    peptideMappings.push(srmPeptideMapping); //TODO fix this! This is referenced in allFeatures[1] so it should not be pushed like this
                }
            };
        },
        Peptides: function (peptideMappings, isoName) {
            var peptideList = [];
            peptideMappings.forEach(function (o) {
                if (o.isoformSpecificity[isoName]) {
                    for (var i = 0; i < o.isoformSpecificity[isoName].positions.length; i++) {

                        var dict = {};
                        var peptideAtlasID = "";

                        o.evidences.forEach(function (q) {
                            if (q.databaseName === "PeptideAtlas") peptideAtlasID = q.accession;
                            dict[q.databaseName] = q.accession;
                        });

                        var peptide = {
                            "name": o.peptideUniqueName,
                            "identifier": "",
                            "position": o.isoformSpecificity[isoName].positions[i],
                            "length": 0,
                            "properties": {
                                "natural": o.natural,
                                "synthetic": o.synthetic,
                                "proteotypic": o.proteotypic
                            },
                            "isoformProteotypicity": "No",
                            "tissueSpecificity": o.evidences.map(function (p) {
                                return p.assignedBy
                            }).sort(),
                            "sequence": "",
                            "prePeptide": "",
                            "postPeptide": "",
                            "include": [],
                            "includedIn": [],
                            "sources": dict,
                            "peptideAtlasID": peptideAtlasID
                        };
                        //if (o.natural === true) peptide.properties.push("natural");
                        //else peptide.properties.push("-");
                        if (o.proteotypic === true) {
                            //peptide.properties.push("proteotypic");
                            if (Object.keys(o.isoformSpecificity).length === 1) peptide.isoformProteotypicity = "Yes";
                        }
                        //else peptide.properties.push("-");
                        //if (o.synthetic === true) peptide.properties.push("synthetic");
                        //else peptide.properties.push("-");

                        peptide.length = peptide.position.second - peptide.position.first + 1;

                        peptide.sequence = getInfoForIsoform.Sequence(isoforms, isoName).slice(peptide.position.first - 1, peptide.position.second);
                        peptide.identifier = (peptide.sequence.length > 22) ? peptide.sequence.substring(0, 10) + ".." + peptide.sequence.substring(peptide.sequence.length - 10) : peptide.sequence;

                        peptide.prePeptide = getInfoForIsoform.Sequence(isoforms, isoName)[peptide.position.first - 2];
                        peptide.postPeptide = getInfoForIsoform.Sequence(isoforms, isoName)[peptide.position.second + 1];
                        peptideList.push(peptide);
                    }
                }
            });
            peptideList.sort(function (a, b) {
                return a.length - b.length;
            });
            peptideList.sort(function (a, b) {
                return a.position.first - b.position.first;
            });

            pepComp.computeInterPeptideInclusions(peptideList);

            return peptideList;
        },
        Peptides2: function (pepMap, isoName) {
            var peptideList2 = [];
            pepMap.forEach(function (o) {
                if (o.targetingIsoformsMap[isoName]) {
                    peptideList2.push(getInfoForIsoform.parsePepMapping(o,isoName));
                }
            });
            peptideList2.sort(function (a, b) {
                return a.length - b.length;
            });
            peptideList2.sort(function (a, b) {
                return a.position.first - b.position.first;
            });
            pepComp.computeInterPeptideInclusions(peptideList2);

            return peptideList2;
        },
        Sequence: function (isoforms, isoName) {
            var isoSeq = "";
            isoforms.forEach(function (o) {
                if (o.uniqueName === isoName) return isoSeq = o.sequence;
            });
            return isoSeq;
        },
        getActiveProteins: function (activeProteins, isoName) {
            var listActiveProt = [];
            activeProteins.forEach(function (o) {
                if (o.targetingIsoformsMap[isoName]) {
                    var actProt = {
                        "isoform": o.targetingIsoformsMap[isoName].isoformName,
                        "start": o.targetingIsoformsMap[isoName].firstPosition,
                        "end": o.targetingIsoformsMap[isoName].lastPosition
                    };
                    listActiveProt.push(actProt);
                }
            });
            return listActiveProt;
        }
    };

    function showFeatureViewer() {
        $("#showFV").click(function () {
            $("#featureViewer").toggle();
            $(this).text(function (i, text) {
                return text === "Hide features" ? "Show features" : "Hide features";
            });
            if ($(this).text() === "Hide features") {
                if ($("#featureViewer svg").width() < 10) {
                    $("#featureViewer").html("");
                    createSVG(isoforms, currentIso);
                    addFeatures(currentIso);
                }
            }
        });
    }

    function nxIsoformChoice(isoforms) {
        if ($("#nx-isoformChoice").length > 0) {
            var datas = {
                "isoforms": (function () {
                    var listIsoforms = {
                        "visible": [],
                        "more": []
                    };
                    isoforms.sort(function (a, b) {
                        return parseInt(a.uniqueName.split("-")[1]) - parseInt(b.uniqueName.split("-")[1])
                    }).forEach(function (o, index) {
                        if (index <= 3) listIsoforms.visible.push(o);
                        else listIsoforms.more.push(o);
                    });
                    return listIsoforms;
                }())
            };
            var template = HBtemplates['app/assets/templates/isoformChoice.tmpl'];
            var results = template(datas);
            $("#nx-isoformChoice").append(results);
            /////////// EventListener to change isoform
            getInfoForIsoform.Isoform();
            $(document).ready(function () {
                $('.isoformNames').tooltip({
                    trigger: "hover"
                });
            });

            $("#nx-isoformChoice li:first-child").addClass("active");
        }
    }

    function createSVG(sequences, isoName) {
        sequences.forEach(function (o) {
            if (o.uniqueName === isoName) {
                currentSeq = o.sequence;
                ft = new FeatureViewer(currentSeq, "#featureViewer", {
                    showAxis: true,
                    showSequence: true,
                    brushActive: true,
                    toolbar: true,
                    bubbleHelp: true
                });
            }
        });
    }

    function addFeatures(isoName) {
        for (var i = 0; i < featuresForViewer.length; i++) {
            if (Object.keys(featuresForViewer[i]).length !== 0 && featuresForViewer[i].hasOwnProperty(isoName)) {
                var feature = jQuery.extend({}, featuresForViewer[i][isoName]);
                ft.addFeature(feature);
            }
        }
    }


    var renderSequenceForIsoform = function (isoforms, isoName) {


        ////////////////////////// TEMPLATE SEQUENCE
        if ($("#nx-overviewSeq").length > 0) {
            seq1 = new Sequence(getInfoForIsoform.Sequence(isoforms, isoName));
            seq1.render('#nx-overviewSeq', {
                'showLineNumbers': true,
                'wrapAminoAcids': true,
                'charsPerLine': 50,
                'sequenceMaxHeight': "220px"

            });
            $("#sequenceHeader").append("<div class=\"pull-right\" style=\"margin-right:20px;font-style:italic;text-align: center;\"><span id=\"pepCover\" style=\"font-size:18px;color:#C50063;\"></span><br><span style=\"font-size:10px;font-weight:bold;\">Peptide coverage</span></div>");
            $("#sequenceHeader").append("<div class=\"pull-right\" style=\"margin-right:20px;font-style:italic;text-align: center;\"><span id=\"proteoCover\" style=\"font-size:18px;color:#69CC33;\"></span><br><span style=\"font-size:10px;font-weight:bold;\">Proteotypic coverage</span></div>");
            //$("#sequenceHeader").append("<div class=\"pull-right\" style=\"margin-right:20px;font-style:italic;text-align: center;\"><h5>Coverage</h5></div>");
            $("#sequenceHeader .badge").append(" aa");
        }
    };

    function getProteotypicityInfos(sequence) {

        nx.getEntryforPeptide(sequence).then(function (data) {

            function entryWithVariant(entry) {
                    var withVariant = false;
                    entry.annotations.forEach(function (o) {
                        if (o.variant) withVariant = true;
                    });
                    return withVariant;
                }
                function entryWithoutVariant(entry) {
                    var withoutVariant = false;
                    entry.annotations.forEach(function (o) {
                        if (!o.variant) withoutVariant = true;
                    });
                    return withoutVariant;
                }


            var isoformsLength = 0;
            data.forEach(function (o) {
                isoformsLength += o.annotations.length;
            });
            var entries = data.map(function (o) {
                return {
                    name: o.uniqueName,
                    withVariant: entryWithVariant(o),
                    withoutVariant:entryWithoutVariant(o),
                    geneName: o.overview.mainGeneName
                };
            });
            var entriesLength = data.length;
            var entriesLengthWithoutVariant = entries.filter(function (d) {
                return d.withVariant === false;
            }).length;
            var entryMatching = {
                proteotypicity: {
                    withVariant: entriesLength <= 1,
                    withoutVariant: entriesLengthWithoutVariant <= 1,
                    onlyVariant: (entriesLength - entriesLengthWithoutVariant) < 1
                },
                entries: entries,
                isoforms: data.map(function (o) {
                    return o.annotations.map(function (p) {
                        return {
                            entryName: o.uniqueName,
                            variant: p.variant,
                            isoform: Object.keys(p.targetingIsoformsMap)[0],
                            positions: {
                                first:p.targetingIsoformsMap[Object.keys(p.targetingIsoformsMap)[0]].firstPosition,
                                last:p.targetingIsoformsMap[Object.keys(p.targetingIsoformsMap)[0]].lastPosition
                            }
                        };
                    });
                })
            };
            var template = HBtemplates['app/assets/templates/matchingEntries.tmpl'];
            var results = template(entryMatching);
            $("#proteoBody").html(results);

            function toggleIsoforms() {
                $('#showIsoforms').text("Show isoforms");
                $('#showIsoforms').click(function () {
                    $(this).text(function (i, text) {
                        return text === "Show isoforms" ? "Hide isoforms" : "Show isoforms";
                    });
                    $('.showEntry').is(':visible') ? $(".showEntry").hide() : $(".showEntry").show();
                    $('.showIsoform').is(':visible') ? $(".showIsoform").hide() : $(".showIsoform").show();
                });
            }

            //function toggleSentence(entries, isoforms) {
            //    var entriesWithoutVariant = $("#showEntry li").not(".variantIntoAccount").length;
            //    var isoformsWithoutVariant = $("#showIsoform li").not(".variantIntoAccount").length;
            //
            //    if ($("#withVariant").prop('checked')) {
            //        var plurality = {
            //            isoform: isoforms > 1 ? "isoforms" : "isoform",
            //            entry: entries > 1 ? "entries" : "entry"
            //        };
            //        $("#proteotypicitySentence").text("Maps " + isoforms + " " + plurality.isoform + " from " + entries + " " + plurality.entry + " :");
            //    }
            //    else {
            //        var plurality = {
            //            isoform: isoformsWithoutVariant > 1 ? "isoforms" : "isoform",
            //            entry: entriesWithoutVariant > 1 ? "entries" : "entry"
            //        };
            //        $("#proteotypicitySentence").text("Maps " + isoformsWithoutVariant + " " + plurality.isoform + " from " + entriesWithoutVariant + " " + plurality.entry + " :");
            //    }
            //}
            //
            //function toggleVariants() {
            //    $('#withVariant').click(function () {
            //        $('.variantIntoAccount').toggle();
            //        toggleSentence(entriesLength, isoformsLength);
            //    });
            //}

            toggleIsoforms();
            //toggleVariants();
            //toggleSentence(entriesLength, isoformsLength);
        });
    }

    var addPeptidesInfos = function (selection, listPeptides, isoName) {
        if ($("#nx-detailedPeptide").length > 0) {
            var data = {
                "Peptides": (function () {
                    var found = [];
                    selection.filter(function (elem, pos, a) {
                        return a.indexOf(elem) == pos;
                    }).forEach(function (o) {
                        for (var i = 0; i < listPeptides.length; i++) {
                            var founded = false;
                            if (listPeptides[i].nextprotName === o) {
                                for (var item in found) {
                                    if (listPeptides[i].nextprotName === found[item].nextprotName) {
                                        founded = true;
                                        found[item].position.push(listPeptides[i].position);
                                        found[item].prePeptide.push(listPeptides[i].prePeptide);
                                        found[item].postPeptide.push(listPeptides[i].postPeptide);
                                        if (listPeptides[i].include.length){
                                            found[item].include.concat(listPeptides[i].include);
                                            found[item].include.filter(function(item, pos, self) {
                                                return self.indexOf(item) == pos;
                                            });
                                        }
                                        if (listPeptides[i].includedIn.length){
                                            found[item].includedIn.concat(listPeptides[i].includeIn);
                                            found[item].includedIn.filter(function(item, pos, self) {
                                                return self.indexOf(item) == pos;
                                            });
                                        }
                                        break;
                                    }
                                }
                                if (founded === false) {
                                    var pepTemp = jQuery.extend({}, listPeptides[i]);
                                    pepTemp.prePeptide = [pepTemp.prePeptide];
                                    pepTemp.postPeptide = [pepTemp.postPeptide];
                                    pepTemp.position = [pepTemp.position];
                                    found.push(pepTemp);
                                }
                            }
                        }
                    });
                    return found;
                }())
            };
            var listMatureProteins = getInfoForIsoform.getActiveProteins(matureProtein, isoName);
            var listPropeptides = getInfoForIsoform.getActiveProteins(proPeptide, isoName);
            if (data.Peptides.length > 0) $("#nx-detailedPeptide").show("slow");
            else $("#nx-detailedPeptide").hide("slow");

            var template = HBtemplates['app/assets/templates/detailedPeptide.tmpl'];
            $("#nx-detailedPeptide").html(template);

            var loader="<div class='spinner-center' style='margin-top: 50px;'>" +
            "<div class='throbber-loader'></div></div>";

            var fillPeptideInfo = {
                fillNames: function () {
                    $("#nbPeptides").text(data.Peptides.length);
                    var listOfNames = "";
                    for (i = 0; i < data.Peptides.length; i++) {
                        listOfNames += "<li><a class=\"name\" id=\"" + data.Peptides[i].name + "\" style=\"color:lightsteelblue;cursor:pointer;\">" + data.Peptides[i].identifier + "</a></li>";
                    }
                    $('#listNames').html(listOfNames);
                },
                peptideSelected: function () {
                    $(".name").click(function () {
                        var name = $(this).attr("id");
                        console.log(name);
                        $(".nameActive").removeClass("nameActive");
                        $(this).addClass("nameActive");
                        fillPeptideInfo.fillDescription(name);
                    })
                },
                fillDescription: function (peptide) {
                    $("#peptidePositions").html("");
                    $('#properties').html("");
                    $('#nature').html("");
                    $('#tissueSpec').html("");
                    $("#pepIncluded").html("");
                    $('#pepIncludedIn').html("");
                    $('#isoProteo').html("");
                    $("#pepSources").html("");
                    $('#ptmByPeptide').html(loader);
                    $('#ptmByRegion').html(loader);
                    $('#proteoBody').html(loader);
                    for (i = 0; i < data.Peptides.length; i++) {
                        if (data.Peptides[i].name === peptide) {
                            peptide = data.Peptides[i];
                            break;
                        }
                    }
                    getProteotypicityInfos(peptide.sequence);
                    $('#titlePepName').text(peptide.peptideAtlasID ? peptide.identifier + " (" + peptide.peptideAtlasID + ")" : peptide.identifier);
                    peptide.position.forEach(function (o, i) {
                        var semiTrypticEnd = "-";
                        if (peptide.sequence[peptide.sequence.length - 1] === "K" || peptide.sequence[peptide.sequence.length - 1] === "R") semiTrypticEnd = "Tryp";
                        else if (peptide.postPeptide[i] === undefined) semiTrypticEnd = "Term";
                        var semiTrypticStart = "-";
                        if (peptide.prePeptide[i] === "K" || peptide.prePeptide[i] === "R") semiTrypticStart = "Tryp";
                        else if (peptide.prePeptide[i] === undefined) semiTrypticEnd = "Term";
                        var trypticity = semiTrypticStart !== "-" && semiTrypticEnd !== "-" ? "Tryptic" : semiTrypticStart === "-" && semiTrypticEnd === "-" ? "Non-Tryptic" : "semi-Tryptic";
                        var miscleavage = "-";
                        if (trypticity !== "Non-Tryptic") {
                            miscleavage = 0;
                            for (i = 0; i < peptide.sequence.length - 1; i++) {
                                if (peptide.sequence[i] === "K" || peptide.sequence[i] === "R") {
                                    miscleavage += 1;
                                }
                            }
                        }
                        var Nterm = "-";
                        var Cterm = "-";
                        listMatureProteins.forEach(function (p) {
                            if (p.start === o.first) Nterm = "N-term";
                            if (p.end === o.second) Cterm = "C-term";
                        });
                        listPropeptides.forEach(function (p) {
                            if (p.start === o.first) Nterm = "N-term";
                            if (p.end === o.second) Cterm = "C-term";
                        });
                        $("#peptidePositions").append("<tr><td>" + o.first + "</td><td>" + o.second + "</td>" +
                            "<td>" + semiTrypticStart + "</td><td>" + semiTrypticEnd + "</td><td style=\"text-align: center;\">" + miscleavage + "</td><td>" + trypticity + "</td>" +
                            "<td>" + Nterm + "</td><td>" + Cterm + "</td></tr>");
                    });

                    $('#first').text(peptide.position);
                    $('#length').text(peptide.length);

                    if (peptide.properties.natural === true) {
                        $('#nature').append("<li>natural</li>")
                    }
                    if (peptide.properties.synthetic === true) {
                        $('#nature').append("<li>synthetic</li>")
                    }
                    //if (peptide.properties.proteotypic === false) {
                    //    $('#nature').append("<li>Non-proteotypic</li>");
                    //    var entryMatchListHTML = "<dl><dt>Entries containing the peptide</dt><dd><ul style=\"padding-left:20px;\">";
                    //    var query = "select distinct ?entry ?gene where { "+
                    //        "?entry :isoform ?iso . "+
                    //        "?entry :gene / :name ?gene ."+
                    //        "?iso :peptideMapping / :peptideName \"" + peptide.name + "\"^^xsd:string . "+
                    //        "}";
                    //
                    //    nx.executeSparql(query).then(function (data) {
                    //        console.log(data);
                    //        var entryMatch = [];
                    //        data.results.bindings.forEach(function (o) {
                    //            var infos = {
                    //                "entryID": o.entry.value.toString().match(/[^\/]*$/)[0],
                    //                "url": "",
                    //                "geneName": o.gene.value
                    //            };
                    //            infos.url = "/?nxentry=" + infos.entryID;
                    //            entryMatch.push(infos);
                    //        });
                    //        entryMatch.forEach(function (o) {
                    //            entryMatchListHTML += "<li><a href=\"" + o.url + "\">" + o.entryID + "</a>" + "<span style=\"font-style: italic; margin-left:5px;\"> ( Gene Name : " + o.geneName + " )</span></li>";
                    //        });
                    //        entryMatchListHTML += "</ul></dd></dl>";
                    //        $('#proteomeProperties').html(entryMatchListHTML);
                    //    }, function (error) {
                    //        console.log(error.responseText);
                    //    });
                    //}
                    //else {
                    //    $('#proteomeProperties').html("<dl> <dt>Proteotypicity</dt> <dd> <ul style=\"padding-left:20px;\"><li>Yes</li></ul> </dd> </dl>" +
                    //    "<dl> <dt>Isoform Proteotypicity</dt><dd><ul style=\"padding-left:20px;\"><li>" + peptide.isoformProteotypicity + "</li></ul></dd></dl>");
                    //}
                    $('#pepSeq').text(peptide.sequence);
                    if (peptide.include.length === 0) $('#pepIncluded').append("<p><em>None</em></p>");
                    else {
                        peptide.include.forEach(function (o) {
                            $('#pepIncluded').append("<li>" + o.identifier + "</li>")
                        });
                    }
                    if (peptide.includedIn.length === 0) $('#pepIncludedIn').append("<p><em>None</em></p>");
                    else {
                        peptide.includedIn.forEach(function (o) {
                            $('#pepIncludedIn').append("<li>" + o.identifier + "</li>")
                        });
                    }

                    var str = "";
                    if (peptide.properties.natural) str = "natural";
                    if (peptide.properties.synthetic) {
                        if (str.length>0) str = "any";
                        else str = "synthetic";
                    }

                    $('#pepIncludeType').html(str);

                    var pmidFound = false;
                    //Object.keys(peptide.sources).forEach(function (o) {
                    //    if (o !== "PubMed") $("#pepSources").append("<li>" + o + " (" + peptide.sources[o] + ")" + "</li>");
                    //    else $("#pepSources").append("<li>" + o + " </li>");
                    //});
                    
                    /*** TO DO ***///
//                    peptide.tissueSpecificity.forEach(function (o) {
//                        console.log(o);
//                        var sourceTemp = o;
//                        if (o.match("MDATA")) {
//                            sourceTemp = "neXtProt - " + o;
//                        }
//                        if (o.match("PMID")) {
//                            sourceTemp = "neXtProt - " + o.replace("PMID_", "PubMed:");
//                            pmidFound = true;
//                        }
//                        $('#pepSources').append("<li>" + sourceTemp + "</li>")
//                    });
                    for (var t in peptide.tissueSpecificity2) {
                        var sourceTemp = "<li>" + t + "</li>";
                        if (t.match("MDATA")) {
                            sourceTemp = "<li>neXtProt - " + t + "</li>";
                        }
                        else if (t.match("PMID")) {
                            sourceTemp = "<li>neXtProt - <em>" + t.replace("PMID_", "<strong>PubMed</strong> : ") + "</em></li>";
                            pmidFound = true;
                        }
                        else if (peptide.tissueSpecificity2[t].mdata.length > 0 || peptide.tissueSpecificity2[t].pubmed.length > 0) {
                            pmidFound = true;
                            var pmids = "";
                            var mdatas = "";
                            peptide.tissueSpecificity2[t].pubmed.forEach(function(d,i, array){
                                pmids += d;
                                if (i < array.length -1) pmids += ", ";
                            })
                            peptide.tissueSpecificity2[t].mdata.forEach(function(d,i, array){
                                mdatas += d;
                                if (i < array.length -1) mdatas += ", ";
                            })
                            var pmidTemp = pmids ? "<li>" + t + ". <em><strong>PubMed</strong> : " + pmids + "</em></li>" : "";
                            var mdataTemp = mdatas ? "<li>" + t + ". <em><strong>Submission</strong> : " + mdatas + "</em></li>" : "";
                            sourceTemp = pmidTemp + mdataTemp;
                        }
                        $('#pepSources').append(sourceTemp);
                        
                    };
                    
                    $("#pepSources").html(
                        $("#pepSources").children("li").sort(function (a, b) {
                            return $(a).text().toUpperCase().localeCompare(
                                $(b).text().toUpperCase());
                        })
                    )
                
                    var query = "SELECT distinct ?ptmterm ?ptmtype ?ptmstart ?ptmend ?mapstart ?mapend ?ptmlabel ?ptmcomment WHERE {" +
                        "values (?pepName ?iso) {(\"" + peptide.nextprotName + "\"^^xsd:string isoform:" + isoName + ") }" +
                        "?iso :ptm ?ptm ." +
                        "?ptm rdf:type ?ptmtype ." +
                        "?ptm :start ?ptmstart ." +
                        "?ptm :end ?ptmend ." +
                        "optional { ?ptm :term ?ptmterm ." +
                        "?ptmterm rdfs:label ?ptmlabel } ." +
                        "optional { ?ptm rdfs:comment ?ptmcomment } ." +
                        "?ptm :evidence ?ptmevi ." +
                        "?ptmevi :reference ?ptmref ." +
                        "?ptmref :from ?ptmpub." +
                        "bind (substr(str(?ptmpub),8) as ?ptmpubid)" +
                        "filter (contains(?ptmpub, \"PubMed\"))" +
                        "?iso :peptideMapping ?map ." +
                        "?map :peptideName ?pepName ." +
                        "?map :evidence ?mapevi ." +
                        "?map :start ?mapstart ." +
                        "?map :end ?mapend ." +
                        "filter (?ptmstart >= ?mapstart && ?ptmend <= ?mapend)" +
                        "?mapevi :assignedBy ?mapsrc ." +
                        "filter(strlen(str(?mapsrc))>=44) ." +
                        "bind (substr(str(?mapsrc),37,8) as ?mappubid)" +
                        "filter (contains(str(?mapsrc), \"PMID\"))" +
                        "filter (?ptmtype  in (:CrossLink , :ModifiedResidue , :GlycosylationSite)) ." +
                        "filter (str(?ptmpubid) = str(?mappubid))" +
                        "}" +
                        "order by ?ptmstart";
                    
                    var query2 = "SELECT distinct ?ptmterm ?ptmtype ?ptmstart ?ptmend ?mapstart ?mapend ?ptmlabel ?ptmcomment WHERE {" +
                        "values (?pepName ?iso) {(\"" + peptide.nextprotName + "\"^^xsd:string isoform:" + isoName + ") }" +
                        "?iso :ptm ?ptm ." +
                        "?ptm rdf:type ?ptmtype ." +
                        "?ptm :start ?ptmstart ." +
                        "?ptm :end ?ptmend ." +
                        "optional { ?ptm :term ?ptmterm ." +
                        "?ptmterm rdfs:label ?ptmlabel } ." +
                        "optional { ?ptm rdfs:comment ?ptmcomment } ." +
                        "?ptm :evidence ?ptmevi ." +
                        "?ptmevi :reference ?ptmref ." +
                        "?ptmref :from ?ptmpub." +
                        "bind (substr(str(?ptmpub),8) as ?ptmpubid)" +
                        "filter (contains(?ptmpub, \"PubMed\"))" +
                        "filter (?ptmtype  in (:CrossLink , :ModifiedResidue , :GlycosylationSite)) ." +
                        "?iso :peptideMapping ?map ." +
                        "?map :peptideName ?pepName ." +
                        "?map :evidence ?mapevi ." +
                        "?map :start ?mapstart ." +
                        "?map :end ?mapend ." +
                        "filter (?ptmstart >= ?mapstart && ?ptmend <= ?mapend)" +
                        "{?mapevi :fromXref ?mapsrc ." +
                            "?mapevi :reference / :accession ?mapacc ." +
                            "bind (substr(str(?mapacc),1,8) as ?mappubid)" +
                            "filter (contains(str(?mapsrc), \"PubMed\"))" +
                            "filter (str(?ptmpubid) = str(?mappubid))" +
                          "}" +
                        "UNION {" +
                        "?mapevi :assignedBy ?mapsrc2 ." +
                        "filter(strlen(str(?mapsrc2))>=44) ." +
                        "bind (substr(str(?mapsrc2),37,8) as ?mappubid2)" +
                        "filter (contains(str(?mapsrc2), \"PMID\"))" +
                        "filter (str(?ptmpubid) = str(?mappubid2))" +
                        "}" +
                        "}" +
                        "order by ?ptmstart";

                    var queryRegion = "SELECT ?ptmtype ?ptmstart ?ptmend ?mapstart ?mapend ?ptmterm ?ptmcomment WHERE {" +
                        "values (?pepName ?iso) {(\"" + peptide.nextprotName + "\"^^xsd:string isoform:" + isoName + ") }" +
                        "?iso :ptm ?ptm ." +
                        "?ptm rdf:type ?ptmtype ." +
                        "?ptm :start ?ptmstart ." +
                        "?ptm :end ?ptmend ." +
                        "optional { ?ptm :term ?ptmterm }." +
                        "optional { ?ptm rdfs:comment ?ptmcomment} ." +
                        "?iso :mapping ?map ." +
                        "?map :peptideName ?pepName ." +
                        "?map :start ?mapstart ." +
                        "?map :end ?mapend ." +
                        "filter (?ptmstart >= ?mapstart && ?ptmstart <= ?mapend || ?ptmend >= ?mapstart && ?ptmend <= ?mapend) " +
                        "filter not exists {?map a :PdbMapping}" +
                        "}" +
                        "order by ?ptmstart";
                    if (pmidFound === true) {
                        //Promise.all(nx.executeSparql(query),nx.executeSparql(queryRegion)).then(function (data) {
                        //    if (data[0].results.bindings.length > 0) {
                        //        data[0].results.bindings.forEach(function (o) {
                        //            $('#ptmByPeptide').append("<div class=\"row\"style=\"border-bottom:1px solid #E7EAEC;margin-bottom:5px;\"><dl class=\"col-md-6\"><dt>PTM ID</dt><dd>" + o.ptmterm.value.toString().match(/[^\/]*$/)[0] + "</dd></dl>" +
                        //            "<dl class=\"col-md-6\"><dt>Position</dt><dd>" + o.ptmstart.value + "</dd></dl>" +
                        //            "<dl class=\"col-md-6\"><dt>Type</dt><dd>" + o.ptmtype.value.toString().match(/[^#]*$/)[0].slice() + "</dd></dl>" +
                        //            "<dl class=\"col-md-6\"><dt>Description</dt><dd>" + o.ptmcomment.value + "</dd></dl></div>");
                        //        });
                        //    } else $('#ptmByPeptide').html("No PTM found");
                        //
                        //}
                        nx.executeSparql(query2).then(function (data) {
                            console.log(data);
                            $('#ptmByPeptide').html("");
                            if (data.results.bindings.length > 0) {
                                data.results.bindings.forEach(function (o) {
                                    var tempID = o.ptmterm ? o.ptmterm.value.toString().match(/[^\/]*$/)[0] : "-";
                                    var tempDesc = o.ptmcomment ? o.ptmcomment.value : "-";

                                    $('#ptmByPeptide').append("<div class=\"row\"style=\"border-bottom:1px solid #E7EAEC;margin-bottom:5px;\"><dl class=\"col-md-6\"><dt>PTM ID</dt><dd>" +   tempID + "</dd></dl>" +
                                        "<dl class=\"col-md-6\"><dt>Position</dt><dd>" + o.ptmstart.value + "</dd></dl>" +
                                        "<dl class=\"col-md-6\"><dt>Type</dt><dd>" + o.ptmtype.value.toString().match(/[^#]*$/)[0].slice() + "</dd></dl>" +
                                        "<dl class=\"col-md-6\"><dt>Description</dt><dd>" +  tempDesc + "</dd></dl></div>");
                                });
                            } else $('#ptmByPeptide').html("No PTM found");
                        }, function (error) {
                            console.log(error.responseText);
                        });
                    } else {
                        $('#ptmByPeptide').html("No PTM found");
                    }
                    nx.executeSparql(queryRegion).then(function (data) {
                        $('#ptmByRegion').html("");
                        if (data.results.bindings.length > 0) {
                            data.results.bindings.forEach(function (o) {
                                var tempID = o.ptmterm ? o.ptmterm.value.toString().match(/[^\/]*$/)[0] : "-";
                                var tempDesc = o.ptmcomment ? o.ptmcomment.value : "-";

                                $('#ptmByRegion').append("<div class=\"row\"style=\"border-bottom:1px solid #E7EAEC;margin-bottom:5px;\"><dl class=\"col-md-6\"><dt>PTM ID</dt><dd>" + tempID + "</dd></dl>" +
                                    "<dl class=\"col-md-6\"><dt>Position</dt><dd>" + o.ptmstart.value + "</dd></dl>" +
                                    "<dl class=\"col-md-6\"><dt>Type</dt><dd>" + o.ptmtype.value.toString().match(/[^#]*$/)[0].slice() + "</dd></dl>" +
                                    "<dl class=\"col-md-6\"><dt>Description</dt><dd>" + tempDesc + "</dd></dl></div>");
                            });
                        } else $('#ptmByRegion').html("No PTM found");
                    }, function (error) {
                        console.log(error.responseText);
                    });


                    if ($('#peptideSpecificity').hasVerticalScrollBar()) {
                        $('#peptideSpecificity').removeClass("ignoreShift");
                    } else $('#peptideSpecificity').addClass("ignoreShift");

                    $("#pepPosTable").stupidtable();
                    $(function () {
                        $("#sortStart").stupidsort("asc");
                    });
                }
            };
            fillPeptideInfo.fillNames();
            $(".name:first").addClass("nameActive");
            fillPeptideInfo.fillDescription($(".name:first").attr("id"));
            fillPeptideInfo.peptideSelected();
            //adjustHeight("#info-left","#info-right");
        }
    };
    var renderPeptidesForIsoform = function (peptideMappings, isoName) {

        ////////////////////////// TEMPLATE PEPTIDES

        if ($("#nx-overviewPeptide").length > 0) {
            var datas = {
                "PeptideLength": 0,
                "Peptides": getInfoForIsoform.Peptides2(peptideMappings, isoName)
            };
            datas.PeptideLength = datas.Peptides.length;

            var template = HBtemplates['app/assets/templates/peptideTable.tmpl'];
            var results = template(datas);
            $("#nx-overviewPeptide").html(results);
            var defaultSeq = $("#fastaSeq").html();
            var coveredSeq = $("#fastaSeq").html();

            $(function () {
                var table = $("#pepTableSorted").stupidtable({
                    "positions": function (a, b) {

                        var posA = a.split("-");
                        var posB = b.split("-");

                        // compare starts
                        var cmp = parseInt(posA[0], 10) - parseInt(posB[0], 10);

                        // if same starts compare ends
                        if (cmp === 0) cmp = parseInt(posA[1], 10) - parseInt(posB[1], 10);

                        return cmp;
                    }
                });

                /*table.on("aftertablesort", function (event, data) {
                    var th = $(this).find("th");
                    th.find(".arrow").remove();
                    var dir = $.fn.stupidtable.dir;
                    var arrow = data.direction === dir.ASC ? "&uarr;" : "&darr;";
                    th.eq(data.column).append('<span class="arrow">' + arrow +'</span>');
                });*/

                //$("#pepTableSorted th:nth-child(4)").stupidsort("asc");
                //$("#pepTableSorted th:nth-child(3)").stupidsort("asc");

                $("#pepTableSorted").find("th").eq(2).click();
            });

            var noPepColor = 'grey';
            var nonProtColor = '#4A57D4';
            var singProtColor = '#007800';
            var sevProtColor = '#69CC33';
            var synPepColor = '#fff';

            var legend = [{
                name: "non-proteotypic",
                color: nonProtColor,
                underscore: false
            }, {
                name: "single proteotypic",
                color: singProtColor,
                underscore: false
            }, {
                name: "several proteotypic",
                color: sevProtColor,
                underscore: false
            }, {
                name: "synthetic",
                color: synPepColor,
                underscore: true
            }];


            function getColorMap(state) {
                switch (state) {
                    case 0 :
                        return noPepColor; //'grey';
                    case 1 :
                        return nonProtColor; //'blue';
                    case 10 :
                        return singProtColor; //'green';
                    default :
                        return sevProtColor; // 20 or
                }
            }

            //events
            var HL = {
                "HashAA": [],
                "HashAA2": [],
                clickPos: function () {
                    $(".pepPos").click(HL.findPeptide);
                    $(".PepSelected").click(HL.moreInfos);
                    $(document).click(HL.stopHL);
                },
                findPeptide: function (event) {
                    //var templateLoader = HBtemplates['app/assets/templates/preLoader.tmpl'];
                    //$("#peptideTableTitle").append(templateLoader);
                    event.stopPropagation();
                    var positions = $(this).text();
                    HL.highlighting(positions);
                },
                highlighting: function (positions) {
                    positions = positions.split("-").map(function (o) {
                        return parseInt(o)
                    });
                    var seqLength = getInfoForIsoform.Sequence(isoforms, isoName).length;

                    var hl = pepComp.getAminoAcidColors(datas.Peptides, seqLength, getColorMap);
                    seq1.coverage(hl, positions[0] - 1, positions[1] - 1);

                    //TODO looks like this is not doing anything
                    var ElementTop = $('#peptideHighlighted').position().top - 140;
                    var scrollPosition = $("#scroller").scrollTop();
                    var scrollingLength = ElementTop + scrollPosition;
                    $("#scroller").animate({
                        scrollTop: scrollingLength
                    }, 1000);
                    $(function () {
                        $("#preLoaderActive").remove();
                    });


                },
                //if clicking anywhere in the document
                stopHL: function () {
                    $("#fastaSeq").html(coveredSeq);
                },
                firstCoverage: function () {

                    var list = datas.Peptides;
                    var seqLength = getInfoForIsoform.Sequence(isoforms, isoName).length;
                    $("#proteoCover").text(pepComp.computeProteotypicCoverage(list, seqLength) + "%");
                    $("#pepCover").text(pepComp.computePeptideCoverage(list, seqLength) + "%");

                    seq1.coverage(pepComp.getAminoAcidColors(list, seqLength, getColorMap));
                    seq1.addLegend(legend);
                    coveredSeq = $("#fastaSeq").html();

                },
                moreInfos: function (event) {
                    var selection = [];
                    $(".PepSelected").each(function (o) {
                        if ($(this).prop("checked")) {
                            selection.push($(this).parent().parent().attr("class"));
                        }
                    });
                    addPeptidesInfos(selection, datas.Peptides, isoName);

                }
            };
            pepHistogram(datas.Peptides);

            $(function () {
                HL.firstCoverage();
                HL.clickPos();
            });
        }
    };


    function renderFeatureViewer(data, isoName) {

        var metaData = [
            {name: "Sequence"}, //1
            {name: "Propeptide",className: "pro",color: "#B3B3B3",type: "rect",filter:"Processing"}, //2
            {name: "Mature protein",className: "mat",color: "#B3B3C2",type: "rect",filter:"Processing"}, // 3
            {name: "Signal peptide",className: "sign",color: "#B3B3E1",type: "rect",filter:"Processing"}, //4
            {name: "Transit peptide",className: "pero",color: "#B3B3F0",type: "rect",filter:"Processing"}, //5
            {name: "Transit peptide",className: "mito",color: "#B3B3F0",type: "rect",filter:"Processing"}, //6
            {name: "Disulfide bond",className: "dsB",color: "#B3B3E1",type: "path",filter:"Modified Residue"}, //7
            {name: "Topo. domain","className": "topodomain","color": "#A5DBA5","type": "rect","filter": "Topology"}, //8
            {"name": "Membrane","className": "membrane","color": "#A5DBB7","type": "rect","filter": "Topology"}, //9
            {name: "Antibody",className: "anti",color: "#B3C2F0",type: "rect",filter:"none"}, //10
            {name: "Initiator meth",className: "initMeth",color: "#B3B3D1",type: "unique",filter:"Processing"}, //11
            {name: "Modified residue",className: "modifRes",color: "#B3C2B3",type: "unique",filter:"Modified Residue"}, //12
            {name: "Cross-link",className: "crossLink",color: "#B3C2C2",type: "unique",filter:"Modified Residue"}, //13
            {name: "Glycosylation",className: "glycoSite",color: "#B3C2D1",type: "unique",filter:"Modified Residue"}, //14
            {name: "Lipidation",className: "lipidation",color: "#A3B5DB",type: "unique",filter:"Modified Residue"}, //15
            {name: "Non standart AA",className: "seleno",color: "#859DE7",type: "unique",filter:"Modified Residue"}, //16
            {name: "Peptide",className: "pep",color: "#B3E1D1",type: "rect",filter:"Peptide", height:8}, //17
            {name: "SRM Peptide",className: "srmPep",color: "#B3E1F0",type: "rect",filter:"none", height:8} //18
        ];

        for (var i = 1; i < data.length; i++) {

            var feat = NXUtils.convertMappingsToIsoformMap(data[i], metaData[i].name, metaData[i].filter);
            var featForViewer = NXViewerUtils.convertNXAnnotations(feat, metaData[i]);
            featuresForViewer.push(featForViewer);
        }
        createSVG(isoforms, isoName);
        addFeatures(isoName);
    }

    var allFeatures = [];
    var featuresForViewer = [];

    $(function () {
        [
            nx.getProteinSequence(nxEntryName), //1
            nx.getAnnotationsByCategory(nxEntryName, "propeptide"), //2
            nx.getAnnotationsByCategory(nxEntryName, "mature-protein"), //3
            nx.getAnnotationsByCategory(nxEntryName, "signal-peptide"), //4
            nx.getAnnotationsByCategory(nxEntryName, "peroxisome-transit-peptide"), //5
            nx.getAnnotationsByCategory(nxEntryName, "mitochondrial-transit-peptide"), //6
            nx.getAnnotationsByCategory(nxEntryName, "disulfide-bond"), //7
            nx.getAnnotationsByCategory(nxEntryName, "topological-domain"), //7
            nx.getAnnotationsByCategory(nxEntryName, "transmembrane-region"), //7
            nx.getAnnotationsByCategory(nxEntryName, "antibody-mapping"), //8
            nx.getAnnotationsByCategory(nxEntryName, "initiator-methionine "), //9
            nx.getAnnotationsByCategory(nxEntryName, "modified-residue"), //10
            nx.getAnnotationsByCategory(nxEntryName, "cross-link"), //11
            nx.getAnnotationsByCategory(nxEntryName, "glycosylation-site "), //12
            nx.getAnnotationsByCategory(nxEntryName, "lipidation-site"), //13
            nx.getAnnotationsByCategory(nxEntryName, "selenocysteine"), //14
            nx.getAnnotationsByCategory(nxEntryName, "peptide-mapping"), //15
            nx.getAnnotationsByCategory(nxEntryName, "srm-peptide-mapping") //16
        ].reduce(function (sequence, dataPromise) {
                return sequence.then(function () {
                    return dataPromise;
                }).then(function (oneData) {
                    cpt += 1;
                    switch (cpt) {
                        case 1:
                            isoforms = oneData;
                            allFeatures.push(oneData);
                            firstIso = getFirstIsoform(isoforms);
                            currentIso = firstIso;
                            renderSequenceForIsoform(isoforms, firstIso);
                            nxIsoformChoice(isoforms);
                            break;
                        case 2:
                            proPeptide = oneData.annot;
                            allFeatures.push(oneData.annot);
                            break;
                        case 3:
                            matureProtein = oneData.annot;
                            allFeatures.push(oneData.annot);
                            break;
                        case 17:
                            pepMap = jQuery.merge([], oneData.annot);
                            //adding a copy for the feature viewer, because peptides will be added to peptideMappings
                            allFeatures.push(jQuery.extend({}, oneData.annot));
                            break;
                        case 18:
                            var pepSynthetic = jQuery.merge([], oneData.annot);
                            pepSynthetic.forEach(function(ps) {
                                var psFirstIso = Object.keys(ps.targetingIsoformsMap)[0];
                                var psStart = ps.targetingIsoformsMap[psFirstIso].firstPosition;
                                var psLast = ps.targetingIsoformsMap[psFirstIso].lastPosition;

                                var isPurelySynthetic = true;
                                for (var i = 0; i < pepMap.length; i++) {
                                    if (pepMap[i].targetingIsoformsMap.hasOwnProperty(psFirstIso)){
                                        if (pepMap[i].targetingIsoformsMap[psFirstIso].firstPosition === psStart && pepMap[i].targetingIsoformsMap[psFirstIso].lastPosition === psLast) {
                                            pepMap[i].evidences = pepMap[i].evidences.concat(ps.evidences);
                                            pepMap[i].category ="natAndSynth";
                                            isPurelySynthetic = false;
                                        }
                                    }
                                }
                                if (isPurelySynthetic) {
                                    pepMap.push(ps); //TODO fix this! This is referenced in allFeatures[1] so it should not be pushed like this
                                }
                            });
                            //adding a copy for the feature viewer, because pepetides will be added to peptideMappings
                            allFeatures.push(jQuery.extend({}, oneData.annot));
                            
                            break;
                        default:
                            allFeatures.push(jQuery.extend({}, oneData.annot));
                    }
                });
            }, Promise.resolve())
            .then(function () {
                renderPeptidesForIsoform(pepMap, firstIso);
                renderFeatureViewer(allFeatures, firstIso);
                showFeatureViewer();
                console.log("test1é3")
            })
            .catch(function (err) {
                // catch any error that happened along the way
                console.log("Argh, broken: " + err.message);
                console.log("Error at line : " + err.stack);
            });
    });

}
// Shorthand for $( document ).ready()
$(function () {
    initNXDivs();
});