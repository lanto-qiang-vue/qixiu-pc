<template>
  <Modal
    v-model="showModal"
    title="编辑功能"
    width="70"
    @on-visible-change="visibleChange"
    :footer-hide="false"
    class=""
    :mask-closable="false"
    :transition-names="['', '']"
  >
    <Form ref="form" :rules="ruleValidate"  :model="detail" :label-width="110"  class="common-form">
      <FormItem label="功能名" prop="name">
        <Input type="text" v-model="detail.name" ></Input>
      </FormItem>
      <FormItem label="按钮key" prop="btnId">
        <Input type="text" v-model="detail.btnId" ></Input>
      </FormItem>
      <FormItem label="菜单名" prop="menuId">
        <Select v-model="detail.menuId">
          <Option v-for="(item, index) in menuList" :key="index" :value="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="接口地址" prop="uri">
        <Input type="text" v-model="detail.uri" ></Input>
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
    btnId:'',
    menuId:'',
    uri: '',
  }
export default {
  name: "menu-manage-detail",
  props: ['data', 'menuList','show', 'total'],
  data(){
    let rule= [{ required: true, message:'必填项不能为空'}]
    return{
      detail: deepClone(initData),
      showModal: false,
      ruleValidate : {
        name: rule,
        btnId: rule,
        menuId: rule,
        uri: rule,
      },
    }
  },
  watch:{
    data(datas){
      this.$refs.form.resetFields();
      if(datas.id){
        for (let key in datas){
          switch(key){
            case 'menu': this.detail.menuId= datas.menu.id;break;
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
            url= '/function/edit'
          }else{
            url= '/function/add'
          }
          this.detail.menu= {id: this.detail.menuId}
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
  }
}
</script>

<style scoped lang="less">

</style>
