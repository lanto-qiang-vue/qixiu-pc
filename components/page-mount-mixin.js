import setStore from '~/middleware/set-store.js'
import { checkAuth } from '~/static/util.js'
export default {
  created(){
    // console.log('page-mount-mixin', this.$router)
    setStore({store: this.$store})
    // console.log('process.env.NODE_ENV',process.env.NODE_ENV)
    checkAuth({
      route: this.$route,
      store: this.$store,
    }, ()=>{
      this.$router.replace({
        path: '/login',
        query: { redirect: this.$route.fullPath }
      })
    }, ()=>{
      throw new Error( '用户无权限访问此页面');
    })
  }
}
