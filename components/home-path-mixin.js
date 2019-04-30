import {deepClone } from '@/static/util.js'
export default {
  computed:{
    isLogin(){
      return this.$store.state.user.token? true: false
    },
    sortRole(){
      if(!this.isLogin) return []
      let roles= deepClone(this.$store.state.user.userInfo.roles), sortRoles=[],
        menu= this.$store.state.user.accessMenu;
      let order=[
        {code:'admin', path: '/center/menu-manage'},
        {code:'guanlibumen', path: '/center/gov-home'},
        {code:'yunying', path: '/center/operator-home'},
        {code:'weixiuqiye', path: '/center/company-home'},
        {code:'jiaxiao', path: '/center/school-home'},
        {code:'jiaxiaolxr', path: '/center/school-home'},
        {code:'xiehui', path: '/center/note-manage'},
        {code:'zhuanjia', path: '/center/answer-questions'},
        {code:'chezhu', path: '/center/my-car-record'},
      ]

      for(let i in order){
        for(let j in roles){
          if(order[i].code== roles[j].code){
            roles[j].match= true
            sortRoles.push({
              ...roles[j],
              path: order[i].path
            })
          }
        }
      }
      for(let i in roles){
        if(!roles[i].match){
          for(let j in menu){
            let roleCodes= menu[j].roleCodes? JSON.stringify(menu[j].roleCodes): ''
            if(roleCodes &&roleCodes.indexOf(roles[i].code)>=0){
              let path= menu[j].children && menu[j].children.length ? menu[j].children[0].meta.path : menu[j].meta.path
              sortRoles.push({
                ...roles[i],
                path: path
              })
              break
            }
          }
        }
      }
      return sortRoles
    },
    accessMenu(){
      return this.$store.state.user.accessMenu
    },
    nowAccessId(){
      return this.$route.meta.accessId
    },
    rule(){
      return this.$store.state.user.nowRule
    }
  },

}
