<template>
<div>
  <div style="padding: 0 10px">
    <div class="dblock">
      <h1 class="dtitle">企业基本信息</h1>
      <div class="center">
        <div class="inline-box">
          <Table :columns="infoColumns" :data="infoData" ref="table" width="800"
                 stripe border></Table>
        </div>
      </div>
    </div>
    <div class="dblock">
      <h1 class="dtitle">企业联系人（用于接收汽修平台公众号通知）</h1>
      <div class="center">
        <div class="inline-box">
          <Table :columns="buttColumns" :data="buttData"  width="800"
                 stripe border></Table>
        </div>
      </div>

    </div>
</div>
  <butt-joint :type="showType" :dataInit="dataInit" stage="2"></butt-joint>
</div>
</template>

<script>
  import buttJoint from '~/components/butt-joint.vue'
  export default {
    name: 'schoolCenter-index',
    components:{buttJoint},
    data(){
        return {
          dataInit:null,
          showType:false,
          infoColumns: [
            {title: '业户名称', key: 'companyName',  minWidth: 100,},
            {title: '许可证号', key: 'license',  minWidth: 100,},
            {title: '信誉等级', key: 'dj',  minWidth: 100},
          ],
          infoData:[
            {companyName:'上海XXX机动车驾驶员培训部',license:'310000003094',dj:'AAA'}
          ],
          buttColumns:[
            {title: '联系人', key: 'contactName',  minWidth: 100,},
            {title: '联系人手机', key: 'contactMobile',  minWidth: 100,},
            {title: '操作', key: 'cz',  width: 100,
              render: (h, params) => {
                let buttonContent= '更改';
                let buttonStatus = 'primary';
                return h('div', [
                  h('Button', {
                    props: {
                      type: buttonStatus,
                    },
                    style: {
                      width:"60px",
                      textAlign: "center",
                      marginRight: '10px',
                    },
                    on: {
                      click: (index) => {
                        this.showType = Math.random();
                      }
                    }
                  }, buttonContent),
                ]);
              }
            },
          ],
          buttData:[
            {contactName:'陈鑫',contactMobile:'18858886888'}
          ],
        }
    },
  }
</script>

<style scoped lang="less">
  .dblock{
    margin: 10px 0;
    .dtitle {
      text-align: left;
      padding-left: 10px;
      border-left: 5px solid #4ba7f5;
      font-size: 16px;
      width: 100%;
      margin-bottom: 15px;
    }
    .center{
      text-align: center;
      .inline-box {
        display: inline-block;
        vertical-align: top;
        margin-bottom: 30px;
        > div {
          white-space: nowrap;
          display: inline-block;
        }
        .group{
          text-align: left;
          .item{
            height: 35px;
            line-height: 35px;
          }
        }
      }
    }
  }
</style>
