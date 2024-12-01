// reference https://github.com/jpkleemans/vite-svg-loader
const { compileTemplate } = require("vue/compiler-sfc");
const { optimize } = require("svgo");
const { calcOptions } = require("./utils.js");

module.exports = function svgComponentLoader(source) {
  const resourceQuery = this.resourceQuery;
  const resourcePath = this.resourcePath;
  const options = this.getOptions();

  const { component, icon, svgoConfig, namedExport } = calcOptions(
    resourceQuery,
    options
  );

  if (component || icon) {
    let svg = optimize(source, {
      ...svgoConfig,
      path: resourcePath,
    }).data;

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

    callback = this.async();
    return callback(null, content);
  } else {
    return source;
  }
};
