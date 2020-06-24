/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *

 * @format
 */

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
          chrome: "58",
        },
        corejs: 3,
        useBuiltIns: "entry",
      },
    ],
  ],
  plugins: [],
  env: {
    test: {
      sourceMaps: "both",
    },
  },
};
