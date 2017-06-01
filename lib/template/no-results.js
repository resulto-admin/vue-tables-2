module.exports = function(h, that) {
    var innerNoResults = that.display(that.loading?'loading':'noResults')
    if (that.count==0) {

      let colspan = that.allColumns.length;
      if (that.opts.childRow) colspan++;

   return <tr class="VueTables__no-results">
  <td class="text-center"
  colspan={colspan}
  domPropsInnerHTML={innerNoResults}>
  </td>
  </tr>
}
}
