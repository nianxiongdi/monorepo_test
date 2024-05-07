module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "shippedProposals": true
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "@babel/transform-runtime",
      {
        "corejs": 3,
        "version": "^7.10.4"
      }
    ],
    "@mpxjs/babel-plugin-inject-page-events"
  ],
  "sourceType": "unambiguous",
  "env": {
    "test": {
      "presets": [
        [
          "@babel/env",
          {
            "shippedProposals": true
          }
        ]
      ]
    }
  }
}
