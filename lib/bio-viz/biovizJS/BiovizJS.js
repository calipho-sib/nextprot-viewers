/**
 * BiovizJS embedded JQuery-UI Widget
 * require: jQuery.js, jQuery-ui.Widget.js
 * @namespace bionext.bioviz
 */
(function($) {
    $.widget('bionext.bioviz', {
        options: {
            biovizPath: './biovizJS/bioviz.html',
            structureToLoad: null,
            inputScript: null,
            startScript: false,
            enableScriptPlayer: false,
            enableWidgetManager: false,
            defaultRepresentations: true,
            pdbCustomUrl: null,
            pdbxCustomUrl: null,
            advancedRepresentation: false, // TODO : Disable advance rep  as AlphaShape by option
            background: null
        },
        biovizAPI: null,

        /**
         * @name bionext.bioviz#_create
         * @function
         * @private
         * @description Create this widget
         */
        _create: function() {
            // if(!window.bioviz) {
            //     window.bioviz = {};
            // }
            // this.id = ID++;
            // window.bioviz[id] = this;
            this.element.addClass('bionext.bioviz');
            this.element.empty();

            var that = this;

            $(this.element).css({
                display: 'flex'
            });

            this.content = $('<iframe src="' + this.options.biovizPath + '" name="biovizFrame" ' +
                            'id="biovizFrame" class="biovizWidget"' +
                            'scrolling="no" seamless="seamless" frameborder="0" allowfullscreen></iframe>').bind('load', function(event) {
                                that.onReady(this, event);
                            }).css({
                                flex: 1
                            }).appendTo($(this.element));
        },
        /**
         * @name bionext.bioviz#_destroy
         * @function
         * @private
         * @description Destroy this widget
         */
        _destroy: function() {
            this.element.removeClass('bionext.bioviz');
        },
        onReady: function(iframe, event) {
            var that = this;

            var iframeDocument = $(iframe).contents().context.contentDocument;
            biovizAPI = iframeDocument.biovizAPI;

            biovizAPI._setDefaultRepresentations(this.options.defaultRepresentations);

            if (!biovizAPI.isAvailable()) {
                event.data = 'Unable to start WebGL context';
                this._trigger('error', event);
                return;
            }

            // Set background
            if (this.options.background != null) {
                biovizAPI.setBackground(this.options.background);
            }

            // Add proxy prototype to call API directly from this widget
            for (var i in biovizAPI) {
                if (typeof (biovizAPI[i]) == 'function') {
                    this[i] = biovizAPI[i].bind(biovizAPI);
                }
            }

            // Change contextmenu to embbed it
            biovizAPI.setExternalContextMenuDiv($(document.body));

            // Link API event to trigger events from this widget
            biovizAPI.addListener('requestWidgetUpdate', function(event) {
                that._trigger('requestWidgetUpdate', event);
            });

            // Link API event to trigger events from this widget
            biovizAPI.addListener('atomMouseOver', function(event) {
                that._trigger('atomMouseOver', event);
            });

            // Link API event to trigger events from this widget
            biovizAPI.addListener('structureReady', function(event) {
                that._trigger('structureReady', event);
                biovizAPI._notify({type: 'requestWidgetUpdate', data: event.data});
            });

            $.bionext.RepresentationTypeID = iframeDocument.biovizAPI.RepresentationTypeID;
            $.bionext.LabelTypeID = iframeDocument.biovizAPI.LabelTypeID;
            $.bionext.ColorMappingID = iframeDocument.biovizAPI.ColorMappingID;

            // Process embedding configuration

            if (!this.options.enableWidgetManager) {
                biovizAPI.hideWidgetManager();
            }
            // Load script
            if (!this.options.enableScriptPlayer) {
                biovizAPI.hideScriptPlayer();
            }
            if (this.options.inputScript != null) {
                biovizAPI.executeScript(this.options.inputScript);
            }

            if (this.options.startScript) {
                biovizAPI.startScript();
            }

            // TODO : Check if it's working
            if (this.options.pdbCustomUrl != null) {
                biovizAPI.setOption('urlTemplate', this.options.pdbCustomUrl);
                biovizAPI.setOption('loadPDBX', false);
            }

            if (this.options.pdbxCustomUrl != null) {
                biovizAPI.setOption('urlTemplate', this.options.pdbxCustomUrl);
                biovizAPI.setOption('loadPDBX', true);
            }

            // Load structure
            if (this.options.structureToLoad != null) {
                biovizAPI.loadStructure(this.options.structureToLoad);
            }

            this._trigger('ready', event, {api: biovizAPI});
        }
    });
}(jQuery));
