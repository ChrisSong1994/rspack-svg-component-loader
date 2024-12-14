# rspack-svg-loader

a rspack loader for load svg as react/vue component

## Install

```bash
npm i rspack-svg-loader --save-dev
```

## Usage

** BEFORE: you should set vue version >= 3.2.13 or react version >= 17 **

you can use it in rspack.config.js
**for vue**

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

**for react**

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

then you can import svg as react/vue component

**for react**

```javascript
import ReactLogoIcon from "./assets/react.svg?component";

function App() {
  return (
    <div className="App">
      <ReactLogoIcon className="logo" />
    </div>
  );
}
```

**for vue**

```vue
<script setup>
import VueLogoIcon from "./assets/vue.svg?component&namedExport=VueIcon";
</script>
<template>
  <div>
    <VueLogoIcon class="logo" />
  </div>
</template>

<style scoped>

```

## Options

### svgoConfig

you can config svgo options in svgoConfig

### namedExport

you can set namedExport to change the export name, adnd you can use it in vue/React devTools
