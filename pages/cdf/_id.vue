<template>
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
            <img :src="detail.questionerPhoto || '/img/cdf/user.png'"/>
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
        <p>{{detail.content}}</p>
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
          </div>
          <div class="answer-content">
            <p>{{item.answerContent}}</p>
            <div class="img-block" v-if="detail.questionPhoto && detail.questionPhoto.length">
              <img v-for="(item, key2) in detail.questionPhoto" :src="item" :key="key2"
                   v-img="{group: 'answer-img'+key}"  />
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "cdf-question-detail",
  layout: 'common',
  asyncData ({ app, params, error }) {
    // console.log('asyncData')
    return app.$axios.$get('/question/detail/'+ params.id).then((res) => {
      return {
        detail: res.item,
        answerList: res.item.answerDetailDtos,
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
      error: null
    }
  },
  mounted(){
    // this.$axios.$get('/question/detail/'+ this.$route.params.id)
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
