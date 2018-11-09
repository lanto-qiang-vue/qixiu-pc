<!--维修企业信息管理详情  2018-11-05  -->
<template>
<Modal
    v-model="showModal"
    title="维修企业信息"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
    <div style="height: 100%;overflow: auto;">
        <Form ref="listSearch" :rules="ruleValidate"  :model="listSearch" :label-width="140" class="common-form">
            <FormItem label="企业名称:" style="width: 45%;" prop="corpName">
                <Input type="text" v-model="listSearch.corpName" placeholder="请输入企业名称"></Input>
            </FormItem>
            <FormItem label="许可证号:" style="width: 45%;" prop="licence">
                <Input type="text" v-model="listSearch.licence" placeholder="请输入许可证号"></Input>
            </FormItem>
            <FormItem label="许可证有效期:" style="width: 45%;" prop="licenceBeginDate">
                <DatePicker type="daterange" v-model="listSearch.licenceBeginDate" placement="bottom-start" placeholder="请输入日期" style="width: 100%"></DatePicker>
            </FormItem>

            <FormItem label="工商注册地址:" style="width: 45%;" prop="registerAddress">
                <Input type="text" v-model="listSearch.registerAddress" placeholder="请输入工商注册地址"></Input>
            </FormItem>
            <FormItem label="工商注册地址区域:" style="width: 45%;" prop="registerRegion">
                <Select v-model="listSearch.registerRegion">
                    <Option v-for="item in typeList" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="工商注册日期:" style="width: 45%;" prop="registerDate">
                <DatePicker type="date" placeholder="请选择" style="width: 100%;" v-model="listSearch.registerDate"></DatePicker>
            </FormItem>
            <FormItem label="经营地地址:" style="width: 45%;" prop="businessAddress">
                <Input type="text"  v-model="listSearch.businessAddress" placeholder="请输入经营地地址"></Input>
            </FormItem>
            <FormItem label="经营地址区域:" style="width: 45%;" prop="businessRegion">
                <Select v-model="listSearch.businessRegion">
                    <Option v-for="item in typeList" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}</Option>
                </Select>
            </FormItem>
            <FormItem label="经营地址邮政编码:" style="width: 45%;" prop="businessPostalCode">
                <Input type="text" v-model="listSearch.businessPostalCode" placeholder="请输入经营地址邮政编码"></Input>
            </FormItem>
            <FormItem label="法定代表人:" style="width: 45%;" prop="legalName">
                <Input type="text"  v-model="listSearch.legalName" placeholder=""></Input>
            </FormItem>
            <FormItem label="代表人手机:" style="width: 45%;" prop="legalMobile">
                <Input type="text"  v-model="listSearch.legalMobile" placeholder=""></Input>
            </FormItem>
            <FormItem label="代表人固定电话:" style="width: 45%;" prop="legalTel">
                <Input type="text"  v-model="listSearch.legalTel" placeholder=""></Input>

                            
                            
                        
            </FormItem>
            <FormItem label="代表人邮箱:" style="width: 45%;" prop="legalEmail">
                <Input type="text"  v-model="listSearch.legalEmail" placeholder=""></Input>
            </FormItem>
            <FormItem label="日常经营管理负责人:" style="width: 45%;" prop="operatorName">
                <Input type="text"  v-model="listSearch.operatorName" placeholder=""></Input>
            </FormItem>
            <FormItem label="负责人手机:" style="width: 45%;" prop="operatorMobile">
                <Input type="text"  v-model="listSearch.operatorMobile" placeholder=""></Input>
            </FormItem>
            <FormItem label="负责人固定电话:" style="width: 45%;" prop="operatorTel">
                <Input type="text" v-model="listSearch.operatorTel" placeholder=""></Input>
            </FormItem>
            <FormItem label="负责人邮箱:" style="width: 45%;" prop="operatorEmail">
                <Input type="text" v-model="listSearch.operatorEmail" placeholder=""></Input>
            </FormItem>
            <FormItem label="企业反馈电话:" style="width: 45%;" prop="complaintTel">
                <Input type="text"  v-model="listSearch.complaintTel" placeholder=""></Input>
            </FormItem>
            <FormItem label="营业时间:" style="width: 45%;" prop="businessHours">
                <TimePicker format="HH:mm" type="timerange" placement="bottom-start" placeholder="" style="width: 100%;" v-model="listSearch.businessHours"></TimePicker>
            </FormItem>
            <FormItem label="工时定额执行标准:" style="width: 45%;" prop="workingHoursQuotaExecutionStandard.id">
                <RadioGroup v-model="listSearch.workingHoursQuotaExecutionStandard.id">
                    <Radio v-for="item in workCompanyType" :label="item.name" :key="item.name">{{item.code}}</Radio>
                    
                </RadioGroup>
            </FormItem>
            <FormItem label="工时单价:" style="width: 45%;" prop="workingHoursPrice">
                <Input type="text"  v-model="listSearch.workingHoursPrice" placeholder="请输入工时单价"></Input>
            </FormItem>
            <FormItem label="业户类别:" style="width: 90%;" prop="industryCategory.id">
                <RadioGroup v-model="listSearch.industryCategory.id">
                    <Radio v-for="item in households" :label="item.name" :key="item.name">{{item.code}}</Radio>
                    
                </RadioGroup>
            </FormItem>
            <FormItem label="其他业户类别:" style="width: 92%;" v-show="listSearch.industryCategory.id==4?true:false">
                <Input type="text"  v-model="listSearch.industryCategoryOther" placeholder="" style="width: 250px;"></Input>
            </FormItem>
            <FormItem label="经济类型:" style="width: 90%;">
                
                <RadioGroup v-model="listSearch.economicType.id">
                    <Radio v-for="item in moneyType" :label="item.name" :key="item.name">{{item.code}}</Radio>
                    
                </RadioGroup>
            </FormItem>
            <FormItem label="其他经济类型:" style="width: 92%;" v-show="listSearch.economicType.id==10?true:false">
                <Input type="text"  v-model="listSearch.economicTypeOther" placeholder="" style="width: 250px;"></Input>
            </FormItem>
            <FormItem label="经营范围:" style="width: 90%;">
                <Divider />
            </FormItem>
            <FormItem label="维修类别:" style="width: 92%;">
                
                <Select v-model="companyRepair" style="width: 250px;">
                    <Option v-for="item in repairType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>
            </FormItem>
            <FormItem label="一类机动车维修:" style="width: 92%;" v-show="companyRepair==1?true:false">
                <CheckboxGroup v-model="listSearch.scope1" @on-change="repairTypeFun">
                    <Checkbox v-for="item in oneCarType" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="二类机动车维修:" style="width: 92%;" v-show="companyRepair==2?true:false">
                
                <CheckboxGroup v-model="listSearch.scope2">
                    <Checkbox v-for="item in twoCarType" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="三类机动车维修:" style="width: 80%;" v-show="companyRepair==3?true:false">
                
                <CheckboxGroup v-model="listSearch.scope3">
                    <Checkbox v-for="item in threeCarType" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="摩托车维修:" style="width: 92%;" v-show="companyRepair==4?true:false">
                
                <CheckboxGroup v-model="listSearch.scope4">
                    <Checkbox v-for="item in motorcycle" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="汽车维修:" style="width: 92%;" v-show="companyRepair==5?true:false">
                
                <CheckboxGroup v-model="listSearch.scope5">
                    <Checkbox v-for="item in carList" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="企业主要业务范围:" style="width: 92%;">
                
                <CheckboxGroup v-model="listSearch.sphere">
                    <Checkbox v-for="item in companySphere" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="其他主要业务范围:" style="width: 92%;" v-show="listSearch.sphere.indexOf(10)==-1?false:true">
                <Input type="text"  v-model="listSearch.sphereOther" placeholder="" style="width: 250px;"></Input>
            </FormItem>
            <FormItem label="企业员工总数:" style="width: 92%;">
                <RadioGroup v-model="listSearch.employeeNumber.id">
                    <Radio v-for="item in companyStaff" :label="item.name" :key="item.name">{{item.code}}</Radio>
                    
                </RadioGroup>
            </FormItem>
            <FormItem label="企业目前占地面积:" style="width: 92%;">
                
                <RadioGroup v-model="listSearch.floorSpace.id">
                    <Radio v-for="item in companyArea" :label="item.name" :key="item.name">{{item.code}}</Radio>
                    
                </RadioGroup>
            </FormItem>
            <FormItem label="企业管理人员情况（职业资格、学历等描述）:" style="width: 90%;">
                <Divider />
            </FormItem>
            <FormItem label="经理人:" style="width: 92%;" prop="manager">
                <Input type="text"  v-model="listSearch.manager" placeholder="" style="width: 250px;"></Input>
            </FormItem>
            <FormItem label="服务负责人:" style="width: 92%;" prop="serviceLeader">
                <Input type="text" v-model="listSearch.serviceLeader" placeholder="" style="width: 250px;"></Input>
            </FormItem>
            <FormItem label="技术负责人:" style="width: 92%;" prop="technologyLeader">
                <Input type="text" v-model="listSearch.technologyLeader" placeholder="" style="width: 250px;"></Input>
            </FormItem>
            <FormItem label="质量检验员:" style="width: 92%;" prop="qualityInspector">
                <Input type="text"  v-model="listSearch.qualityInspector" placeholder="" style="width: 250px;"></Input>
            </FormItem>
            <FormItem label="其他:" style="width: 92%;" prop="managerOther">
                <Input type="text"  v-model="listSearch.managerOther" placeholder="" style="width: 250px;"></Input>
            </FormItem>

            <FormItem label="企业技术人员配备情况:" style="width: 90%;">
                <Divider />
            </FormItem>
            <FormItem label="机工高级技师人数:" style="width: 20%;" prop="machinistSeniorTechnician">
                <Input type="text" v-model="listSearch.machinistSeniorTechnician"  placeholder="高级技师人数" ></Input>
            </FormItem>
            <FormItem label="机工技师人数:" style="width: 20%;" prop="machinistTechnician">
                <Input type="text" v-model="listSearch.machinistTechnician" placeholder="技师人数"></Input>
            </FormItem>
            <FormItem label="机工高级人数:" style="width: 20%;" prop="machinistSenior">
                <Input type="text" v-model="listSearch.machinistSenior" placeholder="高级人数"></Input>
            </FormItem>
            <FormItem label="机工中级人数:" style="width: 20%;" prop="machinistMedium">
                <Input type="text" v-model="listSearch.machinistMedium" placeholder="中级人数"></Input>
            </FormItem>
            <FormItem label="电工高级技师人数:" style="width: 20%;" prop="electricianSeniorTechnician">
                <Input type="text" v-model="listSearch.electricianSeniorTechnician"  placeholder="高级技师人数"></Input>
            </FormItem>
            <FormItem label="电工技师人数:" style="width: 20%;" prop="electricianTechnician">
                <Input type="text" v-model="listSearch.electricianTechnician"  placeholder="技师人数"></Input>
            </FormItem>
            <FormItem label="电工高级人数:" style="width: 20%;" prop="electricianSenior">
                <Input type="text" v-model="listSearch.electricianSenior"  placeholder="高级人数"></Input>
                
            </FormItem>
            <FormItem label="电工中级人数:" style="width: 20%;" prop="electricianMedium">
                <Input type="text" v-model="listSearch.electricianMedium"  placeholder="中级人数"></Input>
            </FormItem>
            <FormItem label="钣金工高级技师人数:" style="width: 20%;" prop="tinbenderSeniorTechnician">
                <Input type="text" v-model="listSearch.tinbenderSeniorTechnician" placeholder="高级技师人数"></Input>
            </FormItem>
            <FormItem label="钣金工技师人数:" style="width: 20%;" prop="tinbenderTechnician">
                <Input type="text" v-model="listSearch.tinbenderTechnician" placeholder="技师人数"></Input>
            </FormItem>
            <FormItem label="钣金工高级人数:" style="width: 20%;" prop="tinbenderSenior">
                <Input type="text" v-model="listSearch.tinbenderSenior" placeholder="高级人数"></Input>
            </FormItem>
            <FormItem label="钣金工中级人数:" style="width: 20%;" prop="tinbenderMedium">
                <Input type="text" v-model="listSearch.tinbenderMedium" placeholder="中级人数"></Input>
            </FormItem>
            <FormItem label="油漆工高级技师人数:" style="width: 20%;" prop="painterSeniorTechnician">
                <Input type="text" v-model="listSearch.painterSeniorTechnician" placeholder="高级技师人数"></Input>
            </FormItem>
            <FormItem label="油漆工技师人数:" style="width: 20%;" prop="painterTechnician">
                
                <Input type="text" v-model="listSearch.painterTechnician" placeholder="技师人数"></Input>
                
            </FormItem>
            <FormItem label="油漆工高级人数:" style="width: 20%;" prop="painterSenior">
                
                <Input type="text" v-model="listSearch.painterSenior" placeholder="高级人数"></Input>
                
            </FormItem>
            <FormItem label="油漆工中级人数:" style="width: 20%;" prop="painterMedium">
                
                <Input type="text" v-model="listSearch.painterMedium" placeholder="中级人数"></Input>
            </FormItem>
            <FormItem label="企业主要维修车型:" style="width: 92%;">
                <CheckboxGroup v-model="listSearch.model">
                    <Checkbox v-for="item in vehicleModel" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="主修品牌:" style="width: 92%;" v-show="listSearch.model.indexOf(6)==-1?false:true">
                <Input type="text"  v-model="listSearch.modelOther" placeholder="" style="width: 250px;"></Input>
            </FormItem>
            <FormItem label="24小时汽车维修救援:" style="width: 92%;">
                <!--<Select v-model="listSearch.rescue" style="width: 250px;">
                    <Option v-for="item in whetherType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>-->
                <i-switch size="large" v-model="listSearch.rescue">
                    <span slot="open">有</span>
                    <span slot="close">无</span>
                </i-switch>
            </FormItem>
            <FormItem label="汽车销售、维修:" style="width: 92%;">
                
                <!--<Select v-model="listSearch.specialRepair" style="width: 250px;">
                    <Option v-for="item in whetherType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>-->
                <i-switch size="large" v-model="listSearch.specialRepair">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                </i-switch>
            </FormItem>
            <FormItem label="汽车销售、维修品牌:" style="width: 92%;" v-show="listSearch.specialRepair?true:false">
                <Input type="text"  v-model="listSearch.specialRepairBrand" placeholder="" style="width: 250px;"></Input>
            </FormItem>
            <FormItem label="通过ISO质量管理体系认证:" style="width: 92%;">
                
                <!--<Select v-model="listSearch.iso" style="width: 250px;">
                    <Option v-for="item in passType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>-->
                <i-switch size="large" v-model="listSearch.iso">
                    <span slot="open">通过</span>
                    <span slot="close">未通过</span>
                </i-switch>
            </FormItem>
            <FormItem label="通过安全生产标准化达标认证:" style="width: 92%;">
                
                
                <!--<Select v-model="listSearch.throughSafetyProductionStandardization" style="width: 250px;">
                    <Option v-for="item in passType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>-->
                <i-switch size="large" v-model="listSearch.throughSafetyProductionStandardization">
                    <span slot="open">通过</span>
                    <span slot="close">未通过</span>
                </i-switch>
            </FormItem>
            <FormItem label="通过环保部门专项整治:" style="width: 92%;">
                
                
                <!--<Select v-model="listSearch.throughEnvironmentalProtectionSpecialRenovation" style="width: 250px;">
                    <Option v-for="item in passType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>-->
                <i-switch size="large" v-model="listSearch.throughEnvironmentalProtectionSpecialRenovation">
                    <span slot="open">通过</span>
                    <span slot="close">未通过</span>
                </i-switch>
            </FormItem>
            <FormItem label="是否为全国诚信维修企业:" style="width: 92%;">
                <i-switch size="large" v-model="listSearch.sincerity">
                    <span slot="open">通过</span>
                    <span slot="close">未通过</span>
                </i-switch>
                
                <!--<Select v-model="listSearch.sincerity" style="width: 250px;">
                    <Option v-for="item in whetherType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>-->
            </FormItem>
            <FormItem label="成为全国诚信维修企业的年份:" style="width: 92%;" v-show="listSearch.sincerity==1?true:false">
                <Input type="text"  v-model="listSearch.sincerityYear" placeholder="" style="width: 250px;"></Input>
            </FormItem>
            <FormItem label="上年度质量信誉考核等级:" style="width: 92%;">
                <RadioGroup v-model="listSearch.qualityReputationAssessmentLevel.id">
                    <Radio v-for="item in qualityCheck" :label="item.name" :key="item.name">{{ item.code }}</Radio>
                </RadioGroup>
            </FormItem>

            <FormItem label="是否提供上门维修:" style="width: 92%;">
                
                <!--<Select v-model="listSearch.offerOnsiteRepair" style="width: 250px;">
                    <Option v-for="item in whetherType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>-->
                <i-switch size="large" v-model="listSearch.offerOnsiteRepair">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                </i-switch>
            </FormItem>
            <FormItem label="提供上门服务种类:" style="width: 92%;">
                <CheckboxGroup v-model="listSearch.serviceCategory">
                    <Checkbox v-for="item in visitService"  :label="item.name" :key="item.code">{{item.code}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="其他服务种类:" style="width: 80%;" v-show="listSearch.serviceCategory.indexOf(7)==-1?false:true">
                <Input type="text"  v-model="listSearch.serviceCategoryOther" placeholder=""></Input>
            </FormItem>
            <FormItem label="企业特色服务:" style="width: 92%;">
                <Input type="textarea" :rows="4"  v-model="listSearch.specialService" placeholder=""></Input>
            </FormItem>
            <FormItem label="企业服务优势自我描述:" style="width: 92%;">
                <Input type="textarea" :rows="4" v-model="listSearch.selfDesc" placeholder=""></Input>
            </FormItem>
            <FormItem label="企业自我简介:" style="width: 92%;" prop="selfIntroduction">
                <Input type="textarea" :rows="4"  v-model="listSearch.selfIntroduction" placeholder=""></Input>
            </FormItem>
            <FormItem label="区级以上荣誉获得情况:" style="width: 92%;">
                <Input type="textarea" :rows="4"  v-model="listSearch.honor" placeholder=""></Input>
            </FormItem>
            <FormItem label="是否愿意开通车大夫服务等在线维修服务:" style="width: 92%;">
                
                <!--<Select v-model="listSearch.openOnlineRepairService" style="width: 250px;">
                    <Option v-for="item in whetherType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>-->
                <i-switch size="large" v-model="listSearch.openOnlineRepairService">
                    <span slot="open">愿意</span>
                    <span slot="close">不愿意</span>
                </i-switch>
            </FormItem>
            <FormItem label="是否愿意开通在线商务服务:" style="width: 92%;">
                <i-switch size="large" v-model="listSearch.openOnlineBusinessService">
                    <span slot="open">愿意</span>
                    <span slot="close">不愿意</span>
                </i-switch>
                <!--<Select v-model="listSearch.openOnlineBusinessService" style="width: 250px;">
                    <Option v-for="item in whetherType" :value="item.name" :key="item.name">{{ item.code }}</Option>
                </Select>-->
            </FormItem>
        </Form>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div slot="footer">
        <Button size="large" type="primary" @click="testChange">提交</Button>
        <Button  size="large" type="default" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
import {  imgToBase64,getName } from '@/static/util.js'
  import { formatDate } from '@/static/tools'
export default {
	name: "repair-company-info",
    props:['showDetail', 'detailData'],
    data(){
		return{
            spinShow:false,
            showModal:false,
            
            listSearch:{
                "businessHours": "",
                "businessPostalCode": "",
                "businessRegion": "",
                "businessAddress": "",
                "complaintTel": "",
                "corpName": "",
                "economicType": {id:1},
                "economicTypeOther": "",
                "electricianMedium": "",
                "electricianSenior": "",
                "electricianSeniorTechnician": "",
                "electricianTechnician": "",
                "employeeNumber": {id:1},
                "floorSpace": {id:1},
                "honor": "",
                "id": "",
                "industryCategory": {id:1},
                "industryCategoryOther": "",
                "iso": false,
                "latitude": "",
                "legalEmail": "",
                "legalMobile": "",
                "legalName": "",
                "legalTel": "",
                "licence": "",
                "licenceBeginDate": "",
                "licenceEndDate": "",
                "longitude": "",
                "machinistMedium": "",
                "machinistSenior": "",
                "machinistSeniorTechnician": "",
                "machinistTechnician": "",
                "manager": "",
                "managerOther": "",
                "model": [],
                "modelOther": "",
                "offerOnsiteRepair": false,
                "openOnlineBusinessService": false,
                "openOnlineRepairService": false,
                "operatorEmail": "",
                "operatorMobile": "",
                "operatorName": "",
                "operatorTel": "",
                "painterMedium": "",
                "painterSenior": "",
                "painterSeniorTechnician": "",
                "painterTechnician": "",
                "qualityInspector": "",
                "qualityReputationAssessmentLevel": {id:4},
                "registerAddress": "",
                "registerDate": "",
                "registerRegion": "",
                "rescue": false,
                "scope1": [],
                "scope2": [],
                "scope3": [],
                "scope4": [],
                "scope5": [],
                "selfDesc": "",
                "selfIntroduction": "",
                "serviceCategory": [],
                "serviceCategoryOther": "",
                "serviceLeader": "",
                "sincerity": false,
                "sincerityYear": 0,
                "specialRepair": false,
                "specialRepairBrand": "",
                "specialService": "",
                "sphere": [],
                "sphereOther": "",
                "technologyLeader": "",
                "throughEnvironmentalProtectionSpecialRenovation": false,
                "throughSafetyProductionStandardization": false,
                "tinbenderMedium": "",
                "tinbenderSenior": "",
                "tinbenderSeniorTechnician": "",
                "tinbenderTechnician": "",
                "workingHoursPrice": "",
                "workingHoursQuotaExecutionStandard": {id:1},
            },
            ruleValidate: {
                corpName:[{ required: true, message: '必填项不可为空', },],
                licence:[{ required: true, message: '必填项不可为空', },],
                licenceBeginDate:[{ required: true, message: '必填项不可为空', },],
                registerAddress:[{ required: true, message: '必填项不可为空', },],
                registerRegion:[{ required: true, message: '必填项不可为空', },],
                registerDate:[{ required: true, message: '必填项不可为空', },],

                businessAddress:[{ required: true, message: '必填项不可为空', },],
                businessRegion:[{ required: true, message: '必填项不可为空', },],
                businessPostalCode:[{ required: true, message: '必填项不可为空', },],
                legalName:[{ required: true, message: '必填项不可为空', },],
                legalMobile:[{ required: true, message: '必填项不可为空', },
                    {pattern:/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/, message:'请输入正确的手机号码', trigger:'blur'}
                ],
                legalTel:[{ required: true, message: '必填项不可为空', },
                    {pattern:/0\d{2,3}-\d{7,8}/, message:'请输入正确的固定电话号码', trigger:'blur'}
                ],
                
                legalEmail:[{ required: true, message: '必填项不可为空', },
                    {pattern:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message:'请输入正确的邮箱', trigger:'blur'}
                ],
                operatorName:[{ required: true, message: '必填项不可为空', },],
                operatorMobile:[{ required: true, message: '必填项不可为空', },
                    {pattern:/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/, message:'请输入正确的手机号码', trigger:'blur'}
                ],
                operatorTel:[{ required: true, message: '必填项不可为空', },
                    {pattern:/0\d{2,3}-\d{7,8}/, message:'请输入正确的固定电话号码', trigger:'blur'}
                ],
                operatorEmail:[{ required: true, message: '必填项不可为空', },
                    {pattern:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message:'请输入正确的邮箱', trigger:'blur'}
                ],
                complaintTel:[{ required: true, message: '必填项不可为空', },],

                businessHours:[{ required: true, message: '必填项不可为空', },],
                // workingHoursQuotaExecutionStandard:[{ required: true, message: '必填项不可为空', },],
                workingHoursPrice:[{ required: true, message: '必填项不可为空', },],
                // industryCategory:[{ required: true, message: '必填项不可为空', },],
                operatorEmail:[{ required: true, message: '必填项不可为空', },],
                complaintTel:[{ required: true, message: '必填项不可为空', },],
                manager:[{ required: true, message: '必填项不可为空', },],
                serviceLeader:[{ required: true, message: '必填项不可为空', },],
                technologyLeader:[{ required: true, message: '必填项不可为空', },],
                qualityInspector:[{ required: true, message: '必填项不可为空', },],
                managerOther:[{ required: true, message: '必填项不可为空', },],
                machinistSeniorTechnician:[{ required: true, message: '必填项不可为空', },],
                machinistTechnician:[{ required: true, message: '必填项不可为空', },],
                machinistSenior:[{ required: true, message: '必填项不可为空', },],
                machinistMedium:[{ required: true, message: '必填项不可为空', },],

                electricianSeniorTechnician:[{ required: true, message: '必填项不可为空', },],
                electricianTechnician:[{ required: true, message: '必填项不可为空', },],
                electricianSenior:[{ required: true, message: '必填项不可为空', },],
                electricianMedium:[{ required: true, message: '必填项不可为空', },],

                tinbenderSeniorTechnician:[{ required: true, message: '必填项不可为空', },],
                tinbenderTechnician:[{ required: true, message: '必填项不可为空', },],
                tinbenderSenior:[{ required: true, message: '必填项不可为空', },],
                tinbenderMedium:[{ required: true, message: '必填项不可为空', },],

                painterSeniorTechnician:[{ required: true, message: '必填项不可为空', },],
                painterTechnician:[{ required: true, message: '必填项不可为空', },],
                painterSenior:[{ required: true, message: '必填项不可为空', },],
                painterMedium:[{ required: true, message: '必填项不可为空', },],

                selfIntroduction:[{ required: true, message: '必填项不可为空', },],
            },//规则验证
            typeList:[],//学历类别数据------
            //维修类别数据---------
            repairType:[
                {code:"一类机动车维修",name:1},
                {code:"二类机动车维修",name:2},
                {code:"三类机动车维修",name:3},
                {code:"摩托车维修",name:4},
                {code:"汽车维修",name:5},
            ],
            companyRepair:'',
            //一类机动车维修------
            oneCarType:[
                {code:"小型车辆维修",name:1},
                {code:"大、中型客车维修",name:2},
                {code:"大、中型货车维修",name:3},
                {code:"危险货车运输维修",name:4},
                {code:"电动(油电混合)汽车维修",name:5},
                {code:"燃气汽车维修",name:6},
            ],
            //二类机动车维修-------
            twoCarType:[
                {code:"小型车辆维修",name:1},
                {code:"大、中型客车维修",name:2},
                {code:"大、中型货车维修",name:3},
                {code:"电动(油电混合)汽车维修",name:4},
                {code:"燃气汽车维修",name:5},
            ],
            //三类机动车维修-------
            threeCarType:[
                {code:"发动机修理",name:1},
                {code:"车身维修",name:2},
                {code:"电气系统维修",name:3},
                {code:"自动变速器维修",name:4},
                {code:"车身清洁维护",name:5},

                {code:"涂漆",name:6},
                {code:"轮胎动平衡及修补",name:7},
                {code:"四轮定位检测调整",name:8},
                {code:"供油系统维护及油品更换",name:9},
                {code:"喷油泵和喷油嘴维修",name:10},

                {code:"曲轴修磨",name:11},
                {code:"气缸镗磨",name:12},
                {code:"散热器（水箱）维修",name:13},
                {code:"空调维修",name:14},
                {code:"车辆装潢（篷布坐垫及内装饰）",name:15},
                {code:"车辆玻璃安装",name:16},
            ],
            //摩托车维修
            motorcycle:[
                {code:"一类",name:1},
                {code:"二类",name:2},
            ],
            //汽车维修
            carList:[
                {code:"A类",name:1},
                {code:"B类",name:2},
            ],
            //企业主要业务
            companySphere:[
                {code:"品牌维修",name:1},
                {code:"综合维修",name:2},
                {code:"专项维修",name:3},
                {code:"营运车辆维修",name:4},
                {code:"事故车维修",name:5},

                {code:"配件销售",name:6},
                {code:"新车销售",name:7},
                {code:"汽车保险",name:8},
                {code:"二手车置换",name:9},
                {code:"其他",name:10},
            ],
            //企业员工总数
            companyStaff:[
                {code:"10人以下",name:1},
                {code:"10-20人",name:2},
                {code:"30-50人",name:3},
                {code:"50人以上",name:4},
            ],
            //企业占地面积
            companyArea:[
                {code:"200㎡以下",name:1},
                {code:"200-500㎡",name:2},
                {code:"500-1000㎡",name:3},
                {code:"1000㎡以上",name:4},
            ],
            //企业主要维修车型
            vehicleModel:[
                {code:"轿车（不含出租）",name:1},
                {code:"货车",name:2},
                {code:"客车",name:3},
                {code:"出租车",name:4},
                {code:"特种车",name:5},
                {code:"主修品牌",name:6},
            ],
            //上年度质量考核
            qualityCheck:[
                {code:"AAA",name:1},
                {code:"AA",name:2},
                {code:"A",name:3},
                {code:"未考核",name:4},
            ],
            //上门服务-----
            visitService:[
                {code:"上门故障诊断",name:1},
                {code:"上门取送车服务",name:2},
                {code:"上门更换备胎",name:3},
                {code:"上门更换灯泡",name:4},
                {code:"上门更换雨刮片",name:5},
                {code:"上门电瓶泵电",name:6},
                {code:"其他",name:7},
            ],
            //业户类别--------
            households:[
                {code:"企业",name:1},
                {code:"分支机构",name:2},
                {code:"个体经营户",name:3},
                {code:"其他",name:4},
            ],
            //经济类型-------
            moneyType:[
                {code:"国有",name:1},
                {code:"集体",name:2},
                {code:"私营",name:3},
                {code:"联营",name:4},
                {code:"股份制",name:5},
                {code:"独资",name:6},
                {code:"合资",name:7},
                {code:"合作",name:8},
                {code:"港澳台投资",name:9},
                {code:"其他",name:10},
            ],
            //工时定额执行标准-----
            workCompanyType:[
                {code:"行业",name:1},
                {code:"制造企业",name:2},
            ],
            //是否选项------
            whetherType:[
                {code:"是",name:"1"},
                {code:"否",name:"0"},
            ],
            //通过选项---
            passType:[
                {code:"通过",name:"1"},
                {code:"未通过",name:"0"},
            ],

        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            this.getType();
            this.companyRepair='';
            if(this.detailData){
                this.getDetail();
            }else{
                this.listSearch={
                    "businessHours": "",
                    "businessPostalCode": "",
                    "businessRegion": "",
                    "businessAddress": "",
                    "complaintTel": "",
                    "corpName": "",
                    "economicType": {id:1},
                    "economicTypeOther": "",
                    "electricianMedium": "",
                    "electricianSenior": "",
                    "electricianSeniorTechnician": "",
                    "electricianTechnician": "",
                    "employeeNumber": {id:1},
                    "floorSpace": {id:1},
                    "honor": "",
                    "id": "",
                    "industryCategory": {id:1},
                    "industryCategoryOther": "",
                    "iso": false,
                    "latitude": "",
                    "legalEmail": "",
                    "legalMobile": "",
                    "legalName": "",
                    "legalTel": "",
                    "licence": "",
                    "licenceBeginDate": "",
                    "licenceEndDate": "",
                    "longitude": "",
                    "machinistMedium": "",
                    "machinistSenior": "",
                    "machinistSeniorTechnician": "",
                    "machinistTechnician": "",
                    "manager": "",
                    "managerOther": "",
                    "model": [],
                    "modelOther": "",
                    "offerOnsiteRepair": false,
                    "openOnlineBusinessService": false,
                    "openOnlineRepairService": false,
                    "operatorEmail": "",
                    "operatorMobile": "",
                    "operatorName": "",
                    "operatorTel": "",
                    "painterMedium": "",
                    "painterSenior": "",
                    "painterSeniorTechnician": "",
                    "painterTechnician": "",
                    "qualityInspector": "",
                    "qualityReputationAssessmentLevel": {id:4},
                    "registerAddress": "",
                    "registerDate": "",
                    "registerRegion": "",
                    "rescue": false,
                    "scope1": [],
                    "scope2": [],
                    "scope3": [],
                    "scope4": [],
                    "scope5": [],
                    "selfDesc": "",
                    "selfIntroduction": "",
                    "serviceCategory": [],
                    "serviceCategoryOther": "",
                    "serviceLeader": "",
                    "sincerity": false,
                    "sincerityYear": 0,
                    "specialRepair": false,
                    "specialRepairBrand": "",
                    "specialService": "",
                    "sphere": [],
                    "sphereOther": "",
                    "technologyLeader": "",
                    "throughEnvironmentalProtectionSpecialRenovation": false,
                    "throughSafetyProductionStandardization": false,
                    "tinbenderMedium": "",
                    "tinbenderSenior": "",
                    "tinbenderSeniorTechnician": "",
                    "tinbenderTechnician": "",
                    "workingHoursPrice": "",
                    "workingHoursQuotaExecutionStandard": {id:1},
                };
            }

        },
    },
    methods:{
        testChange(){
            console.log(this.listSearch);
            this.addCompany();
        },
        //选择维修类别时带的参数--------
        repairTypeFun(name,val){
            console.log(name,val);
        },
        //新增一个企业数据---------
        addCompany(){
            // this.spinShow=true;
            if(this.detailData){
                this.$axios.post('/corp/edit',{
                    id:this.detailData.corpId,
                    corpName: this.listSearch.corpName,//公司名称 
                    licence: this.listSearch.licence, //许可证号
                    licenceBeginDate:formatDate(this.listSearch.licenceBeginDate[0]),//许可证起始日期
                    licenceEndDate:formatDate(this.listSearch.licenceBeginDate[1]),//许可证终止日期
                    registerAddress:this.listSearch.registerAddress,//工商注册地址
                    registerRegion:this.listSearch.registerRegion,//工商注册地址区域
                    registerDate:formatDate(this.listSearch.registerDate),//工商注册日期
                    businessAddress:this.listSearch.businessAddress,//经营地地址
                    businessRegion:this.listSearch.businessRegion,//经营地址区域
                    businessPostalCode:this.listSearch.businessPostalCode,//经营地址邮政编码
                    legalName:this.listSearch.legalName,//法定代表人
                    legalMobile:this.listSearch.legalMobile,//法定代表人手机
                    legalTel:this.listSearch.legalTel,//法定代表人固定电话
                    legalEmail:this.listSearch.legalEmail,//法定代表人邮箱
                    operatorName:this.listSearch.operatorName,//日常经营管理负责人
                    operatorMobile:this.listSearch.operatorMobile,//日常经营管理负责人手机
                    operatorTel:this.listSearch.operatorTel,//日常经营管理负责人固定电话
                    operatorEmail:this.listSearch.operatorEmail,//日常经营管理负责人邮箱
                    complaintTel:this.listSearch.complaintTel,//企业反馈电话
                    businessHours:(this.listSearch.businessHours[0]+'-'+this.listSearch.businessHours[1])||'',//营业时间
                    workingHoursQuotaExecutionStandard:this.listSearch.workingHoursQuotaExecutionStandard.id,//工时定额执行标准
                    workingHoursPrice:this.listSearch.workingHoursPrice,//工时单价
                    industryCategory:this.listSearch.industryCategory.id,//业户类别
                    industryCategoryOther:this.listSearch.industryCategoryOther,//其他业户类别
                    economicType:this.listSearch.economicType.id,//经济类别
                    economicTypeOther:this.listSearch.economicTypeOther,//其他经济类别
                    scope1:this.listSearch.scope1,//一类机动车维修
                    scope2:this.listSearch.scope2,//二类机动车维修
                    scope3:this.listSearch.scope3,//三类机动车维修
                    scope4:this.listSearch.scope4,//摩托车维修
                    scope5:this.listSearch.scope5,//汽车维修
                    sphere:this.listSearch.sphere,//企业主要业务范围
                    sphereOther:this.listSearch.sphereOther,//其他企业主要业务范围
                    employeeNumber:this.listSearch.employeeNumber.id,//企业员工总数
                    floorSpace:this.listSearch.floorSpace.id,//企业目前占地面积
                    manager:this.listSearch.manager,//经理人
                    serviceLeader:this.listSearch.serviceLeader,//服务负责人
                    technologyLeader:this.listSearch.technologyLeader,//技术负责人
                    qualityInspector:this.listSearch.qualityInspector,//质量检验员
                    managerOther:this.listSearch.managerOther,//其他
                    machinistSeniorTechnician:this.listSearch.machinistSeniorTechnician,//技工高级技师
                    machinistTechnician:this.listSearch.machinistTechnician,//技工高级技师
                    machinistSenior:this.listSearch.machinistSenior,//高级技师
                    machinistMedium:this.listSearch.machinistMedium,//中级技师
                    electricianSeniorTechnician:this.listSearch.electricianSeniorTechnician,//中级技师
                    electricianTechnician:this.listSearch.electricianTechnician,//中级技师
                    electricianSenior:this.listSearch.electricianSenior,//中级技师
                    electricianMedium:this.listSearch.electricianMedium,//中级技师
                    tinbenderMedium:this.listSearch.tinbenderMedium,//中级技师
                    tinbenderSenior:this.listSearch.tinbenderSenior,//中级技师
                    tinbenderSeniorTechnician:this.listSearch.tinbenderSeniorTechnician,//中级技师
                    tinbenderTechnician:this.listSearch.tinbenderTechnician,//中级技师
                    painterMedium:this.listSearch.painterMedium,//中级技师
                    painterSenior:this.listSearch.painterSenior,//中级技师
                    painterSeniorTechnician:this.listSearch.painterSeniorTechnician,//中级技师
                    painterTechnician:this.listSearch.painterTechnician,//中级技师
                    model:this.listSearch.model,//企业主要维修车型
                    modelOther:this.listSearch.modelOther,//主修品牌
                    rescue:this.listSearch.rescue,//24小时汽车维修救援
                    specialRepair:this.listSearch.specialRepair,//汽车销售、维修
                    specialRepairBrand:this.listSearch.specialRepairBrand,//汽车销售、维修品牌
                    iso:this.listSearch.iso,//通过ISO质量管理体系认证
                    throughSafetyProductionStandardization:this.listSearch.throughSafetyProductionStandardization,//通过安全生产标准化达标认证
                    throughEnvironmentalProtectionSpecialRenovation:this.listSearch.throughEnvironmentalProtectionSpecialRenovation,//通过环保部门专项整治
                    sincerity:this.listSearch.sincerity,//是否为全国诚信维修企业
                    sincerityYear:this.listSearch.sincerityYear||0,//为全国诚信维修企业年份
                    qualityReputationAssessmentLevel:this.listSearch.qualityReputationAssessmentLevel.id,//上年度质量信誉考核等级
                    offerOnsiteRepair:this.listSearch.offerOnsiteRepair,//是否提供上门维修
                    serviceCategory:this.listSearch.serviceCategory,//提供上门服务种类
                    serviceCategoryOther:this.listSearch.serviceCategoryOther,//其他服务种类
                    specialService:this.listSearch.specialService,//企业特色服务
                    selfDesc:this.listSearch.selfDesc,//企业服务优势自我描述
                    selfIntroduction:this.listSearch.selfIntroduction,//企业自我简介
                    honor:this.listSearch.honor,//区级以上荣誉获得情况
                    openOnlineRepairService:this.listSearch.openOnlineRepairService,//是否愿意开通车大夫服务等在线维修服务
                    openOnlineBusinessService:this.listSearch.openOnlineBusinessService,//是否愿意开通在线商务服务
                }).then( (res) => {
                    if(res.data.code=='0'){
                        this.showModal=false;
                    }else{
                        this.$Message.error(res.data.status);
                    }
                })
            }else{
                this.$axios.post('/corp/add',{
                    corpName: this.listSearch.corpName,//公司名称 
                    licence: this.listSearch.licence, //许可证号
                    licenceBeginDate:formatDate(this.listSearch.licenceBeginDate[0]),//许可证起始日期
                    licenceEndDate:formatDate(this.listSearch.licenceBeginDate[1]),//许可证终止日期
                    registerAddress:this.listSearch.registerAddress,//工商注册地址
                    registerRegion:this.listSearch.registerRegion,//工商注册地址区域
                    registerDate:formatDate(this.listSearch.registerDate),//工商注册日期
                    businessAddress:this.listSearch.businessAddress,//经营地地址
                    businessRegion:this.listSearch.businessRegion,//经营地址区域
                    businessPostalCode:this.listSearch.businessPostalCode,//经营地址邮政编码
                    legalName:this.listSearch.legalName,//法定代表人
                    legalMobile:this.listSearch.legalMobile,//法定代表人手机
                    legalTel:this.listSearch.legalTel,//法定代表人固定电话
                    legalEmail:this.listSearch.legalEmail,//法定代表人邮箱
                    operatorName:this.listSearch.operatorName,//日常经营管理负责人
                    operatorMobile:this.listSearch.operatorMobile,//日常经营管理负责人手机
                    operatorTel:this.listSearch.operatorTel,//日常经营管理负责人固定电话
                    operatorEmail:this.listSearch.operatorEmail,//日常经营管理负责人邮箱
                    complaintTel:this.listSearch.complaintTel,//企业反馈电话
                    businessHours:(this.listSearch.businessHours[0]+'-'+this.listSearch.businessHours[1])||'',//营业时间
                    workingHoursQuotaExecutionStandard:this.listSearch.workingHoursQuotaExecutionStandard.id,//工时定额执行标准
                    workingHoursPrice:this.listSearch.workingHoursPrice,//工时单价
                    industryCategory:this.listSearch.industryCategory.id,//业户类别
                    industryCategoryOther:this.listSearch.industryCategoryOther,//其他业户类别
                    economicType:this.listSearch.economicType.id,//经济类别
                    economicTypeOther:this.listSearch.economicTypeOther,//其他经济类别
                    scope1:this.listSearch.scope1,//一类机动车维修
                    scope2:this.listSearch.scope2,//二类机动车维修
                    scope3:this.listSearch.scope3,//三类机动车维修
                    scope4:this.listSearch.scope4,//摩托车维修
                    scope5:this.listSearch.scope5,//汽车维修
                    sphere:this.listSearch.sphere,//企业主要业务范围
                    sphereOther:this.listSearch.sphereOther,//其他企业主要业务范围
                    employeeNumber:this.listSearch.employeeNumber.id,//企业员工总数
                    floorSpace:this.listSearch.floorSpace.id,//企业目前占地面积
                    manager:this.listSearch.manager,//经理人
                    serviceLeader:this.listSearch.serviceLeader,//服务负责人
                    technologyLeader:this.listSearch.technologyLeader,//技术负责人
                    qualityInspector:this.listSearch.qualityInspector,//质量检验员
                    managerOther:this.listSearch.managerOther,//其他
                    machinistSeniorTechnician:this.listSearch.machinistSeniorTechnician,//技工高级技师
                    machinistTechnician:this.listSearch.machinistTechnician,//技工高级技师
                    machinistSenior:this.listSearch.machinistSenior,//高级技师
                    machinistMedium:this.listSearch.machinistMedium,//中级技师
                    electricianSeniorTechnician:this.listSearch.electricianSeniorTechnician,//中级技师
                    electricianTechnician:this.listSearch.electricianTechnician,//中级技师
                    electricianSenior:this.listSearch.electricianSenior,//中级技师
                    electricianMedium:this.listSearch.electricianMedium,//中级技师
                    tinbenderMedium:this.listSearch.tinbenderMedium,//中级技师
                    tinbenderSenior:this.listSearch.tinbenderSenior,//中级技师
                    tinbenderSeniorTechnician:this.listSearch.tinbenderSeniorTechnician,//中级技师
                    tinbenderTechnician:this.listSearch.tinbenderTechnician,//中级技师
                    painterMedium:this.listSearch.painterMedium,//中级技师
                    painterSenior:this.listSearch.painterSenior,//中级技师
                    painterSeniorTechnician:this.listSearch.painterSeniorTechnician,//中级技师
                    painterTechnician:this.listSearch.painterTechnician,//中级技师
                    model:this.listSearch.model,//企业主要维修车型
                    modelOther:this.listSearch.modelOther,//主修品牌
                    rescue:this.listSearch.rescue,//24小时汽车维修救援
                    specialRepair:this.listSearch.specialRepair,//汽车销售、维修
                    specialRepairBrand:this.listSearch.specialRepairBrand,//汽车销售、维修品牌
                    iso:this.listSearch.iso,//通过ISO质量管理体系认证
                    throughSafetyProductionStandardization:this.listSearch.throughSafetyProductionStandardization,//通过安全生产标准化达标认证
                    throughEnvironmentalProtectionSpecialRenovation:this.listSearch.throughEnvironmentalProtectionSpecialRenovation,//通过环保部门专项整治
                    sincerity:this.listSearch.sincerity,//是否为全国诚信维修企业
                    sincerityYear:this.listSearch.sincerityYear||0,//为全国诚信维修企业年份
                    qualityReputationAssessmentLevel:this.listSearch.qualityReputationAssessmentLevel.id,//上年度质量信誉考核等级
                    offerOnsiteRepair:this.listSearch.offerOnsiteRepair,//是否提供上门维修
                    serviceCategory:this.listSearch.serviceCategory,//提供上门服务种类
                    serviceCategoryOther:this.listSearch.serviceCategoryOther,//其他服务种类
                    specialService:this.listSearch.specialService,//企业特色服务
                    selfDesc:this.listSearch.selfDesc,//企业服务优势自我描述
                    selfIntroduction:this.listSearch.selfIntroduction,//企业自我简介
                    honor:this.listSearch.honor,//区级以上荣誉获得情况
                    openOnlineRepairService:this.listSearch.openOnlineRepairService,//是否愿意开通车大夫服务等在线维修服务
                    openOnlineBusinessService:this.listSearch.openOnlineBusinessService,//是否愿意开通在线商务服务
                }).then( (res) => {
                    if(res.data.code=='0'){
                        this.showModal=false;
                    }else{
                        this.$Message.error(res.data.status);
                    }
                })
            }
            
        },
        //获取区域信息
        getType(){
            this.$axios.post('/area/region/list', {
                areaName:'shanghai',
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.typeList=res.data.items;
                }
           })
        },
        //获取详情数据------
        getDetail(){
            this.spinShow=true;
            this.$axios.get('/corp/detail/'+this.detailData.corpId, {
            }).then((res) => {
                if(res.data.code=='0'){

                    if(res.data.item.corpInfo){
                        for(let i in res.data.item.corpInfo){
                            if(i=='businessHours'){
                                let objArr=res.data.item.corpInfo[i].split('-');
                                this.listSearch[i]=objArr;
                            }else{
                                this.listSearch[i]=res.data.item.corpInfo[i];
                            }
                            
                        }
                    }
                    
                        this.listSearch['licenceBeginDate']=[res.data.item.corpInfo['licenceBeginDate'],res.data.item.corpInfo['licenceEndDate']];
                    
                    
                    if(res.data.item.corpDesc){
                        for(let i in res.data.item.corpDesc){
                            this.listSearch[i]=res.data.item.corpDesc[i];
                        }
                    }
                    if(res.data.item.corpStaffSummary){
                        for(let i in res.data.item.corpStaffSummary){
                            this.listSearch[i]=res.data.item.corpStaffSummary[i];
                        }
                    }
                    //品牌维修--------------
                    if(res.data.item.corpBusinessSphere){
                        for(let i in res.data.item.corpBusinessSphere){
                            if(res.data.item.corpBusinessSphere[i]['sphere1']==10){
                                
                                this.listSearch['sphereOther']=res.data.item.corpBusinessSphere[i]['sphereOther'];
                                this.listSearch['sphere'].push(res.data.item.corpBusinessSphere[i]['sphere1']);
                            }else{
                                this.listSearch['sphere'].push(res.data.item.corpBusinessSphere[i]['sphere1']);
                            }
                            
                        }
                    }

                    if(res.data.item.corpRepair){
                        for(let i in res.data.item.corpRepair){
                            if(res.data.item.corpRepair[i]['model']==6){
                                this.listSearch['model'].push(res.data.item.corpRepair[i]['model']);
                                this.listSearch['modelOther']=res.data.item.corpRepair[i]['otherModelName'];
                            }else{
                                this.listSearch['model'].push(res.data.item.corpRepair[i]['model']);
                            }
                        }
                    }
                    if(res.data.item.corpOnsiteServiceCategory){
                        for(let i in res.data.item.corpOnsiteServiceCategory){
                            if(res.data.item.corpOnsiteServiceCategory[i]['service']==7){
                                this.listSearch['serviceCategory'].push(res.data.item.corpOnsiteServiceCategory[i]['service']);
                                this.listSearch['serviceCategoryOther']=res.data.item.corpOnsiteServiceCategory[i]['otherServiceName'];
                            }else{
                                this.listSearch['serviceCategory'].push(res.data.item.corpOnsiteServiceCategory[i]['service']);
                            }
                        }
                    }
                    if(res.data.item.corpBusinessScope){
                        for(let i in res.data.item.corpBusinessScope){
                            if(res.data.item.corpBusinessScope[i]['scope1']==1){
                                this.companyRepair=1;
                                this.listSearch['scope1'].push(res.data.item.corpBusinessScope[i]['scope2']);
                            }else if(res.data.item.corpBusinessScope[i]['scope1']==2){
                                this.companyRepair=2;
                                this.listSearch['scope2'].push(res.data.item.corpBusinessScope[i]['scope2']);
                            }else if(res.data.item.corpBusinessScope[i]['scope1']==3){
                                this.companyRepair=3;
                                this.listSearch['scope3'].push(res.data.item.corpBusinessScope[i]['scope2']);
                            }else if(res.data.item.corpBusinessScope[i]['scope1']==4){
                                this.companyRepair=4;
                                this.listSearch['scope4'].push(res.data.item.corpBusinessScope[i]['scope2']);
                            }else if(res.data.item.corpBusinessScope[i]['scope1']==5){
                                this.companyRepair=5;
                                this.listSearch['scope5'].push(res.data.item.corpBusinessScope[i]['scope2']);
                            }
                            
                        }
                    }
                    
                    this.spinShow=false;
                }else{
                    this.spinShow=false;
                }
           })
        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            console.log(this.listSearch);
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
