module.exports = function(h, that) {
  var perpageValues = [];

  // XXX MODIFIED BY RESULTO (always show per page even if len(results)=0)
  that.opts.perPageValues.map(function(value) {
    var selected = that.limit==value;
    perpageValues.push(<option value={value} selected={selected}>{value}</option>)
  });

  return perpageValues;

}
