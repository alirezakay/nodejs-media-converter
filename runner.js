const path = require('path');
const colors = require('colors');
const ffmpeg = require('fluent-ffmpeg');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

const compressor = async (input) => {
  const files = await imagemin([input], {
    destination: './',
    plugins: [
      imageminJpegtran(),
      imageminGifsicle(),
      imageminSvgo({
        plugins: [
          { removeViewBox: false }
        ]
      }),
      imageminPngquant({
        quality: [0.7, 0.9]
      })
    ]
  });

  //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
};

/**
 *    input - string, path of input file
 *    output - string, path of output file
 *    callback - function, node-style callback fn (error, result)        
 */

const convert = (input, output, callback) => {
  ffmpeg(input)
    .output(output)
    .on('start', () => {
      console.log();
      console.log('#####'.brightBlue + ' Conversion Started '.brightBlue + '☐'.brightGreen);
      console.log('#'.brightBlue);
      console.log(`   input:  '${input}'`);
      if (callback) callback(null);
    })
    .on('end', async () => {
      const imageExt = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"];
      if(imageExt.includes(path.extname(output).toLowerCase())){
        process.stdout.write(">>".magenta +  " media converted and now optimizing ...");
        const intervaller = setInterval(() => {
          process.stdout.write(".");
        }, 50);
        await compressor(output).then(() => {
          clearInterval(intervaller);
          console.log("");
        });
      }
      console.log(`   output: '${output}'`);
      console.log('#'.brightBlue);
      console.log('#####'.brightBlue + ' Conversion  Ended  '.brightBlue + '☑'.brightGreen);
      console.log();
      if (callback) callback(null);
    })
    .on('error', (err) => {
      console.error(err);
      if (callback) callback(err);
    })
    .run();
}
