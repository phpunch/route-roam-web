module.exports = {
  root: true,
  parser: '@typescript-eslint/parse',
  parserOptions: { "sourceType": "module", "ecmaVersion": 2017 },
  settings: {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "."],
      },
    },
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: ['airbnb-typescript'],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
