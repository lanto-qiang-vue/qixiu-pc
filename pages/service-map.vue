<template>
<div style="text-align: center">
  <div class="map-body">
    <div class="sub-title">
      <Breadcrumb>
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--<div class="map-frame" :class="{high:  search.type=='1'}">-->
    <div class="map-frame high">
    <div class="left">
      <Select v-model="search.type" placeholder="企业类别" @on-change="changeSelectAll" class="type">
        <Option value="1">维修企业</Option>
        <Option value="2">综合检测站</Option>
        <Option value="3">危运车辆维修</Option>
        <Option value="4">新能源汽车维修</Option>
        <Option value="5">施救牵引企业</Option>
      </Select>
      <!--<Input v-model="search.q" placeholder="输入企业名称/地址" :class="{inline: search.type=='1', search: true}"-->
      <Input v-model="search.q" placeholder="输入企业名称/地址" class="inline search"
             @on-enter="getCompList" clearable>
      <Button slot="append" icon="ios-search" @click="getCompList"></Button>
      </Input>
      <div class="select-bar" v-show="search.type=='1'">
        <Select v-model="search.sort" placeholder="企业排序" clearable @on-change="changeSelectAll">
          <Option v-for="(item, index) in sort" :value="item.value" :key="index">{{item.name}}</Option>
        </Select>
        <Select v-model="search.is4s" placeholder="企业类型" clearable @on-change="changeSelectAll">
          <Option v-for="(item, index) in maintainType" :value="item.value" :key="index">{{item.name}}</Option>
        </Select>
        <Select v-model="search.areaKey" placeholder="企业区域" clearable @on-change="changeSelectAll">
          <Option v-for="(item, key) in area" :value="item.key" :key="key">{{item.name}}</Option>
        </Select>
        <Select v-model="search.hot" placeholder="热门搜索" clearable class="brand">
          <Option v-for="(item, index) in hot" :value="item.value" :key="index">{{item.name}}</Option>
        </Select>
      </div>
      <div class="res">查询结果：共<span>{{total}}</span>条记录，请在企业列表或地图中选择查看</div>
      <ul>
        <li class="info" v-for="(item, key) in list" :key="key" @click.stop="openMapInfo(item.corpId)">
          <img :src="item.frontPhoto? item.frontPhoto:'/img/map/com-head.jpg'">
          <div class="list-right">
            <span class="name">{{item.corpName}}</span>
            <span>地址：{{item.corpAdd}}</span>
            <!--<span>电话：{{item.linkTel}}</span>-->
            <span>电话：******</span>
            <span v-show="item.apart>=0">距离：{{calcApart(item.apart)}}</span>
          </div>
          <div class="appraise" @click.stop="appraise(item.corpId, item.corpName)">我要评价</div>
        </li>
      </ul>
      <Page :total="total" :current="page" :page-size="limit"  class-name="paging"
            show-elevator show-total @on-change="changePage"></Page>
    </div>
    <div class="right" id="map"></div>

    <Spin v-show="loading" size="large" fix></Spin>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: "service-map",
  layout: 'common',
  // props:['type','tolimit'],
  head () {
    // console.log('head!!!')
    return {
      script: [
        { type: 'text/javascript', src: "https://webapi.amap.com/maps?v=1.4.10&key=21918a99a2f296a222b19106b8d4daa2"},
      ],
    }
  },
  data(){
    return{
      search:{
        type: '1',
        q: '',
        sort:'',
        areaKey: '',
        is4s: '',
        hot: '',
        lon: '',
        lat: ''
      },
      area: [],
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
      total: 0,
      limit: 4,
      page: 1,

      list:[],
      points:{},
      loading: false,

      map: null,
      geolocation: null
    }
  },
  mounted(){
    this.map= new AMap.Map('map',{
      zoom: 10,
    });

    // 同时引入工具条插件，比例尺插件和鹰眼插件
    AMap.plugin(['AMap.ToolBar',], () => {
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      this.map.addControl(new AMap.ToolBar({
        locate: false,
      }));
    });

    this.map.on('complete', () => {
      // 地图图块加载完成后触发
      this.getLocation()
    });

    this.getArea()
    this.getCompList()
  },
  methods:{
    getLocation(){
      if(this.map){
        this.map.plugin('AMap.Geolocation', () => {
          this.geolocation = new AMap.Geolocation({
            buttonPosition: 'RT',
            timeout: 5000,
          });
          this.map.addControl(this.geolocation);
          this.geolocation.getCurrentPosition((status,result)=>{
            if( status== 'complete'){
              this.map.setCenter(result.position)
              this.map.add(new AMap.Marker(result.position))
            }else{
              this.getCity()
            }
          });
        });
      }
    },
    getCity(){
      this.map.plugin('AMap.CitySearch', () => {
        let city = new AMap.CitySearch();
        city.getLocalCity((status, result)=>{
          console.log('getLocalCity', status, result)
          if(status== 'complete'){
            this.map.setCity(result.city, ()=>{
              console.log('this.map.getCenter()',this.map.getCenter())
              this.map.add(new AMap.Marker( this.map.getCenter()))
            })
          }
        })
      });
    },
    getArea(){
      this.$axios.$post('/area/list', {
        parentCode: '310000'
      }).then( (res) => {
        this.area= res.items
      })
    },
    getCompList(){
      let query='?q='+ this.search.q + '&sort='+ this.search.sort+ '&page='+ (this.page-1) +','+this.limit
      if(this.search.lon) query+='&point='+this.search.lon+','+this.search.lat
      let fq='', is4s=''
      if(this.search.area) fq= '&fq=areaKey:'+ this.search.area
      if(this.search.is4s){
        is4s= (this.search.is4s=='yes' ? 'kw:4s': '-kw:4s')
        if(fq) fq+= '+AND+' + is4s
        else fq= '&fq=kw:'+ is4s
      }
      this.$axios({
        baseURL: '/repair',
        url: '/micro/search/company'+ query,
        method: 'get',
      }).then( (res) => {
        this.list= res.data.content
        this.total= res.data.totalElements
      })
    },
    changeSelectAll(){

    },
    openMapInfo(){

    },
    calcApart(ap){
      let flap= parseFloat(ap)
      if(flap>=1000){
        return (flap/1000).toFixed(1)+' km'
      }else{
        return ap+' 米'
      }
    },
    changePage(){

    }
  }
}
</script>

<style scoped lang="less">
  .map-body{
    min-width: 800px;
    max-width: 1200px;
    display: inline-block;
    text-align: left;
    width: 100%;
    padding: 0 15px;
  }
  .sub-title{
    line-height: 38px;
    padding: 0 10px;
    background-color: white;
    border-bottom: 2px solid #4ba7f5;
    /*min-width: 800px;*/
    /*max-width: 1200px;*/
    /*display: inline-block;*/
    /*text-align: left;*/
    width: 100%;
  }
  .map-frame{
    width: 100%;
    /*padding: 10px;*/
    overflow: hidden;
    position: relative;
    /*min-width: 800px;*/
    /*max-width: 1200px;*/
    /*display: inline-block;*/
    /*text-align: left;*/
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    .left{
      float: left;
      position: relative;
      padding: 5px;
      background: #FFF;
      z-index: 888;
      width: 380px;
      .select-bar{
        display: flex;
        margin-top: 10px;
        .ivu-select{
          width: 25%;
          padding-right: 5px;
        }

      }
      .res{
        text-align: center;
        height: 40px;
        line-height: 40px;
        span{
          color: red;
        }
      }
      ul{
        li.info:hover{
          border: 1px solid #1E9FFF;
        }
        li.info{
          overflow: hidden;
          border: 1px solid #ededed;
          margin-bottom: 5px;
          position: relative;
          img{
            float: left;
            margin: 8px;
            width: 100px;
            height: 70px;
          }
          .list-right{
            float: left;
            width: 250px;
            margin-top: 9px;
            font-size: 12px;
            line-height: 18px;
            position: relative;
            span{
              /*color: #020202;*/
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              display: block;
              cursor: default;
            }
            .name{
              background: url(/img/map/com-icon.png) no-repeat left center;
              color: #252525;
              padding-left: 20px;
              background-size: 15px;
            }
          }
          .appraise{
            position: absolute;
            right: 10px;
            bottom: 10px;
            background-color: white;
            color: #1E9FFF;
            border: 1px solid #1E9FFF;
            font-size: 12px;
            padding: 2px 10px;
            border-radius: 2px;
            cursor: pointer;
          }
        }
      }
    }
    .right{
      height: 580px;
      border-left: 1px solid #e6e6e6;
      border-left: 0;
      position: relative;
      margin-left: 380px;
      min-width: 400px;
    }
    .rates{
      width: 500px;
      height: 450px;
      position: absolute;
      margin: auto;
      background-color: white;
      border-radius: 10px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 890;
      border:  1px solid #e6e6e6;
      display: none;
      i{
        font-size: 20px;
        width: 500px;
        text-align: right;
        display: block;
        padding-right: 10px;
        line-height: 20px;
        height: 25px;
        border-bottom:  1px solid #e6e6e6;
        cursor: pointer;
      }
    }
  }
  .map-frame.high{
    .left{
      .type{
        width: 30%;
        padding-right: 5px;
      }
      .inline{
        width: 69%;
        display: inline-table;
      }
      .select-bar{

      }
    }
    .right{
      /*height: 800px;*/
    }
  }
</style>
<style lang="less">
  .paging {
    text-align: center;
    li{
      margin: 2px 0;
    }
  }
  .search .ivu-input-icon-clear{
    right: 40px;
  }
  .map-frame .brand .ivu-select-dropdown{
    overflow-x: hidden;
  }
  .map-frame .right{
    .info{
      padding: 10px;
      .img{
        float: right;
        width: 170px;
        height: 140px;
        img{
          width: 100%;
        }
      }
      ul {
        width: 300px;
        li{
          line-height: 30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .button{
      padding: 10px;
      text-align: right;
      a{
        display: inline-block;
        height: 35px;
        line-height: 35px;
        color: #1E9FFF;
        border: 1px solid #1E9FFF;
        font-size: 14px;
        border-radius: 2px;
        cursor: pointer;
        padding: 0 10px;
        margin-left: 10px;
      }
      .blue{
        background-color: #1e9fff;
        color: white;
      }
    }
  }
  .map-frame .right .BMapLib_SearchInfoWindow table td:first-child{
    width: 40px;
  }
  .map-frame .right .BMapLib_SearchInfoWindow table td:last-child{
    width: 120px;
  }

  .ivu-spin{
    z-index: 889;
    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
    }
  }

</style>
