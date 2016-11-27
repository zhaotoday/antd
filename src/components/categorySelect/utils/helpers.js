/**
 * 转 treeData 数据
 * @param data {array} 待转化数据
 * @returns {array}
 */
export const toTreeData = (data) => {
  return data.map((item) => {
    return {
      id: item.id,
      pid: item.pid,
      value: item.id,
      label: item.title
    }
  })
}