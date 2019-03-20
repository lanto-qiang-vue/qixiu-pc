<template>
<ul class="change-company-data">
    <li v-for="item in row" :key="item.changeItem">
        <div class="label">
            <span class="expand-key">变更项: </span>
            <span class="expand-value" >{{ item.changeItem }}</span>
        </div>
        <div class="before">
            <span class="expand-key">变更前: </span>
            <span class="expand-value"><show-img :datass="item" :before="true"></show-img></span>
        </div>
        <div class="after">
            <span class="expand-key">变更后: </span>
            <span class="expand-value" ><show-img :datass="item" :before="false"></show-img></span>
        </div>
    </li>
</ul>
</template>
<script>
export default {
  name:'change-company-data',
    props: {
        row: Array
    },
  components: {
    'showImg':{
      props: ['datass', 'before'],
      render: function(h) {
        console.log('datass', this.datass)
        let val =this.before? this.datass.beforeChange: this.datass.afterChange
        switch (this.datass.changeItem){
          case '是否通过环保部门专项整治图片地址':
          case '通过安全生产标准化达标认证图片地址':
          case '通过ISO质量管理体系认证图片地址':
          case '营业执照':
          case '道路运输经营许可证':
          case '门店门头照':
          case '全国诚信维修企业图片地址':
          case '区级以上荣誉图片地址':{
            let imgs= val? val.split(','):[], arr=[]
            for(let i in imgs){
              arr.push(h('img',{
                attrs:{src: imgs[i]},
                directives: [{name: 'img'}],
                style: {
                  width: '30px',
                  height: '30px',
                  marginLeft: '10px',
                },
              }))
            }
            // console.log('arr', arr)
            return h('span',arr)
            break
          }
          default:{
            return h('span', val)
          }
        }

      },

    }
  },
  methods:{

  }
};
</script>
<style scoped lang="less">
.change-company-data{
  li{
    overflow: hidden;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
    margin-top: 10px;
    &:last-child{
      border: 0;
    }
    >div{
      float: left;
      /*font-size: 0;*/
    }
    .label{
      width: 30%;
    }
    .before, .after{
      width: 35%;
    }
    img{

    }
  }

}
</style>
