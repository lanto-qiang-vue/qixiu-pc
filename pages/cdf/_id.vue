<template>
  <basic-container>
<div class="cdf-question-detail">
  <div class="center">
    <div class="sub-title">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/cdf">车大夫门诊</BreadcrumbItem>
        <BreadcrumbItem>问题详情</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div>
      <Card class="ask-block">
        <div slot="title" class="title">
          <div class="head">
            <img :src="detail.photo || '/img/cdf/user.png'"/>
            <div>
              <p>{{detail.userName}}</p>
              <span>{{detail.createTime | FormatDate}}</span>
            </div>
          </div>
          <div class="views">
            <div>分类：<Tag color="orange">{{detail.categoryName}}</Tag></div>
            <div>浏览：{{detail.viewNumber}}</div>
          </div>
        </div>
        <p v-html="detail.content"></p>
        <div class="img-block" v-if="detail.questionPhoto && detail.questionPhoto.length">
          <img v-for="(item, key) in detail.questionPhoto" :src="item" :key="key"
               v-img="{group: 'ask-img'}"  />
        </div>
      </Card>

      <Card class="ask-block">
        <div slot="title" class="title">共{{answerList.length}}条回答</div>
        <div class="answers" v-for="(item, key) in answerList" :key="key">
          <div class="title">
            <div class="head">
              <img :src="item.answerHeadPhoto || '/img/cdf/user.png'"/>
              <div>
                <p>{{item.answerName}}</p>
                <span>{{item.answerTime | FormatDate}}</span>
              </div>
            </div>
            <div class="views">
              <Tag v-if="item.adopt" color="green">已采纳</Tag>
              <Button v-if="detail.login &&!isAdopt" type="success" size="large"
              @click="toAdopt(item.id)">采纳回答</Button>
            </div>
          </div>
          <div class="answer-content">
            <p v-html="item.answerContent"></p>
            <div class="img-block" v-if="item.answerPhoto && item.answerPhoto.length">
              <img v-for="(item2, key2) in item.answerPhoto" :src="item2" :key="key2"
                   v-img="{group: 'answer-img'+key2}"  />
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</div>
  </basic-container>
</template>

<script>
import BasicContainer from '~/components/basic-container.vue'
import { formatArticle } from '~/static/util.js'
export default {
  name: "cdf-question-detail",
  layout: "layout-root",
  components: {
    BasicContainer
  },
  head () {
    return {
      title: formatArticle(this.detail.content),
      meta: [{ hid: 'description', name: 'description', content: formatArticle(this.detail.content) }]
    }
  },
  asyncData ({ app, params, error }) {
    // console.log('asyncData')
    return app.$axios.$get('/question/detail/'+ params.id).then((res) => {
      let list= res.item.answerDetailDtos, isAdopt= false
      for(let i in list){
        if(list[i].adopt) isAdopt= true
      }
      return {
        detail: res.item,
        answerList: list,
        isAdopt: isAdopt
      }
    },(err)=>{
      console.log('err:', err.response.data)
      return {
        detail: {},
        answerList: [],
        error: err.response.data
      }
    })
  },
  data(){
    return{
      detail: {},
      answerList: [],
      error: null,

      isAdopt: false
    }
  },
  mounted(){
    // this.$axios.$get('/question/detail/'+ this.$route.params.id)
    console.log('window',window);
  },
  methods:{
    toAdopt(id){
      this.$Modal.confirm({
        title: '确定采纳此回答吗？',  onOk: () => {
          this.$axios.$post('/question/cnanswer/'+id,{}).then((res) => {
            if (res.code == '0') {
              this.$Message.success('采纳成功')
              this.getData()
            }
          })
        }
      })
    },
    getData(){
      this.$axios.$get('/question/detail/'+ this.$route.params.id).then((res) => {
        let list= res.item.answerDetailDtos, isAdopt= false
        for(let i in list){
          if(list[i].adopt) isAdopt= true
        }
        this.detail=res.item
        this.answerList= list
        this.isAdopt= isAdopt
      })
    }
  }
}
</script>

<style scoped lang="less">
.cdf-question-detail{
  width: 100%;
  height: 100%;
  background-color: #f5f7f9;
  overflow: hidden;
  .center{
    min-height: 70vh;
    background-color: white;
    padding: 0 10px;
    width: 100%;
    max-width: 1000px;
    min-width: 800px;
    margin: 10px auto;
    overflow: hidden;
    position: relative;
    .sub-title{
      line-height: 38px;
      padding: 0 10px;
      background-color: white;
      border-bottom: 2px solid #4ba7f5;
    }
    .ask-block{
      margin: 20px 0;
      .title{
        position: relative;
        .head{
          position: relative;
          display: inline-block;
          img{
            width: 60px;
            height: 60px;
            left: 0;
            top: 0;
            position: absolute;
          }
          div{
            height: 60px;
            margin-left: 70px;
            p{
              line-height: 30px;
              height: 30px;
              display: block;
            }
            span{
              line-height: 30px;
              height: 30px;
              color: #9a9a9a;
            }
          }
        }
        .views{
          text-align: right;
          float: right;
          line-height: 30px;
          *{
            margin-right: 0;
          }
        }
      }
      .img-block{
        margin-top: 10px;
        img{
          height: 100px;
          margin: 10px 10px 0 0;
        }
      }
      .answers{
        border-bottom: 1px solid #e8eaec;
        .answer-content{
          margin: 15px 0;
        }
      }
      .answers:last-child{
        border: 0;
      }
    }
  }
}
</style>
<style lang="less">
.cdf-question-detail{
  .ask-block{
    .ivu-card-body{
      min-height: 100px;
    }
  }
  .answer-content{
    img{
      max-width: 100%;
    }
  }
}
</style>
