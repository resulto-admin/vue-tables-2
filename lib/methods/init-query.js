module.exports = function() {

  var init = this.opts.initFilters;

  if (!this.opts.filterByColumn)
    return init.hasOwnProperty('GENERIC')?init.GENERIC:'';

  var query = {};

  var filterable = this.opts.filterable && typeof this.opts.filterable=='object'?
                   this.opts.filterable:
                   this.columns;

  var that = this;

  filterable.forEach(function(column) {
     query[column] = getInitialValue(init, column, that);
    }.bind(this));

  return query;
}

function getInitialValue(init, column, that) {
  if (!init.hasOwnProperty(column)) return '';

  if (typeof init[column].start == 'undefined') return init[column];

  return {
    start: init[column].start.format(that.opts.dateFormat),
    end: init[column].end.format(that.opts.dateFormat)
  }

}
