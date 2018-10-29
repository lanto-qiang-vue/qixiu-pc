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
    <div slot="footer">
      <Button @click="showModal=false">取消</Button>
      <Button type="primary" @click="save()">保存</Button>
    </div>
  </Modal>
</template>

<script>
  // import { deepClone } from '~/static/util.js'
  // import AuthTree from './auth-tree'
export default {
  name: "role-assign",
  // components: {AuthTree},
  props: ['columns', 'selectRow', 'show'],
  data(){

    return{
      showModal: false,
      // columns:[
      //   {title: '角色ID', key: 'id',  minWidth: 100,},
      //   {title: '角色名', key: 'name',  minWidth: 100,},
      //   {title: '角色代号', key: 'code',  minWidth: 100},
      //   {title: '角色系统类型', key: 'system',  minWidth: 100,
      //     render: (h, params) => h('span', params.row.system.name)
      //   },
      //   {title: '角色状态', key: 'state',  minWidth: 100,
      //     render: (h, params) => h('span', params.row.state?'启用' :'禁用')
      //   },
      // ],
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
    save(){

    },
    getRoleAuth(){
      this.$axios.$get('/menu/query/'+ this.selectRow.id,).then( (res) => {
        // console.log(res)

      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
