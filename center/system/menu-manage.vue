<template>
<div class="menu-manage">
<common-table></common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
	export default {
		name: "menu-manage",
    components: {
      CommonTable,
    },
    beforeMount(){
      this.$axios.post('/menu/list', {
        "pageNo": 1,
        "pageSize": 10,
      })
    }
	}
</script>

<style scoped lang="less">
.menu-manage{

}
</style>
