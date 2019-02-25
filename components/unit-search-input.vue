<template>
  <div class="unit-search-input">
    <Input v-model="inputData" type="text" @on-keyup="goToSelect" :readonly="disType">
    </Input>
    <Icon type="ios-close-circle" class="close" v-show="selectType" @click="closeSelect"/>
    <div v-show="inputShow" v-clickoutside="handleClose" style="position:absolute;top:31px;z-index:99;">
      <Table
        :data="data"
        :columns="tableColumns"
        stripe
        border
        height="400"

        :highlight-row="true"
        :loading="loading"
        :row-class-name="rowClassName"
        @on-row-click="onRowClick"
      >
      </Table>
    </div>
  </div>
</template>
<script>
  const clickoutside = {
    bind(el, binding, node) {
      function documentHandler(e) {
        if (el.contains(e.target)) {
          return false;
        }
        if (binding.expression) {
          binding.value(e);
        }
      }
      el.__vueClickOutside__ = documentHandler;
      document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
      document.removeEventListener('click', el.__vueClickOutside__);
      delete el.__vueClickOutside__;
    },
  };
  export default {
    name: "unit-search-input",
    props:['searchTableData',"showChange","tableData","flagData"],
    data(){
      return {
        inputData:'',
        inputShow:false,
        disType:false,
        selectType:false,
        timer:null,
        data:[],
        loading:false,
        tableColumns:[],
      }
    },
    watch:{
      showChange(){
        // alert('进来了');
        if(this.searchTableData){
          this.inputData=this.searchTableData;
          this.selectType=true;
          this.disType=true;
        }else{
          this.inputData='';
          this.selectType=false;
          this.disType=false;
        }

      }
    },
    mounted(){
      this.tableColumns=this.tableData;
    },
    directives: {clickoutside},
    methods: {
      handleClose(e) {
        if(this.inputShow){
          //  let row={};
          //   row['MODEL_NAME']=this.inputData;
          //   row['TID']='';
          //   this.$emit('onRowSelect',row);
        }
        this.inputShow = false;

      },

      //清空搜索数据
      closeSelect(){
        // alert('不可以');
        this.inputData="";
        this.selectType=false;
        this.disType=false;
        this.$emit('onRowSelect',{});
      },
      onRowClick( row, index){
          console.log('row：',row);
          this.inputShow = false;
          this.selectType=true;
          this.disType=true;
          this.inputData=row.name;
          this.$emit('onRowSelect',row);
      },
      rowClassName(row, index){
        // console.log('row：',row);
      },
      goToSelect(e){
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
          this.getList(e.target.value);
          this.inputShow = true;

        //   let row={};
        //     row['MODEL_NAME']=this.inputData;
        //     row['TID']='';
        //     this.$emit('onRowSelect',row);
        },500);
      },
      getList(value){
            if(this.flagData==1){
                this.loading=true;
                let strUrl='';
                strUrl+='&name='+this.inputData;

                this.$axios.get('/training/driving/base/query?size=25&page=0'+strUrl, {
                }).then( (res) => {
                    console.log(res);
                    if(res.status===200){
                        this.data=res.data.content;
                        // this.total=res.data.totalElements;
                        this.loading=false;
                    }else{
                        this.loading=false;
                        // this.$Message.error(res.statusText);
                    }
                })

            }else if(this.flagData==2){
                this.loading=true;

                this.$axios.post('/corp/erp/name', {
                  "name":this.inputData
                }).then( (res) => {
                    console.log(res);
                    if(res.data.code==='0'){
                        this.data=res.data.items;
                        // this.total=res.data.totalElements;
                        this.loading=false;
                    }else{
                        this.loading=false;
                        // this.$Message.error(res.statusText);
                    }
                })
            }else if(this.flagData==3){
                this.loading=true;

                this.$axios.post('/corp/major/brand/name', {
                  "name":this.inputData
                }).then( (res) => {
                    console.log(res);
                    if(res.data.code==='0'){
                        this.data=res.data.items;
                        // this.total=res.data.totalElements;
                        this.loading=false;
                    }else{
                        this.loading=false;
                        // this.$Message.error(res.statusText);
                    }
                })
            }else if(this.flagData==4){
                this.loading=true;

                this.$axios.post('/corp/brand/name', {
                  "name":this.inputData
                }).then( (res) => {

                    if(res.data.code==='0'){
                        this.data=res.data.items;
                        // this.total=res.data.totalElements;
                        this.loading=false;
                    }else{
                        this.loading=false;
                        // this.$Message.error(res.statusText);
                    }
                })
            }


      },
    },
  }
</script>

<style scoped lang="less">
.unit-search-input{
  position: relative;
  .close{
    font-size: 16px;
    position:absolute;
    cursor: pointer;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
