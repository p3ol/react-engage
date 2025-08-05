import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  fakeTimers: {
    enableGlobally: false,
  },
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
  ],
  transform: {
    '^.+\\.[j|t]sx?$': ['@swc/jest', {
      jsc: {
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
      },
    }],
  },
  moduleNameMapper: {
    '^~(.+)': '<rootDir>/$1',
  },
};

export default config;
