
export const state = () => ({
  articleType:  null,
  butt:{
    refresh: 0,
    show: 0,
    data: {},
    type: ''
  },
  area:{
    lock: 0,
    list: []
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
  setAreaLock(state) {
    state.area.lock ++
  },
  setAreaList(state, list){
    state.area.list = list
  }
}

