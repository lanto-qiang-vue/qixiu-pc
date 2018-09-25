export default function ({ $axios, redirect }) {
  // $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
  $axios.onResponse(response => {
    console.log('Interceptors:',response.data)
  })

}
