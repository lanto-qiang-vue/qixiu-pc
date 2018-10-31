<template>
  <Modal
    v-model="showModal"
    title="授权"
    width="70"
    @on-visible-change="visibleChange"
    :footer-hide="false"
    class="table-modal-detail"
    :mask-closable="false"
    :transition-names="['', '']"
  >
    <Table :columns="columns" :data="tableData"></Table>
    <main-tree title="菜单列表" :data="roleData" @change="roleChange"></main-tree>
    <div slot="footer">
      <Button @click="showModal=false">取消</Button>
      <Button type="primary" @click="save()">保存</Button>
    </div>
  </Modal>
</template>

<script>
  // import { deepClone } from '~/static/util.js'
import MainTree from './main-tree'
export default {
  name: "role-assign",
  components: { MainTree},
  props: ['columns', 'selectRow', 'show'],
  data(){

    return{
      showModal: false,
      roleData: [],
      resRole: []
    }
  },
  computed:{
    tableData(){
      return (this.selectRow&& this.selectRow.id)? new Array(this.selectRow) : []
    }
  },
  watch:{
    show(){
      this.showModal= true
      this.getRoleAuth()
    }
  },
  mounted(){
    // console.log(new Array(this.selectRow||{}))
  },
  methods:{
    visibleChange(status){
      // if(status === false){
      //   this.$refs.form.resetFields();
      // }
    },
    roleChange(role){
      console.log(role)
      this.resRole= role
    },
    save(){
      let arr= this.calcRole(this.resRole, true)
      console.log( arr)
      this.$Modal.confirm({
        title: '确定保存权限吗？',
        onOk: ()=> {
          this.$axios.$post('/role/assign/'+ this.selectRow.id, arr).then( (res) => {
            if(res.code== '0'){
              this.$Message.success('保存成功')
              this.$emit('refresh');
              this.showModal= false
            }
          })
        }
      })

    },
    calcRole(list, hasKey){
      let arr=[], obj= {}
      for (let i in list){
        if(list[i].selected){
          if(list[i].id> 0){
            if(hasKey){
              obj= { id: list[i].id}
              if(list[i].functions){
                obj.functionIds= this.calcRole(list[i].functions)
              }
            }else{
              obj= list[i].id
            }
            arr.push(obj)
          }
          if(list[i].children && list[i].children.length){
            arr= arr.concat(this.calcRole(list[i].children, true))
          }
        }
      }
      return arr
    },
    getRoleAuth(){
      this.$axios.$get('/menu/query/'+ this.selectRow.id,).then( (res) => {
        // console.log(res)
        this.roleData= res.items
      })

    }
  }
}
</script>

<style scoped lang="less">

</style>
