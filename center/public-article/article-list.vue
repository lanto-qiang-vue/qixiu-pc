<template>
  <div>
    <public-article-list :propList="list" :total="total" :type="$route.params.type"
                         v-if="!$route.params.id"></public-article-list>

    <nuxt-child v-else/>

    <!--<nuxt-link to="/gov-article/10281001/123">123</nuxt-link>-->
    <!--<div></div>-->
    <!--<nuxt-link to="/gov-article/10281001/">10281001</nuxt-link>-->

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

      if( store.state.app.articleType){
        return hasType(store.state.app.articleType)
      }else{
        console.log('validate-Promise')
        return new Promise((resolve, reject) => {
          app.$axios.$get('/infopublic/public/info/category/1028' ).then(res => {
            if (res.code === '0') {
              store.commit('app/setArticleType', res.items)
              // console.log('hasType', hasType(res.items))
              hasType(res.items)? resolve(true): resolve(false)
            } else reject({...res})
          },err => {
            reject(err)
          })
        })
      }
    },
    asyncData ({ app, params, error }) {
      // console.log('asyncData')
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

    },

  }
</script>
