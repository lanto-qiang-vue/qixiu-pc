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
            // if(process.env.config.areaName=='shanghai'){

            this.menuList =[{
              name:'政务公开',
              uri:'/gov-article1',
              children: [{
                  name: '法律法规',
                  meta: {path: "/gov-article/10281001",},
                  uri:'/gov-article/10281001',
                },{
                  name: '管理规范',
                  meta: {path: "/gov-article/10281002",},
                  uri: "/gov-article/10281002",
                },{
                  name: '行业政策',
                  meta: {path: "/gov-article/10281003",},
                  uri: "/gov-article/10281003",
                },{
                  name: '技术标准',
                  meta: {path: "/gov-article/10281004",},
                  uri: "/gov-article/10281004",
                }]
              },
              {
                name: '办事指南',
                meta: {path: "/gov-article/10281005",},
                uri: "/gov-article/10281005",
              },
              {
                name: '管理职责',
                meta: {path: "/gov-article/10281006",},
                uri: "/gov-article/10281006",
              },
              {
                name: '行业概况',
                meta: {path: "/gov-article/10281007",},
                uri: "/gov-article/10281007",
              },
              {
                name:'管理动态',
                uri:'/gov-article2',
                children: [{
                  name: '质量信誉考核信息',
                  meta: {path: "/gov-article/10281016",},
                  uri:'/gov-article/10281016',
                },{
                  name: '违法违规公告',
                  meta: {path: "/gov-article/10281017",},
                  uri: "/gov-article/10281017",
                },]
              },
              {
                name:'创先争优',
                uri:'/gov-article3',
                children: [{
                  name: '优质企业',
                  meta: {path: "/gov-article/10281009",},
                  uri:'/gov-article/10281009',
                },{
                  name: '行业文明创建',
                  meta: {path: "/gov-article/10281010",},
                  uri: "/gov-article/10281010",
                },]
              },
            ]
            // } else{
            //   this.menuList = [
            //     // {
            //     //   meta: {title: '系统介绍', accessId: 10281038},
            //     //   path: "/gov-article/10281038"
            //     // },
            //     {
            //       meta: {title: '通知公告', accessId: 10281039},
            //       path: "/gov-article/10281039"
            //     },{
            //       meta: {title: '新闻动态', accessId: 10281019},
            //       path: "/gov-article/10281019"
            //     },{
            //       meta: {title: '管理动态', accessId: 10281020},
            //       path: "/gov-article/10281020"
            //     },{
            //       meta: {title: '行业监管', accessId: 10281001},
            //       path: "/gov-article/10281001"
            //     },]
            // }
            break
          }
          case 2:{
            this.menuList =[
              {
                name: '协会简介',
                meta: {path: "/guild-article/10281022",},
                uri: "/guild-article/10281022",
              },
              {
                name: '协会职能',
                meta: {path: "/guild-article/10281023",},
                uri: "/guild-article/10281023",
              },
              {
                name: '工作动态',
                meta: {path: "/guild-article/10281013",},
                uri: "/guild-article/10281013",
              },
              {
                name: '行业风采',
                meta: {path: "/guild-article/10281014",},
                uri: "/guild-article/10281014",
              },
              {
                name: '行业党建',
                meta: {path: "/guild-article/10281015",},
                uri: "/guild-article/10281015",
              },
              {
                name: '行业能手',
                meta: {path: "/guild-article/10281008",},
                uri: "/guild-article/10281008",
              },
              {
                name: '专家组',
                meta: {path: "/guild-article/10281024",},
                uri: "/guild-article/10281024",
              },
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
