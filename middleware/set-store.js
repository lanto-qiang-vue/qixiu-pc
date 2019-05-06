export default function ({store}) {
  if (process.client) {
    let qixiuvar = localStorage.getItem('qixiuvar'), flag=true
    if(qixiuvar && parseInt(qixiuvar)==1){
      flag= false
    }
    if(flag) {
      localStorage.setItem('qixiuvar', 1)
      localStorage.removeItem('ACCESSTOKEN')
      localStorage.removeItem('ACCESSMENU')
      localStorage.removeItem('USERINFO')
    }

    // console.log('set-store')
    let token = localStorage.getItem('ACCESSTOKEN')
    if(!store.state.user.token && token){
      store.commit('user/setToken', token)
      store.commit('user/setMenu', JSON.parse(localStorage.getItem('ACCESSMENU')))
      store.commit('user/setUser', JSON.parse(localStorage.getItem('USERINFO')))
    }

  }
}
