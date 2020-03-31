# Media Converter

> Convert your multimedia in nodejs as easy as you like

## Description

By installing this module, you can easily **convert** (with **compression**) your media in Node.JS.

This module uses two other main modules that are referred to, at the end of this page. \
Besides, [**ffmpeg**](https://ffmpeg.org/) tools are utilized for having a better performance.

Install the module by using one of these commands:

```bash
npm install --save media-converter
```

OR

```bash
yarn add media-converter
```

----

### Version 1.x.x

\>> The **conversion** could be applied to these extensions:

- Images => (`"jpg", "jpeg", "png", "gif", "svg", "webp"` )
- Videos => (`all formats supported by` [ffmpeg](https://ffmpeg.org))
- Audios => (`all formats supported by` [ffmpeg](https://ffmpeg.org))

\>> The **compression** is just being applied to the images (and not the other media)

----

### Version 2.x.x

> In Progress ...

----
----
----

## Prerequisites

### 1. Install FFmpeg tools on your system

Its size is about 67.5M

You can find the installation solutions at their website here: **[ffmpeg](https://ffmpeg.org/)**

OR

You can do the following commands in preference to the first approach:

- Windows :  \
  first, you need to install a download package manager for windows (sth like apt for Linux). \
  I highly recommend you to download and install `choco` package manager from their website: **[chocolatey](https://chocolatey.org/)** \
  after the installation, just open up a **command line** (cmd or PowerShell) as **administrator** and then do the commands below:

  ```bash
  choco install ffmpeg
  ```

- Linux (Ubuntu) :

  ```bash
  sudo apt update
  sudo apt install ffmpeg
  ```

- Mac :

  ```bash
  brew install ffmpeg --force
  brew link ffmpeg
  ```

*Notice:* \
**Make sure the FFmpeg address is added to the environment Path**

----
----
----

## Usage

This project has been accomplished with *node v10.16.3*. \
If you cannot run (and having errors) just feel free to open an issue on its GitHub page.

```js
var convert = require('media-converter');

/*
 ** input [string]: the input media path to the file
 ** output [string]: the path for the output media
 ** callback [function]: the callback function
 ** verbose [boolean]: whether print the logs or not
 */
convert(input, output, callback, verbose);
```

### Examples

```js
const convert = require('media-converter');


convert('dog.jpg', 'dog.png'); //with no callbacks

convert('dog.png', 'dog.webp', () => console.log("png => webp")); //with a simple callback

convert('drinking.mkv', 'drinking.mp4', (err) => {
  if (!err){
    console.log("Completed!")
  }
}); //with a complete callback

convert('bad-guy-video.mp4', 'bad-guy-audio.mp3', null, false); //with no verbose

convert('billie-eilish.png', 'billie-eilish-compressed.png'); //just compressing

```

----
----
----

## References

As I said before, this module uses some other tools:

- [ffmpeg](https://ffmpeg.org/) tools
- [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg) module
- [imagemin](https://www.npmjs.com/package/imagemin) module

Finally I thank the developers of the tools mentioned before.
