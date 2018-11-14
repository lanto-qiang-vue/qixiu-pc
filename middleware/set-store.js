export default function ({store}) {
  // console.log('set-store')

  if (process.client) {

    let token = localStorage.getItem('ACCESSTOKEN')
    if(!store.state.user.token && token){
      store.commit('user/setToken', token)
      store.commit('user/setMenu', JSON.parse(localStorage.getItem('ACCESSMENU')))
      store.commit('user/setUser', JSON.parse(localStorage.getItem('USERINFO')))
    }
  }
}
