$(document).ready(function () {
            var ga = ga || undefined;
            var Nextprot = window.Nextprot;
            var nx = new Nextprot.Client("PeptideViewer", "nextprotTeam");
            var identicalSeqEntries = {};
            //    var exemples = "LQELFLQEVR, AATDFVQEMR, TKMGLYYSYFK, \nCVSNTPGYCR, TTETLIILSR, IGTTVIDLENR"

            //    $("#variantList").text(exemples);

            function toggleIsoforms(id) {
                $("#" + id + ' #showIsoforms').text("Show isoforms");
                $("#" + id + ' #showIsoforms').click(function () {
                    $(this).text(function (i, text) {
                        return text === "Show isoforms" ? "Hide isoforms" : "Show isoforms";
                    });
                    $("#" + id + ' .showEntry').is(':visible') ? $("#" + id + " .showEntry").hide() : $("#" + id + " .showEntry").show();
                    $("#" + id + ' .showIsoform').is(':visible') ? $("#" + id + " .showIsoform").hide() : $("#" + id + " .showIsoform").show();
                });
            }
            function getIdenticalSequenceList(callback){
                var sparqlQuery = "select distinct ?iso1 ?iso2 where {"+
                   "?entry :isoform ?iso1."+
                   "?iso1 :sequence / :chain ?chain1."+
                   "?entry2 :isoform ?iso2."+ 
                   "?iso2 :sequence / :chain ?chain2."+
                   "filter ( (?chain1 = ?chain2) && (?entry != ?entry2))"+
                   "}";
                nx.executeSparql(sparqlQuery).then(function (data) {
                    data.results.bindings.forEach(function(d){
                        var entry1 = d.iso1.value.split("/").pop();
                        var entry2 = d.iso2.value.split("/").pop();
                        if (!identicalSeqEntries.hasOwnProperty(entry1)){
                            identicalSeqEntries[entry1] = [];
                        }
                        identicalSeqEntries[entry1].push(entry2);
                    })
                    callback();
                })
            }

            function toggleProteo() {
                $("#onlyProteoWithV").click(function () {
                    if ($(this).is(':checked')) {
                        $(".proteoWithVariant").show();
                        $(".peptide:not(.proteoWithVariant)").hide();
                        $("#onlyProteoWithoutV").prop("checked", false);
                    } else $(".peptide").show();

                    var pepShowed = $("#peptideResult>div:visible").length;
                    $("#countPepShowed").text(pepShowed);
                })
                $("#onlyProteoWithoutV").click(function () {
                    if ($(this).is(':checked')) {
                        $(".proteoWithoutVariant").show();
                        $(".peptide:not(.proteoWithoutVariant)").hide();
                        $("#onlyProteoWithV").prop("checked", false);
                    } else $(".peptide").show();

                    var pepShowed = $("#peptideResult>div:visible").length;
                    $("#countPepShowed").text(pepShowed);
                })
            }

            function throwPeptideError(pep) {
                var peptide = {
                    name: pep
                }
                var template2 = HBtemplates['app/templates/notFound.tmpl'];
                var results2 = template2(peptide);
                $("#errorMessages").append(results2);

            }

            function throwPeptideLengthError() {
                var template3 = HBtemplates['app/templates/peptideLengthExceed.tmpl'];
                $("#errorMessages").append(template3);
                $(".shaft-load3").remove();
            }

            function throwNbError(pep) {
                var template3 = HBtemplates['app/templates/limitExceeded.tmpl'];
                $("#errorMessages").append(template3);
                $(".shaft-load3").remove();
            }

            function throwAPIError(message) {
                var template4 = HBtemplates['app/templates/apiCallFail.tmpl'];
                var fillTemplate = template4(message);
                $("#errorMessages").append(fillTemplate);
                $(".shaft-load3").remove();
            }

            function throwWarning(message) {
                var template5 = HBtemplates['app/templates/warningPanel.tmpl'];
                var fillTemplate = template5(message);
                $("#errorMessages").append(fillTemplate);
                $(".shaft-load3").remove();
            }

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

            function addPeptideBox(data, sequence, id, pepTotalCount) {
                var isoformsLength = 0;
                data.forEach(function (o) {
                    isoformsLength += o.annotations.length;
                });
                var entries = data.map(function (o) {
                    return {
                        name: o.uniqueName,
                        withVariant: entryWithVariant(o),
                        withoutVariant: entryWithoutVariant(o),
                        geneName: o.overview.mainGeneName,
                        identicalSeq: o.hasIdenticalSeq
                    };
                });
                var entriesLength = data.length;

                var entriesLengthWithoutVariant = entries.filter(function (d) {
                    return d.withoutVariant === true;
                }).length;
                var entriesLengthWithVariant = entries.filter(function (d) {
                    return d.withVariant === true;
                }).length;
                console.log("data",data);
                var unicityWithoutVariant = data[0].annotations[0].propertiesMap["peptide unicity"] ?data[0].annotations[0].propertiesMap["peptide unicity"][0].value : "NULL";
                var unicityWithVariant = data[0].annotations[0].propertiesMap["peptide unicity with variants"][0].value;
//                console.log("unicityWithoutVariant");
//                console.log(unicityWithoutVariant);
                var entryMatching = {
                    id: id,
                    peptide: sequence,
                    proteotypicity: {
//                        withVariant: unicityWithVariant !== "NOT_UNIQUE",
                        withVariant: unicityWithVariant === "UNIQUE" || unicityWithVariant === "PSEUDO_UNIQUE",
//                        withoutVariant: unicityWithoutVariant !== "NOT_UNIQUE",
                        withoutVariant: unicityWithoutVariant === "UNIQUE" || unicityWithoutVariant === "PSEUDO_UNIQUE",
                        nullWithVariant: entriesLengthWithVariant < 1,
                        nullWithoutVariant: entriesLengthWithoutVariant < 1,
                        pseudoWOV: unicityWithoutVariant === "PSEUDO_UNIQUE",
                        pseudoWV: unicityWithVariant === "PSEUDO_UNIQUE",
                        iconWV: unicityWithVariant === "UNIQUE" ? "glyphicon-star" : unicityWithVariant === "PSEUDO_UNIQUE" ? "glyphicon-star-empty" : unicityWithVariant === "NOT_UNIQUE" ? "glyphicon-list" : "",
                        iconWOV: unicityWithoutVariant === "UNIQUE" ? "glyphicon-star" : unicityWithoutVariant === "PSEUDO_UNIQUE" ? "glyphicon-star-empty" : unicityWithoutVariant === "NOT_UNIQUE" ? "glyphicon-list" : ""
                    },
                    entries: entries,
                    isoforms: data.map(function (o) {
                        return o.annotations.map(function (p) {
                            return {
                                entryName: o.uniqueName,
                                variant: p.variant,
                                isoform: Object.keys(p.targetingIsoformsMap)[0],
                                positions: {
                                    first: p.targetingIsoformsMap[Object.keys(p.targetingIsoformsMap)[0]].firstPosition,
                                    last: p.targetingIsoformsMap[Object.keys(p.targetingIsoformsMap)[0]].lastPosition
                                },
                                identicalSeq: o.hasIdenticalSeq.indexOf(Object.keys(p.targetingIsoformsMap)[0]) > -1
                            };
                        });
                    })
                };
//                console.log("entryMatching");
//                console.log(entryMatching);
//                console.log("entriesLengthWithoutVariant")
//                console.log(entriesLengthWithoutVariant)
                var template = HBtemplates['app/templates/matchingEntries.tmpl'];
                var results = template(entryMatching);
                $("#peptideResult").append(results);

                toggleIsoforms(id);
            }
            //    function getMaxList(str){
            //        var charToCut = "";
            //        var posToCut = 2001;
            //        while (charToCut !== ",") {
            //            posToCut -= 1;
            //            charToCut = str[posToCut];
            //        }
            //        return posToCut;
            //    }
            function getApiCallList(listPep) {
                var list = [[]];
                var strLength = 0;
                var index = 0;
                for (var i = 0; i < listPep.length; i++) {
                    if (listPep[i].length < 6) {
                        throwAPIError("The peptide <strong>" + listPep[i] + "</strong> is too short. A peptide must have a minimum length of 6 amino-acids.");
                    } else if (strLength + listPep[i].length < 2000) {
                        strLength += listPep[i].length;
                        list[index].push(listPep[i]);
                    } else {
                        throwPeptideLengthError();
                    }
                }
                return list;

                //        if (strLength > 2000) {
                //            var posToCut = getMaxList(str);
                //            list.push(str.substring(0,posToCut));
                //            getApiCallList(list, str.substring(posToCut+1));
                //            return list;
                //        }
                //        else {
                //            list.push(str);
                //            return list;
                //        }
            }

            function getPeptideByEntry(entry, isoform) {
                var peptideData = [];
                nx.getAnnotationsByCategory(entry, "peptide-mapping").then(function (data) {
                    data.annot.forEach(function (d) {
                        if (d.targetingIsoformsMap.hasOwnProperty(isoform)) {
                            var positions = d.targetingIsoformsMap[isoform];
                            peptideData.push({
                                start: positions.firstPosition,
                                end: positions.lastPosition
                            });
                        }
                    })
                    nx.getProteinSequence(entry).then(function (isos) {
                        var sequence = isos.filter(function (seq) {
                            return seq.uniqueName === isoform
                        })[0].sequence;
                        var peptideList = "";
                        peptideData.forEach(function (p) {
                            peptideList += sequence.substring(p.start - 1, p.end) + ",";
                        })
                        getProteotypicityInfos(peptideList);
                    })
                }).catch(function (error) {
                    console.log(error.responseText);
                    var errorMessage = error.responseText;
                    throwAPIError(errorMessage.message);
                })
            }

            // FOR NEXT VERSION
            function convertArrayOfObjectsToCSV(args) {
                var result, ctr, keys, columnDelimiter, lineDelimiter, data;

                data = args.data || null;
                if (data == null || !data.length) {
                    return null;
                }

                columnDelimiter = args.columnDelimiter || ',';
                lineDelimiter = args.lineDelimiter || '\n';

                keys = Object.keys(data[0]);

                result = '';
                result += keys.join(columnDelimiter);
                result += lineDelimiter;

                data.forEach(function(item) {
                    ctr = 0;
                    keys.forEach(function(key) {
                        if (ctr > 0) result += columnDelimiter;

                        result += item[key];
                        ctr++;
                    });
                    result += lineDelimiter;
                });

                return result;
            }

            function exportPepList(){
                if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                    var message = 'You are currently using Safari. The export button will give you a file without any extension. To read this file you will have to add ".csv" to the file.';
                    throwWarning(message);
                }

                $("#downloadList").click(function() {

                    if(ga){
                      ga('send', 'event', 'unicity-checker', 'download');
                    }
                    
                    var listPeptides = [];
                    var peptide_list = "";
                    $("#peptideResult>div:visible").each(function(){
                        var pep = {
                            peptide:"",
                            UniquenessWithoutVariant:"",
                            countIsoMatchedWithoutVariant:0,
                            listIsoMatchedWithoutVariant:"",
                            UniquenessWithVariant: "",
                            countAdditionalIsoMatchedWithVariant:0,
                            listAdditionalIsoMatchedWithVariant:""
                        };
                        pep.peptide = $(this).attr("id");
                        pep.listIsoMatchedWithoutVariant = $(this).find(".panel-wo-variant .showIsoform li.foundIn").map(function() {
                            return $(this).text().split(" ")[0];
                        }).get();
                        pep.UniquenessWithoutVariant = $(this).find(".panel-wo-variant.panel-success").length ? $(this).find(".panel-wo-variant.panel-success.panel-pseudo").length ? "Pseudo" : "Y" : "N";
                        pep.countIsoMatchedWithoutVariant = pep.listIsoMatchedWithoutVariant.length;

                        pep.listAdditionalIsoMatchedWithVariant = $(this).find(".panel-w-variant .showIsoform li.variantIntoAccount").map(function() {
                            return $(this).text().split(" ")[0];
                        }).get();
                        pep.countAdditionalIsoMatchedWithVariant = pep.listAdditionalIsoMatchedWithVariant.length;
                        pep.UniquenessWithVariant = $(this).find(".panel-w-variant.panel-success").length ? $(this).find(".panel-w-variant.panel-success.panel-pseudo").length ? "Pseudo" :  "Y" : "N";


                        pep.listIsoMatchedWithoutVariant = "\"" + pep.listIsoMatchedWithoutVariant.join(" ") + "\"";
                        pep.listAdditionalIsoMatchedWithVariant = "\"" + pep.listAdditionalIsoMatchedWithVariant.join(" ") + "\"";

                        listPeptides.push(pep);
                    });

                    var csv = convertArrayOfObjectsToCSV({
                        data:listPeptides});
                    var exportFilename = "exportCSVVA.csv";
                    var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
                    var csvDataSafari = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
                    // Safari
                    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                        var link = document.createElement('a');
                        document.body.appendChild(link);
                        link.href = csvDataSafari;
                        link.setAttribute('download', exportFilename);
                        link.click();
                        document.body.removeChild(link);
                    }
                    //IE11 & Edge
                    else if (navigator.msSaveBlob) {
                        navigator.msSaveBlob(csvData, exportFilename);
                    }
                    else {
                        //In FF link must be added to DOM to be clicked
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(csvData);
                        document.body.appendChild(link);
                        link.setAttribute('download', exportFilename);
                        link.click();
                        document.body.removeChild(link);
                    }

//                    data = encodeURI(csv);
//                    window.open(data);

//                    this.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(peptide_list);
//                    this.href = data;
//                    this.download = "export.csv";
                });
            }

            function listOrEntry(str) {
                // FOR NEXT VERSION
                //        if (str.startsWith("NX_")) {
                //            parseStr = str.split("-");
                //            var entry = parseStr[0];
                //            var iso = str;
                //            getPeptideByEntry(entry, iso);
                //        }
                //        else getProteotypicityInfos(str);

                //Check if illegal char in string
                var regex = /[^;,ACDEFGHIKLMNPQRSTVWY\s]/gi;
                var matches = str.match(regex);
                if (matches && matches.length > 0) {
                    var illegalChars = matches.join('", "');
                    var message = 'Your peptide list contains illegal characters : "' + illegalChars + '".';
                    throwAPIError(message);
                }
                else if (str.trim().length < 1){
                    var message = 'The input field is empty, please provide some peptides. (e.g. : LQELFLQEVR, AATDFVQEMR, TKMGLYYSYFK, ..)';
                    throwAPIError(message);
                } else getProteotypicityInfos(str);
            }

            function countPeptideSubmitted(count, countTotal) {
                var duplicates = countTotal - count;
                var duplicateMessage = "";
                if (duplicates) duplicateMessage = "<div id='duplicate'>" + duplicates + " duplicate(s) removed<div>";
                var countHtml = "<div id='pepSub'><div><span class='glyphicon glyphicon-ok'></span>" + count + " distinct peptide(s) submitted</div>" + duplicateMessage + "</div>";
                $("#countSubmitted").html(countHtml);
                $("#pepSub>div")
                    .css("right", -$("#pepSub").outerWidth() + "px")
                    .animate({right: 0}, 500);
//                $("#pepSub>div").slideDown("fast")
//                $("#pepSub>div:first-child").show("slide", { direction: "right" }, 1000);
//                $("#pepSub>div:last-child").show("slide", { direction: "right" }, 1000);
//                    .delay(3000)
//                    .animate({right: -$("#pepSub").outerWidth() + "px"}, 800);
                //        $("#countSubmitted").fadeIn();
            }

            function getProteotypicityInfos(str) {
                //        var test = str.split(/[\s,;]+/g);
                //        var pepListString = str.replace(/\s+/g, '');
                //        var pepListTotal = str.split(/[\s,;]+/g);
                var strSplit = str.split(/[\s,;]+/g);
                var pepListTotal = strSplit.filter(function (item, pos, self) {
                    return self.indexOf(item) == pos;
                })
                if (pepListTotal[pepListTotal.length - 1] === "") pepListTotal.pop();

                if (pepListTotal.length < 1001) {
                    var apiCallList = getApiCallList(pepListTotal);

                    if (apiCallList[0].length) {
                        countPeptideSubmitted(pepListTotal.length, strSplit.length);
                        console.log("nb of api calls : " + apiCallList.length);
                        var countApiCalls = apiCallList.length;
                        var countCallFinished = 0;
                        apiCallList.forEach(function (pepList) {
                            var pepListString = pepList.join(",");
                            console.log("pep count : " + pepList.length);

                            nx.getEntryforPeptide(pepListString).then(function (data) {
                                pepList.forEach(function (sequence) {
                                    var id = sequence;
                                    var new_data = $.extend(true, [], data);
                                    new_data.forEach(function (d, i) {
                                        new_data[i].annotations = d.annotationsByCategory["pepx-virtual-annotation"].filter(function (f) {
                                            return f.cvTermName === sequence
                                        });
                                    })
                                    new_data = new_data.filter(function (d) {
                                        return d.annotations.length > 0
//                                        return d.annotationsByCategory["pepx-virtual-annotation"].length > 0
                                    });
                                    
                                    
                                    // Adapt to new spec. Take identicalSeqEntries into account
                                    var idSeqs = new_data.length > 0 ? new_data[0].annotations[0].synonyms : [];
//                                    console.log(idSeqs);
                                    if (!idSeqs) idSeqs = [];
                                    new_data.forEach(function(nd,i){
                                        var idSeqMatches = idSeqs.filter(function(elem){
                                            return elem.split("-")[0] === nd.uniqueName;
                                        })
                                        new_data[i].hasIdenticalSeq = idSeqMatches;
                                    })
                                    
//                                    new_data.forEach(function(nd,i){
//                                        var pepXIsos = nd.annotations.map(function(an){
//                                            return Object.keys(an.targetingIsoformsMap)[0];
//                                        })
//                                        var entryIsosLength = nd.overview.isoformNames.length;
//                                        
//                                        var entryName = pepXIsos[0].split("-")[0];
//                                        var hasIdenticalSeq = false;
//                                        var idSeqs =  Object.keys(identicalSeqEntries).filter(function(idseq){
//                                            return idseq.split("-")[0] === entryName
//                                        })[0]
//                                        if (idSeqs){
//                                            hasIdenticalSeq = idSeqs;
//                                        }
//                                        new_data[i].hasIdenticalSeq = hasIdenticalSeq;
////                                        else new_data[i].hasIdenticalSeq = false;
////                                        if (pepXIsos.length !== entryIsosLength){
////                                             new_data[i].IS_matchAllIsos = false;   
////                                        } else new_data[i].IS_matchAllIsos = true;
//                                    })
                                    if (new_data.length < 1) throwPeptideError(sequence);
                                    else addPeptideBox(new_data, sequence, id, pepListTotal.length);
                                });
                                var pepShowed = $("#peptideResult>div:visible:not(.shaft-load3)").length;
                                $("#countPepShowed").text(pepShowed);
                                $("#countPepTotal").text(pepShowed);
                                countCallFinished += 1;
                                if (countCallFinished === countApiCalls) $(".shaft-load3").remove();

                            }).catch(function (error) {
                                countCallFinished += 1;
                                if (countCallFinished === countApiCalls) $(".shaft-load3").remove();
                                console.log('errortext',error);
                                var errorMessage = error.responseText;
                                throwAPIError(errorMessage.message);
                            })
                        });
                        toggleProteo();
                    }
                } else throwNbError();
            }

            //RESET BUTTON CLICKED
            $("#resetList").click(function () {
                $("#variantList").val("");
                $(".result-header").hide();
                $("#peptideResult").html("");
                $("#countSubmitted").html("");
                $("#errorMessages").html("");
                $("#files").val("");
            });

            //SUBMIT BUTTON CLICKED
            $("#submitList").click(function () {

                if(ga){
                  ga('send', 'event', 'unicity-checker', 'submit');
                }

                //uncheck the filters
                $(".filters input:checked").prop('checked', false);

                //reset the counter for visible peptides
                $("#countPepShowed").text("0");
                $("#countPepTotal").text("0");

                //reset the error messages
                $("#errorMessages").html("");
                $("#countSubmitted").html("");

                //show result header
                $(".result-header").show();

                //add the loader
                var source = $("#loader-template").html();
                $("#peptideResult").html(source);

                //        $("#scn_alignment").fadeIn('slow');

                //begin the computation
                var input = $("#variantList").val().toUpperCase().trim();
                
//                getIdenticalSequenceList(function(){
                    listOrEntry(input);

                    // FOR NEXT VERSION
                    exportPepList();
                    //tooltip for identical seqs
                    $(function () {
                      $('[data-toggle="tooltip"]').tooltip()
                    })
                    
//                })
            });

            function handleFileSelect(evt) {
                var files = evt.target.files; // FileList object

                // Loop through the FileList and render image files as thumbnails.
                for (var i = 0, f; f = files[i]; i++) {

                    // Only process image files.
//                        if (!f.type.match('image.*')) {
//                            continue;
//                        }
                    console.log(f.type);

                    var reader = new FileReader();

                    // Closure to capture the file information.
                    reader.onload = (function (theFile) {
                        return function (e) {
                            console.log(e);
                            //Add content of file in textarea
                            $("#variantList").val(e.target.result);
                            // Render thumbnail.
//                                var span = document.createElement('span');
//                                span.innerHTML = ['<img class="thumb" src="', e.target.result,
//                            '" title="', escape(theFile.name), '"/>'].join('');
//                                document.getElementById('list').insertBefore(span, null);
                        };
                    })(f);

//                        reader.readAsDataURL(f);
                    reader.readAsText(f);
                }
            }

            $("#files").change(function (event) {
                console.log("files changed");
                handleFileSelect(event);
            });
});
