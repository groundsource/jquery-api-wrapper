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

        this.settings = {
            api_base_url    : '',   //defaults, will be merged + overridden on init()
            token           : '',
            sandbox_mode    : true,
        };

        this.init = function () {
            if (groundsource.args.hasOwnProperty('settings')) {
                groundsource.util.mergeSettings(groundsource.args.settings);
            }

            groundsource.api.loadSurveyResults();
        };

        this.api = {
            handleError: function (data) {
                console.log('error [' + data.status + '] -- ' + data.responseJSON.detail);
            },
            handleSuccess: function (data) {
                console.log('success!');
                console.log(data);
            },
            setAuthHeader : function (xhr) {
                xhr.setRequestHeader('authorization', 'Bearer ' + groundsource.settings.token);
            },
            loadSurveyResults : function () {
                $.ajax({
                  type: 'GET',
                  url: groundsource.settings.api_base_url + "/surveys/answeredsurvey/",
                  data: {},
                  success : groundsource.api.handleSuccess,
                  error : groundsource.api.handleError,
                  beforeSend: groundsource.api.setAuthHeader
                });
            },
        };

        this.util = {
            mergeSettings : function (settings) {
                var prop;
                for (prop in settings) {
                    if (settings.hasOwnProperty(prop)
                            && groundsource.settings.hasOwnProperty(prop)) {
                        groundsource.settings[prop] = settings[prop];
                    }
                }
            },
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