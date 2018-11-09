
export const state = () => ({
  articleType:  null,
})

export const mutations = {
  setArticleType (state, type) {
    state.articleType = type
    // setToken(token)
  },
}
