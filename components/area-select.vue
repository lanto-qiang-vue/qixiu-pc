<template>
<div class="area-select">
  <Select :value="valueSelect" :transfer="transfer" v-if="isShanghai"
          :disabled="disabled" :clearable="clearable" @on-change="changeSelect">
    <Option v-for="item in areaList" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}
    </Option>
  </Select>
  <Cascader v-else :data="areaList" :value="valueCascader" :disabled="disabled" :clearable="clearable"
            @on-change="changeCascader"  :change-on-select="changeOnSelect"></Cascader>
</div>
</template>

<script>
export default {
  name: "area-select",
  props: {
    valueSelect: {
      default: ''
    },
    valueCascader: {
      default: []
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
      default: false
    },
  },
  data(){
    return{

    }
  },
  computed:{
    isShanghai(){
      return process.env.config.areaName=='shanghai'
    },
    areaList(){
      return this.$store.state.app.area.list
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
        // console.log('!getArea!')
        if (res.data.code == '0') {
          this.resetArea(res.data.items)
          // console.log('res.data.items', res.data.items)
          this.$store.commit('app/setAreaList', res.data.items)
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
      this.$emit('changeSelect', value);
    },
    changeCascader(value){
      this.$emit('changeCascader', value);
    },
  }
}
</script>

<style scoped lang="less">

</style>
