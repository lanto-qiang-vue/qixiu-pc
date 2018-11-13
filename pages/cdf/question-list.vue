<template>
<cdf-question-list :flag="false"></cdf-question-list>
</template>

<script>
import CdfQuestionList from '~/components/cdf-question-list.vue'
export default {
  name: "question-list",
  layout: 'common',
  components: {
    CdfQuestionList,
  },
}
</script>

<style scoped>

</style>
