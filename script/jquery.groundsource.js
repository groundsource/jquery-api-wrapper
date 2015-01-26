/**
 * @name jquery.groundsource.js
 * @fileOverview
 * @description a jquery-based integration interface to the GroundSource API
 */
;(function ($) {

  "use strict";

  /**
   * @options
   * @name options
   * @param api_base_url [string] "base url for api"
   * @param access_token [string] "access_token for api auth"
   * @param cache [boolean] "cache results"
   */
  var options = {
    api_base_url    : '',
    access_token    : '',
    cache           : true
  };

  /**
   * public methods
   */
  var pub = {

    /**
     * @method
     * @name defaults
     * @description Sets default plugin options
     * @param opts [object] <{}> "Options object"
     * @example $.groundsource("defaults", opts);
     */
    defaults : function(opts) {
      options = $.extend(options, opts || {});
      return (typeof this === 'object') ? $(this) : true;
    },

    /**
     * @method
     * @name get
     * @description loads data via get
     * @param api_method [url] "api_method to get"
     * @param callback [function] "success callback function"
     * @example $.groundsource("get", "/surveys/answeredsurvey/", function () {});
     */
    get : function(api_method, callback) {
      _request(api_method, callback);
      return;
    }
  };

  /**
   * @method private
   * @name _init
   * @description Initializes plugin
   * @param opts [object] "Initialization options"
   */
  function _init(opts) {
    $.extend(true, options, opts || {});
  }


  /**
   * @method private
   * @name _request
   * @description Requests content via AJAX
   * @param api_method [string] "api action to request"
   * @param callback [function] "callback function"
   */
  function _request(api_method, callback) {

    $.ajax({
      url: options.api_base_url + api_method,
      data: {},
      dataType: "json",
      cache: options.cache,
      beforeSend:function(xhr) {
        xhr.setRequestHeader('authorization', 'Bearer ' + options.access_token);
      },
      success: function(resp, status, jqXHR) {
        var response  = (typeof resp === "string") ? $.parseJSON(resp) : resp;
        callback.call(this, response);
      },
      error: function(jqXHR, status, err) {
        try {
          console.log('error [' + jqXHR.status + '] -- ' + jqXHR.responseJSON.detail);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }

  /**
   * @name $.groundsource
   * @class
   *
   * @description simple jquery-based integration interface to the GroundSource API
   *
   * @param {Object} settings object literal containing initial values to set on GroundSource initialization.
   *
   * @example
   * basic init
   * $.groundsource({
   *     api_base_url    : 'https://groundsource.co/api/v1',
   *     access_token    : 'xxxxx',
   *
   * });
   * @example
   * sample api call
   * $.groundsource("get", "/surveys/answeredsurvey/", function (data) {
   *     $.each(data.results, function (id, object) {
   *         // do stuff
   *    });
   * });
   */
  $.groundsource = function(method) {
    if (pub[method]) {
      return pub[method].apply(this,
                                Array.prototype.slice.call(arguments, 1),
                                Array.prototype.slice.call(arguments, 2));  // TODO?

    } else if (typeof method === 'object' || !method) {
      return _init.apply(this, arguments);
    }
    return this;
  };

})(jQuery, this);