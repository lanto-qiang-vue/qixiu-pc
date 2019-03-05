<template>
  <index-component :banners="banners" :swiperOption="swiperOption"
                   :showSwiper="showSwiper" :area="area" :questionList="questionList" :cdfList="cdfList"
                   :articleBanner="articleBanner" :articleMiddle="articleMiddle" :articleRight="articleRight">

    <div class="service" slot="service">

    </div>
    <ul class="cooperator" slot="cooperator">

    </ul>
  </index-component>
</template>

<script>
import IndexComponent from '~/components/index/index-component.vue'
import IndexMixin from '~/components/index/index-mixin.js'
export default {
  name: "ver-others",
  components: { IndexComponent},
  mixins: [IndexMixin],
}
</script>

<style scoped>

</style>
