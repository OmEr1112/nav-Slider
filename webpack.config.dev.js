const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
      script: './index.js'
  },
  output: {
      path: path.resolve(__dirname, "./public"),
      filename: "[name].js",
      publicPath: '/app'
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
            use: [
              {
                loader: 'style-loader'
              },
              { 
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
                    require('autoprefixer')()
                  ]
                }       
              },
              {
              loader: 'sass-loader',
              
              }        
            ]
      },
      {
      test: /\.(html)$/,
        use: {
          loader: 'html-loader',
            options: {
              minimize: false,
            }
        }
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
  }
};

// fallback: 'style-loader',