import 'kindeditor'

/**
 * 重写插入图片插件
 * @param onEdit {function} edit 事件
 */
export const overrideImagePlugin = (onEdit) => {
  KindEditor.plugin('image', function (K) {
    this.plugin.image = {
      edit: onEdit,
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