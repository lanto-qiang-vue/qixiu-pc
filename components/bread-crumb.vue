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
    title(){
      return this.getName(this.nowAccessId, this.accessMenu)
    }
  },
  mounted(){
    this.show= true
    // console.log(this.$route)
  },
  methods:{
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
