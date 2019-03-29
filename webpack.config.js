const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    board: ['@babel/polyfill/noConflict', path.join(__dirname, './client/src/index.js')],
    cardOverlay: ['@babel/polyfill/noConflict', path.join(__dirname, './client/src/components/CardOverlay/CardOverlay.js')]
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: '[name].[contenthash].js',
    // filename: 'board.bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loaders: ['file-loader'], 
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 3006, // Defaults to 8080
    contentBase: path.resolve(__dirname, './client/dist'),
    watchContentBase: true,
    proxy: {
      context: () => true,
      '/': 'http://localhost:3003',
      secure: false
    }
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};