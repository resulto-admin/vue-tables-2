var merge = require('merge');

// XXX MODIFIED BY RESULTO (use range label when possible)
var getDateLabel = function(startDate, endDate, ranges, dateFormat) {
    var dateLabel = null;

    if (ranges) {
        for (var key in ranges) {
            if (ranges.hasOwnProperty(key)) {
                var dates = ranges[key];
                if (startDate.format(dateFormat) === dates[0].format(dateFormat)
                      && endDate.format(dateFormat) === dates[1].format(dateFormat)) {
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
var getSingleDateLabel = function(date, dateFormat) {
    return date.format(dateFormat);
};

module.exports = function() {

   if (typeof $==='undefined') {
    console.error('Date filters require jquery and daterangepicker');
    return;
  }

  var el;
  var that = this;
  var query = this.vuex ? JSON.parse(JSON.stringify(this.query)) : this.query;
  var columnOptions;

  var search = function(query, e) {
    return that.source == 'client'?that.search(that.data, e):that.serverSearch(query, e);
  }

  var datepickerOptions = merge.recursive(this.opts.datepickerOptions, {
    autoUpdateInput:false,
    locale: {
      format: this.opts.dateFormat
    }
  });

  // XXX MODIFIED BY RESULTO
  // Allow setting `singleDatePicker` from table options, default to false
  datepickerOptions.singleDatePicker = Boolean(datepickerOptions.singleDatePicker);
  if (datepickerOptions.singleDatePicker) {
    // Setting `timePicker` to false automatically configures the widget to use
    // a time range from 00:00 to 23:59
    datepickerOptions.timePicker = false;
  }

  // XXX MODIFIED BY RESULTO
  // Allow using a different date format for labels
  if (!that.opts.dateLabelFormat) {
    that.opts.dateLabelFormat = that.opts.dateFormat;
  }

  that.opts.dateColumns.forEach(function(column) {

    var range = that._getInitialDateRange(column); 

    if (range) {
      range = {
        startDate:range.start,
        endDate:range.end
      }

    } else {
      range = {};
    }
    

    el =  $(that.$el).find("#VueTables__" + column + "-filter");

    columnOptions = typeof that.opts.datepickerPerColumnOptions[column]!=='undefined'?
    that.opts.datepickerPerColumnOptions[column]:{};
    
    el.daterangepicker(merge(datepickerOptions, columnOptions, range));

    el.on('apply.daterangepicker', function(ev, picker) {

      query[column] = {
        start:picker.startDate.format(that.opts.dateFormat),
        end: picker.endDate.format(that.opts.dateFormat)
      };

      if (!that.vuex)
        that.query = query;

      // XXX MODIFIED BY RESULTO
      if (datepickerOptions.singleDatePicker) {
        $(this).text(getSingleDateLabel(picker.startDate, that.opts.dateLabelFormat));
      } else {
        $(this).text(getDateLabel(
          picker.startDate, picker.endDate, datepickerOptions.ranges, that.opts.dateLabelFormat));
      }

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
