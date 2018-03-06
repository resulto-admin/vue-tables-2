'use strict';

module.exports = function (h) {

<<<<<<< HEAD
  return function (column) {
=======
      return function (column) {
            var _this = this;
>>>>>>> upstream/master

    var options = [];
    var selected = void 0;

<<<<<<< HEAD
    var search = that.source == 'client' ? that.search.bind(that, that.data) : that.serverSearch.bind(that);

    that.opts.listColumns[column].map(function (option) {
      selected = option.id == that.query[column] && that.query[column] !== '';
      options.push(h(
        'option',
        {
          domProps: {
            'value': option.id,
            'selected': selected
          }
        },
        [option.text]
      ));
    });

    return h(
      'div',
      { 'class': 'VueTables__list-filter',
        attrs: { id: 'VueTables__' + column + '-filter' }
      },
      [h(
        'select',
        { 'class': 'form-control',
          on: {
            'change': search
          },
          attrs: {
            name: 'vf__' + column
          },
          domProps: {
            'value': that.query[column]
          }
        },
        [h(
          'option',
          {
            attrs: { value: '' }
          },
          [that.display('defaultOption', { column: that.opts.headings[column] ? that.opts.headings[column] : column })]
        ), options]
      )]
    );
  };
=======
            var search = this.source == 'client' ? this.search.bind(this, this.data) : this.serverSearch.bind(this);

            var displayable = this.opts.listColumns[column].filter(function (item) {
                  return !item.hide;
            });

            displayable.map(function (option) {
                  selected = option.id == _this.query[column] && _this.query[column] !== '';
                  options.push(h(
                        'option',
                        {
                              domProps: {
                                    'value': option.id,
                                    'selected': selected
                              }
                        },
                        [option.text]
                  ));
            });

            return h(
                  'div',
                  { 'class': 'VueTables__list-filter',
                        attrs: { id: 'VueTables__' + column + '-filter' }
                  },
                  [h(
                        'select',
                        { 'class': 'form-control',
                              on: {
                                    'change': search
                              },
                              attrs: {
                                    name: 'vf__' + column
                              },
                              domProps: {
                                    'value': this.query[column]
                              }
                        },
                        [h(
                              'option',
                              {
                                    attrs: { value: '' }
                              },
                              [this.display('defaultOption', { column: this.opts.headings[column] ? this.opts.headings[column] : column })]
                        ), options]
                  )]
            );
      };
>>>>>>> upstream/master
};