<template>
<div class="article-detail">
  <p class="title">{{title}}</p>
  <div v-html="detail"></div>
  <BackTop></BackTop>
</div>
</template>

<script>
export default {
  name: "open-article-detail",
  props: ['title', 'detail'],
  data(){
    return{
    }
  },
}
</script>

<style lang="less">
.article-detail{
  padding: 10px 20px;
  overflow: hidden;
  font-size: 14px;
  color: black;
  img{
    max-width: 100%;
    height: auto;
  }
  table td{
    border:1px solid #CCCCCC;
  }
  .title{
    font-size: 22px;
    text-align: center;
    margin: 15px 0;
  }
}
</style>
