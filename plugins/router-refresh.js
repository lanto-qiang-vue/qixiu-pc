let matchRoute= (route)=>{
  let path= [
    'service-map',
  ]
  let refresh= false
  if(route.meta && route.meta.refresh) refresh= true
  for(let i in path){
    if(route.fullPath.indexOf(path[i])>=0) refresh= true
  }
  return refresh
}

export default ({ app }) => {
  // app.router.beforeEach((to, from, next) => {
  //   // console.log('router.beforeEach', to, from)
  //   if((matchRoute(to) || matchRoute(from)) && (from.fullPath!='/' || from.name=='index')){
  //     next(false)
  //     window.location.href= to.fullPath
  //   }else next()
  // })

  if (process.client){
    let mobileSafari = (/iPhone/i.test(navigator.platform) || /iPod/i.test(navigator.platform) || /iPad/i.test(navigator.userAgent)) && !!navigator.appVersion.match(/(?:Version\/)([\w\._]+)/);
      app.router.beforeEach((to, from, next) => {
        console.log(from)
        if(mobileSafari && (from.fullPath!='/' || from.name=='index')){
          next(false)
          window.location.href= to.fullPath
        }else next()
      })
  }
}
