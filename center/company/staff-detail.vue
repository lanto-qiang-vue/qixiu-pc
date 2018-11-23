<template>
  <div style="">
    <div style="height:10px;clear:both;"></div>
    <div style="float:left;height:500px;width:60%;" >
        <Form class="common-form" :model="formData" :ref="formData" :rules="rule" :label-width="120">
          <FormItem label="姓名" style="width:70%;">
            <Input type="text" v-model="formData.name"></Input>
          </FormItem>
          <FormItem label="性别:" style="width:70%;">
            <RadioGroup v-model="formData.gender">
              <Radio label="1" >男</Radio>
              <Radio label="2" >女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="学历:">
            <Select v-model="formData.education">
              <Option v-for="item in educationList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否在岗:" style="width:70%;">
            <RadioGroup v-model="formData.isonduty">
              <Radio :label="true" >是</Radio>
              <Radio :label="false" >否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="岗位:" style="width:70%;">
            <RadioGroup v-model="formData.position">
              <Radio v-for="item in positionList" :label="item.id">{{item.name}}</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
    </div>
    <div style="float:left;height:500px;width:40%;">
      11222
    </div>
    <div style="clear:both;"></div>
    <!--<Tabs type="card" :before-remove='beforeRemove' v-model="indexName">-->
      <!--<TabPane v-for="(item,tab) in formData" :closable="true" :key="tab"  :name="'s'+(tab+1)" :label="'标签' + (tab+1)">-->
        <!--<Form class="common-form" :model="item" :ref="item" :rules="rules" :label-width="120">-->
          <!--<FormItem label="名称" prop="name">-->
            <!--<Input type="text" v-model="item.name"></Input>-->
          <!--</FormItem>-->
        <!--</Form>-->
      <!--</TabPane>-->
      <!--<Button @click="handleTabsAdd" size="small" slot="extra">增加</Button>-->
    <!--</Tabs>-->
    <Button @click="submit">保存</Button>
  </div>
</template>

<script>
  export default {
    name: 'staff-detail',
    data () {
      return {
        educationList:[
          {id:1,name:'小学'},
          {id:2,name:'初中'},
          {id:3,name:'高中'},
          {id:7,name:'技校'},
          {id:8,name:'中专'},
          {id:9,name:'高职'},
          {id:5,name:'本科'},
          {id:6,name:'硕士'},
          {id:10,name:'博士'},
        ],
        positionList:[
          {id:1,name:'技术负责人'},
          {id:2,name:'质量检验员'},
          {id:3,name:'汽车维修机工'},
          {id:4,name:'汽车维修电工'},
          {id:5,name:'汽车维修钣金工'},
          {id:6,name:'汽车维修漆工'},
          {id:7,name:'焊工'},
          {id:8,name:'轮胎维修工'},
          {id:9,name:'气缸镗磨工'},
          {id:10,name:'曲轴修磨工'},
          {id:11,name:'汽车美容装潢工'},
          {id:12,name:'摩托车修理工'},
          {id:13,name:'车身清洁工'}
        ],
        tabs: 2,
        indexName:'s2',
        formData:{
          name:'姓名',
          gender:"1",
          education:10,
          isonduty:true,
        },
        // formData:[
        //   {
        //     name:'',
        //   },
        //   {
        //     name:'1',
        //   },
        //   {
        //     name:'2',
        //   }
        // ],
        rule:{},
        rules:{
          name:[{required:true,message:'名称必填'}],
        },
      }
    },
    methods:{
      beforeRemove(index){
        this.formData.splice(index,1);
        return new Promise(function(resolve, reject) {

        })
      },
      handleTabsAdd(){
        this.formData.push({name:''});
        this.indexName = 's'+this.formData.length;
      },
      submit(){
        console.log(JSON.stringify(this.formData));
      }
    }
  }
</script>

<style scoped>

</style>
