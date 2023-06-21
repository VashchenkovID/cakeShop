const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const fs = require('fs');

console.log(
  `ENV = ${process.env.NODE_ENV}, DEPLOYMENT= ${process.env.DEPLOYMENT}`,
);

let filePath = '';
if (fs.existsSync(path.resolve('.env.local'))) {
  console.log('Нашли .env.local, получаем данные из него');
  filePath = '.env.local';
} else {
  console.log('Читаем значения из .env');
  filePath = '.env';
}

const isProduction = process.env.NODE_ENV !== 'development';

module.exports = {
  entry: './src/index.tsx',
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      src: path.resolve('./src'),
      ...(() => {
        let aliases = {};
        const DEPLOYMENT = process.env.DEPLOYMENT;
        if (DEPLOYMENT === 'dev') return aliases;
        aliases[path.resolve('./src/config.ts')] = path.resolve(
          `./src/config.${DEPLOYMENT}.ts`,
        );
        return aliases;
      })(),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-optional-chaining',
            ],
          },
        },
      },
      {
        test: /\.styl/,
        use: [
          isProduction
            ? {
                loader: MiniCssExtractPlugin.loader,
              }
            : {
                loader: 'style-loader',
              },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[folder]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css/,
        use: [
          isProduction
            ? {
                loader: MiniCssExtractPlugin.loader,
              }
            : {
                loader: 'style-loader',
              },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /node_modules/,
          enforce: true,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: (() => {
    const plugins = [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
        ignoreOrder: false,
      }),
      new ForkTsCheckerWebpackPlugin(),
      new Dotenv({ path: filePath }),
      new HtmlWebpackPlugin({
        hash: true,
        favicon: path.resolve('src/assets/favicon.ico'),
        template: path.join(__dirname, 'index.html'),
      }),
      !isProduction && new ReactRefreshWebpackPlugin(),
    ];

    if (process.env.DEPLOYMENT !== 'dev') {
      plugins.unshift(new CleanWebpackPlugin());
    }

    return plugins.filter(Boolean);
  })(),
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};
