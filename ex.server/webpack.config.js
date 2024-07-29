const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../dist/server'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/server.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/serviceAccountKey.json'],
      optimization: false,
      outputHashing: 'none',
    }),
  ],
};
