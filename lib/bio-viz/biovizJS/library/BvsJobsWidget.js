/**
 * Widget allowing to configure and start a BVS Job
 * @namespace bionext.bvsjobswidget
 */
(function($) {
    $.widget('bionext.bvsjobswidget', {
        /**
         * @name bionext.bioviztoolbar#bioviz
         * @description Bioviz API access
         */
        options: {
            bioviz: null
        },
        molecules: [],
        interactions: null,
        previousDetected: null,
        /**
         * @name bionext.bvsjobswidget#_create
         * @function
         * @private
         * @description Create this widget
         */
        _create: function() {
            this.element.addClass('bionext.bvsjobswidget');

            this.bioviz = this.options.bioviz;

            if (this.bioviz == null) {
                throw new Exception('You must set bioviz option when using this widget');
            }

            this._init();
        },
        /**
         * @name bionext.bvsjobswidget#_destroy
         * @function
         * @private
         * @description Destroy this widget
         */
        _destroy: function() {
            this.element.removeClass('bionext.bvsjobswidget');
        },
        _init: function() {
            var that = this;

            var str = '';
            str += '<label for="target">Select a target : </label>';
            str += '<select name="target" id="target"><option disabled>No target available</option></select>';
            str += '<br>';
            str += '<label for="dist">Interaction distance : </label>';
            str += '<input type="text" id="dist" readonly>';
            str += '<div id="distSlider"></div>';
            str += '<br>';
            str += '<button id="detect">Detect</button>';
            str += '<br>';
            str += '<label for="detected">Detected Ligand : </label>';
            str += '<select name="detected" id="detected"><option disabled>No compound available</option></select>';
            str += '<input type="checkbox" id ="focus">autoFocus</input>';
            str += '<br>';
            str += '<input id="title" placeholder="Title">';
            str += '<select name="db" id="db"><option>crystal</option><option>small-mq</option></select>';
            str += '<br>';
            str += '<input id="compoundStr" placeholder="Compound selection">';
            str += '<input id="siteStr" placeholder="Site selection">';
            str += '<button id="submit">Submit</button>';

            var widget = $('<div id="bvsjobswidget" class="ui-widget-header ui-corner-all">' + str + '</div>');

            this.element.empty();
            widget.appendTo(this.element);

            $('#target').selectmenu().addClass('disabled');
            $('#detected').selectmenu().addClass('disabled');
            $('#db').selectmenu();
            $('#distSlider').slider({
                value: 20,
                min: 1,
                max: 80,
                step: 1,
                slide: function(event, ui) {
                    $('#dist').val(ui.value / 10.0 + 'A');
                }
            }).each(function() {
                // Add labels to slider whose values
                // are specified by min, max

                // Get the options for this slider (specified above)
                var opt = $(this).data()['ui-slider'].options;

                // Get the number of possible values
                var vals = opt.max - opt.min;

                // Position the labels
                for (var i = 0; i <= vals; i++) {
                    if ((i + opt.min) % 20 === 0) {
                        // Create a new element and position it with percentages
                        var el = $('<label>' + (i + opt.min) / 10.0 + '</label>').css('left', (i / vals * 100) + '%');
                        // Add the element inside #dist
                        $('#distSlider').append(el);
                    }
                }
            });
            $('#dist').val($('#distSlider').slider('value') / 10.0 + 'A');
            $('#detect').button().attr('disabled', true);
            $('#submit').button().attr('disabled', true);

            // TODO : Better fix of overriden color and weight by css framework
            $('#target').css('color', 'black').css('font-weight', 'normal');
            $('#detected').css('color', 'black').css('font-weight', 'normal');
            $('#db').css('color', 'black').css('font-weight', 'normal');
            $('#title').css('color', 'black').css('font-weight', 'normal');
            $('#compoundStr').css('color', 'black').css('font-weight', 'normal');
            $('#siteStr').css('color', 'black').css('font-weight', 'normal');
            $('#dist').css('color', 'black').css('font-weight', 'normal');
            $('#distSlider label').css('position', 'absolute')
                            .css('width', '20px')
                            .css('margin-top', '10px')
                            .css('margin-left', '-10px')
                            .css('text-align', 'center');

            $('#detect').click(function() {
                $('#detected').empty();

                that.interactions = that.bioviz.bioviz('detectLigands', $('#target').val(), that.molecules, $('#distSlider').slider('value') / 10.0);

                var keys = that.interactions.keys();
                if (keys.length > 0) {
                    for (var i = 0, length = keys.length; i < length; i++) {
                        $('#detected').append($('<option></option>').attr('value', keys[i]).text(keys[i]));
                    }
                    $('#detected').selectmenu().removeClass('disabled');
                    $('#submit').button().removeAttr('disabled');
                } else {
                    $('#detected').append($('<option disabled></option>').attr('value', 'No compound available').text('No compound available'));
                    $('#detected').selectmenu().addClass('disabled');
                }

                $('#detected').selectmenu('refresh', true);
                that.applyView();

                if ($('#focus').is(':checked')) {
                    // Slight timeout just to avoid brutal changes for the eye
                    setTimeout(function() {
                        var selection = that.bioviz.bioviz('getObjects3DFromSelection', $('#detected').val());
                        that.bioviz.bioviz('centerOnSelection', selection, false);
                        that.bioviz.bioviz('anchorOnSelection', selection);
                    }, 200);
                }
            });

            $('#target').on('selectmenuselect', function() {
                var selection = that.bioviz.bioviz('getObjects3DFromSelection', $('#target').val(), 1);
                that.bioviz.bioviz('centerOnSelection', selection);
            });

            $('#detected').on('selectmenuchange', function() {
                if (that.interactions != null) {
                    that.applyView();

                    if ($('#focus').is(':checked')) {
                        // Slight timeout just to avoid brutal changes for the eye
                        setTimeout(function() {
                            var selection = that.bioviz.bioviz('getObjects3DFromSelection', $('#detected').val());
                            that.bioviz.bioviz('centerOnSelection', selection, false);
                            that.bioviz.bioviz('anchorOnSelection', selection);
                        }, 200);
                    }
                }
            });

            $('#focus').change(function() {
                if (!$('#submit').button().attr('disabled')) {
                    var isChecked = $(this).is(':checked');
                    if (!isChecked) {
                        var selection = that.bioviz.bioviz('getObjects3DFromSelection', $('#target').val(), 1);
                        that.bioviz.bioviz('centerOnSelection', selection);
                    } else {
                        var selection = that.bioviz.bioviz('getObjects3DFromSelection', $('#detected').val());
                        that.bioviz.bioviz('centerOnSelection', selection, false);
                    }
                }
            });

            $('#submit').click(function() {
                that.sendJob();
            });

            // Callback to update external widgets when bioviz notify a requestWidgetUpdate
            this.bioviz.bioviz('addListener', 'requestWidgetUpdate', function(event) {
                that.updateTargets();
            });
        },
        /**
         * @name bionext.bvsjobswidget#updateTargets
         * @function
         * @private
         * @description Update list of available targets
         * @param  {String} selectedStructureName The structure to update, if no structure is set, select the first available
         */
        updateTargets: function() {
            var currentVal = $('#target').val();

            $('#target').empty();
            this.molecules = [];

            if (!this.bioviz.bioviz('hasObject3D')) {
                $('#target').append($('<option disabled></option>').attr('value', 'No target available').text('No target available'));
                $('#target').selectmenu().addClass('disabled');
                $('#detect').button().attr('disabled', true);
            } else {
                $('#target').selectmenu().removeClass('disabled');
                $('#detect').button().removeAttr('disabled');
                var targets = this.bioviz.bioviz('getAvailableTargets');

                for (var i = 0, length = targets.length; i < length; i++) {
                    var value = targets[i];
                    $('#target').append($('<option></option>').attr('value', value).text(value));
                }

                this.molecules = this.bioviz.bioviz('getAvailableCompounds');
            }

            $('#target').selectmenu('refresh', true);

            var options = $('#selectBox option');
            var values = $.map(options, function(option) {
                return option.value === currentVal;
            });
            if (values.indexOf(true) < 0) {
                this.updateAll();
            }
        },
        updateAll: function() {
            $('#detected').empty();
            $('#detected').append($('<option></option>').attr('value', 'No compound available').text('No compound available'));
            $('#detected').selectmenu('refresh', true);

            $('#submit').button().attr('disabled', true);

            $('#compoundStr').val('');
            $('#siteStr').val('');
        },
        applyView: function() {
            this.updateStr();

            this.resetView();
            this.previousDetected = $('#detected').val();

            var interaction = this.interactions.get($('#detected').val());

            // Fill target residues
            var targetRes = this.bioviz.bioviz('getSelectionFromInteraction', interaction, 0);

            // Fill ligand residues
            var ligandRes = this.bioviz.bioviz('getSelectionFromInteraction', interaction, 1);

            for (var i = 0, length = targetRes.length; i < length; i++) {
                var selection = this.bioviz.bioviz('getObjects3DFromSelection', targetRes[i]);
                this.bioviz.bioviz('showRepresentation', selection, $.bionext.RepresentationTypeID.STICKS);
                this.bioviz.bioviz('colorBy', [255, 0, 0], selection, $.bionext.RepresentationTypeID.STICKS);
                this.bioviz.bioviz('showLabel', selection, $.bionext.LabelTypeID.Residue);
            }

            for (var i = 0, length = ligandRes.length; i < length; i++) {
                var selection = this.bioviz.bioviz('getObjects3DFromSelection', ligandRes[i]);
                this.bioviz.bioviz('showRepresentation', selection, $.bionext.RepresentationTypeID.STICKS);
                this.bioviz.bioviz('colorBy', [0, 255, 0], selection, $.bionext.RepresentationTypeID.STICKS);
                this.bioviz.bioviz('showLabel', selection, $.bionext.LabelTypeID.Residue);
            }
        },
        resetView: function() {
            var targetSelection = this.bioviz.bioviz('getObjects3DFromSelection', $('#target').val());
            this.bioviz.bioviz('removeResidues3D', targetSelection);
            this.bioviz.bioviz('hideLabel', targetSelection);

            if (this.previousDetected != null) {
                var ligandSelection = this.bioviz.bioviz('getObjects3DFromSelection', this.previousDetected, 2);
                if (ligandSelection.length === 0) {
                    this.previousDetected = null;
                } else {
                    this.bioviz.bioviz('removeResidues3D', ligandSelection);
                    this.bioviz.bioviz('hideLabel', ligandSelection);
                }
            }
        },
        updateStr: function() {
            var targetSelection = this.bioviz.bioviz('getBVSSelectionFromBiovizSelection', $('#target').val());
            var ligandSelection = this.bioviz.bioviz('getBVSSelectionFromBiovizSelection', $('#detected').val());

            $('#compoundStr').val(ligandSelection);
            $('#siteStr').val(targetSelection);
        },
        sendJob: function() {
            // TODO : Use Rest API to send job to the server
            var job = {
                title: $('#title').val(),
                database: $('#db').val(),
                ligandSelection: $('#compoundStr').val(),
                receptorSelection: $('#siteStr').val()
            };

            var ligandFile = null;  // FIXME Do not need to handle now (@see Nico)

            // Blob containing associated PDB data
            var targetSelection = this.bioviz.bioviz('getObjects3DFromSelection', $('#target').val(), 1);
            var blob = this.bioviz.bioviz('getFileFromStructureSelection', targetSelection[0]);
            console.log(blob);
            var receptorFile = null; // TODO Format blob to send it to REST API

            console.log(JSON.stringify(job));
            // TODO Send HTTP Request to REST API
        }
    });
}(jQuery));
