const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isDevEnv = process.env.NODE_ENV === "development";

module.exports = {
  mode: isDevEnv ? "development" : "production",
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public/static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map', 
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, 
        use: [
          // 'style-loader',
          isDevEnv 
            ? 'style-loader'  // Inject CSS into the DOM - DEVELOPMENT ONLY
            : MiniCssExtractPlugin.loader, // Extract CSS and cache - PRODUCTION ONLY
          'css-loader', 
          'postcss-loader'
        ],
        exclude: /node_modules/,
      },
      { 
        test: /\.svg$/, 
        use: 'svg-inline-loader' 
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // This is the modern way of handling static assets
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Ensure this exists in your public folder
      filename: '../index.html',
      inject: false,    // this being true/not set caused bundle.js to be duplicated in index.html
      scriptLoading: 'defer'
    }),
    !isDevEnv && new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/static', to: '../../build/static' }, // Copy static files to the output
        { from: 'src/styles.css', to: '../../build/styles.css'}
      ],
    }),
    new DotEnv(),
  ].filter(Boolean),
};
