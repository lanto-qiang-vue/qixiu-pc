export default {
  computed:{
    roleName(){
      let rules= this.sortRole
      return rules.length? rules[0].name: ''
    },
    centerHref(){
      let rules= this.sortRole
      return rules.length? rules[0].path: ''
    },
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
      let roles= this.$store.state.user.userInfo.roles, sortRoles=[]
      let order=[
        {code:'admin', path: '/center/menu-manage'},
        {code:'guanlibumen', path: '/center/gov-home'},
        {code:'yunying', path: '/center/operator-home'},
        {code:'xiehui', path: '/center/account-info'},
        {code:'zhuanjia', path: '/center/answer-questions'},
        {code:'weixiuqiye', path: '/center/company-home'},
        {code:'jiaxiao', path: '/center/school-home'},
        {code:'chezhu', path: '/center/my-car-record'},
      ]
      for (let i in order){
        for (let j in roles){
          if(roles[j].code.indexOf(order[i].code)>=0){
            sortRoles.push({
              ...roles[j],
              path: order[i].path
            })
          }
        }
      }
      if(!sortRoles.length){
        let menu= this.$store.state.user.accessMenu, path=""
        if(menu.length){
          path= menu[0].meta? menu[0].meta.path: menu[0].children[0].meta.path
        }
        for(let i in roles){
          sortRoles.push({
            ...roles[i],
            path
          })
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
      let role= '', sortRole= this.sortRole
      for(let i in sortRole){
        let flag= false
        for(let j in list){
          if(list[j].indexOf(sortRole[i].code)>=0){
            role= sortRole[i].code
            flag= true
            break
          }
        }
        if(flag) break
      }
      return role
    },
  }
}
