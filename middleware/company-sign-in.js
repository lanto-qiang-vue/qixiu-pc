import { Message, Modal, Spin } from 'iview';
import { signIn } from '~/static/util.js'

// export default (context) => {
export default ({route, store, $axios, redirect}) => {
  console.log('middleware: company-sign-in.js')
  // for(let key in context){
  //   console.log('company-sign-in:', key)
  // }
  signIn({route, store, $axios , Message, Modal, Spin}, ()=>{
    redirect('/')
  })
}

