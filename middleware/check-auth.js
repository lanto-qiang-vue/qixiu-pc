export default function ({ route, store, redirect, error }) {
  // console.log('check-auth', route)
  let meta= route.matched.length>0? route.matched[route.matched.length-1].meta: {}
  // console.log('route', meta)
  // console.log('store.state.user.token', store.state.user.token)
  if (process.client) {
    console.log('check-auth')
    if(store.state.user.token){
      // console.log('is login')
    }else{
      // console.log('not login')
      if(meta && meta.accessId){
        return redirect({
          path: '/login',
          query: { redirect: route.fullPath }
        })
      }
    }
  }

}
