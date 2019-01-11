<template>
  <public-article-detail :title="title" :detail="detail"></public-article-detail>
  <!--<div class="open-article-detail">-->
    <!--&lt;!&ndash;<iframe :src="config.articlePath+ $route.params.id"></iframe>&ndash;&gt;-->
    <!--<BackTop></BackTop>-->
  <!--</div>-->
</template>

<script>
  import PublicArticleDetail from '~/components/public-article-detail.vue'
  import config from '~~/config.js'
  export default {
    name: "open-article-detail",
    components: {
      PublicArticleDetail,
    },
    asyncData ({ app, params, query, error }) {
      console.log('asyncData', params)
      if(query &&query.type=='school'){
        return app.$axios.$get('/training/driving/school/'+ params.id).then((res) => {
          let img='',arr= res.pic.split(',')
          for(let i in arr){
            img+= ('<img src="'+arr[i]+'"/>')
          }
          return {
            title: res.name+'简介',
            detail: res.about+ img
          }
        },(err)=>{
          // if(process.client)
          console.log('err:', err.request)
          for(let key in err){
            console.log(key)
          }
          return {
            title: '',
            detail: '',
            error: err.response&& err.response.data?err.response.data: ''
          }
        })
      }else{
        return app.$axios.$post('/infopublic/detail/'+ params.id,{}).then((res) => {
          return {
            title: res.item.title,
            detail: res.item.content
          }
        },(err)=>{
          // if(process.client)
          // console.log('err:', err.response.data)
          return {
            title: '',
            detail: '',
            error: err.response&& err.response.data?err.response.data: ''
          }
        })
      }

    },
    data(){
      return{
        title: '',
        detail: '',
        error: null
      }
    },
    mounted(){
      this.$emit('title', this.title)
    //   console.log('config', config)
    //   let iframe = document.createElement("iframe");
    //   iframe.src = '/staticArticle/'+ this.$route.params.id+ '.html';
    //   iframe.scrolling = 'no';
    //   iframe.frameborder = 'no';
    //
    //
    //   if (iframe.attachEvent){
    //     iframe.attachEvent("onload", ()=>{
    //       this.$emit('title', iframe.contentWindow.document.title)
    //       iframe.height = iframe.contentWindow.document.body.scrollHeight
    //     });
    //   } else {
    //     iframe.onload = ()=> {
    //       this.$emit('title', iframe.contentWindow.document.title)
    //       iframe.height = iframe.contentWindow.document.body.scrollHeight
    //     };
    //   }
    //
    //   document.querySelector('.open-article-detail').appendChild(iframe);
    //
    //   // this.$axios.$post('/infopublic/detail/'+ this.$route.params.id,{})
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
