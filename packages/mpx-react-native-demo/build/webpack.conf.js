const path = require('path')
const { resolveSrc, resolve } = require('./utils')
const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')
const WebpackReloadPlugin = require('./WebpackReloadPlugin')
console.log(">> path.resolve(__dirname, '../../dist')",  path.resolve(__dirname, '../../rn/mpx'))
module.exports = {
  entry: {
    main: MpxWebpackPlugin.getComponentEntry(resolveSrc('components/list.mpx'))
  },
  mode: 'none',
  cache: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        include: [/\.mpx\.js/, resolve('src'), resolve('test'), resolve('node_modules/@mpxjs'), resolve('node_modules/react-native')],
        loader: 'babel-loader'
      },
      {
        test: /\.mpx$/,
        use: [
          MpxWebpackPlugin.loader()
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(css|wxss)$/,
        use: ['css-loader']
      },
      {
        test: /\.json$/,
        resourceQuery: /asScript/,
        type: 'javascript/auto'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          MpxWebpackPlugin.urlLoader({
            name: 'img/[name][hash].[ext]'
          })
        ]
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
            options: {
              // transpileOnly: true
            }
        },
        include: [/\.mpx\.js/, resolve('src'), resolve('test'), resolve('node_modules/@mpxjs'), resolve('node_modules/react-native')]
      }
      // {
      //   test: /\.ts$/,
      //   use: [
      //     'babel-loader',
      //     {
      //       loader: 'ts-loader',
      //       options: {
      //         appendTsSuffixTo: [/\.(mpx|vue|js)$/]
      //       }
      //     }
      //   ]
      // }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx', '.mpx', '.tsx'] },
  output: {
    path: path.resolve(__dirname, '../../rn/mpx'),
    publicPath: '/',
    filename: '[name].js',
    library: {
      type: 'commonjs2',
      export: 'default'
    }
  },
  optimization: {
    splitChunks: false,
    moduleIds: 'named'
  },
  externals: {
    'react-native': 'react-native',
    'react': 'react'
  },
  externalsType: 'commonjs',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 'auto',
    hotOnly: true
  },
  plugins: [
    new MpxWebpackPlugin({
      mode: 'react',
      srcMode: 'wx'
    }),
    new WebpackReloadPlugin()
  ]
}
