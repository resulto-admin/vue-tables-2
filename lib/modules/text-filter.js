var debounce = require('debounce');

module.exports = function(h, inputClass) {

      var search = this.source=='client'?
            this.search.bind(this, this.data):
            this.serverSearch.bind(this);

      var debouncedSearch = debounce(search, this.opts.debounce);

      var onKeyUp = function (e) {
        // XXX MODIFIED BY RESULTO (prevent TAB key from triggering)
        if (e.keyCode === 9) {
            return;
        }

        if (e.keyCode === 13) {
          debouncedSearch.clear();
          search(...arguments);
        } else {
          debouncedSearch(...arguments);
        }
      };

      var onKeyDown = function (e) {
        // XXX MODIFIED BY RESULTO (trigger search on TAB)
        if (e.keyCode === 9) {
          debouncedSearch.clear();
          search(...arguments);
        }
      };

  return (column) => {
   return <input
   on-keyup={onKeyUp}
   on-keydown={onKeyDown}
   class={inputClass}
   name={'vf__' + column}
   type="text"
   placeholder={this.display('filterBy',{column:this.getHeading(column)})}
   value={this.query[column]}
   />
 }
}



