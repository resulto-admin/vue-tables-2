var merge = require('merge');

var getDateLabel = function(startDate, endDate, ranges, dateFormat) {
    var dateLabel = null;

    if (ranges) {
        for (var key in ranges) {
            if (ranges.hasOwnProperty(key)) {
                var dates = ranges[key];
                if (startDate.isSame(dates[0]) && endDate.isSame(dates[1])) {
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

  var el;
  var search = function() {
    return that.source=='client'?
    that.search(that.data):
    that.serverSearch();
  };

  var datepickerOptions = merge.recursive(this.opts.datepickerOptions, {
    autoUpdateInput:false,
    singleDatePicker:false,
    locale: {
      format: this.opts.dateFormat
    }
  });

  var that = this;

    that.opts.dateColumns.forEach(function(column) {
     el =  $(that.$el).find("#VueTables__" + column + "-filter");

     el.daterangepicker(datepickerOptions);
     el.on('apply.daterangepicker', function(ev, picker) {

      that.query[column] = {
        start:picker.startDate.format(that.opts.dateFormat),
        end: picker.endDate.format(that.opts.dateFormat)
      };
      $(this).text(
          getDateLabel(
              picker.startDate, picker.endDate, datepickerOptions.ranges, that.opts.dateFormat));

      search();
    });

     el.on('cancel.daterangepicker', function(ev, picker) {
      that.query[column] = '';
      $(this).html("<span class='VueTables__filter-placeholder'>" + that.display('filterBy',{column:that.getHeading(column)}) + "</span>");

      search();
      });

   });


}
