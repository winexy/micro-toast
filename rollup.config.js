import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

export default [
  {
    input: 'src/ts/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      del({ targets: 'dist/*' }),
      typescript({
        typescript: require('typescript')
      }),
      terser({
        output: {
          comments: false
        }
      })
    ]
  },
  {
    input: './dist/index.d.ts',
    output: [{
      file: 'dist/types/index.d.ts',
      format: 'es'
    }],
    plugins: [dts()]
  }
];
