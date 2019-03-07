<!--驾校信息详情  -->

<template>

<Modal
    v-model="showModal"
    title="驾校信息"
    width="90"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    class="table-modal-detail"
    :transition-names="['', '']">
    <div style="height: 100%;overflow: auto;">
        <Form :label-width="110" ref="search" :rules="ruleValidate"  :model="search" class="common-form">
            <FormItem label="驾校全称:"  prop="name">
                <Input type="text" v-model="search.name" placeholder="请输入驾校全称"></Input>
            </FormItem>
            <FormItem label="驾校简称:"  prop="simpleName">
                <Input type="text" v-model="search.simpleName" placeholder="请输入驾校简称"></Input>
            </FormItem>
            <FormItem label="区域:"  prop="areaKey">
                <Select v-model="search.areaKey" clearable @on-change="selectAreaFun" :label-in-value="true">
                    <Option v-for="item in areaOption" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="许可证号" prop="licenseNo">
                <Input type="text" v-model="search.licenseNo" placeholder="请输入许可证号"></Input>
            </FormItem>

            <FormItem label="报名地址:" prop="address">
                <Input type="text" v-model="search.address" placeholder="请输入报名地址"></Input>
            </FormItem>
            <FormItem label="地址经度:" prop="lon">
                <Input type="text" v-model="search.lon" placeholder="请输入地址经度"></Input>
            </FormItem>
            <FormItem label="地址纬度:" prop="lat">
                <Input type="text" v-model="search.lat" placeholder="请输入地址纬度"></Input>
            </FormItem>
            <FormItem label="驾校电话1:" >
                <Input type="text" v-model="search.phoneNo1" placeholder="请输入驾校电话"></Input>
            </FormItem>
            <FormItem label="驾校电话2:" >
                <Input type="text" v-model="search.phoneNo2" placeholder="请输入驾校电话"></Input>
            </FormItem>
            <FormItem label="驾校等级:" prop="creditLevel">
                <Select v-model="search.creditLevel" clearable>
                    <Option v-for="item in creditLevelArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="是否启用:" >
                <i-switch size="large" v-model="search.available">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                </i-switch>
            </FormItem>

            <FormItem label="培训驾照类型:" prop="trainingScope" style="width: 95%;">
                <div style="width: 450px;">
                <Select v-model="search.trainingScope" multiple clearable>
                    <Option v-for="item in checkList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                </Select>
                </div>
            </FormItem>
            <FormItem label="训练基地:"  style="width: 95%;" prop="drivingBase">
                <div style="width: 450px;">
                    <unit-search-input  :searchTableData="searchTableData" :showChange="showChange" :tableData="tableData" :flagData=1 @closeSelect="closeSelect" @onRowSelect="onRowSelect"></unit-search-input>
                </div>
            </FormItem>
            <FormItem label="" style="width: 80%;"  v-if="data1.length">
                <div style="width: 450px;">
                    <Table :columns="columns1" :data="data1" @on-selection-change="onSelectionChange"></Table>
                </div>

            </FormItem>
            <FormItem label="图片上传:" style="width: 80%;" >

                <upload-imgs :description="description" :callback="'uploadImgFun'" @uploadImgFun="uploadImgFun" :data="search.pic"></upload-imgs>

            </FormItem>
            <FormItem label="" style="width: 80%;" >
                <p>最多上传五张图片，单张最大不超过3M</p>
                <p>仅支持PNG、JPG、JPEG、BMP格式</p>
            </FormItem>
            <FormItem label="驾校简介:" prop="about" style="width: 95%;">
                <!--<Input type="textarea" v-model="search.about" :rows="1" placeholder="请输入公司简介"> </Input>-->
                <tiny-editor :content="search.about" ref="editor"></tiny-editor>
            </FormItem>
        </Form>
<Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div slot="footer">
            <Button  @click="addDrive('search')" size="large" type="success"  v-if="accessBtn('add')">提交</Button>
        </div>

  </Modal>

</template>

<script>
import funMixin from '~/components/fun-auth-mixim.js'
import unitSearchInput from '~/components/unit-search-input.vue'
import uploadImgs from '~/components/upload-imgs.vue'
import TinyEditor from '~/components/tiny-editor.vue'
import { deepClone } from '@/static/util'

let initSearch={
    "address": "",
    "areaKey": "",
    "areaName": "",
    "creditLevel": "",
    "drivingBase": "",
    "baseId": [],
    "id": '',
    "lat": '',
    "licenseNo": "",
    "lon": '',
    "name": "",
    "phoneNo":'',
    "phoneNo1": "",
    "phoneNo2": "",
    "pic": [],
    "simpleName": "",
    "trainingScope": [],
    "about":"",
    available: false,
}

let publiceData={ required: true, message: '请填写数据', };

export default {
	name: "school-info-detail",
    props:['showDetail', 'detailData'],
    mixins: [funMixin],
    components: {unitSearchInput,uploadImgs,TinyEditor},
    data(){
        return{
            spinShow:false,
            showModal:false,
            showCaptcha:false,
            description:'上传图片',
            search:deepClone(initSearch),
            checkList:[
                {'name':'A1'},
                {'name':'A2'},
                {'name':'B1'},
                {'name':'B2'},
                {'name':'C1'},
                {'name':'C2'},
                {'name':'D'},
                {'name':'E'},
                {'name':'F'},

            ],
            checkAllGroup: [],
            creditLevelArr:[
                {name:'未评级',code:'N'},
			{name:'B',code:'B'},
			{name:'A',code:'A'},
			{name:'AA',code:'AA'},
			{name:'AAA',code:'AAA'},
            ],
            ruleValidate: {
                name:[publiceData],
                simpleName: [publiceData],
                licenseNo: [publiceData],
                address: [publiceData],
                lon: [{ required: true,pattern:/^\d*\.\d{6}$/, message: '地址经度必填,且小数精度六位'}],
                lat: [{ required: true,pattern:/^\d*\.\d{6}$/, message: '地址维度必填,且小数经度六位'}],
                creditLevel: [publiceData],
                trainingScope: [publiceData],
                drivingBase: [publiceData],
                areaKey: [publiceData],
                about: [publiceData],
            },//规则验证
            searchTableData:'',
            showChange:null,

            columns1: [
                {type: 'selection',width: 60,align: 'center'},
                {title: '基地名称', key: 'name', sortable: true, minWidth: 140},
                {title: '基地地址', key: 'address', sortable: true, minWidth: 140},
            ],
            tableData:[
                {title: '基地名称', key: 'name', sortable: true, minWidth: 140},
                {title: '基地地址', key: 'address', sortable: true, minWidth: 140},
            ],
            data1: [],
            areaOption:[]
        }
    },
    watch:{

        showDetail(){
            this.showModal=true;
            this.getAreaInfo();
            this.showChange=Math.random();
            this.search=deepClone(initSearch);
            if(this.detailData){
                for(let i in this.search){
                    switch(i){
                        case 'pic':
                            if(this.detailData['pic']){
                                if(this.detailData['pic'].indexOf(',')!=-1){
                                    this.search.pic=this.detailData['pic'].split(',')
                                }else{
                                    this.search.pic.push(this.detailData['pic']);
                                }
                            }

                        break;
                        case 'trainingScope':
                            if(this.detailData['trainingScope']){
                                if(this.detailData['trainingScope'].indexOf(',')!=-1){
                                    this.search.trainingScope=this.detailData['trainingScope'].split(',')
                                }else{
                                    this.search.trainingScope.push(this.detailData['trainingScope']);
                                }
                            }

                        break;
                        case 'phoneNo':
                                let temPhone=this.detailData['phoneNo'].split('/');
                                this.search.phoneNo1=temPhone[0];
                                this.search.phoneNo2=temPhone[1];
                        break;
                        case 'phoneNo1':
                        case 'phoneNo2':
                        break;
                        default:this.search[i]=this.detailData[i]||'';

                    }
                }
                let newBase=this.detailData['baseList'];
                this.search.baseId=[];
                for(let i in newBase){
                    newBase[i]['_checked']=true;
                    this.search.baseId.push(newBase[i]['id']);
                    this.data1.push(newBase[i]);
                }
            }

        },
    },
    methods:{
        closeSelect(){

        },
        onRowSelect(val){

            let newVal={
                id:'',
                name:'',
                address:'',
                _checked:true
            }
            newVal['name']=val['name'];
            newVal['address']=val['address'];
            newVal['id']=val['id'];

            for(let i in this.data1){
                if(newVal['id']==this.data1[i]['id']){
                    return;
                }
            }



            this.data1.push(newVal);

            this.search.drivingBase="";
            this.search.baseId=[];
            for(let i in this.data1){
                if(this.data1[i]['_checked']){
                    if(i==(this.data1.length-1)){
                        this.search.drivingBase+=this.data1[i]['name'];
                        this.search.baseId.push(this.data1[i]['id']);
                    }else{
                        this.search.drivingBase+=this.data1[i]['name']+',';
                        this.search.baseId.push(this.data1[i]['id']);
                    }
                }

            }
            console.log(JSON.stringify(this.data1),this.search.drivingBase);
        },
        onSelectionChange(selection){
            
            for(let i in this.data1){
                    this.data1[i]['_checked']=false;
            }
            for(let i in this.data1){
                for(let j in selection){
                    if(this.data1[i].id==selection[j].id){
                        this.data1[i]['_checked']=true;
                    }
                }

            }

            this.search.drivingBase="";
            this.search.baseId=[];
            for(let i in selection){
                if(i==(selection.length-1)){
                    this.search.drivingBase+=selection[i]['name'];
                    this.search.baseId.push(selection[i]['id']);
                }else{
                    this.search.drivingBase+=selection[i]['name']+',';
                    this.search.baseId.push(selection[i]['id']);
                }
            }
            
        },
        //监听界面变化--------
        visibleChange(status){
            if(status === false){
                this.data1=[];
                this.handleReset('search');
                this.$emit('closeDetail');
            }
        },
        //清除规则验证-------------
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        //选择文件--------
        uploadImgFun(val){
            console.log("传输出来的数据",val);

            this.search.pic=val;
        },

        addDrive(name){
            this.search['about']=this.$refs.editor.getContent();
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let addData=deepClone(initSearch);
                    for(let i in addData){
                        if(i=="phoneNo"){
                            if(this.search['phoneNo1']&&this.search['phoneNo2']){
                                addData[i]=this.search['phoneNo1']+'/'+this.search['phoneNo2'];
                            }else if(this.search['phoneNo1']){
                                addData[i]=this.search['phoneNo1'];
                            }else if(this.search['phoneNo2']){
                                addData[i]=this.search['phoneNo2'];
                            }
                        }else{
                            addData[i]=this.search[i];
                        }
                    }
                    if(this.search['id']){
                        this.$axios.put('/training/driving/school/'+this.search['id'], addData).then( (res) => {
                            if(res.data.code=='0'){
                                this.showModal=false;
                            }
                        })
                    }else{
                        this.$axios.post('/training/driving/school', addData).then( (res) => {
                            if(res.data.code=='0'){
                                this.showModal=false;
                            }
                        })
                    }
                }
            });



        },
        //获取区域数据-------
        getAreaInfo(){
            this.$axios.post('/area/region/list', {
                   "areaName": "shanghai"
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.areaOption=res.data.items;
                }else{
                    this.$Message.error(res.data.status);
                }
           })

        },
        selectAreaFun(val){
            console.log(val);
            if(val){
                this.search['areaName']=val['label'];
            }

        }

    },
}
</script>

<style scoped lang="less">
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}

.check-block{
        display: inline-block;
    vertical-align: top;

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
