"use strict";

module.exports = function (h, that) {
  var perpageValues = [];

  that.opts.perPageValues.map(function (value) {
    var selected = that.limit == value;
    perpageValues.push(h(
      "option",
      {
        domProps: {
          "value": value,
          "selected": selected
        }
      },
      [value]
    ));
  });

  return perpageValues;
};