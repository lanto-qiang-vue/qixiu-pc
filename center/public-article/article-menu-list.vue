<template>
<!--<basic-container>-->
  <main-body :paraMenu="menuList" pageName="公共管理"></main-body>
<!--</basic-container>-->
</template>

<script>
  import MainBody from '~/components/main.vue'
  // import BasicContainer from '~/components/basic-container.vue'
  export default {
    name: "public-article-menu-list",
    // layout: "layout-root",
    data () {
      return {
        menuList: [],

      }
    },
    components: {
      MainBody,
      // BasicContainer
    },
    watch: {
      '$route' (to, from) {
        // console.log(to)
        this.getMenu()
        this.relocation(to.params.type)
      }
    },
    computed:{
      articlePage(){
        let flag= 0
        switch (this.$route.matched[0].path){
          case "/gov-article": flag=1;break
          case "/guild-article": flag=2;break
        }
        return flag
      }
    },
    created(){
      this.getMenu()
      this.relocation(this.$route.params.type)
    },
    mounted(){
      // console.log(this.$route)

      // this.relocation(this.$route.params.type)
    },
    methods:{
      getMenu(){
        switch (this.articlePage){
          case 1: {
            if(process.env.config.areaName=='shanghai'){

            this.menuList =[{
              meta: {title: '政务公开', accessId:'政务公开'},
              children: [{
                meta: {title: '法律法规', accessId: 10281001},
                path: "/gov-article/10281001"
              },{
                meta: {title: '管理规范', accessId: 10281002},
                path: "/gov-article/10281002"
              },{
                meta: {title: '行业政策', accessId: 10281003},
                path: "/gov-article/10281003"
              },{
                meta: {title: '技术标准', accessId: 10281004},
                path: "/gov-article/10281004"
              }]
            },{
              meta: {title: '办事指南', accessId: 10281005},
              path: "/gov-article/10281005"
            },{
              meta: {title: '管理职责', accessId: 10281006},
              path: "/gov-article/10281006"
            },{
              meta: {title: '行业概况', accessId: 10281007},
              path: "/gov-article/10281007"
            },{
              meta: {title: '管理动态', accessId:'管理动态'},
              children: [
              //   {
              //   meta: {title: '电子维修档案', accessId: '电子维修档案'},
              //   path: "/"
              // },{
              //   meta: {title: '企业合格证使用信息管理', accessId: '企业合格证使用信息管理'},
              //   path: "/"
              // },
                {
                meta: {title: '质量信誉考核信息', accessId: 10281016},
                path: "/gov-article/10281016"
              },{
                meta: {title: '违法违规公告', accessId: 10281017},
                path: "/gov-article/10281017"
              }]
            },{
              meta: {title: '创先争优', accessId:'创先争优'},
              children: [{
                meta: {title: '优质企业', accessId: 10281009},
                path: "/gov-article/10281009"
              }]
            },{
              meta: {title: '行业文明创建', accessId: 10281010},
              path: "/gov-article/10281010"
            }];
            } else{
              this.menuList = [
                // {
                //   meta: {title: '系统介绍', accessId: 10281038},
                //   path: "/gov-article/10281038"
                // },
                {
                  meta: {title: '通知公告', accessId: 10281039},
                  path: "/gov-article/10281039"
                },{
                  meta: {title: '新闻动态', accessId: 10281019},
                  path: "/gov-article/10281019"
                },{
                  meta: {title: '管理动态', accessId: 10281020},
                  path: "/gov-article/10281020"
                },{
                  meta: {title: '行业监管', accessId: 10281001},
                  path: "/gov-article/10281001"
                },]
            }
            break
          }
          case 2:{
            this.menuList =[
              {
                meta: {title: '协会简介', accessId: 10281022},
                path: "/guild-article/10281022"
              },{
                meta: {title: '协会职能', accessId: 10281023},
                path: "/guild-article/10281023"
              },{
                meta: {title: '工作动态', accessId: 10281013},
                path: "/guild-article/10281013"
              },{
                meta: {title: '行业风采', accessId: 10281014},
                path: "/guild-article/10281014"
              },{
                meta: {title: '行业党建', accessId: 10281015},
                path: "/guild-article/10281015"
              },{
                meta: {title: '行业能手', accessId: 10281008},
                path: "/guild-article/10281008"
              },{
                meta: {title: '专家组', accessId: 10281024},
                path: "/guild-article/10281024"
              }
            ]
          }
        }

      },
      relocation(type){
        if(!type) {
          switch (this.articlePage){
            case 1: {
              this.$router.replace({path: '/gov-article/10281001'})
              break;
            }
            case 2: {
              this.$router.replace({path: '/guild-article/10281001'})
              break;
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
