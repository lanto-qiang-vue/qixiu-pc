import Vue from "vue"

Vue.filter("FormatArticle", function (value, title) {
  let value2= title || '',
    content= value.replace(/<\/?.+?>/g,"").replace(/\ +/g,"").replace(/[ ]/g,"").replace(/[\r\n]/g,"").replace(/&nbsp;/ig, "");
  // console.log(content)
  return content|| value2
})
