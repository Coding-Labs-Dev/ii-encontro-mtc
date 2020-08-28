/* eslint-disable import/no-extraneous-dependencies */
import * as path from 'path';
import * as webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import GitRevisionPlugin from 'git-revision-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import gitprocess from 'child_process';

const LoadCommitDate = gitprocess
  .execSync('git log -1 --date=format:"%Y-%m-%d %T" --format="%ad"')
  .toString();

const gitRevisionPlugin = new GitRevisionPlugin();

const config: webpack.Configuration = {
  entry: ['react-hot-loader/patch', './src/index'],
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '~': path.resolve(__dirname, 'src/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      config: path.resolve(__dirname, 'src/config/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      services: path.resolve(__dirname, 'src/services/'),
      store: path.resolve(__dirname, 'src/store/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  watch: true,
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new FaviconsWebpackPlugin({ logo: './public/logo.png', cache: false }),
    new Dotenv({
      path: './.env',
      safe: true,
    }),
    gitRevisionPlugin,
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(gitRevisionPlugin.version()),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
      COMMITDATE: JSON.stringify(LoadCommitDate),
    }),
  ],
};

export default config;
