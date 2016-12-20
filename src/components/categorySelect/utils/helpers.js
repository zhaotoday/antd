export default {
  /**
   * 转 treeData 数据
   * @param data {array} 待转化数据
   * @returns {array}
   */
  toTreeData(data) {
    return data.map((item) => {
      return {
        id: item.id,
        pid: item.pid,
        value: item.id,
        label: item.title
      }
    })
  },

  /**
   * 判断 ID 对应分类是否在存在
   * @param id {string} ID
   * @param array {array} 数组
   */
  exist(id, array) {
    const len = array.length

    for (let i = 0; i < len; i++) {
      if (array[i].id === id) {
        return true
      }
    }

    return false
  }
}
