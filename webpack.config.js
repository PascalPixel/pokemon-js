const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = {
  entry: path.resolve(__dirname, 'src'),
  output: {
    filename: 'pokemon-mini.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|woff|woff2|ico)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  target: 'web'
}

const development = merge(common, {
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: './'
  },
  devtool: 'source-map'
})

const production = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
})

module.exports = (env) => {
  return env === 'production' ? production : development
}
