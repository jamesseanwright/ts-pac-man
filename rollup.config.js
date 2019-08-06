import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescriptPlugin from 'rollup-plugin-typescript2';
import typescript from 'typescript';

export default {
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
    terser({
      mangle: {
        toplevel: true,
      },
    }),
  ],
};
