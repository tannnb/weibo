const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 项目部署的基础路径 默认/
  // 放在子目录时使用./或者加你的域名
  publicPath: './',
  // publicPath: process.env.BASE_URL,
  configureWebpack: config => {
    if (isProduction) {
      // 为生产环境修改配置...
      // 上线压缩去除console等信息
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
      // 开启gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      // if (process.env.npm_config_report) {
      //     // 打包后模块大小分析//npm run build --report
      //     config.plugins.push(new BundleAnalyzerPlugin())
      // }
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack (config) {
    config.resolve.alias.set('@', resolve('src'))
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!isProduction,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8088,
    https: false,
    hotOnly: true,
  }
}
