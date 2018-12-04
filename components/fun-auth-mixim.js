let match= (id, list)=>{
  let functions= []
  for(let i in list){
    if(list[i].uri== id){
      functions= list[i].functions
      break
    }else if(list[i].children && list[i].children.length){
      functions= match(id, list[i].children)
      if(functions.length) break
    }
  }
  return functions
}

let access= (name, route, store)=>{
  let flag= false, functions= []
  if(route.meta && route.meta.accessId){
    functions= match(route.meta.accessId, store.state.user.accessMenu)
  }

  for(let i in functions){
    if(functions[i].btnId== name){
      
      flag= true
    }
  }
  return flag
}

export default {
  data(){
    return{
      isMounted: false
    }
  },
  computed:{
    accessBtn(){
      return (name)=>{
        let flag= this.isMounted && access(name, this.$route, this.$store)
        // if(flag) console.log(name,'accessBtn: true')
        // else console.log(name,'accessBtn: false')
        return flag
      }
    }
  },
  mounted(){
    this.isMounted= true
  },
}
