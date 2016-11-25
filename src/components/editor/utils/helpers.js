import 'kindeditor'

/**
 * 重写插入图片插件
 * @param cb {function} 回调
 */
export const overrideImagePlugin = (cb) => {
  KindEditor.plugin('image', function (K) {
    this.plugin.image = {
      edit: () => {
        cb()
      },
      delete: () => {
        let target = this.plugin.getSelectedImage()

        if (target.parent().name == 'a') {
          target = target.parent()
        }

        target.remove()

        // [IE] 删除图片后立即点击图片按钮出错
        this.addBookmark()
      }
    }

    this.clickToolbar('image', this.plugin.image.edit)
  })
}