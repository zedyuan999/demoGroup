<template>
  <div class="table1">
    <table>
      <thead>
        <th class="td1">序号</th>
        <th class="td2">组件</th>
        <th class="td3">零件名称</th>
        <th class="td4">材质级别</th>
        <th class="td5">计量数据</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in  parseList(data.list)" :key="index">
          <td class="td1">{{index+1}}</td>
          <td class="td2" v-if="item.col>0" :rowspan="item.col>1?item.col:1">{{item.component}}</td>
          <td class="td3">{{item.level}}</td>
          <td class="td4">{{item.num}}</td>
          <td class="td5">{{item.num}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { reactive ,computed} from 'vue';
const data = reactive({
  list:[
    {
      component:'去玩儿',
      level:'下班下班下班下班下班下班下班下班',
      name:'名称',
      material:'aaa',
      num:1
    },{
      component:'去玩儿',
      level:'放假放假',
      name:'名称',
      material:'aaa',
      num:1
    },{
      component:'a',
      level:'1',
      name:'名称',
      material:'aaa',
      num:1
    },{
      component:'a',
      level:'1',
      name:'名称',
      material:'aaa',
      num:1
    },{
      component:'a',
      level:'1',
      name:'名称',
      material:'aaa',
      num:1
    },
  ]
})

const parseList =(list)=>{
  let continuous = 1
  const reverseList =  JSON.parse(JSON.stringify(list)).reverse().map((item,index,arr)=>{
    let col 
    if(index+1<arr.length){
      if(item.component === arr[index+1].component){
        continuous++;
        col = 0
      }else{
        col = continuous
        continuous = 1
      }
    }else{
      col = continuous
    }
    return {
      col,
      ...item
    }
  })
  console.log(reverseList);
  return reverseList.reverse()
}

const list = computed(()=>{
  let continuous = 1
  const reverseList =  JSON.parse(JSON.stringify(data.list)).reverse().map((item,index,arr)=>{
    let col 
    if(index+1<arr.length){
      if(item.component === arr[index+1].component){
        continuous++;
        col = 0
      }else{
        col = continuous
        continuous = 1
      }
    }else{
      col = continuous
    }
    return {
      col,
      ...item
    }
  })
  console.log(reverseList);
  return reverseList.reverse()
})
</script>

<style lang="less">
.table1{
  border: 0.5px solid #327AF2;
  border-radius:2px;
  display: inline-block;
  overflow: hidden;
  width: 335px;
}
table{
  border-collapse: collapse;
}
th,td{
  padding: 7px;
  font-size: 12px;
  &:not(:last-child){
    border-right: 0.5px solid #327AF2;
  }
}
.td1{
    width: 12.54%
  }
  .td2{
    width: 17.87%;
    text-align: left;
  }
  .td3{
    width: 27.2%;
    text-align: left;
  }
  .td4{
    width: 17.91%;
  }
  .td5{
    width:17.91%;
  }
td{
  border-top:0.5px solid #327AF2;

}
tr:first-child >td {
  border-top: 0;
}
thead{
  background-color: #E0EBFD;
}

</style>