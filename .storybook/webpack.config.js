const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader"
      }
    ]
  }
}