<template>

<Modal
    v-model="showModal"
    title="绑定本人车辆"
    width="90"
    :scrollable="true"
    :transfer= "false"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
        <div style="height: 100%;overflow: auto;">
        
        <Form :label-width="80">
            <FormItem label="绑定类型:" style="width: 300px;">
                <Select v-model="model1" >
                    <Option v-for="item in searchSelectOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="上传行驶证:">
                <div class="pic-card">
                    <div class="pic-body" style="height: 40px;">
                        <div class="button" v-show="editAble" style="text-align: left;">
                            <div class="up-img">
                            <Button type="primary">上传图片</Button>
                            <input type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"
                                    @change="getImg('TENANT_FILE_PATH', $event)"/>
                            
                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>
                        
                    </div>
                    
                </div>
                
                
            </FormItem>
            <FormItem label="">
                <div class="pic-card">
                    <div class="pic-body">
                        <img v-show="!info.TENANT_FILE_PATH" class="no-pic" src="../../assets/img/no_img.png"/>
                        <img v-show="info.TENANT_FILE_PATH" class="pic" :src="info.TENANT_FILE_PATH"
                            @click="showImg(info.TENANT_FILE_PATH)"/>
                        
                    </div>
                </div>
            </FormItem>
            <FormItem label="上传身份证（头像面）">
                <div class="pic-card">
                    <div class="pic-body" style="height: 40px;">
                        <div class="button" v-show="editAble" style="text-align: left;">
                            <div class="up-img">
                            <Button type="primary">上传图片</Button>
                            <input type="file" accept="image/jpg,image/jpeg,image/png,image/bmp"
                                    @change="getImg('TENANT_FILE_PATH', $event)"/>
                            
                            </div>
                            <span>仅支持PNG、JPG、JPEG、BMP</span>
                        </div>
                        
                    </div>
                    
                </div>
            </FormItem>
            <FormItem label="">
                <div class="pic-card">
                    <div class="pic-body">
                        <img v-show="!info.TENANT_FILE_PATH" class="no-pic" src="../../assets/img/no_img.png"/>
                        <img v-show="info.TENANT_FILE_PATH" class="pic" :src="info.TENANT_FILE_PATH"
                            @click="showImg(info.TENANT_FILE_PATH)"/>
                        
                    </div>
                    
                    
                    
                                
                        

                </div>
                
            </FormItem>
        </Form>
<Input v-model="model1" placeholder="Enter something..."  />
                                <span slot="prepend">姓名：</span>
                                    
                                </Input>
                        
                                <Input v-model="model1" placeholder="Enter something..."  />   
                        
                                <Button  @click="" size="large" type="success"  style="margin-right: 10px;">提交</Button>
        
        </div>
        <div slot="footer">
            <Button  @click="" size="large" type="success"  style="margin-right: 10px;">提交</Button>
            <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
        </div>
  </Modal>
</template>

<script>
import { getName, getDictGroup, imgToBase64 } from '@/static/util.js'
export default {
    
	name: "bind-my-car",
    props:['showDetail', 'detailData'],
    data(){
		  return{
              loading:true,
        columns: [
          {title: '序号',  minWidth: 80,
            render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
          },
          {title: '车牌号码', key: 'vehicleplatenumber', sortable: true, minWidth: 120,
            
          },
          {title: '车牌品牌', key: 'brand', sortable: true, minWidth: 120},
          {title: '车架号', key: 'vin', sortable: true, minWidth: 135},
          {title: '发动机', key: 'engineno', sortable: true, minWidth: 120},
        ],
        tableData: [],
        searchSelectOption:[
            {
                value: '个人车辆',
                label: '个人车辆'
            },
            {
                value: '企业车辆',
                label: '企业车辆'
            },
        ],
        model1:'',
        searchSelectOption1:[],//重新赋值--
        search:{
          input: '',
          select: '',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        showModal:false,
        info:{
          "TENANT_ID":"",
          "TENANT_AREA_CODE":"",
          "TENANT_NAME":"",
          "TENANT_AREA_DISPLAY":"",
          "TENANT_ADD":"",
          "BUSINESS_TYPE":"",
          "COMPANY_BUSINESS_SCOPE":"",
          "ORG_NUMBER":"",
          "ROAD_LICENSE":"",
          "LICENSE_START_DATE":"",
          "LICENSE_END_DATE":"",
          "LEGAL_NAME":"",
          "LEGAL_TEL":"",
          "LINK_MAN":"",
          "LINK_TEL":"",
          "EMAIL":"",
          "STATUS":"",
          "LINK_ZIP":"",
          "TENANT_NUM":"",
          "ROAD_FILE_PATH":"",
          "BUS_FILE_PATH":"",
          "TENANT_FILE_PATH":"",
          "REMARK":"",
        },
        editAble: true
      }
    },
    watch:{
        showDetail(){
            this.showModal=true;
        },
    },
    mounted () {
        
    },
    // beforeMount(){
    //   this.$axios.post('/menu/list', {
    //     "pageNo": 1,
    //     "pageSize": 10,
    //   })
    // },
    methods:{
        showImg(img){
            this.$Modal.info({
            width: 90,
            title: '查看',
            closable: true,
            content: '<img src="'+img+'" style="width: 100%"/>'
            })
        },
        getImg( name, e){
            imgToBase64(e.target.files[0], (base64, fileName)=> {
            this.info[name]= base64
            console.log(this.info[name]);
            })
        },
        
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
.pic-card{
      display: inline-block;
      margin: 0 10px 10px 0;
      width: 28%;
      min-width: 250px;
      .red{
        color: red;
      }
      .pic-body{
        width: 100%;
        height: 200px;
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
            input{
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
