# rspack-svg-loader

a rspack loader for load svg as react/vue component

## Install

```bash
npm i rspack-svg-loader --save-dev
```

## Usage

### for vue

```javascript
const rspack = require('@rspack/core');

export default defineConfig({
 module: {
 {
        test: /\.svg$/,
        loader: "rspack-svg-loader/vue",
        options: {
          svgoConfig: {},
        },
      },
 }})
```

### for react

```javascript
const rspack = require('@rspack/core');

export default defineConfig({
 module: {
 {
        test: /\.svg$/,
        loader: "rspack-svg-loader/react",
        options: {
          svgoConfig: {},
        },
      },
 }})
```
