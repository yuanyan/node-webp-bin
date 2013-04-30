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
var webpPath = require('optipng-bin').path;

execFile(webpPath, ['-h'], function(err, stdout, stderr) {
    console.log(stdout);
});
```

You can also run it directly from `./node_modules/.bin/webp-bin`


## License

MIT
