//$(window).ready(function () { // Declare nx global variables
var nxBioViz = (function () {
    
    var self;
    
    var nxBioViz = function () {
        self = this;
        
        this.events = {
          PDB_DATA_EVENT: "pdb-data-available"
        };
    };
    
    var applicationName = '3D bioviz'; //please provide a name for your application
    var clientInfo = 'calipho team with bioviz team';
    var nx = new Nextprot.Client(applicationName, clientInfo);
    var entry = nx.getEntryName();
    var isoform = entry + "-1";
    var container = "";
    var containerElement;
    var seqList = [];
    var sequence;
    var pdbData;
    var current_PDB = "";

    // Declare bioviz global variables
    var biovizWidget;
    var identifier;
    var listMol;

    // Set bioviz options
    var bv_options = {
        biovizPath: "../../lib/bio-viz/biovizJS/bioviz.html",
        startScript: false,
        background: '#333333',
//        pdbCustomUrl: nx.getApiBaseUrl() + "/pdb/${id}"
        pdbxCustomUrl: nx.getApiBaseUrl() + "/pdbx/${id}"
        // New option to avoid default representations
        // You then must set the representation of each chain you want
        // defaultRepresentations: false

    };

    var findElemByProperty = function (list, property) {
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i].name === property)
                return list[i].value; // Return as soon as the object is found
        }
        return null; // The object was not found
    }


//    function init() {
    nxBioViz.prototype.init = function(div, isoName, sequences){
        //Init container & iso
        container = div;
        containerElement = $(div)[0];
        isoform = isoName;
        seqList = sequences ? sequences : [];
        
        var apiCalls = [nx.getAnnotationsByCategory(entry, "pdb-mapping")];
        if (!sequences) {
            apiCalls.push(nx.getProteinSequence(entry));
        }
        
        Promise.all(apiCalls).then(function(data) {
            if (!sequences){
                seqList = data[1];
            }
            pdbData = data[0].annot;
//        })
        
        //Get pdb data
//        nx.getAnnotationsByCategory(entry, "pdb-mapping").then(function (data) {
//            console.log("pdb-mapping data");
//            console.log(data.annot);
//            pdbData = data.annot;
            
            if (!pdbData.length){
                //Generate html template
                $(div).append("<div class='noPdb alert alert-warning' role='alert'><strong><span class='glyphicon glyphicon-exclamation-sign'></span><span class='alert-text'>There is no PDB entry for any isoform.</span></strong></div>");
                
                if (CustomEvent) {
                    var event = new CustomEvent(self.events.PDB_DATA_EVENT, {
                                detail: {
                                    pdb : pdbData.length
                                }
                    });
                    containerElement.dispatchEvent(event);
                }
            }
            
            else {
                loadBioviz();
            }
        });
    }
    
    function loadBioviz(){
        //Generate html template
        var template = HBtemplates['templates/bioviz.tmpl'];
        $(container).html(template);

        var listChain = parsePDBData(pdbData);

        if (CustomEvent) {
            var event = new CustomEvent(self.events.PDB_DATA_EVENT, {
                        detail: {
                            pdb : listChain.length
                        }
            });
            containerElement.dispatchEvent(event);
        }

        if (!listChain.length){
            //Generate html template
            $(container).html("<div class='noPdb alert alert-warning' role='alert'><strong><span class='glyphicon glyphicon-exclamation-sign'></span><span class='alert-text'>There is no PDB entry for this isoform.</span></strong></div>");
        }
        else {

            var listPdbId = listChain.map(function(p){
                return p.name;
            }).filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })

            var firstPDBValue = null;
            listPdbId.forEach(function(pdb){
                $('#pdbList').append($("<option></option>").val(pdb).html(pdb));
                if (firstPDBValue == null) firstPDBValue = pdb;
            })

            generateTable(listChain);

//                    $("#current_structure").text("- " + firstPDBValue);
            $("#structureCount").text(listChain.length);
            identifier = firstPDBValue;
            biovizWidget = $("#bioviz").bioviz(bv_options);

            // WAIT FOR BIOVIZ TO FINISH INITALIZATION (before interacting with it)
            biovizWidget.bioviz({
                ready: function (event) {
                    var currentIso = $.grep(seqList, function(e){ return e.uniqueName == isoform; });
                    sequence = currentIso[0].sequence;

                    // Instead of using structureToLoad option with which you doesn't know when the structure is
                    // loaded, you better have to call API loadStructure method when BiovizJS is ready.

                    // Display the first pdb
                    var promise = biovizWidget.bioviz("loadStructure", firstPDBValue);

                    // Reload list of associated mol
                    promise.then(function () {
                        getElement();
                    }).catch(function(error) {
                        console.warn(error);
                    });

                    initMenuEvent();
                }
            })
        }
    }
    
    nxBioViz.prototype.ifPDBAvailable = function (listener) {
            containerElement.addEventListener(self.events.PDB_DATA_EVENT, listener);
            //$(document).on(self.events.FEATURE_SELECTED_EVENT, listener);
        };
    
    nxBioViz.prototype.reloadTable = function(isoName){
        var firstPDBValue = null;
        isoform = isoName;
        var listChain = parsePDBData(pdbData);
        
        console.log("data given to the table : ");
        console.log(listChain);
        
        if (CustomEvent) {
            var event = new CustomEvent(self.events.PDB_DATA_EVENT, {
                        detail: {
                            pdb : listChain.length
                        }
            });
            containerElement.dispatchEvent(event);
        }
        
        if (!listChain.length){
            //Generate html template
            $(container).html("<div class='noPdb alert alert-warning' role='alert'><strong><span class='glyphicon glyphicon-exclamation-sign'></span><span class='alert-text'>There is no PDB entry for this isoform.</span></strong></div>");
        }
        //Generate html template if empty
        else if (!$("#bioviz").length) {
            loadBioviz();
        }
        else {
            
            generateTable(listChain);

            //filter
            var listPdbId = listChain.map(function(p){
                return p.name;
            }).filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })
            
            //update list of pdb in dropdown menu
            $("#pdbList").html("");
            listPdbId.forEach(function(pdb){
                $('#pdbList').append($("<option></option>").val(pdb).html(pdb));
                if (firstPDBValue == null) firstPDBValue = pdb;
            });
            
            //update sequence for highlight
            var currentIso = $.grep(seqList, function(e){ return e.uniqueName == isoform; });
            sequence = currentIso[0].sequence;
            
            // if PDB in bioviz different than first one in dropdown, reload bioviz with new PDB
            if (identifier !== firstPDBValue) {
                identifier = firstPDBValue;
                loadNewPDB(identifier);
            }
            
        }
    }

    function hideElem(elem) {
//        var stringSelection = identifier + ":" + elem.type + ":" + elem.id;
        var stringSelection = identifier + ":" + elem;
        var ObjectSelection = biovizWidget.bioviz("getObjects3DFromSelection", stringSelection);
        biovizWidget.bioviz("hide", ObjectSelection);
    }

    function showElem(elem) {
//        var stringSelection = identifier + ":" + elem.type + ":" + elem.id;
        var stringSelection = identifier + ":" + elem;
        var ObjectSelection = biovizWidget.bioviz("getObjects3DFromSelection", stringSelection);
        biovizWidget.bioviz("show", ObjectSelection, true);
    }

//    function showOne(list, elem) {
//        list.forEach(function (l) {
//            if (l.id === elem) {
//                showElem(l);
//            } else hideElem(l);
//        })
//
//    }
    
    // You can center and anchor on showed object, so it is centered on the scene and you rotate around it
    function centerElem(elem, duration) {
        var stringSelection = identifier + ":" + elem;
        var ObjectSelection = biovizWidget.bioviz("getObjects3DFromSelection", stringSelection);
        // When zooming (second parameter to true), you don't need to call anchorOnSelection method
        biovizWidget.bioviz("centerOnSelection", ObjectSelection, true, duration);
    }

    // Hide all chains of the current structure
    function hideAll() {
        var listMols = biovizWidget.bioviz("getMoleculesFromStructure", identifier).forEach(function(elem) {
            hideElem(elem);
        });
    }


    // Show all chains of the current structure
     function showAll(list) {
        list.forEach(function (l) {
                showElem(l);
            })
            // with lower opacity ?
        var listMols = biovizWidget.bioviz("getMoleculesFromStructure", identifier).forEach(function(elem) {
            showElem(elem);
        });
        var ObjectSelection = biovizWidget.bioviz("getObjects3DFromSelection", identifier);
        // When zooming (second parameter to true), you don't need to call anchorOnSelection method
        biovizWidget.bioviz("centerOnSelection", ObjectSelection, true, 1000);
        // with lower opacity ?
    }


    function getElement() {
//        console.log("getElement");

//        listMol = biovizWidget.bioviz("getMoleculesFromStructure", identifier).map(function (l) {
//            return {
//                type: l.type,
//                id: l.id
//            }
//        });
        // Retrieve proteinic chains of the structure
        listMol = biovizWidget.bioviz("getProteinicMoleculesFromStructure", identifier);

        // First mol to be shown
        var firstElem = listMol[0];

        // Reset molList
        $("#molList").html("");

        // Hide default representations and show only first item
        hideAll();
        showElem(firstElem);
        centerElem(firstElem);

        // Add chain to input list and hide 3D object of chain !== firstElem
        listMol.forEach(function (m) {
//            $('#molList').append($("<option></option>").val(m.id).html(m.type + " : " + m.id));
//            if (m.id !== firstElem.id) {
//                hideElem(m);
//            }
            $('#molList').append($("<option></option>").val(m).html(m));

        });
    }
    
    function loadNewPDB(accession) {
    // Delete all structures contained by the scene
        biovizWidget.bioviz('deleteAllStructures');


        //Display the new pdb
//            biovizWidget.bioviz("loadStructure", accession);
        var promise = biovizWidget.bioviz("loadStructure", accession);


        // Reload list of associated mol
//            setTimeout(function () {
//                getElement()
//            }, 4000);
        promise.then(function () {
            getElement();
        }).catch(function(error) {
            console.warn(error);
        });
    }

    function initMenuEvent() {

        // If pdb identifier changes
        $("#pdbList").change(function (elem) {
            // Disable show context when loading a new file
            $("#showContext").prop('checked', false);

            var accession = this.value;
            identifier = this.value;
            console.log('accession : ' + accession);
            
            loadNewPDB(accession);
//            $("#current_structure").text("- " + identifier);
            
//            var pdbDisplayed = biovizWidget.bioviz("getStructuresByPDBID");
//            console.log("pdbDisplayed");
//            console.log(pdbDisplayed);
//
//            //Remove each of them
//            pdbDisplayed.forEach(function (pdb) {
//                biovizWidget.bioviz("deleteStructure", pdb);
//            })

        });

        // If mol id changes
        $("#molList").change(function (elem) {
                hideAll();
                var chain = this.value;
//                showOne(listMol, chain);
                showElem(chain);
                centerElem(chain);

                if ($("#showContext").prop("checked")) {
                    $("#showContext").prop("checked", false);
                }
            })
            // If checkbox status to show context changes
        $("#showContext").change(function (e) {
            if (this.checked) {
                showAll(listMol);
            } else {
                hideAll();
                var chain = $("#molList").val();
//                showOne(listMol, chain);
                showElem(chain);
                centerElem(chain, 1000);

            }
        })
    }

//    function highlightFromRange(range) {
    nxBioViz.prototype.highlightFromRange = function(range) {
//        var listChains = biovizWidget.bioviz("getMoleculesFromStructure", identifier).map(function (l) {
//            return {
//                type: l.type,
//                id: l.id
//            }
//        });
        var listChains = biovizWidget.bioviz("getProteinicMoleculesFromStructure", identifier);

//        console.log("listChains");
//        console.log(listChains);

        biovizWidget.bioviz("resetHighlights");

        listChains.forEach(function (c) {
//            var params = identifier + ":" + c.type + ":" + c.id;
            var params = identifier + ":" + c;
//            console.log("params : " + params);
            var selection = biovizWidget.bioviz("getObjects3DFromSelection", params);
//            console.log("selection");
//            console.log(selection);
            biovizWidget.bioviz("linkWithExternalSequence", selection, sequence);


            biovizWidget.bioviz("highlight", selection, true, null, range, true);
        })
    }



    //    Click event on FV 

    //    function selectionListener(data) {
    //        console.log("testtt");
    //        console.log(data);
    //        var date = getFormattedDate();
    //        $("#eventTriggered").append("<li><span class='date'>" + date + "</span><span class='badge fv-badge'>FV</span> <strong> Start : </strong>" + data.start + " - <strong> End : </strong>" + data.end + "</li>");
    //        highlightFromRange([data.start, data.end]);
    //    }
    //
    //    function getFormattedDate() {
    //        var date = new Date();
    //        var str = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    //
    //        return str;
    //    }

    function parsePDBData(list3Delems) {
        var listChain = list3Delems.map(function (d) {
            var name = findElemByProperty(d.properties, "name");
//            var positions = d.targetingIsoformsMap[Object.keys(d.targetingIsoformsMap)[0]];
            var positions = d.targetingIsoformsMap[isoform] || null;
            if (positions) {
                return {
                    chain: findElemByProperty(d.properties, "chain"),
                    method: findElemByProperty(d.properties, "method"),
                    name: name,
                    resolution: findElemByProperty(d.properties, "resolution") || "-",
                    position: positions ? positions.firstPosition + "-" + positions.lastPosition : "NA<i class='pdbPosException glyphicon glyphicon-asterisk' aria-hidden='true'></i>",
                    links: name
                }
            }
            else return null;
        }).filter(function(e){return e});
        listChain.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            if (a.chain < b.chain) return -1;
            if (a.chain > b.chain) return 1;
            return 0;
        })
        return listChain;
    }

    function generateTable(listChain) {
        
        if ( $.fn.dataTable.isDataTable( '#pdbTable' ) ) {
            table = $('#pdbTable').DataTable();
            table.clear();
            table.rows.add(listChain);
            table.draw();
        }
        else {
            $("#pdbTable").DataTable({
                "data": listChain,
                "columns": [
                    {
                        data: 'name'
                    },
                    {
                        data: 'method'
                    },
                    {
                        data: 'resolution'
                    },
                    {
                        data: 'chain'
                    },
                    {
                        data: 'position'
                    },
                    {
                        data: 'links'
                    }
                ],
                "sDom": "rt",
                "scrollY": "250px",
                "scrollX": "true",
                "scrollCollapse": true,
                "paging": false,
                "columnDefs": [
                    {
                        "targets": "pdbName",
                        "render": function (data, type, full, row) {
                            return '<a href="http://www.pdb.org/pdb/explore/explore.do?pdbId=' + data + '" class="btn btn-xs extLink" type="button" target="_blank">' + data + '</a>';
                        }
                    },
                    {
                        "targets": "pdbLinks",
                        "render": function (data, type, full, row) {
                            return '<a href="http://www.ebi.ac.uk/pdbsum/' + data + '" class="btn btn-xs extLink" type="button" target="_blank">PDBsum</a><a href="http://www.proteopedia.org/wiki/index.php/' + data + '" class="btn btn-xs extLink" type="button" target="_blank">Proteopedia</a>';
                        }
                    }
                ]
            });
        }
    }

//    init();
    return nxBioViz;
}());
//});