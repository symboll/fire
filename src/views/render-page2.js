const arr = [{ name: '张三', id: 1 }, { name: '李四', id: 2 }]
const handleClick = event => {
  event.stopPropagation()
  console.log(event)
}
const getArray = (h) => {
  return arr.map(item => h('li', {
    on: {
      'click': handleClick
    },
    key: item.id
  }, item.name))
}

export default {
  render: h => h('div', [
    h('ul', {
      on: {
        'click': handleClick
      }
    }, [
      getArray(h)
    ])
  ])
}
