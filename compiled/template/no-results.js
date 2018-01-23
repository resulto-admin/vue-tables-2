'use strict';

// XXX MODIFIED BY RESULTO (added domPropsInnerHTML
module.exports = function (h, that) {
  var innerNoResults = that.display(that.loading ? 'loading' : 'noResults');
  if (that.count == 0) {

    var colspan = that.allColumns.length;
    if (that.hasChildRow) colspan++;

    return h(
      'tr',
      { 'class': 'VueTables__no-results' },
      [h(
        'td',
        { 'class': 'text-center',
          attrs: { colspan: colspan
          },
          domProps: {
            'innerHTML': innerNoResults
          }
        },
        []
      )]
    );
  }
};