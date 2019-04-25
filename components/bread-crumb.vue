<template>
<div class="bread-crumb">
  <Breadcrumb v-if="show">
    <BreadcrumbItem :to="name? '/': this.sortRole[0].path">{{name? '主页': '首页'}}</BreadcrumbItem>
    <BreadcrumbItem>{{name|| title}}</BreadcrumbItem>
  </Breadcrumb>
</div>
</template>

<script>
import mixin from '~/components/home-path-mixin.js'
export default {
  name: "bread-crumb",
  mixins: [mixin],
  props: ['name'],
  data(){
    return{
      show: false
    }
  },
  computed:{
    accessMenu(){
      return this.$store.state.user.accessMenu
    },
    accessId(){
      return  this.$route.meta.accessId
    },
    title(){
      return this.getName(this.accessId, this.accessMenu)
    }
  },
  mounted(){
    this.show= true
    // console.log(this.$route)
  },
  methods:{
    getTitle(accessId, accessMenu){
      let title=''
      if(accessMenu && accessMenu.length){
        title= this.getName(accessId, accessMenu)
      }
      return title|| this.$route.meta.title
    },
    getName(access, accessMenu){
      let name= ''
      for(let i in accessMenu){
        if(accessMenu[i].uri== access){
          name= accessMenu[i].name
          break
        } else if(accessMenu[i].children && accessMenu[i].children.length){
          name= this.getName(access, accessMenu[i].children)
          if(name) break
        }
      }
      return name
    }
  }
}
</script>

<style scoped>

</style>
