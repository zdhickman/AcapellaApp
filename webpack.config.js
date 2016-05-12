module.exports.getConfig = function(isDev) {
  return {
    entry: './app/scripts/main.js',
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug : isDev,
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
    }
  };
}
