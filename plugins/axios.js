import { Message, Spin } from 'iview';

let getContent=(response)=>{
  let content= ''
  if(response.data.status) content+= response.data.status
  if(response.data.message) content+= ' '+response.data.message
  if(response.data.msg) content+= ' '+response.data.msg
  return content
}
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
    if (process.client) {
      Message.destroy()
      Spin.hide()
    }
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
            // Message.destroy()
            Message.error({content:'登录过期，请重新登录', duration: 3})
          }
          break
        }
        default: {
          if (process.client && code!= undefined) {
            // if(Message && Message.destroy)Message.destroy()
            (response.data.status || response.data.code)? Message.error({
              content: getContent(response),
              duration: 5}): '';
          }
        }
      }
    }
  })

  $axios.onResponseError(error => {
    // console.log('error11', error)
    // for(let key in error){
    //   console.log(key)
    // }
    if (process.client) Spin.hide()
    if(error&& error.response && error.response.status==400){
      let content= getContent(error.response)
      if (process.client &&content) {
        // console.log(content)
        // Message.destroy()
        Message.error({content: content, duration: 3})
      }
    }
    return error.response
  })

}
