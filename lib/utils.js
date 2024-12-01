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

module.exports = {
  convertFileName2ComponentName,
  parseResourceQuery,
  calcOptions,
};
