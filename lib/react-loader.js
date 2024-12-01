const { transform } = require("@svgr/core");
const { transformSync, createConfigItem } = require("@babel/core");
const presetReact = require("@babel/preset-react");
const presetEnv = require("@babel/preset-env");
const pluginTransformReactConstantElements = require("@babel/plugin-transform-react-constant-elements");
const { calcOptions } = require("./utils.js");

module.exports = function svgComponentLoader(source) {
  const resourceQuery = this.resourceQuery;
  const options = this.getOptions();
  const { component, svgoConfig, namedExport } = calcOptions(
    resourceQuery,
    options
  );

  if (component) {
    const babelOptions = {
      babelrc: false,
      configFile: false,
      presets: [
        createConfigItem(presetReact, { type: "preset" }),
        createConfigItem([presetEnv, { modules: false }], { type: "preset" }),
      ],
      plugins: [createConfigItem(pluginTransformReactConstantElements)],
    };

    const jsCode = transform.sync(
      source,
      {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig,
      },
      { componentName: namedExport }
    );

    const content = transformSync(jsCode, babelOptions);

    callback = this.async();
    return callback(null, content.code);
  }

  return source;
};
