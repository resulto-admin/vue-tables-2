var merge = require('merge');

var getDateLabel = function(startDate, endDate, ranges, dateFormat) {
    var dateLabel = null;

    if (ranges) {
        for (var key in ranges) {
            if (ranges.hasOwnProperty(key)) {
                var dates = ranges[key];
                if (startDate.format(dateFormat) === dates[0].format(dateFormat) && endDate.format(dateFormat) === dates[1].format(dateFormat)) {
                    dateLabel = key;
                }
            }
        }
    }

    if (!dateLabel) {
        dateLabel = startDate.format(dateFormat) + " - " + endDate.format(dateFormat);
    }

    return dateLabel;
};

module.exports = function() {

   if (typeof $==='undefined') {
    console.error('Date filters require jquery and daterangepicker');
    return;
  }

  var el;
  var that = this;
  var query = this.vuex ? JSON.parse(JSON.stringify(this.query)) : this.query;

  var search = function(query, e) {
    return that.source == 'client'?that.search(that.data, e):that.serverSearch(query, e);
  }

  var datepickerOptions = merge.recursive(this.opts.datepickerOptions, {
    autoUpdateInput:false,
    singleDatePicker:false,
    locale: {
      format: this.opts.dateFormat
    }
  });


  that.opts.dateColumns.forEach(function(column) {

    el =  $(that.$el).find("#VueTables__" + column + "-filter");
    el.daterangepicker(datepickerOptions);

    el.on('apply.daterangepicker', function(ev, picker) {

      query[column] = {
        start:picker.startDate.format(that.opts.dateFormat),
        end: picker.endDate.format(that.opts.dateFormat)
      };

      if (!that.vuex)
        that.query = query;

      $(this).text(getDateLabel(
        picker.startDate, picker.endDate, datepickerOptions.ranges, that.opts.dateFormat));

      that.updateState('query', query);

      search(query, {target:{name:'vf__' + column, value:query[column]}});

    });

    el.on('cancel.daterangepicker', function(ev, picker) {

        query[column] = '';

      if (!that.vuex)
        that.query = query;

        picker.setStartDate(moment());
        picker.setEndDate(moment());

      that.updateState('query', query);

      $(this).html("<span class='VueTables__filter-placeholder'>" + that.display('filterBy',{column:that.getHeading(column)}) + "</span>");

      search(query, {target:{name:'vf__' + column, value:query[column]}});
    });

  });

}
