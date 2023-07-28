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
  }],
};
