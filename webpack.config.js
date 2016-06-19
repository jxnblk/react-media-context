
const config = {
  entry: './demo/entry.js',
  output: {
    path: __dirname + '/demo',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },
  devServer: {
    contentBase: 'demo'
  }
}

module.exports = config

