import setStore from '~/middleware/set-store.js'
import checkAuth from '~/middleware/check-auth.js'
export default {
  created(){
    setStore({store: this.$store})
    checkAuth({
      route: this.$route,
      store: this.$store,
      redirect: this.$router.push,
    })
  }
}
