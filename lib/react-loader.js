const { transform } = require("@svgr/core");
const { optimize } = require("svgo");
const { transformSync, createConfigItem } = require("@babel/core");
const presetReact = require("@babel/preset-react");
const presetEnv = require("@babel/preset-env");
const pluginTransformReactConstantElements = require("@babel/plugin-transform-react-constant-elements");
const { calcOptions, convertSvgStringToBase64 } = require("./utils.js");

module.exports = function svgComponentLoader(source) {
  const resourceQuery = this.resourceQuery;
  const resourcePath = this.resourcePath;
  const options = this.getOptions();
  const callback = this.async();

  const { component, icon, svgoConfig, namedExport } = calcOptions(
    resourceQuery,
    options
  );

  let svg = optimize(source, {
    ...svgoConfig,
    path: resourcePath,
  }).data;

  if (component || icon) {
    const babelOptions = {
      babelrc: false,
      configFile: false,
      presets: [
        createConfigItem(presetReact, { type: "preset" }),
        createConfigItem([presetEnv, { modules: false }], { type: "preset" }),
      ],
      plugins: [createConfigItem(pluginTransformReactConstantElements)],
    };

    if (icon) {
      svg = svg.replace(
        /(width|height)="[\d.]+(px|cm|mm|in|pt|pc|%)?"/g,
        (_match, p1) => {
          return `${p1}="1em"`;
        }
      );
    }

    const jsCode = transform.sync(
      svg,
      {
        plugins: ["@svgr/plugin-jsx"],
      },
      { componentName: namedExport }
    );

    const content = transformSync(jsCode, babelOptions);

    return callback(null, content.code);
  } else {
    const base64 = convertSvgStringToBase64(svg);
    const content = `export default ${JSON.stringify(base64)}`;
    return callback(null, content, options.sourceMap);
  }
};
