<template>
  <Modal
    v-model="showModal"
    title="编辑菜单"
    width="70"
    @on-visible-change="visibleChange"
    :footer-hide="false"
    class=""
    :mask-closable="false"
    :transition-names="['', '']"
  >
    <Form ref="form" :rules="ruleValidate"  :model="detail" :label-width="110"  class="common-form">
      <FormItem label="角色名" prop="name">
        <Input type="text" v-model="detail.name" ></Input>
      </FormItem>
      <FormItem label="角色代号" prop="code">
        <Input type="text" v-model="detail.code" ></Input>
      </FormItem>
      <FormItem label="角色系统类型" prop="systemId">
        <Select v-model="detail.systemId">
          <Option v-for="(item, index) in systemList" :key="index" :value="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="showModal=false">取消</Button>
      <Button type="primary" @click="save()">保存</Button>
    </div>
  </Modal>
</template>

<script>
  import { deepClone } from '~/static/util.js'
  const initData= {
    name: '',
    code:'',
    systemId: '',
  }
export default {
  name: "menu-manage-detail",
  props: ['data', 'show', 'total'],
  data(){
    let rule= [{ required: true, message:'必填项不能为空'}]
    return{
      detail: deepClone(initData),
      showModal: false,
      ruleValidate : {
        name: rule,
        code: rule,
        systemId: rule,
      },
      systemList:[]
    }
  },
  watch:{
    data(datas){
      this.$refs.form.resetFields();
      if(datas.id){
        for (let key in datas){
          switch(key){
            case 'system': this.detail.systemId= datas.system.id;break;
            default: this.detail[key]= datas[key]
          }
          // console.log(key, this.detail[key])
        }
      }else{
        this.detail= deepClone(initData)
      }

    },
    show(){
      this.showModal= true
      this.getSystemList()
    }
  },
  mounted(){

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
    getSystemList(pageSize){
      if(!this.systemList.length){
        let size= pageSize|| 100
        this.$axios.$post('/system/list', {
          "pageNo": 1,
          "pageSize": size,
        }).then( (res) => {
          if(res.total> size){
            this.getSystemList(res.total)
          }else{
            this.systemList= res.items
          }

        })
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
