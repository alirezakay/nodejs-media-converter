// webpack.config.js
module.exports = {
  entry: __dirname + "/converter.js",
  output: {
    path: __dirname + '/dist/',
    filename: "bundle.js"
  },
  plugins: [],
  node: {
    fs: 'empty',
    child_process: 'empty',
  },
}