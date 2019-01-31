
<template>
<!--维修企业信息管理详情  2018-11-05  -->
<Modal
    v-model="showModal"
    title="企业信息"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
    <div >
        <Form ref="listSearch" :rules="ruleValidate"  :model="listSearch" :label-width="140" class="common-form" slot="content">
            <FormItem label="企业名称:" style="width: 45%;" prop="name">
                <Input type="text" v-model="listSearch.name" placeholder="请输入企业名称"></Input>
            </FormItem>
            <FormItem label="许可证号:" style="width: 45%;" prop="license">
                <Input type="text" v-model="listSearch.license" placeholder="请输入许可证号"></Input>
            </FormItem>

            <FormItem label="负责人:" style="width: 45%;" prop="operator">
                <Input type="text"  v-model="listSearch.operator" placeholder="请输入负责人"></Input>
            </FormItem>

            <FormItem label="负责人电话:" style="width: 45%;" prop="operatorMobileNo">
                <Input type="text"  v-model="listSearch.operatorMobileNo" placeholder="请输入负责人电话" ></Input>
            </FormItem>
            <FormItem label="服务电话:" style="width: 45%;" prop="serviceHotLine">
                <Input type="text"  v-model="listSearch.serviceHotLine" placeholder="请输入服务电话" ></Input>
            </FormItem>
            <FormItem label="救援区域:" style="width: 45%;" prop="rescueAreas">
                <Select v-model="listSearch.rescueAreas" multiple>
                    <Option v-for="item in rescueArea" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
            </FormItem>

            <FormItem label="服务时间:" style="width: 45%;" prop="serviceTime">
                <TimePicker format="HH:mm" type="timerange" placement="bottom-start" placeholder="请选择" style="width: 100%;" v-model="listSearch.serviceTime"></TimePicker>
            </FormItem>
            <FormItem label="状态:" style="width: 45%;" prop="status">
                <Select v-model="listSearch.status">
                    <Option v-for="item in statusArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="服务周期:" style="width: 90%;" prop="serviceCycles">
                <CheckboxGroup v-model="listSearch.serviceCycles">
                    <Checkbox v-for="item in serviceCyclesArr" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="企业车辆信息:" style="width: 90%;" prop="heavyVehicleNum">
                <div class="search-block">重型车辆数<InputNumber  :min="0" v-model="listSearch.heavyVehicleNum" style="width: 100px; margin-left: 5px;"></InputNumber></div>
                <div class="search-block">中型车辆数<InputNumber  :min="0" v-model="listSearch.mediumVehicleNum" style="width: 100px;margin-left: 5px;"></InputNumber></div>
                <div class="search-block">轻型车辆数<InputNumber  :min="0" v-model="listSearch.lightVehicleNum" style="width: 100px;margin-left: 5px;"></InputNumber></div>
                <div class="search-block">小修车辆数<InputNumber  :min="0" v-model="listSearch.minorRepairNum" style="width: 100px;margin-left: 5px;"></InputNumber></div>
                <div class="search-block">地库车辆数<InputNumber  :min="0" v-model="listSearch.basementNum" style="width: 100px;margin-left: 5px;"></InputNumber></div>

            </FormItem>
            <FormItem label="企业简介:" style="width: 90%;" >
                <Input type="textarea" :rows="1" v-model="listSearch.info" placeholder="请输入企业简介"></Input>
            </FormItem>

        </Form>


    </div>
    <div slot="footer">
        <Button v-if="" size="large" v-if="accessBtn('add') || accessBtn('edit')" type="primary" @click="addCompany('listSearch')">提交</Button>
        <Button  size="large" type="default" @click="showModal=false;">返回</Button>
    </div>

  </Modal>
</template>

<script>
import {  imgToBase64,getName } from '@/static/util.js'
import { formatDate } from '@/static/tools'
import funMixin from '~/components/fun-auth-mixim.js'

export default {
	name: "rescue-company-info",
    props:['showDetail', 'detailData'],
    mixins: [funMixin],
    components: {},
    data(){
		return{
            showModal:false,

            listSearch:{
                "basementNum": 0,
                "heavyVehicleNum": 0,
                "id": 0,
                "info": "",
                "license": "",
                "lightVehicleNum": 0,
                "mediumVehicleNum": 0,
                "minorRepairNum": 0,
                "name": "",
                "operator": "",
                "operatorMobileNo": "",
                "rescueAreas": [],
                "serviceCycles": [],
                "serviceHotLine": "",
                "serviceTimeMax": '',
                "serviceTimeMin": '',
                "status": 1,
                "serviceTime":'',
            },
            ruleValidate: {
                name:[{ required: true, message: '必填项不可为空', },],
                license:[{ required: true, message: '必填项不可为空', },],
                operator:[{ required: true, message: '必填项不可为空', },],
                operatorMobileNo:[{ required: true, message: '必填项不可为空', },],
                serviceHotLine:[{ required: true, message: '必填项不可为空', },],

                rescueAreas:[{ required: true, message: '必填项不可为空', },],
                status:[{ required: true, message: '必填项不可为空', },],
                serviceCycles:[{ required: true, message: '必填项不可为空', },],
                heavyVehicleNum:[{ required: true, message: '必填项不可为空', },],
                serviceTime:[{ required: true, message: '必填项不可为空', },],


            },//规则验证
            serviceCyclesArr:[
                {name:2,code:"周一"},
                {name:3,code:"周二"},
                {name:4,code:"周三"},
                {name:5,code:"周四"},
                {name:6,code:"周五"},
                {name:7,code:"周六"},
                {name:1,code:"周日"},
            ],
            statusArr:[
                {code:1,name:'有效'},
                {code:0,name:'无效'},
            ],
            rescueArea:[],
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            this.getAreaList();
            this.listSearch={
                "basementNum": 0,
                "heavyVehicleNum": 0,
                "id": 0,
                "info": "",
                "license": "",
                "lightVehicleNum": 0,
                "mediumVehicleNum": 0,
                "minorRepairNum": 0,
                "name": "",
                "operator": "",
                "operatorMobileNo": "",
                "rescueAreas": [],
                "serviceCycles": [],
                "serviceHotLine": "",
                "serviceTimeMax": '',
                "serviceTimeMin": '',
                "status": 1,
                "serviceTime":'',
            };

            if(this.detailData){
                this.getDetail(this.detailData.id);
            }else{

            }

        },
    },

    methods:{
        getDetail(id){
            // this.spinShow=true;
            this.$Spin.show();
            this.$axios.get('/corp/rt/detail/'+id, {
            }).then( (res) => {
                if(res.data.code=='0'){
                    let resData=res.data.item;
                    for(let i in resData){
                        this.listSearch[i]=resData[i];
                    }
                    this.listSearch['serviceTime']=[];
                    this.listSearch['serviceTime'].push(this.listSearch['serviceTimeMin']);
                    this.listSearch['serviceTime'].push(this.listSearch['serviceTimeMax']);
                }

                this.$Spin.hide();
           })
        },
        //获取区域数据---------
        getAreaList(){

            this.$axios.get('/area/query', {
            }).then( (res) => {
              if(res.data.code==0){
                    this.rescueArea=res.data.items;

              }
            })
        },

        //新增一个企业数据---------
        addCompany(name){
            this.$refs[name].validate((valid) => {
                if (valid) {

                    if(this.detailData){

                this.$axios.post('/corp/rt/update',{
                    "id":this.listSearch.id,
                    "basementNum": this.listSearch.basementNum,
                    "heavyVehicleNum": this.listSearch.heavyVehicleNum,
                    "info": this.listSearch.info,
                    "license": this.listSearch.license,
                    "lightVehicleNum": this.listSearch.lightVehicleNum,
                    "mediumVehicleNum": this.listSearch.mediumVehicleNum,
                    "minorRepairNum": this.listSearch.minorRepairNum,
                    "name": this.listSearch.name,
                    "operator": this.listSearch.operator,
                    "operatorMobileNo": this.listSearch.operatorMobileNo,
                    "rescueAreas": this.listSearch.rescueAreas,
                    "serviceCycles": this.listSearch.serviceCycles,
                    "serviceHotLine": this.listSearch.serviceHotLine,
                    "serviceTimeMax": (this.listSearch.serviceTime[1]+':00'),
                    "serviceTimeMin": (this.listSearch.serviceTime[0]+':00'),
                    "status": this.listSearch.status,

                }).then( (res) => {
                    if(res.data.code=='0'){
                        this.showModal=false;
                    }else{
                        this.$Message.error(res.data.status);
                    }
                })
            }else{
                this.$axios.post('/corp/rt/add',{
                    "basementNum": this.listSearch.basementNum,
                    "heavyVehicleNum": this.listSearch.heavyVehicleNum,
                    "info": this.listSearch.info,
                    "license": this.listSearch.license,
                    "lightVehicleNum": this.listSearch.lightVehicleNum,
                    "mediumVehicleNum": this.listSearch.mediumVehicleNum,
                    "minorRepairNum": this.listSearch.minorRepairNum,
                    "name": this.listSearch.name,
                    "operator": this.listSearch.operator,
                    "operatorMobileNo": this.listSearch.operatorMobileNo,
                    "rescueAreas": this.listSearch.rescueAreas,
                    "serviceCycles": this.listSearch.serviceCycles,
                    "serviceHotLine": this.listSearch.serviceHotLine,
                    "serviceTimeMax": (this.listSearch.serviceTime[1]+':00'),
                    "serviceTimeMin": (this.listSearch.serviceTime[0]+':00'),
                    "status": this.listSearch.status,

                }).then( (res) => {
                    if(res.data.code=='0'){
                        this.showModal=false;
                    }else{
                        this.$Message.error(res.data.status);
                    }
                })
            }
                }
            });



        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            this.$refs['listSearch'].resetFields();
          }
        },

    },
}
</script>

<style scoped lang="less">
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
  padding: 5px 0;
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

    .yearClass{
        width: 110px;height: 25px;border: 1px solid #dcdee2; line-height: 25px; display: inline-block; margin-right: 10px; text-align: center ;margin-top:10px;
    }


    .header-inner {
        display: inline-block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #17233d;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span{
            color:red;
        }
    }

    .modelClass{
        text-align: center;height: 150px;
        line-height: 150px;
        font-size: 18px;
        font-weight: bold;
    }
</style>
