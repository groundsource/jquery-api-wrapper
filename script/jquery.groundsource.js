/**
 * @name jquery.groundsource.js
 * @fileOverview
 * @description a jquery-based integration interface to the GroundSource API
 */
;(function ($) {

  "use strict";

  /**
   * @options
   * @param api_base_url [string] <''> "base url for api"
   * @param access_token [string] <''> "access_token for api auth"
   * @param cache [boolean] <'true'> "cache results"
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
    defaults: function(opts) {
      options = $.extend(options, opts || {});
      return (typeof this === 'object') ? $(this) : true;
    },

    /**
     * @method
     * @name get
     * @description loads data via get
     * @param api_method [url] <''> "api_method to get"
     * @example $.groundsource("get", "/surveys/answeredsurvey/");
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
   * @description Requests new content via AJAX
   * @param url [string] "URL to load"
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