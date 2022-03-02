<template>
  <div class="custom-tree-container">
    <!-- <el-tree
      :data="dataSource"
      node-key="id"
      :expand-on-click-node="false"
      :auto-expand-parent="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a @click.stop="appendOver(data)">在上方插入</a>&nbsp;&nbsp;
            <a @click.stop="appendUnder(data)">在下方插入</a>&nbsp;&nbsp;
            <a @click.stop="append(data)">插入子节点</a>&nbsp;&nbsp;
            <a @click.stop="remove(node, data)">删除节点</a>
          </span>
        </span>
      </template>
    </el-tree>-->
    <!-- <el-tree
      :data="dataSource"
      show-checkbox
      node-key="id"
      
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a @click="append(data)">Append</a>
            <a @click="remove(node, data)">Delete</a>
          </span>
        </span>
      </template>
    </el-tree>-->
  </div>
  <MhTable />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import MhTable from './NewTable.vue'
interface Tree {
  id: number
  label: string
  children?: Tree[]
}
let id = 1000
const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
])

const expandAll = ref<boolean>(false)
const append = (data: Tree) => {
  expandAll.value = true
  const newChild = { id: id++, label: 'testtest', children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  expandAll.value = false
}

const appendOver = (data: Tree) => {
  expandAll.value = true
  const newChild = { id: id++, label: 'testtest', children: [] }
  const parentList = findParent(data.id)
  const parent = parentList.length > 0 ? parentList.pop() : undefined
  const parentChildren = parent ? (parent.children as Tree[]) : dataSource.value
  const index = parentChildren.findIndex(item => item.id === data.id)
  parentChildren.splice(index, 0, newChild)
  expandAll.value = false
}

const appendUnder = (data: Tree) => {
  expandAll.value = true
  const newChild = { id: id++, label: 'testtest', children: [] }
  const parentList = findParent(data.id)
  const parent = parentList.length > 0 ? parentList.pop() : undefined
  const parentChildren = parent ? (parent.children as Tree[]) : dataSource.value
  const index = parentChildren.findIndex(item => item.id === data.id)
  parentChildren.splice(index + 1, 0, newChild)
  expandAll.value = false
}

// 找父节点
const findParent = (id: number) => {
  let nodes: Tree[] = []
  const _getParentNodes = (his: Tree[], targetId: number, tree: Tree[]) => {
    tree.some((list) => {
      const children = list.children || [];
      if (list.id === targetId) {
        nodes = his;
        return true;
      } else if (children.length > 0) {
        const history = [...his];
        history.push(list);
        return _getParentNodes(history, targetId, children);
      }
    })
  }
  _getParentNodes([], id, dataSource.value);
  return nodes;
}

const remove = (node: Node, data: Tree) => {
  expandAll.value = true
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  dataSource.value = [...dataSource.value]
  expandAll.value = false
}


</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>