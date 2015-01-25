/**
 * @name groundsource.jquery.js
 * @fileOverview
 * @description main interface integrating jQuery and the GroundSource api
 */
(function ($) {

    'use strict';

    /**
     * GroundSource
     * Integration point w/ groundsource.co API
     */
    var GroundSource = function (jq_element, jq_args) {

        var groundsource = this;
        this.args = jq_args;

        this.init = function () {
            if (groundsource.args.hasOwnProperty('settings')) {
                groundsource.main.mergeSettings(groundsource.args.settings);
            }
        };

        this.main = {
            settings : {
                api_base_url    : '',   //defaults, can be overridden on init()
                token           : '',
                sandbox_mode    : true,
            },
            mergeSettings : function (settings) {
                var prop;
                for (prop in settings) {
                    if (settings.hasOwnProperty(prop)
                            && groundsource.main.settings.hasOwnProperty(prop)) {
                        groundsource.main.settings[prop] = settings[prop];
                    }
                }
            },
        };

        this.api = {
            loadSurveyResults : function () {}
        };

        groundsource.init();

    };  //end GroundSource

    /**
     * @name $.fn.groundsource
     * @class
     *
     * @description main integration point between jQuery, GroundSourceUI, and the GroundSource API
     *
     * @param {Object} args.settings object literal containing initial values to set on GroundSource initialization.
     *
     * @example
     * $('#widget').groundsource({
     *     settings : {
     *         api_base_url    : '',
     *         token           : '',
     *     }
     * });
     */
    $.fn.groundsource = function (args) {

        var jq_element = this,  //hold reference to jQuery $(this)
            methods = {
            };

        if (methods[args]) {
            return methods[args].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof args === 'object' || !args) {
            if (typeof window.groundsource === 'undefined') {
                window.groundsource = new GroundSource(jq_element, args);
            } else {
                // TODO
            }
        } else {
            // TODO
        }
    };
}(jQuery));