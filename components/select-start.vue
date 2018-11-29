<template>
    <div>
      <img v-for="item in startList" :src="item.url" @mouseover="hClick(item.id)" @mouseout="resetStart"
           @click="changeStart(item)" style="float:left;height:20px;cursor:pointer;margin-left:5px;"/>
      <div style="line-height:20px;margin-left:150px;">{{description}}</div>
    </div>
</template>

<script>
  export default {
    name: 'select-start',
    data(){
      return{
        description: '一般',
        startLength: 5,
        startLevel: 3,
        startList: [
          { url: '/img/garage-info/yellow.png', id: 1, description: '极差' },
          { url: '/img/garage-info/yellow.png', id: 2, description: '失望' },
          { url: '/img/garage-info/yellow.png', id: 3, description: '一般' },
          { url: '/img/garage-info/gray.png', id: 4, description: '满意' },
          { url: '/img/garage-info/gray.png', id: 5, description: '惊喜' }
        ],
      }
    },
    props:['clearValue'],
    watch:{
      clearValue(){
        this.startLevel = 3;
        this.description = "一般";
        this.resetStart();
      }
    },
    methods:{
      hClick(id) {
        for (let i in this.startList) {
          if (parseInt(i) < id) {
            this.startList[i].url = '/img/garage-info/yellow.png'
          } else {
            this.startList[i].url = '/img/garage-info/gray.png'
          }
        }
      },
      resetStart() {
        this.hClick(this.startLevel)
      },
      changeStart(item) {
        this.startLevel = item.id;
        this.description = item.description;
        this.$emit("success",item.id);
      },
    },
  }
</script>

<style scoped>

</style>
