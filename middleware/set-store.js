

export default function ({store}) {

  // console.log('server',process.server)
  // console.log('client',process.client)

  if (process.client) {

    let token = localStorage.getItem('ACCESSTOKEN')
    if(!store.state.user.token && token){
      store.commit('user/setToken', token)
      store.commit('user/setMenu', JSON.parse(localStorage.getItem('ACCESSMENU')))
      store.commit('user/setUser', JSON.parse(localStorage.getItem('USERINFO')))
    }
  }
}
