<template>
<basic-container>
<div style="background-color: #f5f7f9;text-align: center;padding: 10px;">
  <div class="common-content">
    <div class="sub-title">
      <Breadcrumb>
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem>{{title}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <nuxt-child @title="showTitle"/>
  </div>
</div>
</basic-container>
</template>

<script>
  import BasicContainer from '~/components/basic-container.vue'
  export default {
    name: "single-article",
    layout: 'layout-root',
    components: {
      BasicContainer
    },
    data(){
      return{
        title: ''
      }
    },
    methods:{
      showTitle(val){
        this.title= val
      }
    }
  }
</script>

<style scoped lang="less">
  .common-content{
    display: inline-block;
    text-align: left;
    width: 100%;
    max-width: 1200px;
    min-width: 800px;
    min-height: 70vh;
    background-color: white;
    .sub-title{
      line-height: 38px;
      padding: 0 10px;
      background-color: white;
      border-bottom: 2px solid #4ba7f5;
    }
    >div:not(.sub-title){
      min-height: calc(100% - 40px);
      overflow: hidden;
      background-color: white;
    }
  }
</style>
