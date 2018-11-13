<template>
  <public-article-detail :title="title" :detail="detail"></public-article-detail>
</template>

<script>
  import PublicArticleDetail from '~/components/public-article-detail.vue'
  export default {
    name: "open-article-detail",
    components: {
      PublicArticleDetail,
    },
    asyncData ({ app, params, error }) {
      console.log('asyncData')
      return app.$axios.$post('/infopublic/detail/'+ params.id,{}).then((res) => {
        return {
          title: res.item.title,
          detail: res.item.content
        }
      },(err)=>{
        // if(process.client)
        console.log('err:', err.response.data)
        return {
          title: '',
          detail: '',
          error: err.response.data
        }
      })
    },
    data(){
      return{
        title: '',
        detail: '',
        error: null
      }
    },
  }
</script>

<style scoped>

</style>
