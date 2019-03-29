<template>
<div class="area-select">
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
let rules= {
  shanghai: { useSelect: true, useRegion: true },
  other: { useSelect: false, useRegion: true}
}
/*
* 默认情况下
* 上海使用一级下拉区域，使用region接口
* 其他使用二级下拉区域，使用region接口
* */
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
      default: ''
    },
    placeholder:{
      default: ''
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
        return rules
      }
    }
  },
  data(){
    return{
      selectValue: '',
      cascaderValue: []
    }
  },
  computed:{
    calcSelectValue(){
      return this.valueSelect? this.valueSelect: this.selectValue
    },
    calcCascaderValue(){
      return this.valueCascader.length? this.valueCascader: this.cascaderValue
    },
    isShanghai(){
      return process.env.config.areaName=='shanghai'
    },
    thisRule(){
      let defaultRule= deepClone(rules)
      for(let key in this.rules){
        defaultRule[key]= this.rules[key]
      }
      return defaultRule
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
    useRegion(){
      let region= true
      if(this.isShanghai){
        region= this.thisRule.shanghai.useRegion
      }else{
        region= this.thisRule.other.useRegion
      }
      return region
    },
    areaList(){
      let listName= this.useRegion?'regionList': 'deptList'
      return this.$store.state.app.area[listName]
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
  },
  methods:{
    getArea() {
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
      this.$emit('changeSelect', singleVal);
      this.$emit('changeCascader', value);
    },
  }
}
</script>

<style scoped lang="less">

</style>
