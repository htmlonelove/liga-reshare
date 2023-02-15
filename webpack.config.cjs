const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  context: path.resolve(__dirname, 'source'),
  mode: 'development',
  entry: {
    main: './js/main.js',
    vendor: './js/vendor.js',
    autoResizeTextarea: './components/auto-resize-textarea/js/',
    phoneMask: './components/phone-mask/js/',
    navigationChanger: './components/navigation-changer/js/',
    customSelect: './components/custom-select/js/',
    scrollTranslator: './components/scroll-translator/js/',
    scrollLock: './components/scroll-lock/js/',
    focusLock: './components/focus-lock/js/',
    modals: './components/modals/js/',
    accordion: './components/accordion/js/',
    tabs: './components/tabs/js/',
    cookies: './components/cookies/js/',
    formValidate: './components/form-validate/js/',
    inlineVideo: './components/inline-video/js/',
    dynamicAdaptive: './components/dynamic-adaptive/js/',
    adaptiveRunner: './components/adaptive-runner/js/',
    simpleCursor: './components/simple-cursor/js/',
    openGraph: './components/open-graf/js/',
    header: './components/header/js/',
  },
  devtool: isDev ? 'source-map' : false,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build/js'),
  },
  optimization: {
    minimize: isDev ? false : true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new CircularDependencyPlugin(),
  ],
};
