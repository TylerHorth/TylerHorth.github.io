const path = require('path');

module.exports = {
  entry: ["babel-polyfill", "promise-polyfill", "whatwg-fetch", "./src/main.js"], // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, "lib"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: "main.js", // string
    // the filename template for entry chunks

    publicPath: "/lib/", // string
    // the url to the output directory resolved relative to the HTML page
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // directories where to look for modules

    extensions: [".js", ".json", ".jsx", ".css"],
    // extensions that are used

  },

  devtool: "source-map",

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
}
