
export const state = () => ({
  articleType:  null,
  buttRefresh: 0,
  buttShow: 0,
  butt:{
    refresh: 0,
    show: 0,
    data: {},
    type: ''
  }
})

export const mutations = {
  setArticleType (state, type) {
    state.articleType = type
    // setToken(token)
  },
  setbuttRefresh(state) {
    state.butt.refresh ++
  },
  setButtShow(state, payload) {
    state.butt.data= payload.data
    state.butt.type= payload.type
    state.butt.show ++
  },
}

