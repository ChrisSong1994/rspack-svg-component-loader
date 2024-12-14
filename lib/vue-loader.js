// reference https://github.com/jpkleemans/vite-svg-loader
const { compileTemplate } = require("vue/compiler-sfc");
const { optimize } = require("svgo");
const { calcOptions, convertSvgStringToBase64 } = require("./utils.js");

module.exports = function svgComponentLoader(source) {
  const resourceQuery = this.resourceQuery;
  const resourcePath = this.resourcePath;
  const options = this.getOptions();
  callback = this.async();

  const { component, icon, svgoConfig, namedExport } = calcOptions(
    resourceQuery,
    options
  );

  let svg = optimize(source, {
    ...svgoConfig,
    path: resourcePath,
  }).data;

  if (component || icon) {
    svg = svg
      .replace(/<style/g, '<component is="style"')
      .replace(/<\/style/g, "</component");

    if (icon) {
      svg.replace(
        /(width|height)="[\d.]+(px|cm|mm|in|pt|pc|%)?"/g,
        (_match, p1) => {
          return `${p1}="1em"`;
        }
      );
    }

    const { code } = compileTemplate({
      id: JSON.stringify(resourcePath),
      source: svg,
      filename: resourcePath,
      transformAssetUrls: false,
    });
    const content = `${code}\nexport default {  name: \"${namedExport}\", render: render }`;
    return callback(null, content);
  } else {
    const base64 = convertSvgStringToBase64(svg);
    const content = `export default ${JSON.stringify(base64)}`;
    return callback(null, content, options.sourceMap);
  }
};
