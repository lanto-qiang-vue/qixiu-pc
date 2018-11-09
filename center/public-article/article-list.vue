<template>
  <!--<div style="padding: 10px" class="open-article-list">-->
  <!--<CellGroup>-->
  <!--<Cell v-for="(item, key) in list" :title="item.title" :key="key">-->
  <!--<Icon type="md-square" slot="icon" size="4" color="#2d8cf0"/>-->
  <!--</Cell>-->
  <!--</CellGroup>-->
  <!--<div class="article-list-page">-->
  <!--<Page :total="total" :current="pageNo" page-size="10" @on-change="changePage" show-total/>-->
  <!--</div>-->
  <!--</div>-->
  <div>
    <public-article-list :propList="list" :total="total" :type="$route.params.type"
                         v-if="!$route.params.id"></public-article-list>

    <nuxt-child v-else/>

    <nuxt-link to="/gov-article/10281001/123">123</nuxt-link>
    <div></div>
    <nuxt-link to="/gov-article/10281001/">10281001</nuxt-link>

  </div>

</template>

<script>
  import PublicArticleList from '~/components/public-article-list.vue'
  export default {
    name: "public-article-type",
    components: {
      PublicArticleList,
    },
    validate ({ app, params, store }) {
      console.log('validate')
      console.log('params.type:', params.type)
      let hasType= (list) =>{
        let flag= false
        for (let i in list){
          if( list[i].id== params.type){
            flag= true
            break
          }
        }
        return flag
      }

      return true
      // return new Promise((resolve,reject) => setTimeout(() => resolve(true)))

      if( store.state.app.articleType){
        return hasType(store.state.app.articleType)
      }else{
        console.log('validate-Promise')
        return new Promise((resolve, reject) => {
          app.$axios.$get('/infopublic/public/info/category/1028' ).then(res => {
            if (res.code === '0') {
              store.commit('app/setArticleType', res.items)
              console.log('hasType', hasType(res.items))
              // hasType(res.items)? resolve(): reject()
              resolve(true)
            } else reject(res)
          },err => {
            reject(err)
          })
        })
      }


    },
    asyncData ({ app, params, error }) {
      console.log('asyncData')
      return app.$axios.$post('/home/all',{
        "infoType": params.type,
        "pageNo": 1,
        "pageSize": 10
      }).then((res) => {
        return {
          list: res.items,
          total: res.total
        }

      },(err)=>{
        // if(process.client)
        console.log('err:', err.response.data)
        return {
          list: [],
          total: 0,
          error: err.response.data
        }
      })
    },
    data(){
      return{
        list: [],
        pageNo: 1,
        total: 0,
        error: null
      }
    },
    mounted(){
      console.log('route:', this.$route)
      console.log('error: ', this.error? this.error: 'no error')
      // console.log('this.$route:',this.$route,this.$route.params.type)
      // this.$axios.$get('/infopublic/public/info/category/1028').then( (res) => {
      //
      // })
    },
    // methods: {
    //   changePage(page){
    //     this.pageNo= page
    //     this.$axios.$post('/home/all',{
    //       "infoType": this.$route.params.type,
    //       "pageNo": page,
    //       "pageSize": 10
    //     }).then((res) => {
    //
    //         this.list= res.items,
    //         this.total= res.total
    //
    //
    //     })
    //   }
    // }
  }
</script>

<!--<style scoped lang="less">-->
<!--.open-article-list{-->
<!--.ivu-cell{-->
<!--padding: 15px 16px;-->
<!--border-bottom: 1px solid #dddddd;-->
<!--.ivu-cell-title{-->
<!--font-size: 16px;-->
<!--}-->
<!--}-->
<!--.article-list-page{-->
<!--margin: 10px 0;-->
<!--text-align: center;-->
<!--.ivu-page{-->
<!--display: inline-block;-->
<!--}-->
<!--}-->
<!--}-->
<!--</style>-->
