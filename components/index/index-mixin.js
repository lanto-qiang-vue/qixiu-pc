export default {
  props:['banners', 'swiperOption', 'showSwiper', 'information'],
  data(){
    return{
      search:{
        type: '164',
        q: '',
        sort:'',
        area: '',
        is4s: '',
        hot: '',
      },
      sort:[
        {name: '默认', value: ''},
        {name: '距离优先', value: 'distance'},
        {name: '好评优先', value: 'rating desc,distance asc'},
      ],
      maintainType:[
        {name: '全部', value: ''},
        {name: '4S店', value: 'yes'},
        {name: '维修厂', value: 'no'},
      ],
      hot:[
        {name: '默认', value: ''},
        {name: '宝马', value: '宝马'},
        {name: '奥迪', value: '奥迪'},
        {name: '迈巴赫', value: '迈巴赫'},
        {name: '保时捷', value: '保时捷'},
        {name: '玛莎拉蒂', value: '玛莎拉蒂'},
        {name: '年检', value: '年检'},
        {name: '保养', value: '保养'},
        {name: '车轮', value: '车轮'},
        {name: '发动机', value: '发动机'},
        {name: '汽车美容', value: '汽车美容'},
      ],
    }
  },
  methods:{
    query(){
      this.$router.push({path:'/service-map', query: this.search})
    },
    selectHot(val){
      if(val) this.search.q= val
    },
  }
}
