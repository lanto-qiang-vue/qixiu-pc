import { checkAuth } from '~/static/util.js'
export default function ({ route, store, redirect, error }) {
  // console.log('check-auth', route)

  // checkAuth({ route, store }, ()=>{
  //   redirect({
  //     path: '/login',
  //     query: { redirect: route.fullPath }
  //   })
  // },()=>{
  //   error({
  //     statusCode: 403,
  //     message: '用户无权限访问此页面'
  //   })
  // })
}
