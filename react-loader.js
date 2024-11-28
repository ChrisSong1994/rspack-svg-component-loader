const fs = require("fs").promises;
const { parse } = require("svg-parser");
const { optimize: optimizeSvg } = require("svgo");

module.exports = function svgComponentLoader(source) {
  const resourceQuery = this.resourceQuery;
  const resourcePath = this.resourcePath;
  const options = this.getOptions();

  if (resourceQuery === "?component") {
    const { svgoConfig = {} } = options;

    const svg = optimizeSvg(source, {
      ...svgoConfig,
      path: resourcePath,
    }).data;
  }
  return source;
};
