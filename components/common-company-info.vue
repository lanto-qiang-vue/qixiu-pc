<template>
    <!--维修企业信息公共组件-->
  <div>
    <Collapse v-model="collapse">
        <Panel name="1">企业基本信息
          <Form ref="listSearch" :rules="ruleValidate" :model="listSearch" :label-width="140" class="common-form"
                slot="content">
            <FormItem label="企业名称:" style="width: 45%;" prop="name">
              <Input type="text" v-model="listSearch.name" placeholder="请输入企业名称"></Input>
            </FormItem>
            <FormItem label="许可证号:" style="width: 45%;" prop="licence">
              <Input type="text" v-model="listSearch.licence" placeholder="请输入许可证号"></Input>
            </FormItem>
            <FormItem label="许可证有效期:" style="width: 45%;" prop="licenceBeginDate">
              <DatePicker type="date" v-model="listSearch.licenceBeginDate" placeholder="开始日期"
                          style="width: 49%"></DatePicker>
              <DatePicker type="date" v-model="listSearch.licenceEndDate" placeholder="结束日期"
                          style="width: 49%"></DatePicker>

            </FormItem>

            <FormItem label="工商注册地址:" style="width: 45%;" prop="registerAddress">
              <Input type="text" v-model="listSearch.registerAddress" placeholder="请输入工商注册地址"></Input>
            </FormItem>
            <FormItem label="工商注册地址区域:" style="width: 45%;" prop="registerRegion">
              <Select v-model="listSearch.registerRegion" :transfer="true">
                <Option v-for="item in typeList" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="工商注册日期:" style="width: 45%;" prop="registerDate">
              <DatePicker type="date" placeholder="请选择" style="width: 100%;"
                          v-model="listSearch.registerDate"></DatePicker>
            </FormItem>
            <FormItem label="经营地地址:" style="width: 45%;">
              <Input type="text" v-model="listSearch.businessAddress" placeholder="请输入经营地地址"></Input>
            </FormItem>
            <FormItem label="经营地址区域:" style="width: 45%;">
              <Select v-model="listSearch.businessRegion" :transfer="true">
                <Option v-for="item in typeList" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="经营地址经度:" style="width: 45%;">
              <Input type="text" v-model="listSearch.longitude" placeholder="请输入经营地址经度"></Input>
            </FormItem>
            <FormItem label="经营地址维度:" style="width: 45%;">
              <Input type="text" v-model="listSearch.latitude" placeholder="请输入经营地址维度"></Input>
            </FormItem>

            <FormItem label="经营地址邮政编码:" style="width: 45%;">
              <Input type="text" v-model="listSearch.postalCode" placeholder="请输入经营地址邮政编码"></Input>
            </FormItem>
            <FormItem label="法定代表人:" style="width: 45%;">
              <Input type="text" v-model="listSearch.legalName" placeholder="请输入法定代表人"></Input>
            </FormItem>
            <FormItem label="代表人手机:" style="width: 45%;">
              <Input type="text" v-model="listSearch.legalMobile" placeholder="请输入代表人手机"></Input>
            </FormItem>
            <FormItem label="代表人固定电话:" style="width: 45%;">
              <Input type="text" v-model="listSearch.legalTel" placeholder="请输入代表人固定电话"></Input>
            </FormItem>
            <FormItem label="代表人邮箱:" style="width: 45%;">
              <Input type="text" v-model="listSearch.legalEmail" placeholder="请输入代表人邮箱"></Input>
            </FormItem>
            <FormItem label="日常经营管理负责人:" style="width: 45%;">
              <Input type="text" v-model="listSearch.operatorName" placeholder="请输入日常经营管理负责人"></Input>
            </FormItem>
            <FormItem label="负责人手机:" style="width: 45%;">
              <Input type="text" v-model="listSearch.operatorMobile" placeholder="请输入负责人手机"></Input>
            </FormItem>
            <FormItem label="负责人固定电话:" style="width: 45%;">
              <Input type="text" v-model="listSearch.operatorTel" placeholder="请输入负责人固定电话"></Input>
            </FormItem>
            <FormItem label="负责人邮箱:" style="width: 45%;">
              <Input type="text" v-model="listSearch.operatorEmail" placeholder="请输入负责人邮箱"></Input>
            </FormItem>
            <FormItem label="企业反馈电话:" style="width: 45%;">
              <Input type="text" v-model="listSearch.complaintTel" placeholder="请输入企业反馈电话"></Input>
            </FormItem>
            <FormItem label="营业时间:" style="width: 45%;">
              <TimePicker format="HH:mm" type="timerange" placement="bottom-start" placeholder="请选择"
                          style="width: 100%;" v-model="listSearch.businessHours"></TimePicker>
            </FormItem>
            <FormItem label="管理机构与部门:" style="width: 45%;" prop="manageArr">
              <Cascader :data="manageType" change-on-select v-model="listSearch.manageArr"></Cascader>
            </FormItem>
            <FormItem label="经营状态:" style="width: 45%;">
              <Select v-model="listSearch.businessStatus" :transfer="true">
                <Option v-for="item in businessStatusArr" :value="item.key" :key="item.key">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="备案状态:" style="width: 45%;">
              <Select v-model="listSearch.beianStatus" :transfer="true">
                <Option v-for="item in beianStatusArr" :value="item.name" :key="item.name">{{ item.code }}</Option>
              </Select>
            </FormItem>
            <FormItem label="企业品牌:" style="width: 45%;">
              <Input type="text" v-model="listSearch.brand" placeholder="请输入企业品牌"></Input>
            </FormItem>
            <FormItem label="企业主要业务范围:" style="width: 45%;">

              <Select v-model="listSearch.businessSphere" multiple clearable :transfer="true">
                <Option v-for="item in companySphere" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="其他主要业务范围:" style="width: 45%;"
                      v-show="(listSearch.businessSphere&&listSearch.businessSphere.indexOf(88)==-1)?false:true">
              <Input type="text" v-model="listSearch.businessSphereOther" placeholder="请输入其他主要业务范围"></Input>
            </FormItem>
            <FormItem label="经营范围:" style="width: 45%;" prop="businessScope">
              <Select v-model="listSearch.businessScope" @on-change="repairTypeFun" @on-open-change="onOpenChange"
                      :transfer="true">
                <Option v-for="item in repairType" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="一类机动车维修:" style="width: 45%;" v-show="listSearch.businessScope==43?true:false"
                      prop="businessScope2">
              <Select v-model="listSearch.businessScope2" multiple clearable :transfer="true">
                <Option v-for="item in oneCarType" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="二类机动车维修:" style="width: 45%;" v-show="listSearch.businessScope==44?true:false"
                      prop="businessScope2">
              <Select v-model="listSearch.businessScope2" multiple clearable :transfer="true">
                <Option v-for="item in twoCarType" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="三类机动车维修:" style="width: 45%;" v-show="listSearch.businessScope==45?true:false"
                      prop="businessScope2">
              <Select v-model="listSearch.businessScope2" multiple clearable :transfer="true">
                <Option v-for="item in threeCarType" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="摩托车维修:" style="width: 45%;" v-show="listSearch.businessScope==46?true:false"
                      prop="businessScope2">
              <Select v-model="listSearch.businessScope2" multiple clearable :transfer="true">
                <Option v-for="item in motorcycle" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="汽车维修:" style="width: 45%;" v-show="listSearch.businessScope==47?true:false"
                      prop="businessScope2">
              <Select v-model="listSearch.businessScope2" multiple clearable :transfer="true">
                <Option v-for="item in carList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>

            <FormItem label="综合维修企业:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.comprehensive">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="连锁经营企业:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.chainBusiness">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="集团经营企业:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.groupBusiness">
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
            <FormItem label="前台显示:" style="width: 45%;">

              <i-switch size="large" v-model="listSearch.show">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="特约维修:" style="width: 45%;">


              <i-switch size="large" v-model="listSearch.special">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="特约维修品牌:" style="width: 45%;" v-show="listSearch.special?true:false">
              <Input type="text" v-model="listSearch.specialRepairBrand" placeholder=""></Input>
            </FormItem>
            <!--<FormItem label="对接情况:" style="width: 92%;" >
                <Table border  :columns="columns10" :data="data9"></Table>
            </FormItem>-->
            <FormItem label="使用结算软件:" style="width: 45%;">
              <i-switch size="large" v-model="listSearch.useErp">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </FormItem>
            <FormItem label="Erp提供商姓名:" style="width: 45%;" v-show="listSearch.useErp?true:false">
              <Input type="text" v-model="listSearch.contactName" placeholder="请输入Erp提供商姓名"></Input>
            </FormItem>
            <FormItem label="Erp提供商电话:" style="width: 45%;" v-show="listSearch.useErp?true:false">
              <Input type="text" v-model="listSearch.contactPhone" placeholder="请输入Erp提供商电话"></Input>
            </FormItem>
            <FormItem label="Erp企业名称:" style="width: 45%;" v-show="listSearch.useErp?true:false">
              <Input type="text" v-model="listSearch.erpName" placeholder="请输入Erp企业名称"></Input>
            </FormItem>


            <FormItem label="对接渠道:" style="width: 45%;">
              <Select v-model="listSearch.source" clearable style="width: 70%" :transfer="true">
                <Option v-for="item in channels" :value="item.key" :key="item.key">{{ item.name }}</Option>
              </Select>
              <Button size="large" type="primary" @click="showAdd=true,sourceName=''">新增</Button>
            </FormItem>
            <FormItem label="对接时间:" style="width: 45%;">
              <Input type="text" v-model="listSearch.buttJoinTime" placeholder="" readonly></Input>
            </FormItem>
            <FormItem label="企业服务优势自我描述:" style="width: 92%;">
              <Input type="textarea" :rows="1" v-model="listSearch.desc" placeholder="请输入企业服务优势自我描述"></Input>
            </FormItem>

          </Form>
        </Panel>
        <Panel name="2">企业信息
          <Form :label-width="140" class="common-form" slot="content">
            <FormItem label="工时定额执行标准:" style="width: 45%;">
              <Select v-model="listSearch.workingHoursQuotaExecutionStandard" :transfer="true">
                <Option v-for="item in workCompanyType" :value="item.name" :key="item.name">{{ item.code }}</Option>
              </Select>
            </FormItem>
            <FormItem label="工时单价:" style="width: 45%;" prop="workingHoursPrice">
              <Input type="text" v-model="listSearch.workingHoursPrice" placeholder="请输入工时单价"></Input>
            </FormItem>
            <FormItem label="业户类别:" style="width: 45%;">
              <Select v-model="listSearch.industryCategory" :transfer="true">
                <Option v-for="item in households" :value="item.name" :key="item.name">{{ item.code }}</Option>
              </Select>
            </FormItem>
            <FormItem label="其他业户类别:" style="width: 45%;" v-show="listSearch.industryCategory==9?true:false">
              <Input type="text" v-model="listSearch.industryCategoryOther" placeholder="" style="width: 100%;"></Input>
            </FormItem>
            <FormItem label="经济类型:" style="width: 45%;">

              <Select v-model="listSearch.economicType" :transfer="true">
                <Option v-for="item in moneyType" :value="item.key" :key="item.key">{{ item.name }}</Option>
              </Select>
            </FormItem>
            <FormItem label="其他经济类型:" style="width: 45%;" v-show="listSearch.economicType==900?true:false">
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

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.machinists[0]"
                           placeholder="高级技师人数"></InputNumber>
            </FormItem>
            <FormItem label="机工技师人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.machinists[1]"
                           placeholder="技师人数"></InputNumber>

            </FormItem>
            <FormItem label="机工高级人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.machinists[2]"
                           placeholder="高级人数"></InputNumber>

            </FormItem>
            <FormItem label="机工中级人数:" style="width: 45%;">
              <InputNumber :max="1000000000" :min="0" v-model="listSearch.machinists[3]"
                           placeholder="中级人数"></InputNumber>

            </FormItem>
            <FormItem label="电工高级技师人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.electricians[0]"
                           placeholder="高级技师人数"></InputNumber>

            </FormItem>
            <FormItem label="电工技师人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.electricians[1]"
                           placeholder="技师人数"></InputNumber>

            </FormItem>
            <FormItem label="电工高级人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.electricians[2]"
                           placeholder="高级人数"></InputNumber>


            </FormItem>
            <FormItem label="电工中级人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.electricians[3]"
                           placeholder="中级人数"></InputNumber>

            </FormItem>
            <FormItem label="钣金工高级技师人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.tinbenders[0]"
                           placeholder="高级技师人数"></InputNumber>

            </FormItem>
            <FormItem label="钣金工技师人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.tinbenders[1]"
                           placeholder="技师人数"></InputNumber>

            </FormItem>
            <FormItem label="钣金工高级人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.tinbenders[2]"
                           placeholder="高级人数"></InputNumber>

            </FormItem>
            <FormItem label="钣金工中级人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.tinbenders[3]"
                           placeholder="中级人数"></InputNumber>

            </FormItem>
            <FormItem label="油漆工高级技师人数:" style="width: 45%;">

              <InputNumber :max="1000000000" :min="0" v-model="listSearch.painters[0]"
                           placeholder="高级技师人数"></InputNumber>

            </FormItem>
            <FormItem label="油漆工技师人数:" style="width: 45%;">


              <InputNumber :max="1000000000" :min="0" v-model="listSearch.painters[1]" placeholder="技师人数"></InputNumber>


            </FormItem>
            <FormItem label="油漆工高级人数:" style="width: 45%;">


              <InputNumber :max="1000000000" :min="0" v-model="listSearch.painters[2]" placeholder="高级人数"></InputNumber>


            </FormItem>
            <FormItem label="油漆工中级人数:" style="width: 45%;">


              <InputNumber :max="1000000000" :min="0" v-model="listSearch.painters[3]" placeholder="中级人数"></InputNumber>

            </FormItem>
            <FormItem label="企业主要维修车型:" style="width: 92%;">
              <CheckboxGroup v-model="listSearch.model">
                <Checkbox v-for="item in vehicleModel" :label="item.name" :key="item.name">{{item.code}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="主修品牌:" style="width: 45%;"
                      v-show="(listSearch.model&&listSearch.model.indexOf(6)==-1)?false:true">
              <Input type="text" v-model="listSearch.modelOther" placeholder=""></Input>
            </FormItem>
            <FormItem label="24小时汽车维修救援:" style="width: 92%;">
              <i-switch size="large" v-model="listSearch.rescue">
                <span slot="open">有</span>
                <span slot="close">无</span>
              </i-switch>
            </FormItem>


            <FormItem label="通过ISO质量管理体系认证:" style="width: 92%;">

              <i-switch size="large" v-model="listSearch.iso">
                <span slot="open">通过</span>
                <span slot="close">未通过</span>
              </i-switch>
            </FormItem>
            <FormItem label="通过安全生产标准化达标认证:" style="width: 92%;">

              <i-switch size="large" v-model="listSearch.throughSafetyProductionStandardization">
                <span slot="open">通过</span>
                <span slot="close">未通过</span>
              </i-switch>
            </FormItem>
            <FormItem label="通过环保部门专项整治:" style="width: 92%;">

              <i-switch size="large" v-model="listSearch.throughEnvironmentalProtectionSpecialRenovation">
                <span slot="open">通过</span>
                <span slot="close">未通过</span>
              </i-switch>
            </FormItem>
            <FormItem label="是否为全国诚信维修企业:" style="width: 92%;">
              <i-switch size="large" v-model="listSearch.sincerity">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>

            </FormItem>
            <FormItem label="成为全国诚信维修企业的年份:" style="width: 92%;" v-show="listSearch.sincerity?true:false">
              <!--<Input type="text"  v-model="listSearch.sincerityYears" placeholder="" style="width: 250px;"></Input>-->
              <DatePicker type="year" v-model="yearsArr.begin" placeholder="开始日期" style="width: 100px;"></DatePicker>
              <DatePicker type="year" v-model="yearsArr.end" placeholder="结束日期" style="width: 100px;"></DatePicker>
              <Button size="large" type="primary" @click="addYear">新增</Button>
            </FormItem>
            <FormItem label="" style="width: 92%;" v-show="listSearch.sincerityYears.length">
              <div>
                <div class="yearClass" v-for="item in listSearch.sincerityYears">
                  {{item.startYear}} {{item.endYear?-item.endYear:''}}
                </div>
              </div>

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
            <FormItem label="提供上门服务种类:" style="width: 92%;">
              <CheckboxGroup v-model="listSearch.serviceCategory">
                <Checkbox v-for="item in visitService" :label="item.key" :key="item.key">{{item.name}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="其他服务种类:" style="width: 45%;"
                      v-show="listSearch.serviceCategory.indexOf(300007)==-1?false:true">
              <Input type="text" v-model="listSearch.serviceCategoryOther" placeholder=""></Input>
            </FormItem>
            <FormItem label="企业特色服务:" style="width: 92%;">
              <Input type="textarea" :rows="1" v-model="listSearch.specialService" placeholder="请输入企业特色服务"></Input>
            </FormItem>
            <FormItem label="企业自我简介:" style="width: 92%;">
              <Input type="textarea" :rows="1" v-model="listSearch.selfIntroduction" placeholder="请输入企业自我简介"></Input>
            </FormItem>
            <FormItem label="区级以上荣誉获得情况:" style="width: 92%;">
              <Input type="textarea" :rows="1" v-model="listSearch.honor" placeholder="请输入区级以上荣誉获得情况"></Input>
            </FormItem>
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
          </Form>
        </Panel>
      </Collapse>
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
import { deepClone } from '~/static/util.js'
import { formatDate } from '@/static/tools'

let initList={
          'businessHours': '',//营业时间
          'businessHours1': '',//营业时间--
          'postalCode': '',//经营地址邮政编码------------------------------------------------
          'businessRegion': '',//经营地址区域
          'businessAddress': '',//经营地地址
          'complaintTel': '',//企业反馈电话
          'economicType': '',//经济类型
          'economicTypeOther': '',
          'employeeNumber': '',//企业员工总数--------------------------
          'floorSpace': '',//企业目前占地面积-------------------------------
          'honor': '',
          'id': '',
          'industryCategory': null,//业户类别
          'industryCategoryOther': '',
          'iso': false,
          'latitude': 0,
          'legalEmail': '',
          'legalMobile': '',
          'legalName': '',//法定代表人
          'legalTel': '',
          'licence': '',//许可证号
          'licenceBeginDate': '',//许可证有效期
          'licenceEndDate': '',//许可证有效期
          'longitude': 0,
          'manager': '',
          'managerOther': '',
          'model': [],
          'modelOther': '',
          'offerOnsiteRepair': false,
          'openOnlineBusinessService': false,
          'openOnlineRepairService': false,
          'operatorEmail': '',
          'operatorMobile': '',
          'operatorName': '',
          'operatorTel': '',
          'qualityInspector': '',
          'qualityReputationAssessmentLevel': '',
          'registerAddress': '',//工商注册地址
          'registerDate': '',//工商注册日期
          'registerRegion': '',//工商注册地址区域
          'rescue': false,
          // "selfDesc": "",
          'selfIntroduction': '',
          'serviceCategory': [],
          'serviceCategoryOther': '',
          'serviceLeader': '',
          'sincerity': false,
          'sincerityYears': [],

          'specialRepairBrand': '',
          'specialService': '',
          'technologyLeader': '',
          'throughEnvironmentalProtectionSpecialRenovation': false,
          'throughSafetyProductionStandardization': false,
          'workingHoursPrice': '',//工时单价
          'workingHoursQuotaExecutionStandard': null,//工时定额执行标准

          'beianStatus': 1,//备案状态---------------------------------------------
          'brand': '',//企业品牌--------------------------------------------------
          'businessScope': '',//经营范围
          'businessScope2': [],//经营范围小类
          'businessSphere': [],//主要业务范围
          'businessSphereOther': '',//其他业务范围
          'businessStatus': 1,//经营状态
          'corpInfoId': '',//企业id
          'dept': '',//管理部门
          'desc': '',//自我描述
          'zdz': false,//总对总
          'buttJoint': false,//是否对接

          'electricians': [
            0, 0, 0, 0
          ],//电工

          'machinists': [
            0, 0, 0, 0
          ],//机工

          'name': '',//企业名称----------------------------------------------

          'org': '',//管理机构---------------------------------------------------
          'painters': [
            0, 0, 0, 0
          ],//油漆工

          'show': false,//是否前台显示--------------------------------------------------------

          'special': false,//是否特约维修
          'specialRepairBrand': '',//主修品牌
          'specialService': '',//服务特色
          'status': 1,//审核状态

          'tinbenders': [
            0, 0, 0, 0
          ],//钣金工
          'updateTime': '',//更新时间--------------------
          'buttJointInfoDtos': [],

          'source': '',//对接渠道数据----------
          'comprehensive': false,
          'chainBusiness': false,
          'groupBusiness': false,
          'useHss': false,
          'buttJoinTime': '',//对接时间---
          'useErp': false,
          'contactName': '',
          'contactPhone': '',
          'erpName': '',
          'code': '',//对接的秘钥---
          'createKey': '',
          'manageArr':[],
        };
export default {
    name: "common-company-info",
    props: ['showInfo', 'infoId','showSaveInfo','clearRules'],
    components: {},
    data(){
        return{
            collapse: '1',
            showAdd: false,
            listSearch:deepClone(initList),
            ruleValidate: {
                name: [{ required: true, message: '必填项不可为空' }],
                licence: [{ required: true, message: '必填项不可为空' }],
                licenceBeginDate: [{ required: true, message: '必填项不可为空' }],
                registerAddress: [{ required: true, message: '必填项不可为空' }],
                registerRegion: [{ required: true, message: '必填项不可为空' }],
                registerDate: [{ required: true, message: '必填项不可为空' }],
                businessScope: [{ required: true, message: '必填项不可为空' }],
                businessScope2: [{ required: true, message: '必填项不可为空' }],
                manageArr: [{required:true,message:'必填项不能为空'}],
                workingHoursPrice: [{ message: '最多两位小数位', trigger: 'change', pattern: /^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/ }]


            },//规则验证
            sourceName: '',//对接渠道名称----
            //成为全国诚信企业的数据--------
            yearsArr: {
                begin: '',
                end: ''
            },
            //审核状态问题------
            statusArr: [
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
            //一类机动车维修------
            oneCarType: [],
            //二类机动车维修-------
            twoCarType: [],
            //三类机动车维修-------
            threeCarType: [],
            //摩托车维修
            motorcycle: [],
            //汽车维修
            carList: [],
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
        }
    },
    mounted () {
        this.collapse = '1'
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
        this.getType()
    },
    watch:{
        showInfo(){
            if(this.infoId){
                this.getDetail(this.infoId);
            }else{
                this.listSearch=deepClone(initList);
                console.log('触发了',this.listSearch);
            }

        },
        showSaveInfo(){
            this.rulesData('listSearch');
        },
        clearRules(){
            this.yearsArr = {
                begin: '',
                end: ''
            }
            this.$refs['listSearch'].resetFields();
            console.log('清除了数据');
        }

    },
    methods:{
        //获取详情--------
        getDetail(id) {
            // this.spinShow=true;
          this.$refs['listSearch'].resetFields();
            this.$Spin.show()
            this.$axios.get('/corp/manage/detail/' + id, {}).then((res) => {
            if (res.data.code == '0') {
                let resData = res.data.item
                for (let i in resData) {
                    if (i == 'businessHours') {
                        this.listSearch[i] = resData[i].split('-')
                        // console.log(this.listSearch[i]);
                    } else if (i == 'source') {
                        this.listSearch[i] = resData[i]
                    } else if (i == 'createKey') {
                        this.listSearch[i] = resData[i]
                    } else {
                        if (resData[i]) {
                            console.log(i)
                            this.listSearch[i] = resData[i]
                        }

                    }
                }


                this.listSearch.manageArr = []
                this.listSearch.manageArr.push(this.listSearch.org)
                this.listSearch.manageArr.push(this.listSearch.dept)
                if (this.listSearch['businessScope']) {
                    console.log(this.listSearch['businessScope']);
                    this.repairTypeFun(this.listSearch['businessScope'])
                }
            }
            // this.spinShow=false;
            this.$Spin.hide()
            })
      },
      //数据校验--------
      rulesData(name){
          if ((this.listSearch.businessSphere.indexOf(88) != -1) && (!this.listSearch.businessSphereOther)) {
          this.$Message.error('请填写其他主要业务范围')
          return
        }

        if ((this.listSearch.special) && (!this.listSearch.specialRepairBrand)) {
          this.$Message.error('请填写特约维修品牌')
          return
        }

        if ((this.listSearch.industryCategory == 9) && (!this.listSearch.industryCategoryOther)) {
          this.$Message.error('请填写其他业户类别')
          return
        }

        if ((this.listSearch.economicType == 900) && (!this.listSearch.economicTypeOther)) {
          this.$Message.error('请填写其他经济类型')
          return
        }

        if ((this.listSearch.model.indexOf(6) != -1) && (!this.listSearch.modelOther)) {
          this.$Message.error('请填写主修品牌')
          return
        }

        if ((this.listSearch.serviceCategory.indexOf(300007) != -1) && (!this.listSearch.serviceCategoryOther)) {
          this.$Message.error('请填写其他服务种类')
          return
        }

        if ((this.listSearch.sincerity) && (this.listSearch.sincerityYears.length == 0)) {
          this.$Message.error('请填写成为全国诚信维修企业的年份')
          return
        }
        if ((this.listSearch.useErp) && (!this.listSearch.contactName)) {

          this.$Message.error('请填写Erp提供商姓名')
          return
        }

        if ((this.listSearch.useErp) && (!this.listSearch.contactPhone)) {

          this.$Message.error('请填写Erp提供商电话')
          return
        }

        if ((this.listSearch.useErp) && (!this.listSearch.erpName)) {

          this.$Message.error('请填写Erp企业名称')
          return
        }


        if (this.listSearch.manageArr.length > 0) {
          this.listSearch['org'] = this.listSearch.manageArr[0] || ''
          this.listSearch['dept'] = this.listSearch.manageArr[1] || ''
        } else {
          this.listSearch['org'] = ''
          this.listSearch['dept'] = ''
        }

        this.listSearch.businessHours1 = '';

        if (this.listSearch.businessHours.length > 0 && this.listSearch.businessHours[0] && this.listSearch.businessHours[1]) {
          this.listSearch.businessHours1 = this.listSearch.businessHours[0] + '-' + this.listSearch.businessHours[1]
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
              this.$emit('saveInfoFun')
          }
        })
      },
      //选择维修类别时带的参数--------
      repairTypeFun(val) {
        if (!val) {
          return
        }
        this.$axios.get('/dict/value/' + val, {}).then((res) => {
          if (res.data.code == '0') {
            if (val == 43) {
              this.oneCarType = res.data.items
            } else if (val == 44) {
              this.twoCarType = res.data.items
            } else if (val == 45) {
              this.threeCarType = res.data.items
            } else if (val == 46) {
              this.motorcycle = res.data.items
            } else if (val == 47) {
              this.carList = res.data.items
            }
          }
        })
      },
      onOpenChange(flag) {
        if (flag === false) {
          this.listSearch['businessScope2'] = ''
        }
      },
      //新增诚信企业年份------
      addYear() {
        if (!this.yearsArr.begin) {
          return
        }
        let objYear = { corpId: '', endYear: '', startYear: '' }
        objYear['corpId'] = this.listSearch.id
        objYear['startYear'] = formatDate(this.yearsArr.begin, 'yyyy')
        objYear['endYear'] = formatDate(this.yearsArr.end, 'yyyy')

        this.listSearch.sincerityYears.push(objYear)
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

  .pic-card {
    display: inline-block;
    margin: 0 10px 10px 0;
    width: 200px;
    min-width: 200px;

    .red {
      color: red;
    }
    .pic-body {
      width: 100%;
      height: 150px;
      /*border: 1px solid #dcdee2;*/
      position: relative;
      .no-pic {
        width: 250px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .pic {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      .button {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        text-align: center;
        > * {
          margin: 0 5px;
          vertical-align: top;
        }
        .up-img {
          display: inline-block;
          overflow: hidden;
          position: relative;
          .input {
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
    height: 25px;
    border: 1px solid #dcdee2;
    line-height: 25px;
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
</style>











































