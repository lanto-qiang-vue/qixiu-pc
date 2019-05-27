<template>
<div class="area-select" v-if="show">
  <Select :value="calcSelectValue" :transfer="transfer" v-if="useSelect" :label-in-value="labelInValue"
          :disabled="disabled" :clearable="clearable" @on-change="changeSelect" :placeholder="placeholder"
          :size="size">
    <Option v-for="(item , key) in areaList" :value="item.regionCode || item.value" :key="key">{{ item.shortName }}
    </Option>
  </Select>
  <Cascader v-else :data="areaList" :value="calcCascaderValue" :disabled="disabled" :clearable="clearable"
            @on-change="changeCascader"  :change-on-select="changeOnSelect" :placeholder="placeholder"
            :size="size" :transfer="transfer"></Cascader>
</div>
</template>

<script>
import { deepClone } from '~/static/util.js'
export default {
  name: "area-select",
  props: {
    valueSelect: {
      default: ''
    },
    valueCascader: {
      default(){
        return []
      }
    },
    size:{
      default: 'default'
    },
    placeholder:{
      default: '请选择'
    },
    disabled:{
      default: false
    },
    transfer:{
      default: false
    },
    clearable:{
      default: true
    },
    changeOnSelect:{
      default: true
    },
    labelInValue:{
      default: false
    },
    rules:{
      default(){
        return null
      }
    }
  },
  data(){
    return{
      selectValue: '',
      cascaderValue: [],
      show: false,
    }
  },
  computed:{
    calcSelectValue(){
      return this.valueSelect? this.valueSelect: ''
    },
    calcCascaderValue(){
      return this.valueCascader.length? this.valueCascader: []
    },
    isShanghai(){
      return process.env.config.areaName=='shanghai'
    },
    thisRule(){
      /*
      * 默认情况下
      * 上海使用一级下拉区域，使用region接口
      * 其他使用二级下拉区域，使用region接口
      * mode可取值有 ‘region’，‘dept’，‘login-areas’
      * */
      let rules= {
        shanghai: { useSelect: true, mode: 'region' },
        other: { useSelect: false, mode: 'region'}
      }, rule={};
      if(this.rules){
        rule= this.repObjAttr(rules, this.rules)
      }else{
        rule= rules
      }
      // console.log('rule', rule)
      return rule
    },
    useSelect(){
      let select= true
      if(this.isShanghai){
        select= this.thisRule.shanghai.useSelect
      }else{
        select= this.thisRule.other.useSelect
      }
      return select
    },
    // useRegion(){
    //   let region= true
    //   if(this.isShanghai){
    //     region= this.thisRule.shanghai.useRegion
    //   }else{
    //     region= this.thisRule.other.useRegion
    //   }
    //   return region
    // },
    mode(){
      return this.thisRule[this.isShanghai? 'shanghai': 'other'].mode
    },
    areaList(){
      let list= []
      switch (this.mode){
        case 'region':{
          list= this.$store.state.app.area.regionList
          break
        }
        case 'dept':{
          list= this.$store.state.app.area.deptList
          break
        }
        case 'login-areas':{
          list= this.$store.state.user.userInfo.areas
          break
        }
        case 'sign-areas':{
          list= this.$store.state.app.area.signAreas
          break
        }
      }
      return list

      // let listName= this.useRegion?'regionList': 'deptList'
      // return this.$store.state.app.area[listName]
    },
    lock(){
      return this.$store.state.app.area.lock
    }
  },
  beforeMount(){
    // console.log('this.$store.state.app.area.lock', this.$store.state.app.area.lock)
    if(!this.lock){
      this.$store.commit('app/setAreaLock')
      this.getArea()
    }
    // this.getAreaList();
  },
  mounted(){
    this.show= true
  },
  methods:{
    repObjAttr(orig, adds){
      let obj= {}
      for( let key in orig){
        if(adds[key]!= undefined && adds[key]!= null){
          if(typeof orig[key] == 'object'){
            obj[key]= this.repObjAttr(orig[key], adds[key])
          }else{
            obj[key]= adds[key]
          }
        }else{
          obj[key]= orig[key]
        }
      }
      return obj
    },
    getArea(){
      this.$axios.post('/area/region/list', {
        areaName: process.env.config.areaName
      }).then((res) => {
        if (res.data.code == '0') {
          this.resetArea(res.data.items)
          // console.log('res.data.items', res.data.items)
          this.$store.commit('app/setRegionList', res.data.items)
        }
      })
      this.$axios.get('/area/dept/list/all/'+ process.env.config.areaName).then((res) => {
        if (res.data.code == '0') {
          this.resetArea(res.data.items)
          // console.log('res.data.items', res.data.items)
          this.$store.commit('app/setDeptList', res.data.items)
        }
      })
      
    },
    getAreaList(){
      this.$axios.get('/user/area/list').then((res) => {
        if (res.data.code == '0') {
          this.resetArea(res.data.items)
          // console.log('res.data.items', res.data.items)
          this.$store.commit('app/setSignAreasList', res.data.items)
        }
      })
    },
    resetArea(list){
      for(let i in list){
        if(list[i].children){
          this.resetArea(list[i].children)
        }else{
          list[i].children= []
        }
      }
    },
    changeSelect(value){
      this.selectValue= value
      this.$emit('changeSelect', value);
    },
    changeCascader(value){
      this.cascaderValue= value
      let singleVal= ''
      switch (value.length){
        case 1:{
          singleVal= value[0]
          break
        }
        case 2:{
          singleVal= value[1]
          break
        }
      }
      // console.log(value);
      this.$emit('changeSelect', singleVal);
      this.$emit('changeCascader', value);
    }
  }
}
</script>

<style scoped lang="less">

</style>
