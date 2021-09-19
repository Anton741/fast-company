module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    plugins: ['react'],
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'double', { allowTemplateLiterals: true }],
      'comma-dangle': ['error', 'never'],
      semi: [2, 'always'],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'never' }],
      camelcase: ['error', { allow: ['user_id'] }],
      'react/prop-types': 'off'
    }
  }
}
