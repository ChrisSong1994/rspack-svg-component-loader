// reference https://github.com/jpkleemans/vite-svg-loader
const { compileTemplate } = require("vue/compiler-sfc");
const { optimize: optimizeSvg } = require("svgo");

module.exports = function svgComponentLoader(source) {
  const resourceQuery = this.resourceQuery;
  const resourcePath = this.resourcePath;
  const options = this.getOptions();

  if (resourceQuery === "?component") {
    const { svgoConfig = {} } = options;

    let svg = optimizeSvg(source, {
      ...svgoConfig,
      path: resourcePath,
    }).data;

    // To prevent compileTemplate from removing the style tag
    svg = svg
      .replace(/<style/g, '<component is="style"')
      .replace(/<\/style/g, "</component");

    const { code } = compileTemplate({
      id: JSON.stringify(resourcePath),
      source: svg,
      filename: resourcePath,
      transformAssetUrls: false,
    });
    const content = `${code}\nexport default { render: render }`;
    callback = this.async();
    return callback(null, content, options.sourceMap);
  } else {
    return source;
  }
};
