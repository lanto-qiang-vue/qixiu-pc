<template>
<basic-container>
<div style="text-align: center">
  <div class="service-map-body">
    <div class="sub-title">
      <Breadcrumb>
        <BreadcrumbItem to="/">主页</BreadcrumbItem>
        <BreadcrumbItem>查选服务</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!--<div class="map-frame" :class="{high:  search.type=='1'}">-->
    <div class="map-frame high">
    <div class="left">
      <Select v-model="search.type" placeholder="企业类别" @on-change="changeType" class="type">
        <Option value="164">维修企业</Option>
        <Option value="166">综合检测站</Option>
        <Option value="214">危运车辆维修</Option>
        <Option value="215">新能源汽车维修</Option>
        <Option value="213">施救牵引企业</Option>
        <Option value="300">驾校</Option>
      </Select>
      <!--<Input v-model="search.q" placeholder="输入企业名称/地址" :class="{inline: search.type=='1', search: true}"-->
      <Input v-model="search.q" placeholder="输入名称/地址" class="inline search" clearable
             @on-enter="getCompList"  @on-change="$refs.hot.clearSingleSelect(); page=1" >
      </Input>
      <Button type="primary" @click="getCompList">搜索</Button>
      <div class="select-bar" v-show="search.type=='164'">
        <Select  v-model="search.sort" placeholder="企业排序" clearable @on-change="changeSelectAll">
          <Option v-for="(item, index) in sort" :value="item.value" :key="index">{{item.name}}</Option>
        </Select>
        <Select v-model="search.is4s" placeholder="企业类型"  clearable @on-change="changeSelectAll">
          <Option v-for="(item, index) in maintainType" :value="item.value" :key="index">{{item.name}}</Option>
        </Select>
        <Select v-model="search.area" placeholder="所在区域" clearable @on-change="changeSelectAll">
          <Option v-for="(item, key) in area" :value="item.code" :key="key">{{item.name}}</Option>
        </Select>
        <Select v-model="search.hot" placeholder="热门搜索"  clearable class="brand" @on-change='selectHot' ref="hot">
          <Option v-for="(item, index) in hot" :value="item.value" :key="index">{{item.name}}</Option>
        </Select>
      </div>
      <div class="select-bar" v-show="search.type=='300'">
        <Select  v-model="search.sortSchool" placeholder="驾校排序" clearable @on-change="changeSelectAll">
          <Option v-for="(item, index) in sortSchool" :value="item.value" :key="index">{{item.name}}</Option>
        </Select>
        <Select  v-model="search.bizScope" placeholder="驾照类型" clearable @on-change="changeSelectAll">
          <Option v-for="(item, index) in bizScope" :value="item.value" :key="index">{{item.name}}</Option>
        </Select>
        <Select v-model="search.area" placeholder="所在区域" clearable @on-change="changeSelectAll">
          <Option v-for="(item, key) in area" :value="item.code" :key="key">{{item.name}}</Option>
        </Select>
        <Select v-model="search.base" placeholder="训练基地" clearable filterable @on-change="changeSelectAll">
          <Option v-for="(item, key) in base" :value="item.getExtData().name.replace('驾校基地','')" :key="key">{{item.getExtData().name}}</Option>
        </Select>
      </div>
      <div class="res">查询结果：共<span>{{total}}</span>条记录，请在企业列表或地图中选择查看</div>
      <ul>
        <li class="info" v-for="(item, key) in list" :key="key" @click.stop="openMapInfo(item.sid)">
          <img :src="item.pic? item.pic.split(',')[0]:'/img/map/com-head.jpg'">
          <div class="list-right" v-if="item.type!='300'">
            <span class="name">{{item.name}}</span>
            <span>地址：{{item.addr}}</span>
            <span>电话：{{item.tel}}</span>
            <span>距离：{{calcApart(item.distance)}}</span>
          </div>
          <div class="list-right" v-else>
            <span class="name type300">{{item.name}}</span>
            <span>报名地址：{{item.addr}}</span>
            <!--<span>训练基地：{{item.serveSupports.join(',')}}</span>-->
            <span>训练基地：
              <label v-if="item.tag" v-for="(item2, index) in item.tag.split(' ')" :key="index">
                <a @click.stop="goBase(item2)">{{item2 }}</a>{{index<(item.tag.split(' ').length-1)? ',': ''}}
              </label>
            </span>
            <span>培训驾照类型：{{item.bizScope}}</span>
            <Tag color="orange">{{item.grade=='N' ?'未评级' :item.grade}}</Tag>
          </div>
          <!--<div class="appraise" @click.stop="appraise(item.corpId, item.corpName)">我要评价</div>-->
        </li>
      </ul>
      <div class="map-page">
        <Page :total="total" :current="page" :page-size="limit"  class-name="paging"
              show-elevator show-total @on-change="changePage"></Page>
      </div>
    </div>
    <!--<div class="right" id="map"></div>-->
    <div class="right" id="comp-map"></div>


    <Spin v-show="loading" size="large" fix></Spin>
  </div>
  </div>
</div>
</basic-container>
</template>

<script>
import BasicContainer from '~/components/basic-container.vue'
import { formatArticle } from '@/static/util.js'
import Vue from 'vue'
export default {
  name: "service-map",
  layout: 'layout-root',
  components: {
    BasicContainer
  },
  // props:['type','tolimit'],
  // head () {
  //   // console.log('head!!!')
  //   return {
  //     script: [
  //       { type: 'text/javascript', src: "https://webapi.amap.com/maps?v=1.4.10&key=21918a99a2f296a222b19106b8d4daa2"},
  //     ],
  //     changed (newInfo, addedTags, removedTags) {
  //       console.log('head.changed.addedTags', addedTags)
  //
  //       this.init()
  //     }
  //   }
  // },
  data(){
    return{
      search:{
        type: '164',
        q: '',
        sort:'',
        area: '',
        is4s: '',
        hot: '',
        bizScope: 'C1',
        sortSchool: '',
        base: '',
        lng: 121.480236,
        lat: 31.236301
      },
      area: [],
      sort:[
        {name: '默认', value: ''},
        {name: '距离优先', value: 'distance'},
        {name: '好评优先', value: 'rating desc,distance asc'},
      ],
      sortSchool: [
        {name: '默认', value: ''},
        {name: '距离优先', value: 'distance'},
        {name: '评级优先', value: 'rating desc,distance asc'},
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
      bizScope: [
        {name: '全部', value: ''},
        {name: 'A1', value: 'A1'},
        {name: 'A2', value: 'A2'},
        {name: 'A3', value: 'A3'},
        {name: 'B1', value: 'B1'},
        {name: 'B2', value: 'B2'},
        {name: 'C1', value: 'C1'},
        {name: 'C2', value: 'C2'},
        // {name: 'C3', value: 'C3'},
        // {name: 'C4', value: 'C4'},
        {name: 'D', value: 'D'},
        {name: 'E', value: 'E'},
        {name: 'F', value: 'F'},
        // {name: 'M', value: 'M'},
        // {name: 'N', value: 'N'},
        // {name: 'P', value: 'P'},
      ],
      base:[

      ],
      total: 0,
      limit: 4,
      page: 1,

      list:[],
      pointList: [],
      loading: false,

      map: null,
      geolocation: null,
      markerClusterer: null,
      markers: null,

      infoWindow:{
        garage: {
          type: ['164','166','214','215','213'],
          el: null,
          data: {}
        },
        school: {
          type: ['300'],
          el: null,
          data: {}
        },
        base: {
          type: ['301'],
          el: null,
          data: {}
        }
      }
    }
  },
  computed:{
    nowType(){
      return this.search.type
    }
  },
  watch:{
    nowType(){
      this.$Spin.show();
      this.map.clearMap()
    }
  },
  mounted(){
    console.log('this.extend', this.$extend)
    // console.log('Vue.compile', Vue.compile)
    $.getScript('https://webapi.amap.com/maps?v=1.4.10&key=21918a99a2f296a222b19106b8d4daa2',()=>{
      this.init()
    });
  },
  // beforeRouteLeave (to, from, next) {
  //   // 导航离开该组件的对应路由时调用
  //   // 可以访问组件实例 `this`
  //   // console.log(to)
  //   //
  //   // console.log('beforeRouteLeave-this.markerClusterer', this.markerClusterer)
  //   // this.markerClusterer.clearMarkers();
  //   // this.markerClusterer.setMap(null);
  //   // this.markerClusterer= null
  //   // this.map.clearMap()
  //   // this.map.destroy()
  //   // this.map= null
  //   next(false)
  //   window.location.href= to.fullPath
  // },
  methods:{
    init(){
      this.$Spin.show();
      // console.log('this.map', this.map)
      // console.log('map1', window.map1)
      this.map= new AMap.Map('comp-map',{
        keyboardEnable: false,
        scrollWheel: false,
        zoom: 14,
      });
      // console.log('this.map2', this.map)
      // window.map1= this.map

      // 同时引入工具条插件，比例尺插件和鹰眼插件
      AMap.plugin(['AMap.ToolBar',], () => {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        this.map.addControl(new AMap.ToolBar({
          locate: false,
        }));
      });

      this.map.on('complete', () => {
        // 地图图块加载完成后触发
        // console.log('this.map.on(complete)')
        this.getLocation()
      });

      for(let key in this.$route.query){
        this.search[key]= this.$route.query[key]
      }
      // console.log(this.$route.query)
      this.getArea()
      this.getBase()
      this.initInfoWindow()
    },
    getLocation(){
      if(this.map){
        AMap.plugin('AMap.Geolocation', () => {
          this.geolocation = new AMap.Geolocation({
            buttonPosition: 'RB',
            timeout: 1000,
          });
          // this.map.addControl(this.geolocation);
          this.geolocation.getCurrentPosition();
          AMap.event.addListener(this.geolocation, 'complete', (result)=>{
            this.map.setCenter(result.position)
            this.map.add(new AMap.Marker(result.position))
            this.search.lng= result.position.lng
            this.search.lat= result.position.lat
            this.getCompList()
            this.initPiontList()
          });//返回定位信息
          AMap.event.addListener(this.geolocation, 'error', (err)=>{
            this.getCity()
          });      //返回定位出错信息
        });
      }
    },
    getCity(){
      AMap.plugin('AMap.CitySearch', () => {
        let city = new AMap.CitySearch();
        city.getLocalCity((status, result)=>{
          console.log('getLocalCity', status, result)
          if(status== 'complete'){
            this.map.setCity(result.city, ()=>{
              let center= this.map.getCenter()
              // console.log('this.map.getCenter()', center)
              this.map.add(new AMap.Marker( center))
              // console.log('this.map.add(new AMap.Marker( center))')
              this.search.lng= center.lng
              this.search.lat= center.lat
              this.getCompList()
              this.initPiontList()
            })
          }else{
            let center= new AMap.LngLat(this.search.lng, this.search.lat)
            this.map.panTo(center)
            this.map.add(new AMap.Marker( {
              position: center
            }))
            this.getCompList()
            this.initPiontList()
          }
        })
      });
    },
    getArea(){
      this.$axios.$get('/area/query').then( (res) => {
        this.area= res.items
      })
    },
    getBase(){
      if(this.search.type== '300' ){
        if(!this.base.length){
          this.$axios({
            baseURL: '/repair',
            url: '/micro/search/company?fl=sid,type,name,addr,lon,lat&q=&page=0,100&point=31.236301,121.480236&fq=status:1+AND+type:301',
            method: 'get',
          }).then( (res) => {
            // this.base= res.data.content
            this.renderBase(res.data.content)
            this.renderMap()
          })
        }else {
          this.map.add(this.base)
        }
      }


    },
    getCompList(){
      this.$Spin.show();
      let query= this.calcQuery()
      this.$axios({
        baseURL: '/repair',
        url: '/micro/search/company'+ query,
        method: 'get',
      }).then( (res) => {
        this.list= res.data.content
        this.calcPointList(res.data.content)
        this.total= res.data.totalElements
        this.$Spin.hide();
      })
    },
    calcQuery(limit){
      let is164= this.search.type== 164
      let is300= this.search.type== 300
      let query='?fl=pic,type,sid,name,addr,tel,distance,kw,lon,lat,bizScope,brand,category,grade,tag'+
        '&q='+ this.search.q +
        '&page='+ (this.page-1) +','+ (limit ||this.limit)
      if(is164) query+= ('&sort=_score desc,'+ (this.search.sort||'distance'))
      if(is300) query+= ('&sort=_score desc,'+ (this.search.sortSchool||'distance'))
      if(this.search.lng) query+=('&point='+this.search.lat+','+this.search.lng)
      let fq='&fq=status:1+AND+type:'+ this.search.type, is4s=''
      if(is300 && this.search.bizScope) fq+= ('+AND+kw:'+  this.search.bizScope)
      if(is300 && this.search.base) fq+= ('+AND+tag:'+  encodeURI(this.search.base))
      if(this.search.area && (is164 || is300)) fq+= '+AND+areaKey:'+ this.search.area
      if(this.search.is4s && is164){
        is4s= (this.search.is4s=='yes' ? 'kw:4s': '-kw:4s')
        fq+= '+AND+' + is4s
      }
      query += fq

      return query
    },
    initPiontList(){
      let query= this.calcQuery(50)
      this.$axios({
        baseURL: '/repair',
        url: '/micro/search/company'+ query,
        method: 'get',
      }).then( (res) => {
        this.$Spin.hide();
        this.calcPointList(res.data.content)
      })
    },
    calcPointList(list){
      let hasPoint= false
      let points= this.pointList
      for(let i in list){
        if(list[i].kw &&list[i].kw.indexOf('4s')>=0) list[i].is4s= true
        hasPoint= false
        for(let j in points){
          if(points[j].sid == list[i].sid){
            hasPoint= true
            break
          }
        }
        if(!hasPoint) this.pointList.push(list[i])
      }
      this.renderMap()
    },
    renderBase(baseList){
      let iconBase = new AMap.Icon({
        image: "/img/map/icon-base.png",
        size: new AMap.Size(30, 30),
        // imageOffset: new AMap.Size(11, 11),
        imageSize: new AMap.Size(30, 30),
      });
      let markers= []

      for (let i in baseList){
        let lngLat= new AMap.LngLat(baseList[i].lon, baseList[i].lat)
        let marker= new AMap.Marker({
          icon: iconBase,
          position: lngLat,
          extData: baseList[i],
          zIndex: 110
        })
        marker.on('click', (e) => {
          // console.log('e.target', e.target)
          // this.infoWindow.base.data= e.target.getExtData()
          // this.infoWindow.base.el.open(this.map, e.target.getPosition())

          this.openInfoWindow(e.target)
        })
        markers.push(marker)
      }
      this.base= markers

      this.map.add(markers)

    },
    initInfoWindow(){
      let self= this
      let garage= this.infoWindow.garage
      let school= this.infoWindow.school
      let base= this.infoWindow.base
      let template='', component= null
      AMap.plugin('AMap.AdvancedInfoWindow', () => {

        template='<div class="map-content school">'+
                '<div class="title">{{title}}</div>'+
                '<div class="body">' +
                '<img class="head-img" v-img :src="datas.pic? datas.pic.split(\',\')[0]:\'/img/map/com-head.jpg\'"/>'+
                '<ul>' +
                '<li><span>驾校名称：</span>{{datas.name}}</li>' +
                '<li><span>驾校评级：</span>{{datas.creditLevel=="N" ? "未评级" :datas.creditLevel}}</li>' +
                '<li><span>报名地址：</span>{{datas.address}}</li>' +
                '<li><span>报名电话：</span>{{tel}}<a v-show="!tel" @click="toLogin">登录后查看</a></li>' +
                '<li><span>培训驾照类型：</span>{{datas.trainingScope}}</li>' +
                '<li><span>训练基地：</span><span class="base-tag">' +
                '<a v-for="(item, index) in tags" :key="index" @click="toBase(item.value)">{{item.label}}</a>' +
                '</span></li>' +
                '<li><span>驾校风采：</span>' +
                  '<span class="intro" style="-webkit-box-orient:vertical;-moz-box-orient: vertical;">{{datas.about | FormatArticle("暂无")}}</span>' +
          '<a class="more" v-show="formatArticle(datas.about)" @click="goMore">更多</a>'+
                '</li>' +
                '</ul>'+
                '<div class="sign-up"><h2>学车报名</h2>'+
                '<Form ref="signForm" :model="search" :rules="rule" :label-width="15"><FormItem label=" " prop="name"><Input type="text" v-model="search.name" placeholder="输入联系人"></Input></FormItem><FormItem label=" " prop="tel"><Input type="text" v-model="search.tel" placeholder="输入手机号" :maxlength="11"></Input></FormItem><FormItem label=" " prop="bizScope"><Select transfer v-model="search.bizScope" placeholder="驾照类型" clearable> <Option v-for="(item, index) in bizScope" :value="item.value" :key="index">{{item.name}}</Option> </Select></FormItem><FormItem ><Button type="primary" @click="apply" long>预约学车</Button></FormItem></Form>'+
                '</div>'+
                '</div>'+
                '</div>'

               component= Vue.extend({
                template: template,
                data(){
                  let rule= { required: true, message:'必填项不能为空'}
                  let validate = (rule, value, callback) => {
                    let p1 = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
                    let p2=/0\d{2,3}-\d{7,8}/;
                    if (p2.test(value)||p1.test(value)||!value) {
                      callback();
                    }else{
                      callback(new Error('请输入正确的号码'));
                    }
                  };
                  return{
                    search:{
                      name: '',
                      tel: '',
                      bizScope: ''
                    },
                    rule:{
                      // name: [rule],
                      tel: [rule,
                        { len:11, validator:validate, message: '请输入正确的号码'}
                      ],
                      // bizScope: [rule],
                    },
                  }
                },
                computed:{
                  bizScope(){
                    let arr= this.datas.trainingScope?this.datas.trainingScope.split(','): [], biz=[]
                    for(let i in arr){
                      biz.push({
                        value: arr[i],
                        name: arr[i]
                      })
                    }
                    return biz
                  },
                  datas(){
                    return self.infoWindow.school.data
                  },
                  tags(){
                    let baseTag= [], tags= this.datas.drivingBase? this.datas.drivingBase.split(','): []
                    // console.log('tags', tags)
                    for(let i in tags){
                      for(let j in self.base){
                        let baseInfo= self.base[j].getExtData()
                        if(baseInfo.name.indexOf(tags[i])>=0){
                          baseTag.push({
                            label: baseInfo.name+'('+baseInfo.addr+')',
                            value: tags[i]
                          })
                        }
                      }
                    }
                    if(!baseTag.length){
                      baseTag=[{
                        label: this.datas.drivingBase,
                        value: ''
                      }]
                    }
                    return baseTag
                  },
                  tel(){
                    return self.$store.state.user.token? (this.datas.phoneNo||' '): ''
                  },
                  title(){
                    return (this.datas.simpleName)? (this.datas.simpleName+'驾校('+
                      (this.datas.creditLevel=='N'?'未评':this.datas.creditLevel)+'级)'): this.datas.name
                  }
                },
                methods:{
                  formatArticle: formatArticle,
                  toBase: self.goBase,
                  toLogin(){
                    self.$router.push({
                      path: '/login',
                      query: { redirect:  self.$route.fullPath }
                    })
                  },
                  goMore(){
                    // self.$router.push({
                    //   path: '/article/'+this.datas.id,
                    //   query: { type: 'school' }
                    // })
                    window.open('/article/'+this.datas.id +'?type=school', '_blank');
                  },
                  apply(){
                    // console.log(this.search.bizScope)
                    this.$refs.signForm.validate((valid) => {
                      if (valid) {
                        self.$axios.post('/training/driving/register', {
                          "category": this.search.bizScope,
                          "name": this.search.name,
                          "phoneNo": this.search.tel,
                          "schoolId": this.datas.id,
                          "schoolName": this.datas.name
                        }).then( (res) => {
                          if(res.data.code=='0'){
                            // self.$Message.success('恭喜您报名成功！驾校将及时联系您。')
                            this.$refs.signForm.resetFields()
                            this.$Modal.success({
                              title: '报名成功',
                              content: '恭喜您报名成功！驾校将及时联系您。'
                            })
                          }
                        })
                      } else {}
                    })
                  }
                }
              })

              school.el = new AMap.AdvancedInfoWindow({
                // panel: 'panel',
                offset: new AMap.Pixel(5, -20),
                // position: lngLat,
                placeSearch: true,
                asOrigin: true,
                asDestination: true,
                content: new component().$mount().$el
              });




        template = '<div class="map-content">'+
                '<div class="title">{{datas.name}}</div>'+
                '<div class="body">' +
                '<ul>' +
                '<li><span>企业名称：</span>{{datas.name}}</li>' +
                '<li><span>经营地址：</span>{{datas.addr}}</li>' +
                '<li><span>联系电话：</span>{{(datas.tel||"")}}</li>' +
                '<li v-show="is164"><span>经营范围：</span>{{datas.bizScope}}</li>'+
                '<li v-show="is164"><span>主修品牌：</span>{{datas.brand}}</li>'+
                '<li v-show="is164"><span>业户类别：</span>{{category}}</li>'+
                '</ul>'+
                '<div class="button-block"  v-show="is164">' +
                  '<Button :to="\'/visit-service/?id=\'+datas.sid">上门服务</Button>'+
                  '<Button :to="\'/apdatasment/?id=\'+datas.sid+\'&name=\'+datas.name">预约服务</Button>'+
                  '<Button :to="\'/garage-info/\'+datas.sid" type="info">查看详情</Button>'+
                '</div>'+
                '</div>'+
                '</div>'


        component= Vue.extend({
          template: template,
          data(){
            return{
            }
          },
          computed:{
            datas(){
              return self.infoWindow.garage.data
            },
            is164(){
              return this.datas.type== 164
            },
            category(){
              return self.formatCategory(this.datas.category)
            },
          },
          methods:{
          }
        })

        garage.el = new AMap.AdvancedInfoWindow({
          // panel: 'panel',
          offset: new AMap.Pixel(5, -20),
          // position: lngLat,
          placeSearch: true,
          asOrigin: true,
          asDestination: true,
          content: new component().$mount().$el
        });



        template= '<div class="map-content">'+
          '<div class="title">训练基地</div>'+
          '<div class="body">' +
          '<ul>' +
          '<li><span>基地名称：</span>{{datas.name}}</li>' +
          '<li><span>基地地址：</span>{{datas.addr}}</li>' +
          '<li><span>入驻驾校：</span><Button type="primary" @click="look">点击查看</Button></li>' +
          '</ul>' +
          '</div>'+
          '</div>'

        component= Vue.extend({
          template: template,
          data(){
            return{
            }
          },
          computed:{
            datas(){
              return self.infoWindow.base.data
            },
            simpleName(){
              return this.datas.name? this.datas.name.replace('驾校基地', '') : ''
            }
          },
          methods:{
            look(){
              self.search.base= this.simpleName
              self.getCompList()
            }
          }
        })

        base.el = new AMap.AdvancedInfoWindow({
          // panel: 'panel',
          offset: new AMap.Pixel(5, -20),
          // position: lngLat,
          placeSearch: true,
          asOrigin: true,
          asDestination: true,
          content: new component().$mount().$el
        });
      })
    },
    renderMap(){
      let self= this
      if(this.markerClusterer ) {
        this.markerClusterer.clearMarkers();
        this.markerClusterer.setMap(null);
        this.markerClusterer= null
      }
      let iconNormal = new AMap.Icon({
          image: "/img/map/icon-normal.png",
          size: new AMap.Size(30, 30),
          // imageOffset: new AMap.Size(11, 11),
          imageSize: new AMap.Size(30, 30),
        });
      let icon4s = new AMap.Icon({
        image: "/img/map/icon-4s.png",
        size: new AMap.Size(30, 30),
        // imageOffset: new AMap.Size(11, 11),
        imageSize: new AMap.Size(30, 30),
      });
      let iconSchool = new AMap.Icon({
        image: "/img/map/icon-school.png",
        size: new AMap.Size(30, 30),
        // imageOffset: new AMap.Size(11, 11),
        imageSize: new AMap.Size(30, 30),
      });

      this.markers= []


        for (let i in this.pointList){
          let point= this.pointList[i]
          let is300= point.type.toString()== '300'
          let lngLat= new AMap.LngLat(point.lon|| this.search.lng, point.lat|| this.search.lat)



          let marker= new AMap.Marker({
            icon: is300? iconSchool:(point.is4s? icon4s: iconNormal),
            position: lngLat,
            extData: point
          })
          marker.on('click', (e) => {
            console.log(e.target.getExtData().type.toString()=='300')
            if(e.target.getExtData().type.toString()=='300'){
              this.openInfoWindow(e.target, this.getSchoolDetail)
            }else{
              this.openInfoWindow(e.target)
            }
          })
          this.markers.push(marker)
        }


      let style={
        url: '/img/map/position-num.png',
        size: new AMap.Size(30, 30),
        imageOffset:new AMap.Pixel(-5,-5),
        textColor: '#fff',
        textSize: 14
      }

      // window.map1= this.map
      // window.markers1= this.markers
      // this.map.add(this.markers)
      // console.log('AMap.MarkerClusterer', AMap.MarkerClusterer)
      AMap.plugin(["AMap.MarkerClusterer"],() => {
        this.markerClusterer = new AMap.MarkerClusterer(this.map, this.markers,{
          styles:[style, style, style],
          maxZoom: 16
        });
        // console.log('renderMap() over')
      });

      this.getBase()

      // let is164= this.search.type== 164
      // if(is164){
      //   this.map.setZoom(13)
      // } else{
      //   this.map.setZoom(10)
      // }
    },
    getSchoolDetail(marker, window){
      let data= marker.getExtData()
      this.$axios.$get('/training/driving/school/'+ data.sid).then( (res) => {
        window.data= res
        window.el.open(this.map, marker.getPosition())
      })
    },
    goTo(path){
      this.$router.push(path)
    },
    goBase(name){
      console.log(name)
      for(let i in this.base){
        let data= this.base[i].getExtData()
        if(data.name.indexOf(name)>=0){
          this.openInfoWindow(this.base[i])
        }
      }
    },
    changeType(){
      this.page= 1
      this.pointList=[]
      this.getCompList()
      this.initPiontList()
    },
    changeSelectAll(){
      this.page= 1
    },
    selectHot(val){
      if(val) this.search.q= val
    },
    openMapInfo(id){
      for (let i in this.markers){
        let data= this.markers[i].getExtData()
        if(data.sid== id){
          if(data.type.toString()=='300'){
            this.openInfoWindow(this.markers[i], this.getSchoolDetail)
          }else{
            this.openInfoWindow(this.markers[i])
          }
        }
      }
    },
    calcApart(ap){
      let flap= parseFloat(ap)*1000
      if(flap){
        if(flap>=1000){
          return (flap/1000).toFixed(1)+' km'
        }else{
          return flap.toFixed(1)+' 米'
        }
      }else return ''

    },
    changePage(page){
      this.page= page
      this.getCompList()
    },
    formatCategory(code){
      switch (parseInt(code || 0)){
        case 43: return '一类维修企业';
        case 44: return '二类维修企业';
        case 45: return '三类维修企业';
        case 46: return '摩托车维修业户';
        case 47: return '汽车快修业户';
        default: return ''
      }
    },
    getInfoWindow(type){
      for(let key in this.infoWindow){
        if(this.infoWindow[key].type.indexOf(type.toString())>=0){
          return this.infoWindow[key]
        }
      }
    },
    openInfoWindow(marker, callback){
      let data= marker.getExtData()
      let window= this.getInfoWindow(data.type.toString())
      console.log('data', data)
      console.log('window', window)
      if(callback){
        callback(marker, window)
      }else{
        window.data= data
        window.el.open(this.map, marker.getPosition())
      }
    }
  }
}
</script>

<style scoped lang="less">
  .service-map-body{
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
      position: absolute;
      padding: 5px;
      background: #FFF;
      z-index: 888;
      width: 380px;
      height: 100%;
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
          cursor: pointer;
          img{
            float: left;
            margin: 8px;
            width: 90px;
            height: 70px;
          }
          .list-right{
            float: left;
            width: 260px;
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
            }
            .name{
              background: url(/img/map/com-icon.png) no-repeat left center;
              color: #252525;
              padding-left: 20px;
              background-size: 15px;
            }
            .type300{
              padding-right: 35px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .ivu-tag{
              position: absolute;
              top: -4px;
              right: 0;
              height: 18px;
              line-height: 16px;
              padding: 0 4px;
              cursor: default;
              z-index: -1;
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
      .map-page{
        position: absolute;
        left: 0;
        bottom: 10px;
        width: 100%;
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
        display: inline-table;
        width: 50%;
        margin-right: 1%;
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
.service-map-body{
  .paging {
    text-align: center;
    li{
      margin: 2px 0;
    }
  }
  .search .ivu-input-icon-clear{
    /*right: 40px;*/
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
  .map-content{
    width: 500px;
    position: relative;
    .title{
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      background-color: #2d8cf0;
      color: white;
    }
    .body{
      padding: 5px 15px;
      position: relative;
      .head-img{
        position: absolute;
        top: 15px;
        /*bottom: 0;*/
        left: 15px;
        width: 150px;
        /*margin: auto;*/
      }
      ul{
        overflow: hidden;
        li{
          line-height: 30px;
          min-height: 30px;
          width: 100%;
          font-size: 13px;
          overflow: hidden;
          span{
            font-weight: 600;
            float: left;
          }
        }
      }
      .button-block{
        margin-top: 20px;
        text-align: right;
        .ivu-btn{
          margin-left: 10px;
        }
      }
    }
  }
  .school{
    width: 550px;
    .body>ul{
      padding-left: 160px;
      .base-tag{
        font-weight: 400;
        max-height: 90px;
        overflow: auto;
        a{
          display: block;
        }
      }
      li{
        position: relative;
        .more{
          /*position: absolute;*/
          bottom: 0;
          right: 0;
          background-color: white;
          line-height: 15px;
          margin-left: 65px;
        }
      }
      .intro{
        position: relative;
        font-weight: 400;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        display: -moz-box;
        line-clamp: 3;
        -webkit-line-clamp: 3;
        -moz-line-clamp:3;
        box-orient:vertical;
        -webkit-box-orient:vertical;
        -moz-box-orient: vertical;
        width: calc(100% - 70px);
        line-height: 18px;
        padding-top: 7px;
        min-height: 30px;
        max-height: 61px;
        overflow: hidden;
      }
    }
    .sign-up{
      overflow: hidden;
      border-top: 1px solid #CECECE;
      h2{
        margin: 10px;
      }
      .ivu-form-item{
        width: 25%;
        float: left;
        position: relative;
        margin-bottom: 15px;
        .ivu-form-item-label{
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          height: 10px;
          float: none;
          padding: 0;
          &:before{
            margin-right: 1px;
          }
        }
        .ivu-form-item-error-tip{
          padding-top: 0;
        }
      }
    }
  }
  .amap-info-combo *{
    box-sizing: content-box;
  }
  .amap-adcombo-close{
    top: 6px;
    right: 6px;
  }
  .amap-logo, .amap-copyright{
    display: none!important;
    /*z-index: 1!important;*/
  }
}


</style>
