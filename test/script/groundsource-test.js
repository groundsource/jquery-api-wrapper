module("groundsource", {
});

test("check groundsource instantiated", function() {
    strictEqual ( typeof $.groundsource !== 'undefined', true, '$.groundsource defined' );
});

test( "basic get request", function( assert ) {
  var done = assert.async();

  $.groundsource("get", "/", function (data) {
    assert.equal( true, ('sources' in data), "api base returns map, including sources" );
    done();
  });
});