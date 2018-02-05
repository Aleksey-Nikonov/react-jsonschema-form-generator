const path = require('path');

const config = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, include: path.resolve(__dirname, '../'), loaders: ["style-loader", "css-loader"] },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: "url-loader" }
    ]
  }
};

module.exports = config;