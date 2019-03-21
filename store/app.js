
export const state = () => ({
  articleType:  null,
  butt: 0
})

export const mutations = {
  setArticleType (state, type) {
    state.articleType = type
    // setToken(token)
  },
  setButt(state) {
    state.butt ++
  },
}

