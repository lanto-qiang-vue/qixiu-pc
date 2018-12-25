<template>
  <!--<public-article-detail :title="title" :detail="detail"></public-article-detail>-->
  <div class="open-article-detail">
    <!--<iframe :src="config.articlePath+ $route.params.id"></iframe>-->
    <BackTop></BackTop>
  </div>
</template>

<script>
  // import PublicArticleDetail from '~/components/public-article-detail.vue'
  import config from '~~/config.js'
  export default {
    name: "open-article-detail",
    // components: {
    //   PublicArticleDetail,
    // },
    // asyncData ({ app, params, error }) {
    //   console.log('asyncData')
    //   return app.$axios.$post('/infopublic/detail/'+ params.id,{}).then((res) => {
    //     return {
    //       title: res.item.title,
    //       detail: res.item.content
    //     }
    //   },(err)=>{
    //     // if(process.client)
    //     console.log('err:', err.response.data)
    //     return {
    //       title: '',
    //       detail: '',
    //       error: err.response.data
    //     }
    //   })
    // },
    data(){
      return{
        title: '',
        detail: '',
        error: null
      }
    },
    mounted(){
      console.log('config', config)
      let iframe = document.createElement("iframe");
      iframe.src = '/staticArticle/'+ this.$route.params.id+ '.html';
      iframe.scrolling = 'no';
      iframe.frameborder = 'no';


      if (iframe.attachEvent){
        iframe.attachEvent("onload", ()=>{
          this.$emit('title', iframe.contentWindow.document.title)
          iframe.height = iframe.contentWindow.document.body.scrollHeight
        });
      } else {
        iframe.onload = ()=> {
          this.$emit('title', iframe.contentWindow.document.title)
          iframe.height = iframe.contentWindow.document.body.scrollHeight
        };
      }

      document.querySelector('.open-article-detail').appendChild(iframe);

      // this.$axios.$post('/infopublic/detail/'+ this.$route.params.id,{})
    },
    methods:{

    }
  }
</script>

<style lang="less" >
.open-article-detail{
  iframe{
    min-height: 100%;
    width: 100%;
    border: 0;
  }
}
</style>
