import { Message } from 'iview';
export default function ({ $axios, redirect, store, route, app }) {
  $axios.onRequest(config => {
    let token= store.state.user.token
    if(token) {
      config.headers.token= token
    }
    // console.log('onRequest.config:', config)
    // console.log('store.state.user.token:', token)
  })
  $axios.onResponse(response => {
    // console.log('Interceptors:',response.data)

    if(response.data.code==='100') {
      localStorage.removeItem('ACCESSTOKEN')
      localStorage.removeItem('ACCESSMENU')
      localStorage.removeItem('USERINFO')
      store.commit('user/setToken', '')
      store.commit('user/setMenu', '')
      store.commit('user/setUser', '')
      redirect({
        path: '/login',
        // query: { redirect: route.fullPath }
      })
      Message.destroy()
      Message.error({content:'登录过期，请重新登录', duration: 3})
    }
  })

}
