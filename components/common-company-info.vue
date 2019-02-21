<template>
    <!--维修企业信息公共组件-->
  <div>

    <Tabs :animated="false" v-model="tabName" @on-click="tabClick">
        <TabPane  :label="label" name="name1">
          <div style="padding-bottom: 100px;">
              <Form ref="requireList" :rules="ruleValidate1" :model="requireList" :label-width="140" class="common-form">
            <FormItem label="企业名称:" style="width: 45%;" prop="name">
              <Input type="text" v-model="requireList.name" placeholder="请输入企业名称"></Input>
            </FormItem>
            <FormItem label="许可证号:" style="width: 45%;" prop="license">
              <Input type="text" v-model="requireList.license" placeholder="请输入许可证号"></Input>
            </FormItem>
            <FormItem label="许可证有效期:" style="width: 45%;" prop="licenceDate">
              <DatePicker type="daterange" v-model="requireList.licenceDate" placeholder="请选择" style="width: 100%;" @on-change="onOpenChangeDate"></DatePicker>
            </FormItem>
            <FormItem label="工商注册地址:" style="width: 45%;" prop="registerAddress">
              <Input type="text" v-model="requireList.registerAddress" placeholder="请输入工商注册地址"></Input>
            </FormItem>
            <FormItem label="工商注册区域:" style="width: 45%;" prop="registerRegion">
              <Select v-model="requireList.registerRegion" :transfer="true">
                <Option v-for="item in typeList" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="工商注册日期:" style="width: 45%;" prop="registerDate">
              <DatePicker type="date" placeholder="请选择" style="width: 100%;"
                          v-model="requireList.registerDate"  @on-change="changeRegisterDate"></DatePicker>
            </FormItem>

            <FormItem label="经营地地址:" style="width: 45%;" prop="businessAddress">
              <Input type="text" v-model="requireList.businessAddress" placeholder="请输入经营地地址" @on-change="changeBusinessAddress"></Input>
            </FormItem>
            <FormItem label="经营地址区域:" style="width: 45%;" prop="businessRegion">
              <Select v-model="requireList.businessRegion" :transfer="true">
                <Option v-for="item in typeList" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="经营地址经度:" style="width: 45%;" prop="longitude">
              <Input type="text" v-model="requireList.longitude" placeholder="请输入经营地址经度"></Input>
            </FormItem>
            <FormItem label="经营地址维度:" style="width: 45%;" prop="latitude">
              <Input type="text" v-model="requireList.latitude" placeholder="请输入经营地址维度"></Input>
            </FormItem>

            <FormItem label="经营范围:" style="width: 45%;" prop="businessScope">
              <Select v-model="requireList.businessScope" @on-change="repairTypeFun($event, true)"
                      :transfer="true">
                <Option v-for="item in repairType" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="经营范围子类:" style="width: 45%;" prop="businessScope2">
              <Select v-model="requireList.businessScope2" multiple clearable :transfer="true">
                <Option v-for="item in businessScope2" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="法定代表人:" style="width: 45%;" prop="legalName">
              <Input type="text" v-model="requireList.legalName" placeholder="请输入法定代表人"></Input>
            </FormItem>
            <div></div>
            <FormItem label="营业执照:" style="width: 45%;" prop="yyzz">
                    <common-info-upload :description="'上传图片'" :data="requireList.yyzz" :callback="'yyzzFun'" @yyzzFun="yyzzFun"></common-info-upload>

            </FormItem>
            <FormItem label="道路运输经营许可证:" style="width: 45%;" prop="dlysxkz">


              <common-info-upload :description="'上传图片'" :data="requireList.dlysxkz" :callback="'dlysxkzFun'" @dlysxkzFun="dlysxkzFun"></common-info-upload>
            </FormItem>
            <FormItem label="门店门头照:" style="width: 45%;" prop="mdmtz">
              <common-info-upload :description="'上传图片'" :data="requireList.mdmtz" :callback="'mdmtzFun'" @mdmtzFun="mdmtzFun"></common-info-upload>
            </FormItem>
          </Form>
          </div>

        </TabPane>
<!--这边是第二步骤        -->
        <TabPane :label="label1" name="name2">
          <Form ref="listSearch" :rules="ruleValidate" :model="listSearch" :label-width="140" class="common-form">

            <FormItem label="管理机构与部门:" style="width: 45%;" prop="manageArr">
              <Cascader :data="manageType" change-on-select v-model="listSearch.manageArr" @on-change="onChangeM" :clearable=false></Cascader>
            </FormItem>
            
            <FormItem label="法人手机:" style="width: 45%;">
              <Input type="text" v-model="listSearch.legalMobile" placeholder="请输入代表人手机"></Input>
            </FormItem>
            

            <FormItem label="经营地址邮编:" style="width: 45%;">
              <Input type="text" v-model="listSearch.postalCode" placeholder="请输入经营地址邮政编码"></Input>
            </FormItem>
            <FormItem label="经营负责人:" style="width: 45%;">
              <Input type="text" v-model="listSearch.operatorName" placeholder="请输入日常经营管理负责人"></Input>
            </FormItem>
            <FormItem label="经营负责人手机:" style="width: 45%;">
              <Input type="text" v-model="listSearch.operatorMobile" placeholder="请输入负责人手机"></Input>
            </FormItem>

            <FormItem label="业务联系电话:" style="width: 45%;">
              <Input type="text" v-model="listSearch.complaintTel" placeholder="请输入企业反馈电话"></Input>
            </FormItem>

            <FormItem label="营业状态:" style="width: 45%;">
              <Select v-model="listSearch.yyState" :transfer="true" clearable @on-change="onChangeS">
                <Option value="true">营业中</Option>
                <Option value="false" >休息中</Option>
              </Select>
            </FormItem>
            <FormItem label="营业时间:" style="width: 45%;">
              <TimePicker format="HH:mm" type="timerange" placement="bottom-start" placeholder="请选择"
                          style="width: 100%;" v-model="listSearch.businessHours1" @on-change="onChangeTime"></TimePicker>
            </FormItem>
            <FormItem label="经营状态:" style="width: 45%;">
              <Select v-model="listSearch.businessStatus" :transfer="true">
                <Option v-for="item in businessStatusArr" :value="item.key" :key="item.key">{{ item.name }}</Option>
              </Select>
            </FormItem>

            <FormItem label="企业主要业务范围:" style="width: 45%;">

              <Select v-model="listSearch.businessSphere" multiple clearable :transfer="true">
                <Option v-for="item in companySphere" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="其他主要业务范围:" style="width: 45%;"
                      v-show="(listSearch.businessSphere&&listSearch.businessSphere.indexOf(88)==-1)?false:true" prop="businessSphereOther">
              <Input type="text" v-model="listSearch.businessSphereOther" placeholder="请输入其他主要业务范围"></Input>
            </FormItem>


            <FormItem label="备案状态:" style="width: 45%;">
              <Select v-model="listSearch.beianStatus" :transfer="true">
                <Option v-for="item in beianStatusArr" :value="item.name" :key="item.name">{{ item.code }}</Option>
              </Select>
            </FormItem>

            <FormItem label="使用ERP软件:" style="width: 45%;">
              <!--<Input type="text" v-model="listSearch.erpId" placeholder=""></Input>-->
              <unit-search-input  :searchTableData="listSearch.erpName" :showChange="showChange" :tableData="tableData" :flagData=2 @closeSelect="closeSelect" @onRowSelect="onRowSelect"></unit-search-input>
            </FormItem>
            <FormItem label="其他erp软件:" style="width: 45%;">
              <Input type="text" v-model="listSearch.erpOther" placeholder=""></Input>
            </FormItem>

            <FormItem label="特约维修:" style="width: 45%;">
              <i-switch size="large" v-model="listSearch.special">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="4s店:" style="width: 45%;">
              <i-switch size="large" v-model="listSearch.fours" @on-change="onChangeFours">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="主修品牌:" style="width: 45%;" v-show="listSearch.special?true:false">

              <!--<Input type="text" v-model="listSearch.majorBrandId" placeholder=""></Input>-->
              <unit-search-input  :searchTableData="listSearch.majorBrandName" :showChange="showChange" :tableData="tableData1" :flagData=3 @closeSelect="closeSelect" @onRowSelect="onRowSelect1"></unit-search-input>
            </FormItem>

            <FormItem label="连锁经营企业:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.chainBusiness">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="品牌:" style="width: 45%;" v-show="listSearch.chainBusiness?true:false">
              <!--<Input type="text" v-model="listSearch.brandId" placeholder=""></Input>-->
              <unit-search-input  :searchTableData="listSearch.brandName" :showChange="showChange" :tableData="tableData2" :flagData=4 @closeSelect="closeSelect" @onRowSelect="onRowSelect2"></unit-search-input>
            </FormItem>
            <FormItem label="其他品牌:" style="width: 45%;" v-show="listSearch.chainBusiness?true:false">
              <Input type="text" v-model="listSearch.brandOther" placeholder=""></Input>
            </FormItem>

            <FormItem label="集团经营企业:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.groupBusiness">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>


            <FormItem label="综合维修企业:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.comprehensive">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="24小时汽车维修:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.rescue">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="前台显示:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.show">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="总对总:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.zdz">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="是否对接:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.buttJoint">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>


            <FormItem label="使用好修修门店系统:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.useHss">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>

            <FormItem label="门店特色:" style="width: 45%;">
              <Select v-model="listSearch.storeSpecials" multiple clearable :transfer="true">
                <Option v-for="item in storeSpecialsArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>


            <FormItem label="对接渠道:" style="width: 45%;">
              <Select v-model="listSearch.source" clearable style="width: 70%" :transfer="true">
                <Option v-for="item in channels" :value="item.key" :key="item.key">{{ item.name }}</Option>
              </Select>
              <Button size="large" type="primary" @click="showAdd=true,sourceName=''">新增</Button>
            </FormItem>
            <FormItem label="对接时间:" style="width: 45%;">
              <Input type="text" v-model="listSearch.buttJointTime" placeholder="" readonly></Input>
            </FormItem>
            <FormItem label="企业服务优势自我描述:" style="width: 92%;">
              <Input type="textarea" :rows="1" v-model="listSearch.desc" placeholder="请输入企业服务优势自我描述"></Input>
            </FormItem>


            <FormItem label="工时定额执行标准:" style="width: 45%;">
              <Select v-model="listSearch.workingHoursQuotaExecutionStandard" :transfer="true">
                <Option v-for="item in workCompanyType" :value="item.name" :key="item.name">{{ item.code }}</Option>
              </Select>
            </FormItem>
            <FormItem label="工时单价:" style="width: 45%;" >
              <Input type="text" v-model="listSearch.workingHoursPrice" placeholder="请输入工时单价"></Input>
            </FormItem>
            <FormItem label="业户类别:" style="width: 45%;">
              <Select v-model="listSearch.industryCategory" :transfer="true">
                <Option v-for="item in households" :value="item.name" :key="item.name">{{ item.code }}</Option>
              </Select>
            </FormItem>
            <FormItem label="其他业户类别:" style="width: 45%;" v-show="listSearch.industryCategory==9?true:false" prop="industryCategoryOther">
              <Input type="text" v-model="listSearch.industryCategoryOther" placeholder="" style="width: 100%;"></Input>
            </FormItem>
            <FormItem label="经济类型:" style="width: 45%;">

              <Select v-model="listSearch.economicType" :transfer="true">
                <Option v-for="item in moneyType" :value="item.key" :key="item.key">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="其他经济类型:" style="width: 45%;" v-show="listSearch.economicType==900?true:false" prop="economicTypeOther">
              <Input type="text" v-model="listSearch.economicTypeOther" placeholder=""></Input>
            </FormItem>


            <FormItem label="企业员工总数:" style="width: 45%;">
              <Select v-model="listSearch.employeeNumber" :transfer="true">
                <Option v-for="item in companyStaff" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="企业目前占地面积:" style="width: 45%;">
              <Select v-model="listSearch.floorSpace" :transfer="true">
                <Option v-for="item in companyArea" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>

            <FormItem label="经理人:" style="width: 45%;">
              <Input type="text" v-model="listSearch.manager" placeholder="请输入经理人"></Input>
            </FormItem>
            <FormItem label="服务负责人:" style="width: 45%;">
              <Input type="text" v-model="listSearch.serviceLeader" placeholder="请输入服务负责人"></Input>
            </FormItem>
            <FormItem label="技术负责人:" style="width: 45%;">
              <Input type="text" v-model="listSearch.technologyLeader" placeholder="请输入技术负责人"></Input>
            </FormItem>
            <FormItem label="质量检验员:" style="width: 45%;">
              <Input type="text" v-model="listSearch.qualityInspector" placeholder="请输入质量检验员"></Input>
            </FormItem>
            <FormItem label="其他:" style="width: 45%;">
              <Input type="text" v-model="listSearch.managerOther" placeholder="请输入其他"></Input>
            </FormItem>

            <FormItem label="机工高级技师人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.machinists[0]"
                           placeholder="高级技师人数"></InputNumber>
            </FormItem>
            <FormItem label="机工技师人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.machinists[1]"
                           placeholder="技师人数"></InputNumber>

            </FormItem>
            <FormItem label="机工高级人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.machinists[2]"
                           placeholder="高级人数"></InputNumber>

            </FormItem>
            <FormItem label="机工中级人数:" style="width: 45%;">
              <InputNumber :min="0" v-model="listSearch.machinists[3]"
                           placeholder="中级人数"></InputNumber>

            </FormItem>
            <FormItem label="电工高级技师人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.electricians[0]"
                           placeholder="高级技师人数"></InputNumber>

            </FormItem>
            <FormItem label="电工技师人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.electricians[1]"
                           placeholder="技师人数"></InputNumber>

            </FormItem>
            <FormItem label="电工高级人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.electricians[2]"
                           placeholder="高级人数"></InputNumber>


            </FormItem>
            <FormItem label="电工中级人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.electricians[3]"
                           placeholder="中级人数"></InputNumber>

            </FormItem>
            <FormItem label="钣金工高级技师人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.tinbenders[0]"
                           placeholder="高级技师人数"></InputNumber>

            </FormItem>
            <FormItem label="钣金工技师人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.tinbenders[1]"
                           placeholder="技师人数"></InputNumber>

            </FormItem>
            <FormItem label="钣金工高级人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.tinbenders[2]"
                           placeholder="高级人数"></InputNumber>

            </FormItem>
            <FormItem label="钣金工中级人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.tinbenders[3]"
                           placeholder="中级人数"></InputNumber>

            </FormItem>
            <FormItem label="油漆工高级技师人数:" style="width: 45%;">

              <InputNumber :min="0" v-model="listSearch.painters[0]"
                           placeholder="高级技师人数"></InputNumber>

            </FormItem>
            <FormItem label="油漆工技师人数:" style="width: 45%;">


              <InputNumber :min="0" v-model="listSearch.painters[1]" placeholder="技师人数"></InputNumber>


            </FormItem>
            <FormItem label="油漆工高级人数:" style="width: 45%;">


              <InputNumber :min="0" v-model="listSearch.painters[2]" placeholder="高级人数"></InputNumber>


            </FormItem>
            <FormItem label="油漆工中级人数:" style="width: 45%;">


              <InputNumber :min="0" v-model="listSearch.painters[3]" placeholder="中级人数"></InputNumber>

            </FormItem>
            <FormItem label="企业主要维修车型:" style="width: 92%;">
              <CheckboxGroup v-model="listSearch.model">
                <Checkbox v-for="item in vehicleModel" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="其他维修车型:" style="width: 45%;"
                      v-show="(listSearch.model&&listSearch.model.indexOf(6)==-1)?false:true" prop="modelOther">
              <Input type="text" v-model="listSearch.modelOther" placeholder=""></Input>
            </FormItem>


            <div></div>
            <FormItem label="通过ISO质量管理体系认证:" style="width: 230px;">

              <i-switch size="large" v-model="listSearch.iso">
                <span slot="open">通过</span>
                <span slot="close">未通过</span>
              </i-switch>
            </FormItem>
            <FormItem label="" style="width: 60%;" :label-width="0" v-if="listSearch.iso" prop="isoPic">

              <common-info-upload :description="'上传图片'" :data="listSearch.isoPic" :callback="'isoPicFun'" @isoPicFun="isoPicFun"></common-info-upload>
            </FormItem>
            <div></div>
            <FormItem label="通过安全生产标准化达标认证:"  style="width: 230px;">

              <i-switch size="large" v-model="listSearch.throughSafetyProductionStandardization">
                <span slot="open">通过</span>
                <span slot="close">未通过</span>
              </i-switch>
            </FormItem>
            <FormItem label="" style="width: 60%;" :label-width="0" v-if="listSearch.throughSafetyProductionStandardization" prop="safePic">

              <common-info-upload :description="'上传图片'" :data="listSearch.safePic" :callback="'safePicFun'" @safePicFun="safePicFun"></common-info-upload>
            </FormItem>
            <div></div>
            <FormItem label="通过环保部门专项整治:"  style="width: 230px;">

              <i-switch size="large" v-model="listSearch.throughEnvironmentalProtectionSpecialRenovation">
                <span slot="open">通过</span>
                <span slot="close">未通过</span>
              </i-switch>
            </FormItem>
            <FormItem label="" style="width: 60%;" :label-width="0" v-if="listSearch.throughEnvironmentalProtectionSpecialRenovation" prop="greenPic">

              <common-info-upload :description="'上传图片'" :data="listSearch.greenPic" :callback="'greenPicFun'" @greenPicFun="greenPicFun"></common-info-upload>
            </FormItem>
            <div></div>
            <FormItem label="是否为全国诚信维修企业:" style="width: 92%;">
              <i-switch size="large" v-model="listSearch.sincerity" @on-change="changeSincerity">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>

            </FormItem>

            <FormItem label="成为全国诚信维修企业的年份:" style="width: 92%;" prop="sincerityYears" v-show="listSearch.sincerity?true:false">
              <ul class="ivu-input" style="height: auto">
                <li v-for="(item, index) in listSearch.sincerityYears" :key="index">
                  <DatePicker type="year" @on-change="changeSincerityYears($event,index,'startYear')" v-model="item.startYear" placeholder="开始日期" style="width: 100px;"></DatePicker>
                  <DatePicker type="year" @on-change="changeSincerityYears($event,index,'endYear')" v-model="item.endYear" placeholder="结束日期" style="width: 100px;"></DatePicker>
                  <common-info-upload style="width: 170px;display: inline-block;" :description="'上传图片'" :data="item.honestPic" :index="index" :callback="'honestPicFun'" @honestPicFun="honestPicFun"></common-info-upload>
                  <Button type="error" @click="deleteYear(index)">删除</Button>
                </li>
              <Button type="primary" @click="addYear">添加</Button>
              </ul>
            </FormItem>
            <FormItem label="上年度质量信誉考核等级:" style="width: 92%;">
              <RadioGroup v-model="listSearch.qualityReputationAssessmentLevel">
                <Radio v-for="item in qualityCheck" :label="item.id" :key="item.id">{{ item.name }}</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem label="是否提供上门维修:" style="width: 92%;">

              <i-switch size="large" v-model="listSearch.offerOnsiteRepair">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="提供上门服务种类:" style="width: 92%;" v-if="listSearch.offerOnsiteRepair">
              <CheckboxGroup v-model="listSearch.serviceCategory">
                <Checkbox v-for="item in visitService" :label="item.key" :key="item.key">{{item.name}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="其他服务种类:" style="width: 45%;"
                      v-show="(listSearch.serviceCategory.indexOf(300007)==-1?false:true)&&listSearch.offerOnsiteRepair" prop="serviceCategoryOther">
              <Input type="text" v-model="listSearch.serviceCategoryOther" placeholder=""></Input>
            </FormItem>
            <!--<FormItem label="企业特色服务:" style="width: 92%;">
              <Input type="textarea" :rows="1" v-model="listSearch.specialService" placeholder="请输入企业特色服务"></Input>
            </FormItem>-->

            <FormItem label="是否愿意开通车大夫服务等在线维修服务:" style="width: 92%;">

              <i-switch size="large" v-model="listSearch.openOnlineRepairService">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="是否愿意开通在线商务服务:" style="width: 92%;">
              <i-switch size="large" v-model="listSearch.openOnlineBusinessService">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>

            </FormItem>
            <FormItem label="企业自我简介:" style="width: 92%;">
              <Input type="textarea" :rows="1" v-model="listSearch.selfIntroduction" placeholder="请输入企业自我简介"></Input>
            </FormItem>
            <FormItem label="区级以上荣誉获得情况:" style="width: 92%;" prop="honerModels">
              <ul class="ivu-input" style="height: auto">
                <li v-for="(item,index) in listSearch.honerModels" :key="index">
                  <Input type="text" style="width: 300px;" v-model="item.name" placeholder="请输入区级以上荣誉获得情况"></Input>
                  <common-info-upload style="width: 170px;display: inline-block;" :description="'上传图片'" :data="item.url" :callback="'honerFun'" :index="index" @honerFun="honerFun"></common-info-upload>
                  <Button type="error" @click="deleteHonerModels(index)">删除</Button>
                </li>
                <Button type="primary" @click="addHoner">添加</Button>
              </ul>
            </FormItem>
          </Form>
        </TabPane>
    </Tabs>

        <Modal
            v-model="showAdd"
            title="新增"
            width="300"
            @on-visible-change=""
            :scrollable="true"
            :transfer="true"
            :footer-hide="false"
            :mask-closable="false"

            :transition-names="['', '']">

            <div>
                <Form :label-width="100">
                  <FormItem label="对接渠道名称:">
                      <Input type="text" v-model="sourceName" placeholder="请输入渠道名称"></Input>
                  </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button size="large" type="primary" @click="addTypeName">提交</Button>
            </div>
        </Modal>
  </div>
</template>



<script>
import { deepClone, imgToBase64,getName, deepTurn} from '~/static/util.js'
import { formatDate } from '@/static/tools'
import commonInfoUpload  from '~/components/common-info-upload.vue'
import unitSearchInput from '~/components/unit-search-input.vue'
let initList={
    "manageArr":[],//管理机构--
    "fours": false,
    "beianStatus": 1,
    "brandId": 0,
    "brandOther": "",
    
    "businessHours": '',
    "businessHours1":[],
    
    "businessSphere": [],
    "businessSphereOther": '',
    "businessStatus": 0,
    "buttJoint": false,
    "buttJointTime": "",
    "chainBusiness": false,
    "complaintTel": "",//----------
    "comprehensive": false,
    "corpInfoId": 0,
    "createKey": false,
    "dept": "",
    "desc": "",
    "economicType": 0,
    "economicTypeOther": "",
    "electricians": [0,0,0,0],
    "employeeNumber": 0,
    "erpId": 0,
    "erpOther": "",
    "floorSpace": 0,
    "generalAuditInfo": "",
    "generalStatus": 0,
    "groupBusiness": false,
    "greenPic":'',
    "honerModels": [],
    "id": 0,
    "industryCategory": 0,
    "industryCategoryOther": "",
    "iso": false,
    "isoPic": "",
    
    "legalMobile": "",//----------
    
    "machinists": [0,0,0,0],
    "manager": "",
    "managerOther": "",
    "model": [],
    "modelOther": "",
    "offerOnsiteRepair": false,
    "openOnlineBusinessService": false,
    "openOnlineRepairService": false,
    "operatorMobile": "",//----------
    "operatorName": "",//----------
    "org": "",
    "painters": [0,0,0,0],
    "postalCode": "",//----------
    "qualityInspector": "",
    "qualityReputationAssessmentLevel": 0,
    "rescue": false,
    "safePic": "",
    "selfIntroduction": "",
    "serviceCategory": [],
    "serviceCategoryOther": "",
    "serviceLeader": "",
    "show": false,
    "sincerity": false,
    "sincerityYears": [],
    "source": 0,
    "special": false,
    "majorBrandId": 0,
    "storeSpecials": [],
    "technologyLeader": "",
    "throughEnvironmentalProtectionSpecialRenovation": false,
    "throughSafetyProductionStandardization": false,
    "tinbenders": [0,0,0,0],
    "useHss": false,
    "workingHoursPrice": "",
    "workingHoursQuotaExecutionStandard": 0,
    "yyState": 'true',
    "zdz": false,
    "erpName":'',
    "brandName":'',
    "majorBrandName":'',

};
let initList1={
  "businessScope": '',
  "businessScope2": [],
  "corpInfoId": "",
  "cruxAuditInfo": "",
  "dlysxkz": "",
  "id": '',
  "legalName": "",
  "licenceDate":[],
  "licenceBeginDate": "",
  "licenceEndDate": "",
  "license": "",
  "mdmtz": "",
  "name": "",
  "registerAddress": "",
  "registerDate": "",
  "registerRegion": "",
  "status": 0,
  "yyzz": "",
  "businessAddress": "",//----------
  "businessRegion": "",//----------
  "longitude": 0,
  "latitude": 0,
}
export default {
    name: "common-company-info",
    props: ['data','data1'],
    components: {commonInfoUpload,unitSearchInput},
    data(){
      let rulesObj={ required: true, message: '必填项不可为空' };
        return{
            token: {token: ''},//token数据-----
            collapse: '1',
            showAdd: false,
            uploadData:{},
            uploadOtherData:{},

            requireList:deepClone(initList1),
            listSearch:deepClone(initList),

            ruleValidate: {
                manageArr: [rulesObj],
                businessSphereOther:[{
                  validator: (rule, value, callback) => {
                    
                    if (this.$data.listSearch.businessSphere.indexOf(88) >=0 && !value) {
                      callback(new Error('请填写其他主要业务范围'));
                    }else{
                      callback();
                    }
                  }
                }],
                majorBrandId:[{
                  
                  validator: (rule, value, callback) => {
                    if (this.$data.listSearch.special && !value) {
                      callback(new Error('请填写主修品牌'));
                    }else{
                      callback();
                    }
                  }
                }],
                industryCategoryOther:[{
                  
                  validator: (rule, value, callback) => {
                    if (this.$data.listSearch.industryCategory == 9 && !value) {
                      callback(new Error('请填写其他业户类别'));
                    }else{
                      callback();
                    }
                  }
                }],
                economicTypeOther:[{
                  validator: (rule, value, callback) => {
                    if (this.$data.listSearch.economicType == 900 && !value) {
                      callback(new Error('请填写其他经济类型'));
                    }else{
                      callback();
                    }
                  }
                }],
                modelOther:[{
                  validator: (rule, value, callback) => {
                    
                    if (this.$data.listSearch.model.indexOf(6) != -1 && !value) {
                      callback(new Error('请填写其他维修车型'));
                    }else{
                      callback();
                    }
                  }
                }],
                serviceCategoryOther:[{
                  validator: (rule, value, callback) => {
                    
                    if (this.$data.listSearch.serviceCategory.indexOf(300007) != -1 && !value) {
                      callback(new Error('请填写其他服务种类'));
                    }else{
                      callback();
                    }
                  }
                }],
                safePic:[{
                  validator: (rule, value, callback) => {
                    if (this.$data.listSearch.throughSafetyProductionStandardization&& !value) {
                      callback(new Error('请完善通过安全生产标准化达标认证资料'));
                    }else{
                      callback();
                    }
                  }
                }],
                isoPic:[{
                  validator: (rule, value, callback) => {
                    if (this.$data.listSearch.iso&& !value) {
                      callback(new Error('请完善通过ISO质量管理体系认证资料'));
                    }else{
                      callback();
                    }
                  }
                }],
                greenPic:[{
                  validator: (rule, value, callback) => {
                    if (this.$data.listSearch.throughEnvironmentalProtectionSpecialRenovation&& !value) {
                      callback(new Error('请完善通过环保部门专项整治资料'));
                    }else{
                      callback();
                    }
                  }
                }],
              sincerityYears:[{
                validator: (rule, value, callback) => {
                  // console.log('sincerityYears', value)
                  let pass= false
                  if (this.$data.listSearch.sincerityYears){
                    if(value.length){
                      pass= true
                      for(let i in value){
                        if(!value[i].startYear || !value[i].honestPic){
                          pass= false
                        }
                      }
                    }
                  }else{
                    pass= true
                  }
                  if(pass) callback()
                  else callback(new Error('请完善成为全国诚信维修企业的年份的资料, [开始日期]和[上传图片]为必填项'));
                }
              }],
                workingHoursPrice: [{ message: '最多两位小数位', trigger: 'change', pattern: /^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/ }],

              honerModels:[{
                validator: (rule, value, callback) => {
                  console.log('honerModels', value)
                  let pass= false
                  if (value.length){
                      pass= true
                      for(let i in value){
                        if(!value[i].name || !value[i].url){
                          pass= false
                        }
                      }
                  }else{
                    pass= true
                  }
                  if(pass) callback()
                  else callback(new Error('请完善区级以上荣誉获得情况, [荣誉情况]和[上传图片]为必填项'));
                }
              }]
            },//规则验证
            ruleValidate1: {
                name: [rulesObj],
                license: [rulesObj],
                licenceDate: [rulesObj,{
                  validator: (rule, value, callback) => {
                    // console.log('licenceDate', value)
                    if (!value[0] || !value[1]) {
                      callback(new Error('必填项不可为空'));
                    }else{
                      callback();
                    }
                  }
                }],
                businessAddress: [rulesObj],
                businessRegion: [rulesObj],
                longitude: [rulesObj],
                latitude: [rulesObj],
                registerAddress: [rulesObj],
                registerRegion: [rulesObj],
                registerDate: [rulesObj],
                businessScope: [rulesObj],
                businessScope2: [rulesObj],
                legalName: [rulesObj],
                yyzz: [rulesObj],
                mdmtz: [rulesObj],
                dlysxkz: [rulesObj],
            },//规则验证
            sourceName: '',//对接渠道名称----
            //审核状态问题------
            statusArr: [
                { code: 0, name: '其他' },
                { code: 1, name: '待审核' },
                { code: 2, name: '审核成功' },
                { code: 3, name: '审核不成功' }
            ],
            manageType: [],//管理部门数据集合--------
            manageArr: [],
            typeList: [],//学历类别数据------
            channels: [],//对接渠道-----------
            //维修类别数据---------
            repairType: [],
            companyRepair: '',
            //经营范围子类
            businessScope2: [],
            //企业主要业务
            companySphere: [],
            //企业员工总数
            companyStaff: [],
            //企业占地面积
            companyArea: [],
            //企业主要维修车型
            vehicleModel: [
                { code: '轿车（不含出租）', name: 1 },
                { code: '货车', name: 2 },
                { code: '客车', name: 3 },
                { code: '出租车', name: 4 },
                { code: '特种车', name: 5 },
                { code: '主修品牌', name: 6 }
            ],
            //上年度质量考核
            qualityCheck: [],
            //上门服务-----
            visitService: [],
            //业户类别--------
            households: [
                { code: '企业', name: 6 },
                { code: '分支机构', name: 7 },
                { code: '个体经营户', name: 8 },
                { code: '其他', name: 9 }
            ],
            //经济类型-------
            moneyType: [],
            //工时定额执行标准-----
            workCompanyType: [
                { code: '行业', name: 1 },
                { code: '制造企业', name: 2 }
            ],
            //是否选项------
            whetherType: [
                { code: '是', name: '1' },
                { code: '否', name: '0' }
            ],
            //通过选项---
            passType: [
                { code: '通过', name: '1' },
                { code: '未通过', name: '0' }
            ],
            //备案状态数据
            beianStatusArr: [
                { code: '待备案', name: 1 },
                { code: '已备案', name: 2 },
                { code: '未备案', name: 3 }
            ],
            //经营状态数据------
            businessStatusArr: [],

            infoBusine:{
                id:'',
                corpName:'',
                legalPerson:'',
                imageUrl:'',
                imageData:'',
            },


            tabName:'name1',

            showChange:null,
            searchTableData:'',
            tableData:[
              {title: '企业名称', key: 'name', sortable: true, minWidth: 140},
            ],
            tableData1:[
              {title: '主修品牌', key: 'name', sortable: true, minWidth: 140},
            ],
            tableData2:[
              {title: '品牌', key: 'name', sortable: true, minWidth: 140},
            ],
            //门店特色数据--
            storeSpecialsArr:[],
          timer: null
        }
    },
    computed:{
      label(){
        let obj= this.calcStatus(this.requireList.status)
        return (h) => {
          return h('div', [
            h('span', '维修企业关键信息'),
            h('span', {
                style: {
                  color: obj.color,
                }
              },
              '（'+obj.text+'）')
          ])
        }
      },
      label1(){
        let obj= this.calcStatus(this.listSearch.generalStatus)
        return (h) => {
          return h('div', [
            h('span', '维修企业一般信息'),
            h('span', {
                style: {
                  color: obj.color,
                }
              },
              '（'+obj.text+'）')
          ])
        }
      }
    },
    watch:{

    },
    mounted () {
      this.token.token = this.$store.state.user.token;
      this.getPubliceType(4)
      this.getPubliceType(6)
      this.getPubliceType(7)
      this.getPubliceType(8)
      this.getPubliceType(9)
      this.getPubliceType(30)
      this.getPubliceType(24)
      this.getCompanyArea()
      this.getValuesByTypeFun(33)
      this.getValuesByTypeFun(1)
      this.getValuesByTypeFun(34)
      this.getType()
    },
    methods:{
      //数据合并-------------
      mergeData(datas){
          // console.log('进入第一步监听',this.data);
          this.tabName="name1";

          this.$refs['requireList'].resetFields();

          this.requireList=deepClone(initList1);

          if(datas.id){
            this.uploadData=deepClone(datas);

            for (let i in this.uploadData) {
                if (this.uploadData[i]) {
                    this.requireList[i] = this.uploadData[i]
                }
            }
            this.requireList.licenceDate=[this.requireList.licenceBeginDate, this.requireList.licenceEndDate];

            if (this.requireList['businessScope']) {
                // console.log("this.requireList['businessScope']",this.requireList['businessScope']);
                this.repairTypeFun(this.requireList['businessScope'])
            }
          }else{
            this.uploadData= this.requireList
          }
      },

      mergeOtherData(datas){
          // this.$refs['listSearch'].resetFields();

          this.listSearch=deepClone(initList);
          if(datas.id){
            this.uploadOtherData=deepClone(datas);

            for (let i in this.uploadOtherData) {
              if (i == 'businessHours') {
                this.listSearch["businessHours1"] = this.uploadOtherData[i].split('-')
              }else if(i=='yyState'){
                  this.listSearch[i] = this.uploadOtherData[i].toString();
              }else if(i=='sincerityYears'){
                  this.listSearch[i]= this.uploadOtherData[i]?deepTurn(this.uploadOtherData[i]):[]
              }else if(this.uploadOtherData[i]){
                  this.listSearch[i] = this.uploadOtherData[i]
              }
            }
            this.listSearch.manageArr = [this.listSearch.org, this.listSearch.dept]
            console.log('this.listSearch',this.listSearch);
          }else{
            this.uploadOtherData= this.listSearch
          }

          if(this.listSearch.fours){
              this.listSearch.special=true;
          }

          this.showChange=Math.random();

      },
      //新建企业
      rulesData(){
        let temData={};
        this.$refs.requireList.validate((valid1) => {
          if (valid1) {
            this.$refs.listSearch.validate((valid2) => {
              if (valid2) {
                for(let i in this.uploadData){
                  this.uploadData[i]= this.requireList[i]
                }
                for(let i in this.uploadOtherData){
                  this.uploadOtherData[i]=this.listSearch[i];
                }
                temData={...this.uploadData, ...this.uploadOtherData}
                this.$emit('saveInfoFun',temData);
              }else{
                this.tabName="name2";
              }
            })
          }else{
            this.tabName="name1";
          }
        })
      },
      //关键信息校验--------
      rulesData2(){
        this.$refs['requireList'].validate((valid) => {
          if (valid) {
            for(let i in this.uploadData){
              this.uploadData[i]= this.requireList[i]
            }
              this.$emit('saveInfoFun',this.uploadData);
          }
        })
      },
      //基本信息校验3--------
      rulesData3(){

        this.$refs['listSearch'].validate((valid) => {
          if (valid) {
              for(let i in this.uploadOtherData){
                this.uploadOtherData[i]=this.listSearch[i];
              }
              this.$emit('saveInfoFun',this.uploadOtherData);

          }
        })
      },
      calcStatus(status){
        let obj={}
        switch (status){
          case 1:{
            obj.text='待审核'
            obj.color= 'orange'
            break
          }
          case 2:{
            obj.text='审核通过'
            obj.color= 'green'
            break
          }
          case 3:{
            obj.text='审核不通过'
            obj.color= 'red'
            break
          }
          default :{
            obj.text='新建'
            obj.color= 'green'
            break
          }
        }
        return obj
      },
      //选择维修类别时带的参数--------
      repairTypeFun(val, clear) {
        if (!val) {
          return
        }
        if(clear) this.requireList['businessScope2'] = ''
        this.$axios.get('/dict/value/' + val, {}).then((res) => {
          if (res.data.code == '0') {
              this.businessScope2 = res.data.items
          }
        })
      },
      changeRegisterDate(val){
        this.requireList.registerDate= val||''
      },
      changeSincerity(state){
        if(state){
          this.addYear()
        }else{
          this.listSearch.sincerityYears= []
        }
      },
      //新增诚信企业年份------
      addYear() {
        let objYear = { corpId: this.listSearch.id||'', endYear: '', startYear: '' ,honestPic:''}
        this.listSearch.sincerityYears.push(objYear)
        this.$refs.listSearch.validateField('sincerityYears')
      },
      deleteYear(index){
        this.listSearch.sincerityYears.splice(index,1);
        this.$refs.listSearch.validateField('sincerityYears')
      },
      changeSincerityYears(val, index, field){
        console.log(val)
        this.listSearch.sincerityYears[index][field]= val
        this.$refs.listSearch.validateField('sincerityYears')
      },
      honestPicFun(val,index){
        if(val[0]){
          this.listSearch.sincerityYears[index]['honestPic']=val[0];
        }else{
          this.listSearch.sincerityYears[index]['honestPic']='';
        }
        this.$refs.listSearch.validateField('sincerityYears')
      },
      //新增荣誉---
      addHoner(){
        let objYear = { corpId: this.listSearch.id||'', name: '', url: ''};
        this.listSearch.honerModels.push(objYear)
        this.$refs.listSearch.validateField('honerModels')
      },
      deleteHonerModels(index){
        this.listSearch.honerModels.splice(index,1);
        this.$refs.listSearch.validateField('honerModels')
      },
      honerFun(val,index){
        // console.log('出来的荣誉',val,index);
        if(val[0]){
          this.listSearch.honerModels[index]['url']=val[0];
        }else{
          this.listSearch.honerModels[index]['url']='';
        }
        this.$refs.listSearch.validateField('honerModels')
      },
      //获取公共配置信息---------
      getPubliceType(id) {
        this.$axios.get('/dict/getValuesByTypeId/' + id
        ).then((res) => {
          if (res.data.code == '0') {
            if (id == 6) {
              this.companySphere = res.data.items
            } else if (7 == id) {
              this.companyStaff = res.data.items
            } else if (8 == id) {
              this.companyArea = res.data.items
            } else if (9 == id) {
              this.qualityCheck = res.data.items
            } else if (4 == id) {
              this.moneyType = res.data.items
            } else if (30 == id) {
              this.visitService = res.data.items
            } else if (24 == id) {
              this.businessStatusArr = res.data.items
            }

          }
        })
      },
      //获取管理部门数据------
      getCompanyArea() {
        this.$axios.get('/area/dept/list/all/shanghai', {}).then((res) => {
          if (res.data.code == '0') {
            this.manageType = res.data.items
          } else {
            // this.$Message.error(res.data.status);
          }
        })
      },
      //获取业务数据接口----------
      getValuesByTypeFun(id) {
        this.$axios.get('/dict/getValuesByTypeId/' + id, {}).then((res) => {
          if (res.data.code == '0') {
            if (id == 33) {
              this.channels = res.data.items
            } else if (id == 1) {
              this.repairType = res.data.items
            }else if(id == 34){
              this.storeSpecialsArr=res.data.items
            }

          } else {
            // this.$Message.error(res.data.status);
          }
        })
      },
      //获取区域信息
      getType() {
        this.$axios.post('/area/region/list', {
          areaName: 'shanghai'
        }).then((res) => {
          if (res.data.code == '0') {
            this.typeList = res.data.items
          }
        })
      },
      //新增自定义对接渠道---------------
      addTypeName() {
        if (!this.sourceName) {
          this.$Message.error('输入渠道名称')
          return
        }
        this.$axios.post('/dict/save', {

          'typeName': '对接渠道',
          'value': this.sourceName
        }).then((res) => {
          if (res.data.code == '0') {
            this.getValuesByTypeFun(33)
            this.sourceName = ''

          }
          this.showAdd = false
        })
      },

      

      //tab页点击------
      tabClick(name){
        console.log(name);
        this.$emit('tabStatusFun',name);
      },

            //营业执照函数执行-------
            yyzzFun(val){
              console.log(val);
              // this.requireList.yyzz=val[0];
              if(val[0]){
                this.requireList.yyzz=val[0];
              }else{
                this.requireList.yyzz='';
              }
            },
            dlysxkzFun(val){
              console.log(val);
              // this.requireList.dlysxkz=val[0];
              if(val[0]){
                this.requireList.dlysxkz=val[0];
              }else{
                this.requireList.dlysxkz='';
              }
            },
            mdmtzFun(val){
              console.log(val);
              if(val[0]){
                this.requireList.mdmtz=val[0];
              }else{
                this.requireList.mdmtz='';
              }

            },
            //iso图片上传
            isoPicFun(val){
              console.log(val);
              if(val[0]){
                this.listSearch.isoPic=val[0];
              }else{
                this.listSearch.isoPic='';
              }

            },
            //iso图片上传
            safePicFun(val){
              console.log(val);
              if(val[0]){
                this.listSearch.safePic=val[0];
              }else{
                this.listSearch.safePic='';
              }

            },
            //iso图片上传
            greenPicFun(val){
              console.log(val);
              if(val[0]){
                this.listSearch.greenPic=val[0];
              }else{
                this.listSearch.greenPic='';
              }

            },

      //4s店事件监听------
      onChangeFours(flag){
        if(flag){
          this.listSearch.special=true;
        }
      },
      closeSelect(){

        },
        onRowSelect(val){
            this.listSearch.erpId=val.id;
            this.listSearch.erpName=val.name;
            console.log(val);
        },
        onRowSelect1(val){
            this.listSearch.majorBrandId=val.id;
            this.listSearch.majorBrandName=val.name;
        },
        onRowSelect2(val){
            this.listSearch.brandId=val.id;
            this.listSearch.brandName=val.name;
        },
        //时间选择------
        onOpenChangeDate(res, res1, res2){
            // console.log('this.requireList.licenceDate', res, res1, res2)
            this.requireList.licenceBeginDate = res[0]
            this.requireList.licenceEndDate = res[1]
        },
        onChangeM(status){
          
              this.listSearch['org'] = status[0]||'';
              this.listSearch['dept'] = status[1]||'';
              
        },
        onChangeTime(res){
          // console.log('onChangeTime', res1, res2, res3)
              if (res.length > 0 && res[0] && res[1]) {
                this.listSearch.businessHours = res[0] + '-' + res[1]
              }else{
                this.listSearch.businessHours= ''
              }
        },
        onChangeS(val){
          if(val=='true'){
              this.listSearch.yyState=true;
          }else if(val=='false'){
              this.listSearch.yyState=false;
          }
        },
      changeBusinessAddress(){
        clearTimeout(this.timer)
        this.timer= setTimeout(()=>{

        },500)
      }
    },
}
</script>
<style lang="less">
  #biao1 {
    border: none;
    color: #515a6e;
  }

  .content-list {
    width: 100%;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      float: left;
    }
    h3 {
      float: left;
      height: 45px;
      line-height: 45px;
      margin-left: 10px;
    }
    span {
      float: right;
    }

  }

  .content-p {
    padding-left: 55px;
  }

  .menu-manage {

  }

  .search-block {
    display: inline-block;
    width: 200px;
    margin-right: 10px;
  }

  .r-list-search {
    width: 100%;
    padding: 10px 0;

  }

  .pic-card{
      display: inline-block;
      margin: 0 10px 10px 0;
      width: 350px;
      min-width: 250px;

      .red{
        color: red;
      }
      .pic-body:hover .demo-upload-list-cover{
            display: block;
        }
      .pic-body{
        width: 100%;
        height: 200px;
        /*border: 1px solid #dcdee2;*/
        position: relative;
        .demo-upload-list-cover{
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
        }

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

  .yearClass {
    width: 110px;
    height: 35px;
    border: 1px solid #dcdee2;
    line-height: 35px;
    display: inline-block;
    margin-right: 10px;
    text-align: center;
    margin-top: 10px;
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

    span {
      color: red;
    }
  }

  .modelClass {
    text-align: center;
    height: 150px;
    line-height: 150px;
    font-size: 18px;
    font-weight: bold;
  }





  .demo-upload-list{
        display: inline-block;
        width: 150px;
        height: 150px;
        text-align: center;
        line-height: 150px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        /*box-shadow: 0 1px 1px rgba(0,0,0,.2);*/
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 30px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>











































