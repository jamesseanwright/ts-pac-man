'use strict';

const resolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const typescriptPlugin = require('rollup-plugin-typescript2');
const typescript = require('typescript');

module.exports = ({ prod }) => ({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts'],
    }),
    typescriptPlugin({
      typescript,
    }),
    prod && terser({
      mangle: {
        toplevel: true,
      },
    }),
  ],
  watch: {
    include: "src/**/*.ts",
  },
});
