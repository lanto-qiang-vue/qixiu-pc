<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row" v-for="item in row" :key="item.changeItem">
            <Col span="8">
                <span class="expand-key">变更项: </span>
                <span class="expand-value" >{{ item.changeItem }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">变更前: </span>
                <span class="expand-value" >{{ item.beforeChange }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">变更后: </span>
                <span class="expand-value" >{{ item.afterChange }}</span>
            </Col>
        </Row>
        
    </div>
</template>
<script>
    export default {
        props: {
            row: Array
        }
    };
</script>