module.exports = {
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'cypress'],
  root: true,
};
