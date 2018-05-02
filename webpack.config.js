const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const mqPacker = require('css-mqpacker');

const extractSass = new ExtractTextPlugin({
  filename: "style.css"
});

const extractHtml = new ExtractTextPlugin({
  filename: "index.html"
});

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
      script: './index.js'
  },
  output: {
      path: path.resolve(__dirname, "./public"),
      filename: "[name].js",
      publicPath: ''
  },
  resolve: {
    extensions: ['.js']
  },
  module: {

    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{ 
              loader: 'css-loader',
              options: {
                  importLoaders: 2
              }
            },
            { 
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('autoprefixer')(),
                  require('mqPacker')()
                ]
              }       
            },
            {
             loader: 'sass-loader',
             
            }        
          ]
        })
      },
      {
      test: /\.(html)$/,
        use: extractHtml.extract({
          loader: 'html-loader',
            options: {
              minimize: false,
            }
        })
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 75
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    extractSass,
    extractHtml
  ]
};

// fallback: 'style-loader',