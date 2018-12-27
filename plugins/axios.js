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
    // console.log('Interceptors:',response.status)
    if(response.status== 200){
      let code= response.data.code
      switch (code){
        case '0': break;
        case '401':
        case '2000':
        case '100':{
          $axios.$get('/user/useraccount/logout')
          localStorage.removeItem('ACCESSTOKEN')
          localStorage.removeItem('ACCESSMENU')
          localStorage.removeItem('USERINFO')
          store.commit('user/setToken', '')
          store.commit('user/setMenu', '')
          store.commit('user/setUser', '')
          redirect({
            path: '/login',
            query: { redirect: route.fullPath }
          })
          if (process.client) {
            Message.destroy()
            Message.error({content:'登录过期，请重新登录', duration: 3})
          }
          break
        }
        default: {
          if (process.client && code!= undefined) {
            Message.destroy()
            let content= ''
            if(response.data.status) content+= response.data.status
            if(response.data.message) content+= ' '+response.data.message

            response.data.status? Message.error({
              content: content,
              duration: 5}): '';
          }
        }
      }
    }else{
      if (process.client) {
        Message.destroy()
        Message.error({content: response.error+', status:'+response.status, duration: 3})
      }
    }


  })

}
