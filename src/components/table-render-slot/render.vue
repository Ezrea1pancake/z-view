<script>

export default {
  name: 'render',

  functional: true,

  props: {
    row: Object,
    column: Object,
    rowIndex: Number,
    render: Function
  },

  render (h, ctx) {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      rowIndex: ctx.props.rowIndex
    }
    return ctx.props.render(h, params)
  }

}

</script>
