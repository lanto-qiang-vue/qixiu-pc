export default {
  computed:{
    showByRole(){
      let role= this.$store.state.user.nowRule
      return (roleCodes)=>{
        let show= false
        if(roleCodes && roleCodes.length && role){
          for(let i in roleCodes){
            if(roleCodes[i]){
              if(roleCodes[i]== role){
                show= true
              }
            }
          }
        }
        return show
      }
    }
  },
  methods: {
    showTitle (item) {
      return item.name || (item.meta && item.meta.title)
    },
    showSubmenu (item) {
      return item.children && item.children.length > 0
    },
    clickMenu(item){
      let url= item.uri
      if(url.indexOf('http')>=0){
        if(item.extInfo.indexOf('_blank')>=0){
          window.open(url)
        }else{
          window.location.href= url
        }
      }else{
        this.$router.push({path: item.meta.path})
      }
    },

  },
  components: {
    'MenuIcon':{
      template: '<Icon :type="meta.icon || \'\'" :custom="meta.custom||\'\'" v-if="meta.custom ||meta.icon"/>',
      props: ['item'],
      computed:{
        meta(){
          return this.item.meta || {}
        }
      },
      directives: {if: {name: 'if'}},
    }
  },
}
