module.exports = {
  extends: '@poool/eslint-config-react',
  rules: {
    'react/react-in-jsx-scope': 0,
  },
  overrides: [{
    files: ['src/**/*.test.js'],
    env: {
      jest: true,
    },
  }, {
    files: ['src/**/*.{ts,tsx}'],
    extends: ['plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    globals: {
      JSX: 'readonly',
      React: 'readonly',
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      'max-len': [1, {
        ignoreComments: true,
      }],
      'no-use-before-define': 0,
    },
  }],
};
