module.exports = function(h, that) {
    var innerNoResults = that.display("noResults");
    if (that.count==0)
   return <tr class="VueTables__no-results">
  <td class="text-center"
  colspan={that.allColumns.length}
  domPropsInnerHTML={innerNoResults}>
  </td>
  </tr>
}
