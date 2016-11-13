/**
 * 按 key 筛选
 * @param items {array} 待筛选数组
 * @param key {key} 键值
 */
export const getItemByKey = (items, from, to) => {
  let dragItem = {}

  return items.map((item, index) => {
    if (item.key === to) {
      if (item.children) {
        item.children.push(dragItem)
      } else {
        item.children = [dragItem]
      }
    }

    if (item.key === from) {
      
    }

    return item
  })
}

