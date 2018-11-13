<template>
  <Modal
    v-model="showModal"
    title="分配角色"
    width="70"
    :footer-hide="false"
    class="table-modal-detail"
    :mask-closable="false"
    :transition-names="['', '']"
  >
    <Table :columns="columns" :data="tableData" style="margin-bottom: 10px"></Table>
    <Table :columns="roleColumns" :data="roleList" :loading="loading" @on-selection-change="select"></Table>
    <div slot="footer">
      <Button @click="showModal=false">取消</Button>
      <Button type="primary" @click="save()">保存</Button>
    </div>
  </Modal>
</template>

<script>
  import { deepClone } from '~/static/util.js'
export default {
  name: "user-manage-role",
  props: ['selectRow', 'show', 'columns'],
  data(){
    return{
      showModal: false,
      roleColumns:[
        {type: 'selection', width: 60, align: 'center'},
        {title: '角色ID', key: 'id',  minWidth: 100,},
        {title: '角色名', key: 'name',  minWidth: 100,},
        {title: '角色代号', key: 'code',  minWidth: 100},
        {title: '角色系统类型', key: 'system',  minWidth: 100,
          render: (h, params) => h('span', params.row.system.name)
        },
        {title: '角色状态', key: 'state',  minWidth: 100,
          render: (h, params) => h('span', params.row.state?'启用' :'禁用')
        },
      ],
      roleList:[],
      loading: true,
      selectRole: []
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
      this.getRoles()
    }
  },
  mounted(){
    this.getRoleList()
  },
  methods:{
    select(selection){
      console.log(selection)
      let arr=[]
      for (let i in selection){
        arr.push(selection[i].id)
      }
      this.selectRole= arr
    },
    save(){
      this.$Modal.confirm({
        title: '确定保存用户角色吗？',
        onOk: ()=> {
          this.$axios.$post('/userid/assign',{
            "roleIds": this.selectRole,
            "userId": this.selectRow.id
          }).then( (res) => {
            if(res.code== '0'){
              this.$Message.success('保存成功')
              this.$emit('refresh');
              this.showModal= false
            }else{
              this.$Message.error(res.status)
            }
          })
        }
      })
    },
    getRoleList(pageSize){
      if(!this.roleList.length){
        let size= pageSize|| 100
        this.$axios.$post('/role/list', {
          "pageNo": 1,
          "pageSize": size,
        }).then( (res) => {
          if(res.total> size){
            this.getRoleList(res.total)
          }else{
            this.roleList= res.items
          }

        })
      }
    },
    getRoles(){
      this.loading= true
      this.$axios.$get('/userid/get/'+ this.selectRow.id).then( (res) => {
        let arr= deepClone(this.roleList)
        this.selectRole= []
        for(let i in arr){
          arr[i]._checked= false
          for(let j in res.items ){
            if(res.items[j].id== arr[i].id){
              this.selectRole.push(res.items[j].id)
              arr[i]._checked= true
            }
          }
        }
        this.roleList= arr
        this.loading= false
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
