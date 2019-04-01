<template>
<div class="operator-home">
  <shanghai-hotmap v-if="areaName=='shanghai'"></shanghai-hotmap>
  <shandong-hotmap v-if="areaName=='shandong'"></shandong-hotmap>
</div>
</template>

<script>
import ShanghaiHotmap from '~/center/hotmap/shanghai-hotmap.vue'
import ShandongHotmap from '~/center/hotmap/shandong-hotmap.vue'
export default {
  name: "operator-home",
  components: {ShanghaiHotmap, ShandongHotmap},
  computed:{
    areaName(){
      return process.env.config.areaName
    },
  }
}
</script>
