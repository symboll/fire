export default {
  functional: true,
  props: {
    name: String,
    render: Function
  },
  render: (h, ctx) => {
    return ctx.props.render(h, ctx.props.name)
  }
}
