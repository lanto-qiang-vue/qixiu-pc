// import { setToken, getToken, setUser, getUser, setMenu, getMenu } from '@/static/util'
// import router from '@/static/router'

export const state = () => ({
  token:  '',
  accessMenu:  '',
  userInfo:  '',
  nowRule: ''
})

// export const getters = {
//   menuList: (state, getters, rootState) => {
//     // console.log(rootState)
//     return getMenuByRouter(routers, rootState.user)
//   }
// }

export const mutations = {
  setToken (state, token) {
    state.token = token
    // setToken(token)
  },
  setUser (state, info) {
    state.userInfo = info
    // setUser(info)
  },
  setMenu (state, info) {
    state.accessMenu = info
    // setMenu(info)
  },
  setNowRule (state, name) {
    state.nowRule = name
  }
}
