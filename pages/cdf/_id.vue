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
        <div slot="title">

        </div>
        <p>{{detail.content}}</p>
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
    console.log('asyncData')
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
    this.$axios.$get('/question/detail/'+ this.$route.params.id)
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
  }
}
</style>
