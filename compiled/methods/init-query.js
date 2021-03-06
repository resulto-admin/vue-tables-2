'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function () {

  var init = this.opts.initFilters;

  if (!this.opts.filterByColumn) return init.hasOwnProperty('GENERIC') ? init.GENERIC : '';

  var query = {};

  var filterable = this.opts.filterable && _typeof(this.opts.filterable) == 'object' ? this.opts.filterable : this.columns;

  var that = this;

  filterable.forEach(function (column) {
    query[column] = getInitialValue(init, column, that);
  }.bind(this));

  return query;
};

function getInitialValue(init, column, that) {
  if (!init.hasOwnProperty(column)) return '';

  if (typeof init[column].start == 'undefined') return init[column];

  return {
    start: init[column].start.format(that.opts.dateFormat),
    end: init[column].end.format(that.opts.dateFormat)
  };
}