export default function ({store}) {
  if (process.client) {
    console.log('set-store')
    let token = localStorage.getItem('ACCESSTOKEN')
    if(!store.state.user.token && token){
      store.commit('user/setToken', token)
      store.commit('user/setMenu', JSON.parse(localStorage.getItem('ACCESSMENU')))
      store.commit('user/setUser', JSON.parse(localStorage.getItem('USERINFO')))
    }
  }
}
