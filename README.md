# Workflow frontend

## Local development

* Clone [frinx-workflow-ui](https://github.com/FRINXio/frinx-workflow-ui)

* Change `webpack.config.js`
```
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    ...
    proxy: {
      '/': {
        target: 'http://fb-test.localtest.me:5000',
        secure: false
      }
    }
  },
  output: {
    publicPath: '/workflow/frontend/',
  },
```

Note that the setting above references tenant `fb-test`.

* Change `src/index.js`
Constants are taken from this project's `src/index.js`
```javascript
const conductorApiUrlPrefix = "/workflow/proxy";
const frontendUrlPrefix = "/workflow/frontend";
const enableScheduling = true;
const disabledTasks = ['lambda'];
const prefixHttpTask = 'GLOBAL___';
```

* Start local server on port 3000
```sh
npm run start
```

* Navigate to http://fb-test.localtest.me:3000/workflow/frontend/defs
