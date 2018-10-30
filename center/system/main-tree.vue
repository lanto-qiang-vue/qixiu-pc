<template>
<div class="main-tree">
  <table>
    <thead>
      <tr><th style="width:30%;">功能名称</th><th style="width:40%;">功能权限</th><th style="width:30%;">操作</th></tr>
    </thead>
  </table>
  <div>
    <auth-tree :expand="item.expand" v-for="item  in treeData" :level="1"  :text="item.name"
               :funcId="item.id" :data="item.children" :checked="item.selected"
               :funcButton="item.functions" :key="'role-'+item.id"
               @unfoldId="unfoldId" @pushButtonId="pushButtonId" @changeMenu="changeMenu"
               @checkTrue="checkTrue" @checkFalse="checkFalse" @pushIds="pushIds"
               @spliceId="spliceId"
                >
      <Button @click="expandAll"  size="small"  slot="level1">{{expandName}}</Button>
    </auth-tree>
  </div>

</div>
</template>

<script>
import { deepClone } from '~/static/util.js'
import AuthTree from './auth-tree'
export default {
  name: "main-tree",
  components: {AuthTree},
  props: ['data', 'title'],
  data(){
    return{
      treeData: [],
      expandName: '展开全部',
      expandType: true,
    }
  },
  watch:{
    data(arr){
      let data= []
      if(arr.length>1){
        data= [{
          "id": -1,
          "name": this.title,
          "selected":false,
          "leaf": false,
          "expand": true,
          children: this.initExpand(deepClone(arr))
        }]
      }else data= this.initExpand(deepClone(arr))
      this.treeData= this.calcParent(data)
    },
  },
  methods:{
    initExpand(arr){
      let newArr= arr
      for(let i in newArr){
        newArr[i].expand= false
        newArr[i].children= this.initExpand(newArr[i].children)
      }
      return newArr
    },
    expandAll() {
      let data = this.changAll(this.treeData, this.expandType);
      this.treeData = data;
      if (this.expandType) {
        this.expandType = !this.expandType;
        this.expandName = "收起全部";
      } else {
        this.expandType = !this.expandType;
        this.expandName = "展开全部";
      }
    },
    changAll(data, type) {
      for (let i in data) {
        data[i].expand = type;
        if ((data[i].children&& data[i].children.length)) {
          this.changAll(data[i].children, type);
        }
      }
      return data;
    },
    changeMenu(type, id){

      this.treeData= this.clearFun(this.calcParent(this.calcMenu(this.treeData, type, id)))

      this.$emit('change', this.treeData);
    },
    calcMenu(list, type, id){
      let arr=[], obj=null;
      for (let i in list) {
        obj= list[i]
        if(obj.id== id){
          obj.selected= type
          if(obj.children && obj.children.length){
            obj.children= this.calcChildren(obj.children, type)
          }
        }else{
          if(obj.children && obj.children.length){
            obj.children= this.calcMenu(obj.children, type, id)
          }
        }
        arr.push(obj)
      }
      return arr
    },
    calcChildren(list, type){
      let arr=[], obj=null;
      for (let i in list) {
        obj= list[i]
        obj.selected= type
        if(obj.children && obj.children.length){
          obj.children= this.calcChildren(obj.children, type)
        }
        arr.push(obj)
      }
      return arr
    },
    calcParent(list){
      let arr=[], obj=null;
      for (let i in list) {
        obj= list[i]
        obj.selected= this.calcChildrenSelect(list[i])
        if(obj.children && obj.children.length){
          obj.children= this.calcParent(obj.children)
        }
        arr.push(obj)
      }
      return arr
    },
    calcChildrenSelect(parent){
      let arr=[], flag= false;
      if(parent.children && parent.children.length){
        arr= parent.children
        for (let i in arr) {
          if(arr[i].selected){
            flag= true
            break
          }
          flag= this.calcChildrenSelect(arr[i])
        }
        return flag
      }
      return parent.selected
    },
    clearFun(list){
      let arr=[], obj=null;
      for (let i in list) {
        obj= list[i]
        if(!obj.selected){
          for(let j in obj.functions){
            obj.functions[j].selected= false
          }
        }
        if(obj.children && obj.children.length){
          obj.children= this.clearFun(obj.children)
        }
        arr.push(obj)
      }
      return arr
    },
    checkTrue(id) {
      let data = this.setTrue(this.treeData, id);
      this.treeData = data;
    },
    setTrue(data, id) {
      for (let i in data) {
        let flag = (data[i].children&& data[i].children.length) ? true : false;
        if (data[i].id == id) {
          data[i].selected = true;
          if (flag) this.setAll(data[i].children, true)
        } else {
          if (flag) this.setTrue(data[i].children, id);
        }
      }
      return data;
    },
    checkFalse(id) {
      let data = this.setFalse(this.treeData, id);
      this.treeData = data;
    },
    setFalse(data, id) {
      for (let i in data) {
        let flag = (data[i].children&& data[i].children.length) ? true : false;
        if (data[i].id == id) {
          data[i].selected = false;
          if (flag) this.setAll(data[i].children, false)
        } else {
          if (flag) this.setFalse(data[i].children, id);
        }
      }
      return data;
    },
    setAll(data, type) {
      for (let i in data) {
        data[i].selected = type;
        let flag = (data[i].children&& data[i].children.length) ? true : false;
        if (flag) this.setAll(data[i].children, type);
      }
    },
    pushIds(data) {
      // console.log(data);
      let mydata = this.findId(this.treeData, data);
      this.treeData = mydata;
    },
    spliceId(data) {
      // console.log(data);
      // let data = this.spliceId(data);
      let mydata = this.spliceFunction(this.treeData, data);
    },
    spliceFunction(data, ids) {
      for (let i in data) {
        let flag = data[i].children;
        if (data[i].id == ids[0]) {
          // alert(1);
          this.spliceCount(data[i]);
          ids.splice(0, 1);
          this.spliceFunction(this.treeData, ids);
          // }
        } else {
          // if(flag)
          this.spliceFunction(data[i].children, ids)
        }
      }
      return data;
    },
    spliceCount(data) {
      let flag = false;
      for (let i in data.children) {
        if (data.children[i].selected == true) {
          flag = true;
        }
      }
      if (!flag) data.selected = false;
    },
    findId(data, ids) {
      for (let i in data) {
        let flag = (data[i].children&& data[i].children.length) ? true : false;
        if (data[i].id == ids[0]) {
          data[i].selected = true;
          ids.splice(0, 1);
          if (flag) this.findId(data[i].children, ids);
        } else {
          if (flag) this.findId(data[i].children, ids);
        }
      }
      return data;
    },
    pushButtonId(row) {
      let pid = row.funcId;
      let BTN_ID = row.buttonId;
      let data = this.findParent(this.treeData, pid, BTN_ID);
      this.treeData = data;
      this.$emit('change', this.treeData);
    },
    findParent(data, pid, BTN_ID) {
      for (let i in data) {
        let flag = (data[i].children&& data[i].children.length) ? true : false;
        if (data[i].id == pid) {
          this.setButton(data[i].functions, BTN_ID);
          return data;
          break;
        } else {
          if (flag) this.findParent(data[i].children, pid, BTN_ID);
        }
      }
      return data;
    },
    setButton(data, BTN_ID) {
      for (let i in data) {
        if (data[i].id == BTN_ID) {
          // switch (data[i].IS_CHECK) {
          //   case 0:
          //     data[i].IS_CHECK = 1;
          //     break;
          //   case 1:
          //     data[i].IS_CHECK = 0;
          //     break;
          // }
          data[i].selected= !data[i].selected
        }
      }
      return data;
    },
    unfoldId(id) {
      let data = this.getSon(this.treeData, id);
      this.treeData = data;
      // console.log(this.treeData)
    },
    getSon(data, id) {
      for (let i in data) {
        if (data[i].id == id) {
          // console.log(id)
          data[i].expand = !data[i].expand;
        } else {
          if ((data[i].children&& data[i].children.length)) {
            this.getSon(data[i].children, id);
          }
        }
      }
      return data;
    },
  }
}
</script>

<style scoped lang="less">
.main-tree {
  margin-top: 10px;
  table{
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid;
    border-collapse: collapse;
    th {
      border: 1px solid;
      line-height: 30px;
    }
  }
}
</style>
