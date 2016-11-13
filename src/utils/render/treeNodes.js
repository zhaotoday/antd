import { Tree } from 'antd'

TreeNode = Tree.TreeNode

/**
 * 获取树节点
 * @param data {object} 树数据
 */
export const treeNodes = (data) => {
  data.map((item) => {
    if (item.children) {
      return <TreeNode title={item.name} key={item.key}>
        {loop(item.children)}
      </TreeNode>
    }

    return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />
  })
}