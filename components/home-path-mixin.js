export default {
  computed:{
    roleName(){
      let sortRoles= this.sortRole(true), roleName= ''
      for(let i in sortRoles){
        roleName= sortRoles[i].name
      }
      return roleName
    },
    centerHref(){
      let sortRoles= this.sortRole(false)
      return sortRoles.length? sortRoles[sortRoles.length-1].path: ''
    }
  },
  methods:{
    sortRole(flag){
      let roles= this.$store.state.user.userInfo.roles, sortRoles=[]
      let order=[
        {code:'chezhu', path: '/center/my-car-record'},
        {code:'weixiuqiye', path: '/center/company-home'},
        {code:'zhuanjia', path: '/center/answer-questions'},
        {code:'xiehui', path: '/center/account-info'},
        {code:'yunying', path: '/center/operator-home'},
        {code:'guanlibumen', path: '/center/gov-home'},
        {code:'admin', path: '/center/menu-manage'},
      ]
      for (let i in order){
        for (let j in roles){
          if(order[i].code== roles[j].code){
            flag? sortRoles.push(roles[j]) :sortRoles.push(order[i])
          }
        }
      }
      if(!sortRoles.length){
        if(flag){
          for(let i in roles){
            sortRoles.push(roles[i])
          }
        }else{
          let menu= this.$store.state.user.accessMenu
          if(menu.length){
            if(menu[0].leaf){
              sortRoles.push({path: menu[0].uri})
            }else{
              sortRoles.push({path: menu[0].children[0].uri})
            }
          }
        }
      }
      return sortRoles
    },
  }
}
