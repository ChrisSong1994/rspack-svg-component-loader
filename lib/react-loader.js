const { transform } = require("@svgr/core");
const { transformSync, createConfigItem } = require("@babel/core");
const presetReact = require("@babel/preset-react");
const presetEnv = require("@babel/preset-env");
const pluginTransformReactConstantElements = require("@babel/plugin-transform-react-constant-elements");

module.exports = function svgComponentLoader(source) {
  const resourceQuery = this.resourceQuery;
  const resourcePath = this.resourcePath;
  const options = this.getOptions();

  if (resourceQuery === "?component") {
    const { svgoConfig = {} } = options;

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
      { componentName: "MyComponent" }
    );

    const content = transformSync(jsCode, babelOptions);

    callback = this.async();
    return callback(null, content.code, options.sourceMap);
  }

  return source;
};
