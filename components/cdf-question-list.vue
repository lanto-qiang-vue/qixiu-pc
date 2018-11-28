<template>
<div class="cdf-question-list">
  <div class="center">
    <div class="left">
      <div class="sub-title">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem>车大夫门诊</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Card class="expert-info" v-if="$route.params.id">
        <p slot="title">专家简介</p>
        <Form :label-width="80">
          <FormItem><img class="expert-head" :src="expertInfo.photo"/></FormItem>
          <FormItem label="姓名：">{{expertInfo.name}}</FormItem>
          <FormItem label="职称：">{{expertInfo.professor}}</FormItem>
          <FormItem label="就职企业：">{{expertInfo.empUnit}}</FormItem>
          <FormItem label="专业擅长：">{{expertInfo.goodAt}}</FormItem>
          <FormItem label="主要荣誉：">{{expertInfo.honor}}</FormItem>
        </Form>
      </Card>
      <div class="to-question" v-show="flag">
        <p class="title">问题咨询</p>
        <Form ref="form" :rules="ruleValidate" :model="ask">
          <FormItem style="width: 100%" prop="content">
            <Input type="textarea" placeholder="" v-model="ask.content" :rows="5"/>
          </FormItem>
          <FormItem label="选择问题分类：">
            <RadioGroup v-model="ask.category" type="button">
              <Radio v-for="(item, key) in typeList" :label="item.id" :key="key">{{item.codeDesc}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="是否匿名：">
            <RadioGroup v-model="ask.anonymous">
              <Radio label="true">是</Radio>
              <Radio label="false">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="相关图片：">
            <div>
              <compress-upload-button @done="upPic"></compress-upload-button>
              <span>（仅支持jpg、png、bmp）</span>
            </div>
            <ul class="img-block" v-if="ask.images && ask.images.length">
              <li v-for="(item, key) in ask.images" :key="key">
                <img :src="item"  v-img="{group: 'ask-img'}" />
                <Icon type="md-close-circle" size="24" @click="delImg(key)" class="del-img" />
              </li>
            </ul>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="toAsk" style="float: right;">提交问题</Button>
          </FormItem>
        </Form>
      </div>
      <div class="sub-title question-list-head" v-show="flag">
        <span><Icon type="ios-pie" />问题集锦</span>
        <nuxt-link tag="a" to="/cdf/question-list" class="more">更多<Icon type="ios-arrow-forward" /></nuxt-link>
      </div>
      <div class="query" v-show="!flag">
        <Form :label-width="60" class="common-form" >
          <FormItem label="分类:">
            <Select v-model="search.category">
              <Option value="" selected>全部</Option>
              <Option v-for="(item, key) in typeList" :value="item.id" :key="key">{{item.codeDesc}}</Option>
            </Select>
          </FormItem>
          <FormItem label="关键字:">
            <Input type="text" v-model="search.content" placeholder="请输入问题关键字"></Input>
          </FormItem>
          <Button type="primary" @click="search.pageNo=1;getList()">查询</Button>

        </Form>
      </div>
      <div class="question-list">
        <CellGroup>
          <Cell v-for="(item, key) in list" :key="key" :title="item.content" :to="'/cdf/'+ item.id">
            <div slot="label" class="info-label">
              <Tag color="orange">{{item.categoryName}}</Tag>
              <span>{{item.createTime | FormatDate}}</span><span>{{item.viewNumber}}次查看</span>
            </div>
            <span slot="arrow"></span>
          </Cell>
        </CellGroup>
      </div>
      <div class="question-page" v-show="!flag" >
        <Page :total="total" :current="search.pageNo" @on-change="getList"/>
      </div>


    </div>
    <div class="right">
      <cdf-expert-list></cdf-expert-list>
    </div>
  </div>


</div>

</template>

<script>
import CdfExpertList from '~/components/cdf-expert-list.vue'
import CompressUploadButton from '~/components/compress-upload-button.vue'
export default {
  name: "cdf-question-list",
  components: {
    CdfExpertList,
    CompressUploadButton
  },
  props: ['flag',],
  data(){
    let rule= [{ required: true, message:'必填项不能为空'}]
    return{
      expertInfo:{},
      ask:{
        "anonymous": 'false',
        "category": "",
        "content": "",
        "expertId": this.$route.params.id||'',
        "images": []
      },
      ruleValidate : {
        content: rule,
      },
      search:{
        "category": "",
        "content": "",
        "pageNo": 1,
        "pageSize": 10
      },
      typeList:[],
      list:[],
      total: 0
    }
  },
  created(){
    this.getType()
    this.getList()
    this.getExpert()
    console.log('cdf-question-list: created')
  },
  mounted(){
    console.log('cdf-question-list: mounted')
  },
  methods:{
    getExpert(){
      let id= this.$route.params.id
      if(id){
        this.$axios.$get('/expert/detail/'+ id).then((res) => {
          if(res.code==='0'){
            this.expertInfo= res.item
          }
        })
      }
    },
    getList(page){
      if(page) this.search.pageNo= page
      this.$axios.$post('/question/nostate/list', this.search).then((res) => {
        this.list= res.items
        this.total= res.total
      })
    },
    getType(){
      this.$axios.$get('/question/typelist').then((res) => {
        this.typeList= res.items
      })
    },
    upPic(res){
      if(res.code=='0'){
        this.ask.images.push(res.item.path)
      }
    },
    delImg(index){
      console.log(index)
      this.ask.images.splice(index, 1)
    },
    toAsk(){
      if(!this.$store.state.user.token){
        this.$router.push({
          path: '/login',
          query: { redirect: this.$route.fullPath }
        })
      }else {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$axios.$post('/question/add', this.ask).then( (res) => {
              if(res.code==='0') this.$Message.success('提问成功！审核后可显示。');
            })
          } else {
            this.$Message.error('请输入必填项!');
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.cdf-question-list{
  width: 100%;
  height: 100%;
  background-color: #f5f7f9;
  overflow: hidden;
  .center{
    padding: 0 10px;
    width: 100%;
    max-width: 1000px;
    min-width: 800px;
    margin: 10px auto;
    overflow: hidden;
    position: relative;
    .left{
      width: 70%;
      padding: 0 10px 10px 10px;
      background-color: white;
      border: 1px solid #d4d4d4;
      .sub-title{
        line-height: 38px;
        padding: 0 10px;
        background-color: white;
        border-bottom: 2px solid #4ba7f5;
      }
      .to-question{
        margin: 10px 0;
        padding: 0 15px;
        border: 1px solid #ededed;
        .title{
          color: #4ba7f5;
          font-size: 16px;
          margin: 10px 0;
        }
        .img-block{
          li{
            width: 80px;
            height: 80px;
            margin: 10px 10px 0 0;
            position: relative;
            overflow: hidden;
            display: inline-block;
            img{
              position: absolute;
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
              left: 50%;
              top: 50%;
              transform: translate(-50%,-50%);
            }
            .del-img{
              position: absolute;
              top: 0;
              right: 0;
              cursor: pointer;
              color: #cecece;
            }
            .del-img:hover{
              color: #ff3333;
            }
          }
        }
      }
      .question-list-head{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px solid #eaeaea;
        vertical-align: middle;
        .more{
          float: right;
        }
      }
      .query{
        margin-top: 10px;
        border-bottom: 1px solid #eaeaea;
        .common-form .ivu-form-item{
          width: 200px;
          margin-bottom: 10px;
        }
      }
      .question-list{
        min-height: 500px;
        .ivu-cell{
          border-bottom: 1px solid #eaeaea;
        }
        .ivu-cell:last-child{
          border: 0;
        }
        .info-label span{
          margin-right: 10px;
        }
      }
      .question-page{
        border-top: 1px solid #eaeaea;
        padding-top: 10px;
        text-align: center;
      }
    }
    .right{
      width: 30%;
      position: absolute;
      top: 0;
      right: 10px;
      height: 100%;
      padding-left: 20px;
    }
  }
}
</style>
<style lang="less">
.cdf-question-list{
  .expert-info{
    margin-top: 10px;
    .ivu-form-item{
      margin-bottom: 0;
      .ivu-form-item-label{
        font-weight: 900;
      }
      .expert-head{
        width: 100px;
      }
    }
  }
  .question-list{
    .ivu-cell{
      border-bottom: 1px solid #eaeaea;
      .ivu-cell-main{
        width: 100%;
        overflow: hidden;
        .ivu-cell-title{
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
