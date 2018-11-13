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
      <div class="to-question" v-show="flag">
        <p class="title">问题咨询</p>
        <Form>
          <FormItem style="width: 100%">
            <Input type="textarea" placeholder="" :rows="5"/>
          </FormItem>
          <FormItem label="选择问题分类：">
            <RadioGroup v-model="ask.type" type="button">
              <Radio v-for="(item, key) in typeList" :label="item.id" :key="key">{{item.codeDesc}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="是否匿名：">
            <RadioGroup v-model="ask.ignore">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="上传图片：">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button icon="ios-cloud-upload-outline">添加图片</Button>
              <span>（仅支持jpg、png、bmp）</span>
            </Upload>

          </FormItem>
          <FormItem>
            <Button type="primary" @click="" style="float: right;">提交问题</Button>
          </FormItem>
        </Form>
      </div>
      <div class="sub-title question-list-head" v-show="flag">
        <span><Icon type="ios-pie" />问题集锦</span>
        <nuxt-link tag="a" to="/cdf/question-list" class="more">更多<Icon type="ios-arrow-forward" /></nuxt-link>

        <!--<nuxt-link tag="a" to="/" class="more">index<Icon type="ios-arrow-forward" /></nuxt-link>-->
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
          <!--<FormItem >-->
            <Button type="primary" @click="search.pageNo=1;getList()">查询</Button>
          <!--</FormItem>-->
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
        <Page :total="total" :current="search.pageNo" />
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
export default {
  name: "cdf-question-list",
  components: {
    CdfExpertList,
  },
  props: ['flag',],
  data(){
    return{
      ask:{

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
  },
  methods:{
    getList(){
      this.$axios.$post('/question/nostate/list', this.search).then((res) => {
        this.list= res.items
        this.total= res.total
      })
    },
    getType(){
      this.$axios.$get('/question/typelist').then((res) => {
        this.typeList= res.items
      })
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
