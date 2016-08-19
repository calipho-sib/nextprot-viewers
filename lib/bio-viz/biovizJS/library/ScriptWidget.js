/**
 * Widget to manage scripts sent to Bioviz
 * @namespace bionext.biovizscriptwidget
 */
(function($) {
    $.widget('bionext.biovizscriptwidget', {
        /**
         * @name bionext.biovizscriptwidget#bioviz
         * @description Bioviz API access
         */
        options: {
            bioviz: null
        },
        _cmd: undefined,

        /**
         * @name bionext.biovizscriptwidget#_create
         * @function
         * @private
         * @description Create this widget
         */
        _create: function() {
            this.bioviz = this.options.bioviz;
            this.element.addClass( "bionext.biovizscriptwidget" );

            if (this.bioviz == null) {
                throw new Error('Some parameters are null');
                return;
            }
            
            this.init();
        },
        /**
         * @name bionext.biovizscriptwidget#_destroy
         * @function
         * @private
         * @description Destroy this widget
         */
        _destroy: function() {
            this.element.removeClass( "bionext.biovizscriptwidget" );
        },
        /**
         * @name bionext.biovizscriptwidget#init
         * @function
         * @description Initialize this widget
         */
        init: function() {
            if (!this._cmd) {
                var that = this;
                var commands = [];
                var cmdIndex;
                var saved;
                this._cmd = $("<div>")
                    .addClass("bionext-bioviz-cmd").css({
                        width: '100%',
                        margin: 0,
                        padding: 0
                        })
                    .append(
                        $('<input type="text">').css({
                            width: '100%',
                            margin: 0,
                            padding: 0
                            })
                        .bind("keypress", function(event) {
                            if (event.which == 13) { // enter
                                event.preventDefault(); 
                                var $this = $(this);
                                var value = $this.val();
                                $this.val('');
                                commands.push(value);
                                cmdIndex = commands.length;
                                saved = undefined;
                                that.execute(value);
                                // return false;
                            }
                        })
                        .bind("keydown", function(event) {
                            if (event.which == 38 || event.which == 40) { // up or down arrows
                                event.preventDefault();
                                var $this = $(this);
                                if (typeof saved !== "string") {
                                    saved = $this.val();
                                }
                                if (event.which == 38) { // up
                                    if (cmdIndex > 0)
                                        cmdIndex--;
                                } else { // down
                                    if (cmdIndex < commands.length)
                                        cmdIndex++;
                                }
                                if (commands[cmdIndex]) {
                                    $this.val(commands[cmdIndex]);
                                } else if (cmdIndex == commands.length) {
                                    $this.val(saved);
                                    saved = undefined;
                                }
                            // return false;
                            }
                        })
                    );
                this.element.empty();
                this.element.append(this._cmd);
            }
        },
        /**
         * @name bionext.biovizscriptwidget#execute
         * @function
         * @description Execute a command on this script widget bioviz app
         * @param  {Command} command The command to execute
         */
        execute: function(command) {
            this.bioviz.bioviz('executeScript', command);
        }
    });
}(jQuery));