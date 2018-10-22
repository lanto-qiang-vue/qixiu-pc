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
      <FormItem label="菜单名" prop="name">
        <Input type="text" v-model="detail.name" ></Input>
      </FormItem>
      <FormItem label="父菜单" prop="parentId">
        <Select v-model="detail.parentId">
          <Option v-for="(item, index) in parentList" :key="index" :value="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="链接地址">
        <Input type="text" v-model="detail.uri" ></Input>
      </FormItem>
      <FormItem label="是否叶子菜单" prop="leaf">
        <Select v-model="detail.leaf">
          <Option value="true" >是</Option>
          <Option value="false" >否</Option>
        </Select>
      </FormItem>
      <FormItem label="扩展属性">
        <Input type="text" v-model="detail.extInfo" ></Input>
      </FormItem>
      <FormItem label="排序值" prop="sortValue">
        <InputNumber :min="0" v-model="detail.sortValue"></InputNumber>
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
    parentId:'',
    uri: '',
    leaf: '',
    extInfo: '',
    sortValue: null,
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
        parentId: rule,
        leaf: rule,
        sortValue: rule,
      },
      parentList:[
        {id:0, name:'root'}
      ]
    }
  },
  watch:{
    data(datas){
      this.$refs.form.resetFields();
      if(datas.id){
        for (let key in datas){
          switch(key){
            case 'parent': this.detail.parentId= datas.parent.id;break;
            case 'leaf': this.detail.leaf= datas.leaf.toString();break;
            case 'sortValue': this.detail.sortValue= parseInt(datas.sortValue);break;
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
      this.getParentList()
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
            url= '/menu/edit'
          }else{
            url= '/menu/add'
          }
          this.detail.parent= {id: this.detail.parentId}
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
    getParentList(){
      if(this.parentList.length==1){
        this.$axios.$post('/menu/list', {
          "pageNo": 1,
          "pageSize": this.total,
        }).then( (res) => {
          for(let i in res.items){
            if(res.items[i].parent.id==0){
              this.parentList.push(res.items[i])
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
