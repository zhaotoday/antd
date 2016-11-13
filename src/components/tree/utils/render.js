import React from 'react'
import { Tree } from 'antd'

const TreeNode = Tree.TreeNode

/**
 * 获取树节点
 * @param data {object} 树数据
 */
export const treeNodes = (data) => {
  return data.map((item) => {
    if (item.children) {
      return <TreeNode title={item.name} key={item.key}>
        {treeNodes(item.children)}
      </TreeNode>
    }

    return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.disabled} />
  })
}