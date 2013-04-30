'use strict';

var Mocha = require('mocha');
var colors = require('colors');
var mocha = new Mocha({ui: 'bdd', reporter: 'list'});

mocha.addFile('test/test-webp-path.js');

mocha.run(function (failures) {
    if (failures > 0) {
        console.log('pre-build test failed'.red);
    } else {
        console.log('pre-build test passed successfully'.green);
    }
});
