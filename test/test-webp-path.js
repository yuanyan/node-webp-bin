var assert = require('assert');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

function print(err, stdout, stderr){

    console.log('err:' +  err);
    console.log('stdout:');
    console.log(stdout);
    console.log('stderr:');
    console.log(stderr);
}

describe('webp-bin', function () {
    before(function (){
        var binPath = require('../lib/webp-bin').path;
        fs.chmodSync(binPath, 0755);
    });

    after(function () {
        fs.unlinkSync('test/test.webp');
    });

    it('should return WebP help', function (cb) {
        var binPath = require('../lib/webp-bin').path;

        exec(binPath, function (err, stdout, stderr) {
            print(err, stdout, stderr);
            assert(stdout.toString().indexOf('cwebp') !== -1);
            cb();
        });
    });

    it('should successfully proxy WebP', function (cb) {
        var binPath = path.join(__dirname, '../bin/webp-bin');

        exec('node ' + binPath, function (err, stdout, stderr) {
            print(err, stdout, stderr);
            assert(stdout.toString().indexOf('cwebp') !== -1);
            cb();
        });
    });

    it('should encode a .png', function (cb) {
        var binPath = path.join(__dirname, '../bin/webp-bin');
        var args = [
            path.join(__dirname, 'fixtures', 'test.png'),
            '-o', path.join(__dirname, 'test.webp')
        ];

        exec('node ' + binPath + ' ' + args.join(' '), function (err, stdout, stderr) {
            print(err, stdout, stderr);
            var actual = fs.statSync('test/test.webp').size;
            var original = fs.statSync('test/fixtures/test.png').size;
            assert(actual < original);
            cb();
        });
    });
});
