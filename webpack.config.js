const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
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
        test: /\.less$/, // Handle .less files
        use: [
          'style-loader', // Inject CSS into the DOM
          'css-loader',   // Resolve @import and url() paths in CSS
          'less-loader',  // Compile LESS to CSS
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Ensure this exists in your public folder
      inject: false,    // this being true/not set caused bundle.js to be duplicated in index.html
      scriptLoading: 'defer'
    }),
  ],
};
