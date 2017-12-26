var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	context: path.resolve('./src'),

  entry: {
    app: './js/index.js'
  },

	output: {
		path: path.resolve('./dist/'),
		filename: 'js/bundle.js',
		publicPath: '/'
	},

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('js'), resolve('test')]
      },
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[ext]'
        }
      },
			{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        })
      },
			{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' }
          ]
        })
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
		]
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new BrowserSyncPlugin({
			server: {
				baseDir: ['dist']
			},
			port: 3000,
			host: 'localhost',
			open: false
		}),
		new CopyWebpackPlugin([{
			from: './manifest.json'
		},{
			from: './manifest.webapp'
		},{
			from: './robots.txt'
		},{
			from: './favicon.ico'
		},{
			from: './img/**/*',
			to: './'
		}]),
    new ExtractTextPlugin('css/styles.css')
	]
};
