import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/localSyncState.ts',
    output: [
      {
        file: pkg.exports['.'].import,
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
        file: pkg.exports['.'].require,
        format: 'cjs',
        exports: 'default',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ include: ['src/localSyncState.ts'], declaration: false })],
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
        file: pkg.exports['./react'].import,
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ rootDir: './src/react', exclude: ['useLocalSyncState.test.tsx'] })],
    external: ['react', 'react-dom', '../localSyncState.js'],
    onwarn(warning) {
      if (/is not under 'rootDir'/.test(warning.message)) {
        return
      }

      console.error(warning)
    },
  },
  {
    input: 'src/react/useLocalSyncState.ts',
    output: [
      {
        file: pkg.exports['./react'].require,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ rootDir: './src/react', exclude: ['useLocalSyncState.test.tsx'], declaration: false })],
    external: ['react', 'react-dom', '../localSyncState.js'],
    onwarn(warning) {
      if (/is not under 'rootDir'/.test(warning.message)) {
        return
      }

      console.error(warning)
    },
  },
]
