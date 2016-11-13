import React from 'react'
import { Tree } from 'antd'
import * as render from './utils/render'
import * as helpers from './utils/helpers'

export default class extends React.Component {
  state = {
    treeNodes: [
      {
        name: 'node 0',
        key: '0',
        children: [
          {
            name: 'node 0 0',
            key: '0-0',
            children: [
              {
                name: 'node 0 0 0',
                key: '0-0-0'
              },
              {
                name: 'node 0 0 1',
                key: '0-0-1'
              }
            ]
          },
          {
            name: 'node 0 1',
            key: '0-1',
            isLeaf: true
          }
        ]
      }
    ]
  }

  render() {
    const { treeNodes } = this.state

    return <Tree showLine checkable draggable defaultExpandAll
      onCheck={this._handleCheck}
      onSelect={this._handleSelect}
      onDragEnter={this._handleDragEnter}
      onDrop={this._handleDrop}>
      {
        render.treeNodes(treeNodes)
      }
    </Tree>
  }

  /**
   * 选中复选框
   */
  _handleCheck = () => {
  }

  /**
   * 选中节点
   */
  _handleSelect = () => {

  }

  _handleDragEnter = () => {

  }

  _handleDrop = (info) => {
    console.log(info)
    const dragKey = info.dragNode.props.eventKey;
    const dropKey = info.node.props.eventKey;
    console.log(dropKey, dragKey)
    console.log(helpers.getItemByKey(this.state.treeNodes, dragKey, dropKey))
    console.log(this.state.treeNodes)

  }
}