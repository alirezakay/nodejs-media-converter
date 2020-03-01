'use strict';

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
};


/**
 * Media Converter Function
 * @param {string} input - path of input file
 * @param {string} output - path of output file
 * @param {Function} callback - node-style callback fn (error, result)        
 * @param {Boolean} verbose - whether verbose the logs or not
 */
function convert(input, output, callback, verbose = true) {
  ffmpeg(input)
    .output(output)
    .on('start', () => {
      if (verbose) {
        console.log();
        console.log('#####'.brightBlue + ' Conversion Started '.brightBlue + '☐'.brightGreen);
        console.log('#'.brightBlue);
        console.log(`   input:  '${input}'`);
      }
      if (callback) callback(null);
    })
    .on('end', async () => {
      const imageExt = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif"];
      if (imageExt.includes(path.extname(output).toLowerCase())) {
        let intervaller = null;
        if (verbose) {
          process.stdout.write(">>".magenta + " media converted and now optimizing ...");
          intervaller = setInterval(() => {
            process.stdout.write(".");
          }, 50);
        }
        await compressor(output).then(() => {
          if (verbose) {
            if(intervaller) clearInterval(intervaller);
            console.log("");
          }
        });
      }
      if (verbose) {
        console.log(`   output: '${output}'`);
        console.log('#'.brightBlue);
        console.log('#####'.brightBlue + ' Conversion  Ended  '.brightBlue + '☑'.brightGreen);
        console.log();
      }
      if (callback) callback(null);
    })
    .on('error', (err) => {
      console.error(err);
      if (callback) callback(err);
    })
    .run();
}

module.exports = {
  convert: convert
};