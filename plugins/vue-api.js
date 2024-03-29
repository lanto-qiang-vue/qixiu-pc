import Vue from "vue"
import { formatDate } from '~/static/tools.js'

Vue.filter("FormatArticle", function (value, title) {
  let value2= title || '',
    content= value? value.replace(/<\/?.+?>/g,"").replace(/\ +/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,"").replace(/&nbsp;/ig, "") :'';
  // console.log(content)
  return content|| value2
})

Vue.filter("FormatDate", function (value, format) {
  
  return formatDate(value, format||'')
})
