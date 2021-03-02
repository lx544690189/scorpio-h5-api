module.exports = {
  "extends": "./node_modules/mwts/",
  "ignorePatterns": [
    "node_modules",
    "dist",
    "test",
    "jest.config.js",
    "typings"
  ],
  "env": {
    "jest": true
  },
  "rules": {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
      }
    ]
  }
}