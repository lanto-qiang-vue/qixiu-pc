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
        {code:'guanlibumen', path: '/center/gov-home'},
        {code:'yunying', path: '/center/operator-home'},
        {code:'admin', path: '/center/menu-manage'},
      ]
      for (let i in order){
        for (let j in roles){
          if(order[i].code== roles[j].code){
            flag? sortRoles.push(roles[j]) :sortRoles.push(order[i])
          }
        }
      }
      return sortRoles
    },
  }
}
