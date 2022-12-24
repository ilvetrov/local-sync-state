/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    '.(ts|tsx|js)': [
      'jest-chain-transform',
      {
        transformers: [['jest-remove-path-extension', ['.js']], ['ts-jest']],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testEnvironment: 'jsdom',
}
