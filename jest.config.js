module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    testMatch: ['**/*.test.{ts,tsx,js,jsx}'],
    setupFiles: ['<rootDir>/jest.polyfill.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(@babel/runtime|react|react-dom|next)/)'
    ],
    globals: {
      'ts-jest': {
        tsconfig: {
          jsx: 'react-jsx',
        },
      },
    },
  };