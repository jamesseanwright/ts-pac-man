'use strict';

const resolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const typescriptPlugin = require('rollup-plugin-typescript2');
const typescript = require('typescript');

module.exports = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  context: 'window',
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts'],
    }),
    typescriptPlugin({
      typescript,
    }),
    process.env.NODE_ENV === 'production' &&
      terser({
        mangle: {
          toplevel: true,
        },
      }),
  ],
  watch: {
    include: 'src/**/*.ts',
  },
};
