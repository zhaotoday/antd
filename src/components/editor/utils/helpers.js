import 'kindeditor'

/**
 * 添加插入图片插件
 * @param cb {function} 回调
 */
export const addImgUploadPlugin = (cb) => {
  // 自定义插入图片插件
  KindEditor.lang({
    'imgUpload': '插入图片'
  })

  KindEditor.plugin('imgUpload', function (K) {
    this.clickToolbar('imgUpload', cb)
  })
}