module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }, {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      }, {
        test: /\.(woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      }, {
        test: /\.(jpg|png)$/,
        loader: 'file?name=[path][name].[hash].[ext]'
      }, {
        test: /\.svg$/,
        loader: 'file'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: './'
  }
}
