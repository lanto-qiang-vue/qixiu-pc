<template>
  <Modal
    v-model="showModal"
    title="分配角色"
    width="70"
    @on-visible-change="visibleChange"
    :footer-hide="false"
    class="table-modal-detail"
    :mask-closable="false"
    :transition-names="['', '']"
  >
    <Table :columns="columns" :data="tableData" style="margin-bottom: 10px"></Table>
    <Table :columns="roleColumns" :data="roleList" :loading="loading"></Table>
    <div slot="footer">
      <Button @click="showModal=false">取消</Button>
      <Button type="primary" @click="save()">保存</Button>
    </div>
  </Modal>
</template>

<script>
  import { deepClone } from '~/static/util.js'
export default {
  name: "menu-manage-detail",
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
      loading: true
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
    visibleChange(status){
      // if(status === false){
      //   this.$refs.form.resetFields();
      // }
    },
    save(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          let url= ''
          if(this.detail.id){
            url= '/role/edit'
          }else{
            url= '/role/add'
          }
          this.detail.system= {id: this.detail.systemId}
          this.$axios.$post(url, this.detail).then( (res) => {
            if(res.code== '0'){
              this.$Message.success('编辑成功')
              this.showModal=false
              this.$emit('refresh');
            }
          })
        } else {
          this.$Message.error('请输入必填项!');
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
        for(let i in arr){
          arr[i]._checked= false
          for(let j in res.items ){
            if(res.items[j].id== arr[i].id){
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
