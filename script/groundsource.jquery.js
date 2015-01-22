(function ($) {

    'use strict';

    /**
     * GroundSource
     * Integration point w/ groundsource.co API
     */
    var GroundSource = function (jq_element, jq_args) {

        var groundsource = this;

        this.init = function () {
            alert('init!');
        };

        groundsource.init();

    };  //end GroundSource


    /**
     * @name $.fn.groundsource
     * @class
     *
     *
     * @example
     * $('#widget').groundsource({
     *    settings : {
     *    },
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