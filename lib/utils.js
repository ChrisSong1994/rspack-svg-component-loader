const convertFileName2ComponentName = function (fileName) {
  const arr = fileName.split("-");
  const name = arr
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return name;
};

const parseResourceQuery = function (query) {
  const params = new URLSearchParams(query);
  const paramsObj = {};
  for (const [key, value] of params) {
    paramsObj[key] = value || true;
  }
  return paramsObj;
};

const calcOptions = function (
  resourceQuery,
  options 
) {
  const queryObj = parseResourceQuery(resourceQuery);
  const namedExport = queryObj.namedExport || options.namedExport || "SvgComponent";
  const svgoConfig =  options.svgoConfig || {}
  return {
    ...queryObj,
    svgoConfig,
    namedExport ,
  };
};

const convertSvgStringToBase64 = function (svg) {
  const base64Svg = Buffer.from(svg, 'utf8').toString('base64');
  const base64Content = `data:image/svg+xml;base64,${base64Svg}`;
  return base64Content;
};

module.exports = {
  convertFileName2ComponentName,
  parseResourceQuery,
  calcOptions,
  convertSvgStringToBase64
};
