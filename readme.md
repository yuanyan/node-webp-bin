# node-webp-bin [![Build Status](https://secure.travis-ci.org/yuanyan/node-webp-bin.png?branch=master)](http://travis-ci.org/yuanyan/node-webp-bin)

[WebP](https://developers.google.com/speed/webp/) 0.3.0 Node.js wrapper that makes it seamlessly available as a local dependency on OS X, Linux and Windows.

WebP is a new image format that provides lossless and lossy compression for images on the web.
WebP lossless images are 26% smaller in size compared to PNGs. WebP lossy images are 25-34% smaller in size compared to JPEG images at equivalent SSIM index.
WebP supports lossless transparency (also known as alpha channel) with just 22% additional bytes.
Transparency is also supported with lossy compression and typically provides 3x smaller file sizes compared to PNG when lossy compression is
acceptable for the red/green/blue color channels.

## Example usage

```js
var execFile = require('child_process').execFile;
var binPath = require('webp-bin').path;

execFile(binPath, 'input.png -q 80 -o output.webp'.split(/\s+/), function(err, stdout, stderr) {
    // balabala...
});
```

You can also run it directly from `./node_modules/.bin/webp-bin`

## Options

which will convert the input file to a WebP file using a quality factor of 80
on a 0->100 scale (0 being the lowest quality, 100 being the best. Default
value is 75).

You might want to try the -lossless flag too, which will compress the source
(in RGBA format) without any loss. The -q quality parameter will in this case
control the amount of processing time spent trying to make the output file as
small as possible.

If input size (-s) for an image is not specified, it is assumed to be a PNG,
JPEG or TIFF file.

options:

  -h / -help  ............ short help
  -H / -longhelp  ........ long help
  -q <float> ............. quality factor (0:small..100:big)
  -alpha_q <int> ......... Transparency-compression quality (0..100).
  -preset <string> ....... Preset setting, one of:
                            default, photo, picture,
                            drawing, icon, text
     -preset must come first, as it overwrites other parameters.
  -m <int> ............... compression method (0=fast, 6=slowest)
  -segments <int> ........ number of segments to use (1..4)
  -size <int> ............ Target size (in bytes)
  -psnr <float> .......... Target PSNR (in dB. typically: 42)

  -s <int> <int> ......... Input size (width x height) for YUV
  -sns <int> ............. Spatial Noise Shaping (0:off, 100:max)
  -f <int> ............... filter strength (0=off..100)
  -sharpness <int> ....... filter sharpness (0:most .. 7:least sharp)
  -strong ................ use strong filter instead of simple (default).
  -nostrong .............. use simple filter instead of strong.
  -partition_limit <int> . limit quality to fit the 512k limit on
                           the first partition (0=no degradation ... 100=full)
  -pass <int> ............ analysis pass number (1..10)
  -crop <x> <y> <w> <h> .. crop picture with the given rectangle
  -resize <w> <h> ........ resize picture (after any cropping)
  -mt .................... use multi-threading if available
  -low_memory ............ reduce memory usage (slower encoding)
  -map <int> ............. print map of extra info.
  -print_psnr ............ prints averaged PSNR distortion.
  -print_ssim ............ prints averaged SSIM distortion.
  -print_lsim ............ prints local-similarity distortion.
  -d <file.pgm> .......... dump the compressed output (PGM file).
  -alpha_method <int> .... Transparency-compression method (0..1)
  -alpha_filter <string> . predictive filtering for alpha plane.
                           One of: none, fast (default) or best.
  -alpha_cleanup ......... Clean RGB values in transparent area.
  -noalpha ............... discard any transparency information.
  -lossless .............. Encode image losslessly.
  -hint <string> ......... Specify image characteristics hint.
                           One of: photo, picture or graph

  -metadata <string> ..... comma separated list of metadata to
                           copy from the input to the output if present.
                           Valid values: all, none (default), exif, icc, xmp

  -short ................. condense printed message
  -quiet ................. don't print anything.
  -version ............... print version number and exit.
  -noasm ................. disable all assembly optimizations.
  -v ..................... verbose, e.g. print encoding/decoding times
  -progress .............. report encoding progress

Experimental Options:
  -jpeg_like ............. Roughly match expected JPEG size.
  -af .................... auto-adjust filter strength.
  -pre <int> ............. pre-processing filter


The main options you might want to try in order to further tune the
visual quality are:
 -preset
 -sns
 -f
 -m

Namely:
  * 'preset' will set up a default encoding configuration targeting a
     particular type of input. It should appear first in the list of options,
     so that subsequent options can take effect on top of this preset.
     Default value is 'default'.
  * 'sns' will progressively turn on (when going from 0 to 100) some additional
     visual optimizations (like: segmentation map re-enforcement). This option
     will balance the bit allocation differently. It tries to take bits from the
     "easy" parts of the picture and use them in the "difficult" ones instead.
     Usually, raising the sns value (at fixed -q value) leads to larger files,
     but with better quality.
     Typical value is around '75'.
  * 'f' option directly links to the filtering strength used by the codec's
     in-loop processing. The higher the value, the smoother the
     highly-compressed area will look. This is particularly useful when aiming
     at very small files. Typical values are around 20-30. Note that using the
     option -strong/-nostrong will change the type of filtering. Use "-f 0" to
     turn filtering off.
  * 'm' controls the trade-off between encoding speed and quality. Default is 4.
     You can try -m 5 or -m 6 to explore more (time-consuming) encoding
     possibilities. A lower value will result in faster encoding at the expense
     of quality.


## License

MIT
