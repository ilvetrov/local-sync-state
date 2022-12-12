import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/localSyncState.ts',
    output: [
      {
        file: pkg.exports['.'],
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ include: ['src/localSyncState.ts'] })],
  },
  {
    input: 'src/localSyncState.ts',
    output: [
      {
        file: pkg.exports['./browser'],
        format: 'umd',
        sourcemap: true,
        name: 'localSyncState',
      },
    ],
    plugins: [typescript({ include: ['src/localSyncState.ts'], declaration: false }), terser()],
  },
  {
    input: 'src/react/useLocalSyncState.ts',
    output: [
      {
        file: pkg.exports['./react'],
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ rootDir: './src/react', exclude: ['useLocalSyncState.test.tsx'] })],
    external: ['react', 'react-dom', '../localSyncState'],
    onwarn(warning) {
      if (/is not under 'rootDir'/.test(warning.message)) {
        return
      }

      console.error(warning)
    },
  },
]
