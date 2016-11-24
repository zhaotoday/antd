import 'kindeditor'

/**
 * 添加插入图片插件
 * @param cb {function} 回调
 */
export const addImageInsertPlugin = (cb) => {
  // 自定义插入图片插件
  KindEditor.lang({
    'imgUpload': '插入图片'
  })

  KindEditor.plugin('imageInsert', function (K) {
    this.clickToolbar('imageInsert', cb)
  })
}