<template>
<basic-container>
  <cdf-question-list :flag="true"></cdf-question-list>
</basic-container>
</template>

<script>
  import CdfQuestionList from '~/components/cdf-question-list.vue'
  import BasicContainer from '~/components/basic-container.vue'
	export default {
		name: "cdf",
    layout: "layout-root",
    components: {
      CdfQuestionList,
      BasicContainer
    },
    head () {
      return {
        title: '车大夫门诊',
      }
    }
	}
</script>

