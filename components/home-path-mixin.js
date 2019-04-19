export default {
  computed:{
    roleName(){
      let sortRoles= this.sortRole, roleName= ''
      for(let i in sortRoles){
        roleName= sortRoles[i].name
      }
      return roleName
    },
    centerHref(){
      let sortRoles= this.sortRole
      return sortRoles.length? sortRoles[sortRoles.length-1].path: ''
    },
    sortRole(){
      let roles= this.$store.state.user.userInfo.roles, sortRoles=[]
      let order=[
        {code:'chezhu', path: '/center/my-car-record'},
        {code:'weixiuqiye', path: '/center/company-home'},
        {code:'jiaxiao', path: '/center/school-home'},
        {code:'zhuanjia', path: '/center/answer-questions'},
        {code:'xiehui', path: '/center/account-info'},
        {code:'yunying', path: '/center/operator-home'},
        {code:'guanlibumen', path: '/center/gov-home'},
        {code:'admin', path: '/center/menu-manage'},
      ]
      for (let i in order){
        for (let j in roles){
          if(order[i].code.indexOf(roles[j].code)>=0){
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
  },
  methods:{

  }
}
