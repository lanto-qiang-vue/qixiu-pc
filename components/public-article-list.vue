<template>
<div style="padding: 10px" class="open-article-list">
  <CellGroup>
    <Cell v-for="(item, key) in list" :title="item.title" :key="key" :to="type+'/'+item.id">
      <Icon type="md-square" slot="icon" size="4" color="#2d8cf0"/>
    </Cell>
  </CellGroup>
  <div class="article-list-page">
    <Page :total="total" :current="pageNo" :page-size="10" @on-change="changePage" show-total/>
  </div>
</div>
</template>

<script>
import { deepClone } from '~/static/util.js'
export default {
  name: "open-article-list",
  // validate ({ params }) {
  //   console.log('validate')
  //   return true
  // },
  // asyncData ({ app, params, error }) {
  //   console.log('asyncData')
  //   return app.$axios.$post('/home/all',{
  //     "infoType": params.type,
  //     "pageNo": 1,
  //     "pageSize": 10
  //   }).then((res) => {
  //       return {
  //         list: res.items,
  //         total: res.total
  //       }
  //
  //   })
  // },
  props: ['propList', 'total', 'type'],
  data(){
    return{
      list: [],
      pageNo: 1,
      // total: 0
    }
  },
  watch:{
    propList(list){
      this.list= deepClone(list)
    }
  },
  mounted(){
    this.list= deepClone(this.propList)
    // console.log('this.$route:',this.$route,this.$route.params.type)

  },
  methods: {
    changePage(page){
      this.pageNo= page
      this.$axios.$post('/home/all',{
        "infoType": this.type,
        "pageNo": page,
        "pageSize": 10
      }).then((res) => {
          this.list= res.items
          // this.total= res.total
      })
    }
  }
}
</script>

<style scoped lang="less">
.open-article-list{
  .ivu-cell{
    padding: 15px 16px;
    border-bottom: 1px solid #dddddd;
    .ivu-cell-title{
      font-size: 16px;
    }
  }
  .article-list-page{
    margin: 10px 0;
    text-align: center;
    .ivu-page{
      display: inline-block;
    }
  }
}
</style>
