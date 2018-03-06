module.exports = function(h) {
  
  return (perpageValues, cls, id) => {
       
    // XXX MODIFIED BY RESULTO (always show per page limit dropdown)
    return <select class={cls}
    name="limit"
    value={this.limit}
    on-change={this.setLimit.bind(this)}
    id={id}
    >
    {perpageValues}
    </select>;
  }
  
}
