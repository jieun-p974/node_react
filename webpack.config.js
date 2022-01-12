const path = require('path');

module.exports={
    resolve: {
        // alias: {
        //     '@': path.resolve('resources/js'),
        // },
        fallback: {
          "util": require.resolve("util/"),
          "url": require.resolve("url/"),
          "path": require.resolve("path-browserify"),
          "stream": require.resolve("stream-browserify"),
          "querystring": require.resolve("querystring-es3"),
          "stream": require.resolve("stream-browserify"),
          "net": require.resolve("net-browserify"),
          "crypto": require.resolve('crypto-browserify') 
        //   "path": require.resolve("path-browserify"),
        //   "os": require.resolve("os-browserify"), 
        //   "zlib": require.resolve("browserify-zlib")
        },
        node:{
            // fs:"empty",
            // net:"empty"
        }
    }
}


// const webpack = require('webpack');
// module.exports = {
//   mode: 'development',
//   entry: {
//     app: '',
//   },
//   output: {
//     path: '',
//     filename: '',
//     publicPath: '',
//   },
//   module: {

//   },
//   plugins: [],
//   optimization: {},
//   resolve: {
//     modules: ['node_modules'],
//     extensions: ['.js', '.json', '.jsx', '.css'],
//   },
// };