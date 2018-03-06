'use strict';

var debounce = require('debounce');

module.exports = function (h) {

<<<<<<< HEAD
      var search = that.source == 'client' ? that.search.bind(that, that.data) : that.serverSearch.bind(that);

      return function (column) {
            return h(
                  'input',
                  {
                        on: {
                              'keyup': debounce(search, that.opts.debounce)
                        },

                        'class': 'form-control',
                        attrs: { name: 'vf__' + column,
                              type: 'text',
                              placeholder: that.display('filterBy', { column: that.getHeading(column) })
                        },
                        domProps: {
                              'value': that.query[column]
                        }
                  },
                  []
            );
      };
=======
    var search = this.source == 'client' ? this.search.bind(this, this.data) : this.serverSearch.bind(this);

    return function (column) {
        return h(
            'input',
            {
                on: {
                    'keyup': debounce(search, this.opts.debounce)
                },

                'class': 'form-control',
                attrs: { name: 'vf__' + column,
                    type: 'text',
                    placeholder: this.display('filterBy', { column: this.getHeading(column) }),
                    value: this.query[column]
                }
            },
            []
        );
    };
>>>>>>> upstream/master
};