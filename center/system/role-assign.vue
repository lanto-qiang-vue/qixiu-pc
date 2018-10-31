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
    <main-tree title="权限列表" :data="roleData" @change="roleChange"></main-tree>
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
      roleData: []
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
    },
    save(){

    },
    getRoleAuth(){
      // this.$axios.$get('/menu/query/'+ this.selectRow.id,).then( (res) => {
      //   // console.log(res)
      //   this.roleData= res.items
      // })

      this.roleData=[{"id":1,"name":"爱车档案","selected":false,"parentId":0,"leaf":true,"children":[],"functions":[{"id":18,"name":"车主搜索","selected":false},{"id":19,"name":"绑定本人车辆","selected":false},{"id":20,"name":"绑定他人车辆","selected":false},{"id":21,"name":"查看","selected":false},{"id":22,"name":"解绑","selected":false},{"id":23,"name":"解除授权","selected":false}]},{"id":2,"name":"我的咨询","selected":false,"parentId":0,"leaf":true,"children":[],"functions":[]},{"id":3,"name":"我的上门服务","selected":false,"parentId":0,"leaf":true,"children":[],"functions":[]},{"id":4,"name":"我的预约服务","selected":false,"parentId":0,"leaf":true,"children":[],"functions":[]},{"id":5,"name":"我的点评","selected":false,"parentId":0,"leaf":true,"children":[],"functions":[]},{"id":6,"name":"我的反馈","selected":false,"parentId":0,"leaf":true,"children":[],"functions":[]},{"id":7,"name":"通知管理","selected":false,"parentId":0,"leaf":true,"children":[],"functions":[]},{"id":8,"name":"账号管理","selected":false,"parentId":0,"leaf":false,"children":[{"id":9,"name":"账号信息","selected":false,"parentId":8,"leaf":true,"children":[],"functions":[{"id":5,"name":"修改用户信息","selected":false}]},{"id":10,"name":"更换手机号码","selected":false,"parentId":8,"leaf":true,"children":[],"functions":[]},{"id":11,"name":"修改密码","selected":false,"parentId":8,"leaf":true,"children":[],"functions":[]},{"id":12,"name":"退出登录","selected":false,"parentId":8,"leaf":true,"children":[],"functions":[]},{"id":13,"name":"修改用户信息","selected":false,"parentId":8,"leaf":true,"children":[],"functions":[]}],"functions":[]},{"id":14,"name":"登录用户就有的权限","selected":false,"parentId":0,"leaf":true,"children":[],"functions":[{"id":6,"name":"获取权限","selected":false},{"id":7,"name":"获取功能详细","selected":false},{"id":17,"name":"获取菜单uri","selected":false}]},{"id":15,"name":"系统管理","selected":false,"parentId":0,"leaf":false,"children":[{"id":16,"name":"菜单管理","selected":false,"parentId":15,"leaf":true,"children":[],"functions":[{"id":12,"name":"菜单查询","selected":false},{"id":13,"name":"菜单详情","selected":false},{"id":14,"name":"菜单增加","selected":false},{"id":15,"name":"菜单修改","selected":false}]},{"id":17,"name":"功能管理","selected":false,"parentId":15,"leaf":true,"children":[],"functions":[{"id":8,"name":"功能查询","selected":false},{"id":9,"name":"功能详情","selected":false},{"id":10,"name":"功能增加","selected":false},{"id":11,"name":"功能修改","selected":false}]},{"id":18,"name":"角色管理","selected":false,"parentId":15,"leaf":true,"children":[],"functions":[{"id":1,"name":"角色查询","selected":false},{"id":2,"name":"角色详情","selected":false},{"id":3,"name":"角色增加","selected":false},{"id":4,"name":"角色修改","selected":false},{"id":30,"name":"给角色受权","selected":false}]},{"id":21,"name":"业务系统管理","selected":false,"parentId":15,"leaf":true,"children":[],"functions":[]},{"id":24,"name":"文件服务","selected":false,"parentId":15,"leaf":true,"children":[],"functions":[{"id":29,"name":"上传文件","selected":false}]}],"functions":[]},{"id":19,"name":"企业员工人才管理","selected":true,"parentId":0,"leaf":false,"children":[{"id":20,"name":"按维修企业查询","selected":true,"parentId":19,"leaf":true,"children":[],"functions":[{"id":16,"name":"按维修企业查询","selected":true}]}],"functions":[]},{"id":22,"name":"绑定车辆","selected":false,"parentId":0,"leaf":true,"children":[],"functions":[{"id":24,"name":"上传行驶证","selected":false},{"id":25,"name":"上传身份证（头像面）或营业执照","selected":false},{"id":26,"name":"获取原来的身份证图","selected":false},{"id":27,"name":"修改信息提交","selected":false}]},{"id":23,"name":"绑定他人车辆","selected":false,"parentId":0,"leaf":true,"children":[],"functions":[{"id":28,"name":"提交 发送验证码","selected":false}]},{"id":25,"name":"管理服务","selected":false,"parentId":0,"leaf":false,"children":[{"id":26,"name":"通知发布","selected":false,"parentId":25,"leaf":true,"children":[],"functions":[{"id":31,"name":"发布通知","selected":false},{"id":32,"name":"获取角色列表","selected":false}]},{"id":27,"name":"通知管理","selected":false,"parentId":25,"leaf":true,"children":[],"functions":[{"id":33,"name":"查询发给自己通知","selected":false},{"id":34,"name":"查询自己发送的通知","selected":false},{"id":35,"name":"获取待审核通知","selected":false},{"id":36,"name":"获取通知详情","selected":false},{"id":38,"name":"获取接收方列表","selected":false}]},{"id":28,"name":"通知审核","selected":false,"parentId":25,"leaf":true,"children":[],"functions":[{"id":37,"name":"审核通知","selected":false}]}],"functions":[]}]
    }
  }
}
</script>

<style scoped lang="less">

</style>
