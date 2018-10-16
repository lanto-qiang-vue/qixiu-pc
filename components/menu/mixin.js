// import CommonIcon from '_c/common-icon'
export default {
  // components: {
  //   CommonIcon
  // },
  methods: {
    showTitle (item) {
      return ((item.meta && item.meta.title) || item.meta.accessId)
    },
    showChildren (item) {
      // return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
      return item.children && (item.children.length > 0 || (item.meta && item.meta.showAlways))
    },
    getNameOrHref (item, children0) {
      return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].path : item.path)
    }
  }
}
