module("groundsource", {
});

test("check groundsource instantiated", function() {
    strictEqual ( typeof $.fn.groundsource !== 'undefined', true, '$.fn.groundsource defined' );
});


test("check window.groundsource instantiated", function() {
    strictEqual ( typeof window.groundsource !== 'undefined', true, 'window.groundsource defined' );
});

test("check merged settings", function() {
    notEqual ( window.groundsource.main.settings.api_base_url, '', 'base url is overriden during init() to something other than empty string' );
});