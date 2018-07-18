import webpack from 'webpack'
import path from 'path'
import { VueLoaderPlugin } from 'vue-loader'

const ENV = process.env.NODE_ENV
const SRC = path.join(__dirname, 'src')
const DEST = path.join(__dirname, 'app')

// _____________

const module = {
  rules: [
    {
      test: /\.vue$/,
      use: [{ loader: 'vue-loader' }]
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
      }]
    }
  ]
}

// _____________

const resolve = {
  extensions: [ '.js', '.vue', '.ts', '.tsx' ],
  alias: {
    '~': `${SRC}`
  }
}

// _____________

const entries = row => {
  const entries = {}
  row.map(entry => {
    const name = `${entry}`
    entries[name] = `${SRC}/${entry}`
  })
  return entries
}
const javascripts = entries(['app'])
const entry = Object.assign({}, javascripts)

// _____________

const output = {
  path: DEST,
  filename: '[name].js',
  publicPath: '/'
}

// _____________

const hotModuleReplacement = new webpack.HotModuleReplacementPlugin()
const vueLoaderPlugin = new VueLoaderPlugin()
const plugins = ENV === 'production' ? [vueLoaderPlugin] : [vueLoaderPlugin, hotModuleReplacement]

// _____________

const devtool = '#inline-source-map'
const devServer = {
  contentBase: DEST,
  host: 'localhost',
  port: '1234',
  inline: true,
  hot: true,
  quiet: true
}

// _____________

export default { module, resolve, entry, output, plugins, devtool, devServer }
