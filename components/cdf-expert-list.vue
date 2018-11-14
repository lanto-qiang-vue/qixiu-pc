<template>
<div class="cdf-expert-list" ref="expertList">
  <div class="head">
    <span><Icon type="ios-pie" /> 问答专家团</span>
    <span class="more">更多<Icon type="ios-arrow-forward" /></span>
  </div>
  <div id="expert-list">
    <ul>
      <li v-for="(item , key) in list" :key="key">
        <a class="pic">
          <img :src="item.photo">
        </a>
        <div class="info">
          <a class="name" href="/cdf/expert/1">{{item.name}}<span></span></a>
          <p>{{item.professor}}</p>
          <a class="ivu-btn ivu-btn-default ivu-btn-small" href="/cdf/expert/1">向TA提问</a>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "cdf-expert-list",
  data(){
    return{
      list:[],
      timer: null
    }
  },
  mounted(){
    this.$axios.$get('/expert/nostate/list').then((res) => {
      this.list= res.items
      setTimeout(()=>{
        if(document.querySelector("#expert-list ul").offsetHeight> document.querySelector("#expert-list").offsetHeight){
          this.list= this.list.concat(this.list)
          setTimeout(()=>{
            this.autoRoll()
          },500)
        }
      },500)
    })
  },
  methods:{
    autoRoll(){
      this.timer=setInterval( () => {
        this.rolls()
      },70)

      $('#expert-list').bind('mouseover', () => {
        clearInterval(this.timer)
      })

      $('#expert-list').bind('mouseout',() => {
        clearInterval(this.timer)
        this.timer=setInterval( () => {
          this.rolls()
        },70)
      })
    },
    rolls(){
      let dom= $("#expert-list ul")
      let y= dom.css('transform').replace(/[^0-9\-,]/g,'').split(',')[5]||0
      let y2= parseInt(y) - 1
      // console.log(y2)
      if(!dom || !dom.length) window.clearInterval(this.timer)
      if(!dom.hasClass('on')) dom.addClass('on')
      if(dom.outerHeight()/2 + parseInt(y)<=0){
        dom.removeClass('on');
        y2=0;
      }
      dom.css('transform','translateY('+ y2 +'px)')
    }
  },
  deactivated(){
    window.clearInterval(this.timer)
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    window.clearInterval(this.timer)
    next();
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    window.clearInterval(this.timer)
    next();
  },
  beforeDestroy(){
    console.log('beforeDestroy')
    window.clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
.cdf-expert-list{
  height: 100%;
  padding: 0 10px 10px 10px;
  background-color: white;
  border: 1px solid #d4d4d4;
  .head{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #eaeaea;
    vertical-align: middle;
    .more{
      float: right;
    }
  }
  #expert-list{
    height: calc(100% - 40px);
    overflow: hidden;
    ul{
      li{
        position: relative;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        .pic{
          width: 70px;
          height: 75px;
          display: block;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .info{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 10px 0 10px 75px;
          overflow: hidden;
          .name,p{
            display: block;
            line-height: 20px;
            margin-bottom: 5px;
          }
          p{
            color: #c2c2c2;
          }
        }
      }
    }
    ul.on{
      transition: all 0s;
    }
  }
}
</style>
