const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader'); // For Vue 3

module.exports = {
  mode: 'development', // or 'production' for build
  entry: './client/src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/' // Important for routing
  },
  devServer: {
    static: './client/public',  // Serve static files from public folder
    port: 8080,
    hot: true,
    proxy: [ // Make it an array
        {
          context: ['/api'], // The path(s) you want to proxy. Use an array if you have more than one.
          target: 'http://localhost:3000', // Your backend URL
          changeOrigin: true, // Required for CORS in some cases
        }],
    historyApiFallback: true // Needed for Vue Router
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images' // Customize output path for images
            }
          }
        ]
      },
      // ... other loaders (babel-loader for JavaScript if needed)
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html'
    }),
    new VueLoaderPlugin() // For Vue 3
  ],
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src') // Helpful alias
    }
  }
};