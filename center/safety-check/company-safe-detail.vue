
<template>
<Modal
    v-model="showModal"
    title="年度安全检查表"
    width="90"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <div style="height: 100%;overflow: auto;">
        <common-safe-table ref="safetable" @saveInfoFun="saveInfoFun" :roleType="roleType"></common-safe-table>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div slot="footer">
        <Button  size="large" type="primary" v-if="accessBtn('add')" v-show="isCompany" @click="commitFun">提交</Button>
        <Button  size="large" type="primary" v-if="accessBtn('review')" v-show="isGuanlibumen" @click="commitReview">提交</Button>
        <Button  size="large" type="default" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
import { formatDate } from '@/static/tools.js'
import funMixin from '~/components/fun-auth-mixim.js'
import commonSafeTable from './common-safe-table.vue'
export default {
    name: "company-safe-detail",
    props:['showDetail', 'detailData','roleType'],
    mixins: [funMixin],
    components: {
      commonSafeTable
    },
    data(){
        return{
            spinShow:false,
            showModal:false,
            listSearch:{},
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            if(this.detailData){
                this.getSafeDetail();
            }else{
                this.getDetail();
            }
            
        },
    },
    computed:{
      isYunying(){
        return this.roleType=='yunying'
      },
      isCompany(){
          return this.roleType=="weixiuqiye"
      },
      isGuanlibumen(){
          return this.roleType=="guanlibumen"
      },
    },
    methods:{
        getDetail(){
            this.spinShow=true;
            this.$axios.get('/security/check/add/detail',{
                
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.$refs.safetable.mergeData(res.data.item);
                }
                this.spinShow=false;
            })
        },
        getSafeDetail(){
            this.spinShow=true;
            this.$axios.get('/security/check/detail/'+this.detailData.id, {
            }).then( (res) => {
                if(res.data.code=='0'){
                    for(let i in res.data.item.results){
                        for(let j in res.data.item.results[i].children){
                            res.data.item.results[i].children[j]['result']=res.data.item.results[i].children[j]['result']+'';
                        }
                    }
                    this.$refs.safetable.mergeData(res.data.item);
                }
                this.spinShow=false;
            })
        },
        commitFun(){
            this.$refs.safetable.rulesData();
        },
        commitReview(){
            this.$refs.safetable.rulesReview();
        },
        saveInfoFun(temData, type){
            let url=''
            switch (type){
                case 'insert':{
                    url = '/security/check/add'
                    break
                }
                case 'review':{
                    url = '/security/check/edit/review'
                    temData['reportId']=this.detailData.id;
                    break
                }
            }
            this.$axios.post(url, temData).then((res) => {
                if (res.data.code == '0') {
                    this.showModal = false
                    this.$Message.success('保存成功')
                    this.$emit('closeDetail');
                }
            })
        },


        
    },
}
</script>

<style scoped lang="less">
.field{
    p{
      label{
        font-weight: 600;
      }
      i{
        color: red;
        font-style: normal;
      }
    }
  }
.content-list{
    width: 100%;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    img{
        width:40px;
        height:40px;
        border:1px solid #ccc;
        float: left;
    }
    h3{
        float: left;
        height: 45px;
        line-height: 45px;
        margin-left: 10px;
    }
    span{
        float: right;
    }

}
.content-p{
    padding-left: 55px;
}
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
  .r-list-search{
    width: 100%;
    padding: 10px 0;


  }

  .pic-card{
      display: inline-block;
      margin: 0 10px 10px 0;
      width: 200px;
      min-width: 200px;

      .red{
        color: red;
      }
      .pic-body{
        width: 100%;
        height: 150px;
        /*border: 1px solid #dcdee2;*/
        position: relative;
        .no-pic{
          width: 250px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
        }
        .pic{
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
          cursor: pointer;
        }
        .button{
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          text-align: center;
          > *{
            margin: 0 5px;
            vertical-align: top;
          }
          .up-img{
            display: inline-block;
            overflow: hidden;
            position: relative;
            .input{
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              font-size: 0;
              cursor: pointer;
            }
          }
        }
      }
    }
</style>
