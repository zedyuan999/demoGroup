<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      cell-class-name="flex-box"
      :lazy="true"
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @current-change="currentChange"
      :row-class-name="tableRowClassName"
      @cell-click="cellClick"
      @header-click="headerClick"
    >
      <el-table-column prop="date" label="date" width="280">
        <template #default="scope">
          <!-- 要操作数据 -->
          <div v-if="scope.row.edit">
            <el-input v-model="scope.row.date" placeholder="请输入" />
          </div>
          <div v-else-if="!scope.row.edit">{{ scope.row.date }}</div>

          <el-popover trigger="hover" v-model="visible" placement="right-start" :width="100">
            <div>
              <div class="li">
                <el-button @click="appendOver(scope.row)" type="primary" size="default">添加到上面</el-button>
              </div>
              <div class="li">
                <el-button @click="appendUnder(scope.row)" type="primary" size="default">添加到下面</el-button>
              </div>
              <div class="li">
                <el-button @click="append(scope.row)" type="primary" size="default">插入子节点</el-button>
              </div>
              <div class="li">
                <el-button @click="remove(scope.row)" type="primary" size="default">删除当前行</el-button>
              </div>
            </div>

            <template #reference>
              <el-button class="flex-1" type="primary" :icon="Edit" circle></el-button>
            </template>
          </el-popover>
        </template>
        <template #header>
          <div data-keys="iio">时代峰峻</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="180">
        <template #default="scope">
          <el-input v-model="scope.row.name" placeholder="请输入" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from 'vue'
import { Edit } from "@element-plus/icons-vue";
interface Tree {
  id: number
  label?: string
  children?: Tree[]
  date: string
  name: string
  hasChildren?: boolean
}
const tableData = ref([
  {
    id: 1,
    date: "2016-05-02",
    name: "wangxiaohu",
  },
  {
    id: 2,
    date: "2016-05-04",
    name: "wangxiaohu",
    hasChildren: true,
  },
  {
    id: 3,
    date: "2016-05-01",
    name: "wangxiaohu",
    children: [
      {
        id: 31,
        date: "2016-05-01",
        name: "wangxiaohu",
      },
      {
        id: 32,
        date: "2016-05-01",
        name: "wangxiaohu",
      },
    ],
  },
  {
    id: 4,
    date: "2016-05-03",
    name: "wangxiaohu",
  },
])
const emptyTableItem = {
  id: 2,
  date: "",
  name: "",
  label: ""
}
let baseId = 1000
const load = (row, treeNode, resolve) => {
  // id 要不一样
  setTimeout(() => {
    resolve([
      {
        id: Math.random() * 100,
        date: "2016-05-012313",
        name: "wangxiaohu",
        hasChildren: true,
      },
    ]);
  }, 1000);
};
const visible = ref(false);
const add = () => {
  tableData.value.push({
    id: 1,
    date: "2016-05-02",
    name: "wangxiaohu",
  })
}
// 离开当前行时进行保存
const currentChange = (currentRow, oldCurrentRow) => {
  console.log(currentRow, oldCurrentRow);
  if (oldCurrentRow) {
    if (oldCurrentRow.edit === true) {
      oldCurrentRow.edit = false;
    }
  }
};
const tableRowClassName = ({ row, rowIndex }) => {
  console.log(row);
  if (rowIndex === 1) {
    return "warning-row";
  } else if (rowIndex === 2) {
    return "success-row";
  }
  return "";
};
// 点击单元格编辑
const cellClick = (row) => {
  console.log(row);
  row.edit = true;
};
const headerClick = (column, event) => {
  console.log(column, event.target.getAttribute('data-keys'))
}


const append = (data: Tree) => {
  const newChild = { ...emptyTableItem, id: baseId++ }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
}

const appendOver = (data: Tree) => {
  const newChild = { ...emptyTableItem, id: baseId++ }
  const parentList = findParent(data.id)
  const parent = parentList.length > 0 ? parentList.pop() : undefined
  const parentChildren = parent ? (parent.children as Tree[]) : tableData.value
  const index = parentChildren.findIndex(item => item.id === data.id)
  parentChildren.splice(index, 0, newChild)
}

const appendUnder = (data: Tree) => {
  const newChild = { ...emptyTableItem, id: baseId++ }
  const parentList = findParent(data.id)
  const parent = parentList.length > 0 ? parentList.pop() : undefined
  const parentChildren = parent ? (parent.children as Tree[]) : tableData.value
  const index = parentChildren.findIndex(item => item.id === data.id)
  parentChildren.splice(index + 1, 0, newChild)
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
  _getParentNodes([], id, tableData.value as any);
  return nodes;
}

const remove = (data: Tree) => {
  const parentList = findParent(data.id)
  const parentChildren = parentList.length > 0 ? ((parentList.pop() as Tree).children as Tree[]) : (tableData.value as Tree[])
  const index = (parentChildren as Tree[]).findIndex((item) => item.id === data.id)
  parentChildren.splice(index, 1)
}
</script>

<style>
.table {
  width: 100%;
  height: 100%;
}
.flex-box .cell {
  display: flex !important;
  align-items: center;
}
.flex-1 {
  width: 18px;
  height: 18px;
  margin-left: 10px;
}
.li {
  margin-bottom: 5px;
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-lighter);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-lighter);
}
</style>
