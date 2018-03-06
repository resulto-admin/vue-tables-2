'use strict';

module.exports = function (page, preventRequest) {

  page = page ? page : this.$refs.page.value;

  // XXX MODIFIED BY RESULTO (Added check for undefined ref)
  if (this.$refs.pagination && !this.opts.pagination.dropdown) {
    this.$refs.pagination.Page = page;
  }

  this.page = page;

  this.updateState('page', page);

  if (this.source == 'server' && !preventRequest) this.getData();
};