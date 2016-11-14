module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "installedESLint": true,
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "indent": [
      "error",
      2, {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "error", "unix"
    ],
    "quotes": [
      "error", "single"
    ],
    "semi": ["error", "never"]
  }
};;
