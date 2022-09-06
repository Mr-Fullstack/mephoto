const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  entry: './src/index.js',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    compress: true,
    port: 9000,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  // target: ['web', 'es5'],
  // target:'node',
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  stats: {
    errorDetails: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader,"css-loader"]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }, 
  resolve: {
    fallback: { 
    //   "path": require.resolve("path-browserify"),
    //   "url": require.resolve("url/") ,
    //   "os": require.resolve("os-browserify/browser"),
    //   "buffer": require.resolve("buffer/"),
    //   "stream": require.resolve("stream-browserify"),
    //   "fs": false,
    //   "worker_threads":false,
    //   "child_process":false,
    //   "module":false,
     "@parcel/css":false,
     "esbuild":false,
     "clean-css":false
    },
    extensions: ['', '.js', '.jsx', '.css'],
    // modules: ['node_modules', path.resolve(__dirname, 'core')]
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  }
};