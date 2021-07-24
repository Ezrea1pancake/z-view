<script>

export default {
  name: 'SelfSlot',

  functional: true,

  inject: ['tableRoot'],

  props: {
    row: Object,
    column: Object,
    rowIndex: Number
  },

  render (h, ctx) {
    return h(
      'div',
      ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({
        row: ctx.props.row,
        column: ctx.props.column,
        rowIndex: ctx.props.rowIndex
      }))
  }

}

</script>
