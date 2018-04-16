'use strict';

var debounce = require('debounce');

module.exports = function (h, inputClass) {
  var _this = this;

  var search = this.source == 'client' ? this.search.bind(this, this.data) : this.serverSearch.bind(this);

  var debouncedSearch = debounce(search, this.opts.debounce);

  var onKeyUp = function onKeyUp(e) {
    // XXX MODIFIED BY RESULTO (prevent TAB from triggering search)
    if (e.keyCode === 9) {
      return;
    }

    if (e.keyCode === 13) {
      debouncedSearch.clear();
      search.apply(undefined, arguments);
    } else {
      debouncedSearch.apply(undefined, arguments);
    }
  };

  var onKeyDown = function onKeyDown(e) {
    // XXX MODIFIED BY RESULTO (trigger search on TAB)
    if (e.keyCode === 9) {
      debouncedSearch.clear();
      search.apply(undefined, arguments);
    }
  };

  return function (column) {
    return h('input', {
      on: {
        'keyup': onKeyUp,
        'keydown': onKeyDown
      },

      'class': inputClass,
      attrs: { name: 'vf__' + column,
        type: 'text',
        placeholder: _this.display('filterBy', { column: _this.getHeading(column) })
      },
      domProps: {
        'value': _this.query[column]
      }
    });
  };
};