<template>
  <cdf-question-list :flag="true"></cdf-question-list>
</template>

<script>
  import CdfQuestionList from '~/components/cdf-question-list.vue'
	export default {
		name: "cdf",
    	layout: 'common',
    components: {
      CdfQuestionList,
    },
	}
</script>

