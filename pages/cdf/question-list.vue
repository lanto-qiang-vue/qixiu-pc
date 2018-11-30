<template>
<basic-container>
<cdf-question-list :flag="false"></cdf-question-list>
</basic-container>
</template>

<script>
import CdfQuestionList from '~/components/cdf-question-list.vue'
import BasicContainer from '~/components/basic-container.vue'
export default {
  name: "question-list",
  layout: "layout-root",
  components: {
    CdfQuestionList,
    BasicContainer
  },
}
</script>

<style scoped>

</style>
