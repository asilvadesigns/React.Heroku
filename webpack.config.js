const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 *  webpack configuration
 */
module.exports = {
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'app/components/'),
      Config: path.resolve(__dirname, 'app/config/'),
      Data: path.resolve(__dirname, 'app/data/'),
      Layouts: path.resolve(__dirname, 'app/layouts/'),
      Styles: path.resolve(__dirname, 'app/styles/'),
      Views: path.resolve(__dirname, 'app/views/'),
    }
  },
  context: path.resolve(__dirname, 'app'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true
    })
  ]
}
