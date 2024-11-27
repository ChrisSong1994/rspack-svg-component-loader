module.exports = function svgComponentLoader(source) {
  console.log("source", source);
  console.log("this._compiler.options", this._compiler.options);
debugger
  return source;
};
