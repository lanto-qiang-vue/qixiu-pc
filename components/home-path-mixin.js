export default {
  computed:{
    showNowRole(){
      let name= ''
      for(let i in this.sortRole){
        if(this.rule==  this.sortRole[i].code){
          name= this.sortRole[i].name
        }
      }
      return name
    },
    sortRole(){
      let roles= this.$store.state.user.userInfo.roles, sortRoles=[],
        menu= this.$store.state.user.accessMenu;
      let order=[
        {code:'admin', path: '/center/menu-manage'},
        {code:'guanlibumen', path: '/center/gov-home'},
        {code:'yunying', path: '/center/operator-home'},
        {code:'xiehui', path: '/center/note-manage'},
        {code:'zhuanjia', path: '/center/answer-questions'},
        {code:'weixiuqiye', path: '/center/company-home'},
        {code:'jiaxiao', path: '/center/school-home'},
        {code:'chezhu', path: '/center/my-car-record'},
      ]
      for (let i in roles ){
        let match= false
        for (let j in order){
          if(roles[i].code.indexOf(order[j].code)>=0){
            match= true
            sortRoles.push({
              ...roles[i],
              path: order[j].path
            })
            break
          }
        }
        if(!match){
          console.log('roles[i]', roles[i])
          for(let j in menu){
            let roleCodes= menu[j].roleCodes? JSON.stringify(menu[j].roleCodes): ''
            if(roleCodes &&roleCodes.indexOf(roles[i].code)>=0){
              // console.log('roleCodes,roles[i].code,menu[j]', roleCodes, roles[i].code, menu[j])
              sortRoles.push({
                ...roles[i],
                path: menu[j].children && menu[j].children.length ? menu[j].children[0].meta.path : menu[j].meta.path
              })
              break
            }
          }
          console.log('sortRoles', sortRoles)
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
  watch:{
    nowAccessId(val){
      let nowRule= this.getNowRole(this.getRoleCodes(this.accessMenu))
      this.$store.commit('user/setNowRule', nowRule)
    }
  },
  mounted(){
    let nowRule= this.getNowRole(this.getRoleCodes(this.accessMenu))
    this.$store.commit('user/setNowRule', nowRule)
  },
  methods:{
    getRoleCodes(list){
      //匹配当前路径的菜单参数
      let menu= list|| [], rule=[]
      if(menu.length && this.nowAccessId){
        for(let i in menu){
          if(menu[i].uri== this.nowAccessId){
            if(menu[i].roleCodes && menu[i].roleCodes.length){
              rule= menu[i].roleCodes
            }
            break
          }else if(menu[i].children && menu[i].children.length ){
            rule= this.getRoleCodes(menu[i].children)
            if(rule.length) break
          }
        }
      }
      return rule
    },
    getNowRole(list){
      //判断菜单的角色
      let role= '', sortRole= this.sortRole, nowRole= this.rule;
      for(let i in list){
        if(nowRole== list[i]) {
          role= nowRole
          break
        }
        for(let j in sortRole){
          if(list[i].indexOf(sortRole[j].code)>=0){
            role= sortRole[j].code
            break
          }
        }
      }
      return role
    },
  }
}
