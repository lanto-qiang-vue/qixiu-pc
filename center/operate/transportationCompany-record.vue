<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :page="page" :loading="loading" @onRowClick="rowClick">
    <div slot="search">
      <Form :label-width="80" class="common-form">
        <FormItem label="档案号:">
          <Input type="text" v-model="search.RECORD_NO_lk	"></Input>
        </FormItem>
        <FormItem label="车牌号:">
          <Input type="text" v-model="search.PLATE_NUM_lk"></Input>
        </FormItem>
        <FormItem label="车牌颜色:">
          <Select v-model="search.PLATE_COLOR_eq">
            <Option v-for="item in colorList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="车辆类型:">
          <Select v-model="search.VEHICLE_TYPE_eq">
            <Option v-for="item in cartList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="预警状态:">
          <Select v-model="search.WARN_TYPE_eq">
            <Option v-for="item in warnList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="营运状态:">
          <Select v-model="search.STATUS_eq">
            <Option v-for="item in manageList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否个体户:">
          <Select v-model="search.IS_SINGLE_eq">
            <Option v-for="item in unitList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label-width="80" style="width: 100px;">
          <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="primary" @click="add">新增</Button>
      <Button type="info" v-if="" :disabled="canDo" @click="edit">查看/修改</Button>
      <Button type="error" v-if="accessBtn('delete')" :disabled="canDo" @click="del">删除</Button>
    </div>
    <!--添加-->
    <Modal
      :transition-names="['', '']"
      v-model="showModal"
      :title="title"
      width="90"
      class1="table-modal-detail"
      :scrollable="true"
      @on-visible-change="visibleChange"
      :transfer="true"
      :mask-closable="false"
      :footer-hide="false"
    >
      <Tabs type="card" v-model="indexName" class="modal-tabs">
        <!--车辆基本情况-->
        <TabPane name="m1" label="车辆基本情况">
          <Form :model="formData" ref="formData" :rules="rule1" :label-width="120" class="common-form"
                v-show="indexName == 'm1'">
            <FormItem label="所属企业:" prop="corpName">
              <Input v-model="formData.corpName" :readonly="true" type="text"
                     @on-focus="showType=Math.random()"> </Input>
            </FormItem>
            <FormItem label="车牌号码:" prop="plateNum">
              <Input v-model="formData.plateNum" type="text"> </Input>
            </FormItem>
            <FormItem label="车牌颜色:" prop="plateColor">
              <Select v-model="formData.plateColor">
                <Option v-for="item in colorList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="车辆类型:" prop="vehicleType">
              <Select v-model="formData.vehicleType">
                <Option v-for="item in cartList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="发证日期:" prop="certDate">
              <DatePicker type="date" v-model="formData.certDate"></DatePicker>
            </FormItem>
            <FormItem label="厂家:">
              <Input v-model="formData.vender" type="text"> </Input>
            </FormItem>
            <FormItem label="品牌:" prop="cert_date">
              <Input v-model="formData.brand" type="text"> </Input>
            </FormItem>
            <FormItem label="车型:">
              <Input type="text" v-model="formData.xm"></Input>
            </FormItem>
            <FormItem label="道路运输许可证号:">
              <Input type="text" v-model="formData.loadCertNum"></Input>
            </FormItem>
            <FormItem label="营运状态:">
              <Select v-model="formData.status">
                <Option v-for="item in manageList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="所属辖区:" prop="contacts">
              <Select v-model="formData.county">
                <Option v-for="(item, key) in area" :value="item.regionCode || item.value" :key="key">{{ item.shortName }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="燃料类型:" prop="contacts_tel">
              <Select v-model="formData.fuelType">
                <Option v-for="item in fuelList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="车架号:">
              <Input v-model="formData.chassisNum" type="text"> </Input>
            </FormItem>
            <FormItem label="发动机号:">
              <Input v-model="formData.engineNum" type="text"> </Input>
            </FormItem>
            <FormItem label="使用类别:">
              <Input v-model="formData.useType" type="text"> </Input>
            </FormItem>
            <FormItem label="车辆吨位:">
              <Input v-model="formData.tonnage" type="text"> </Input>
            </FormItem>
            <FormItem label="座位:">
              <Input v-model="formData.seat" type="text"> </Input>
            </FormItem>
            <FormItem label="建档里程:">
              <InputNumber :min="0" v-model="formData.firstMileage"></InputNumber>
            </FormItem>
            <FormItem label="年检日期:">
              <DatePicker type="date" v-model="formData.checkDate"></DatePicker>
            </FormItem>
            <FormItem label="上次维修日期:">
              <DatePicker type="date" v-model="formData.lastRepairDate"></DatePicker>
            </FormItem>
            <FormItem label="上次评定日期:">
              <DatePicker type="date" v-model="formData.lastCheckDate"></DatePicker>
            </FormItem>
            <FormItem label="注册日期:">
              <DatePicker type="date" v-model="formData.regDate"></DatePicker>
            </FormItem>
            <FormItem label="驾驶员:">
              <Input v-model="formData.unitName" type="text"> </Input>
            </FormItem>
            <FormItem label="是否个体户:">
              <Select v-model="formData.single">
                <Option v-for="item in unitList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="车主姓名:">
              <Input v-model="formData.ownerName" type="text"> </Input>
            </FormItem>
            <FormItem label="车主电话:">
              <Input v-model="formData.ownerPhone" type="text"> </Input>
            </FormItem>
            <div style="clear: both;"></div>
            <FormItem :label-width="0">
              <upload-img :description="'上传行驶证'" :data="imgData1" :callback="'success'"
                          @success="success1"></upload-img>
            </FormItem>
            <FormItem :label-width="0">
              <upload-img :description="'上传营运证'" :data="imgData2" :callback="'success'"
                          @success="success2"></upload-img>
            </FormItem>
            <FormItem :label-width="0">
              <upload-img :description="'上传通行证'" :data="imgData3" :callback="'success'"
                          @success="success3"></upload-img>
            </FormItem>
            <FormItem :label-width="0">
              <upload-img :description="'上传保单(带具体日期)'" :data="imgData4" :callback="'success'"
                          @success="success4"></upload-img>
            </FormItem>
          </Form>
        </TabPane>
        <!--车辆技术参数-->
        <TabPane name="m2" :disabled="canEdit" label="车辆技术参数">
          <Form :model="formData2" ref="formData2" :label-width="120" :rules="rule2" class="common-form"
                v-show="indexName == 'm2'">
            <FormItem label="出厂日期:" prop="productionDate">
              <DatePicker type="date" v-model="formData2.productionDate"></DatePicker>
            </FormItem>
            <FormItem label="出厂场地:">
              <Input v-model="formData2.productionPlace" type="text"> </Input>
            </FormItem>
            <FormItem label="底盘厂牌型号:">
              <Input v-model="formData2.brandModel" type="text"> </Input>
            </FormItem>
            <FormItem label="客车类型等级:">
              <Input v-model="formData2.busLevel" type="text"> </Input>
            </FormItem>
            <FormItem label="车辆外廓尺寸:">
              <Input v-model="formData2.vehicleDimensions"></Input>
            </FormItem>
            <FormItem label="总质量:">
              <InputNumber v-model="formData2.totalMass" type="text"></InputNumber>
            </FormItem>
            <FormItem label="座位排列:">
              <!--<Input v-model="formData2.seatArrangement" type="text"> </Input>-->
              <Select v-model="formData2.seatArrangement">
                <Option v-for="item in arrangeList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="核定乘员数:">
              <InputNumber type="text" v-model="formData2.occupantNumber"></InputNumber>
            </FormItem>
            <FormItem label="核定牵引总质量:">
              <InputNumber type="text" v-model="formData2.tractionMass"></InputNumber>
            </FormItem>
            <FormItem label="车轴数/驱动轴数:">
              <InputNumber type="text" v-model="formData2.axleNumber"></InputNumber>
            </FormItem>
            <FormItem label="发动机厂牌型号:">
              <Input type="text" v-model="formData2.engineBrand"></Input>
            </FormItem>
            <FormItem label="发动机功率:">
              <InputNumber type="text" v-model="formData2.enginePower"></InputNumber>
            </FormItem>
            <FormItem label="发动机排量:">
              <InputNumber v-model="formData2.engineDisplacement" type="text"></InputNumber>
            </FormItem>
            <FormItem label="排放标准:">
              <!--<Input v-model="formData2.emissionStandard" type="text"> </Input>-->
              <Select v-model="formData2.emissionStandard">
                <Option v-for="item in letList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="驱动形式:">
              <Input v-model="formData2.driveType" type="text"> </Input>
            </FormItem>
            <FormItem label="轮胎数/规格:">
              <InputNumber v-model="formData2.tyreNumber" type="text"></InputNumber>
            </FormItem>
            <FormItem label="前照灯制式:">
              <Input v-model="formData2.headlightType" type="text"> </Input>
            </FormItem>
            <FormItem label="变速器形式:">
              <Select v-model="formData2.transmissionType" :transfer="true">
                <Option v-for="item in shiftingList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="缓速器:">
              <Select v-model="formData2.retarder" :transfer="true">
                <Option v-for="item in slowList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="转向器:">
              <Select v-model="formData2.steeringGear" :transfer="true">
                <Option v-for="item in turnList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="行车制动形式:">
              <Select v-model="formData2.brakeType" :transfer="true">
                <Option v-for="item in brakeList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="悬挂形式:">
              <Input v-model="formData2.suspensionType"></Input>
            </FormItem>
            <FormItem label="其他配置:">
              <Input v-model="formData2.qtpz" type="text"> </Input>
            </FormItem>
          </Form>
        </TabPane>
        <!--车辆变更登记-->
        <TabPane name="m3" :disabled="canEdit" label="车辆变更登记">
          <common-table v-model="tableData3" :showSearch="false" :showPage="false" @changeSelect="changeSelect3"
                        :columns="columns3"
                        v-show="indexName == 'm3'">
            <div slot="operate">
              <Button type="primary" v-if="accessBtn('changeSave')" @click="add3">新增</Button>
              <Button type="primary" v-if="accessBtn('changeSave')" @click="addPost('车辆变更登记',3)">保存</Button>
              <Button type="error" v-if="" :disabled="canDo3" @click="del3">删除</Button>
            </div>
          </common-table>
        </TabPane>
        <TabPane name="m4" :disabled="canEdit" label="车辆使用登记">
          <common-table v-model="tableData4" :showSearch="false" :showPage="false" @changeSelect="changeSelect4"
                        :columns="columns4"
                        v-show="indexName == 'm4'">
            <div slot="operate">
              <Button type="primary" v-if="accessBtn('usesSave')" @click="add4">新增</Button>
              <Button type="primary" v-if="accessBtn('usesSave')" @click="addPost('车辆使用登记',4)">保存</Button>
              <Button type="error" v-if="" :disabled="canDo4" @click="del4">删除</Button>
            </div>
          </common-table>
        </TabPane>
        <TabPane name="m5" :disabled="canEdit" label="车辆交通事故登记">
          <common-table v-model="tableData5" :showSearch="false" :showPage="false" @changeSelect="changeSelect5"
                        :columns="columns5"
                        v-show="indexName == 'm5'">
            <div slot="operate">
              <Button type="primary" v-if="accessBtn('accidentSave')" @click="add5">新增</Button>
              <Button type="primary" v-if="accessBtn('accidentSave')" @click="addPost('车辆交通事故登记',5)">保存</Button>
              <Button type="error" v-if="" :disabled="canDo5" @click="del5">删除</Button>
            </div>
          </common-table>
        </TabPane>
        <TabPane name="m6" :disabled="canEdit" label="车辆驾驶员登记">
          <common-table v-model="tableData6" :showSearch="false" :showPage="false" @changeSelect="changeSelect6"
                        :columns="columns6"
                        v-show="indexName == 'm6'">
            <div slot="operate">
              <Button type="primary" v-if="accessBtn('driverSave')" @click="add6">新增</Button>
              <Button type="primary" v-if="accessBtn('driverSave')" @click="addPost('车辆驾驶员登记',6)">保存</Button>
              <Button type="error" v-if="" :disabled="canDo6" @click="del6">删除</Button>
            </div>
          </common-table>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="success" v-if="accessBtn('save')" v-show="indexName == 'm1'" @click="addPost('formData',1)">提交
        </Button>
        <Button type="success" v-if="accessBtn('paramSave')" v-show="indexName == 'm2'" @click="addPost('formData2',2)">
          提交
        </Button>
        <Button @click="showModal=false">返回</Button>
      </div>
    </Modal>
    <select-company :showType="showType" @changeOk="changeOk"></select-company>
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import uploadImg from '~/components/uploadImg.vue'
  import SelectCompany from '~/components/select-company.vue'
  import { deepClone } from '../../static/util'
  import funMixin from '~/components/fun-auth-mixim.js'

  export default {
    name: 'transportationCompany-record',
    components: { CommonTable, uploadImg, SelectCompany },
    mixins: [funMixin],
    data() {
      const validateColor = (rule, value, callback) => {
        if (this.formData.plateColor == 0) {
          callback(new Error('请选择'))
        } else {
          callback()
        }
      }
      const validateType = (rule, value, callback) => {
        if (this.formData.vehicleType == 0) {
          callback(new Error('请选择'))
        } else {
          callback()
        }
      }
      return {
        showType: false,
        imgData1: [],
        imgData2: [],
        imgData3: [],
        imgData4: [],
        select3: [],
        select4: [],
        select5: [],
        select6: [],
        tableData4: [],
        tableData3: [],
        tableData5: [],
        tableData6: [],
        columns6: [
          { type: 'selection', width: 50 },
          {
            title: '驾驶员姓名', key: 'driverName', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.driverName
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.driverName = e.target.value
                        this.tableData6[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '身份证号', key: 'idNum', sortable: true, minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.idNum
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.idNum = e.target.value
                        this.tableData6[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '驾驶证类型', key: 'licenceType', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.licenceType
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.licenceType = e.target.value
                        this.tableData6[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '驾驶证号', key: 'licenceNum', sortable: true, minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.licenceNum
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.licenceNum = e.target.value
                        this.tableData6[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '从业资格号', key: 'certificateNum', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.certificateNum
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.certificateNum = e.target.value
                        this.tableData6[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '从业证类别', key: 'certificateType', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.certificateType
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.certificateType = e.target.value
                        this.tableData6[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '入职时间', key: 'entryTime', sortable: true, minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('DatePicker', {
                    props: {
                      value: params.row.entryTime,
                      placement: 'bottom',
                      transfer: true,
                      editable: false
                    },
                    on: {
                      'on-change': (a, b) => {
                        this.tableData6[params.index].entryTime = a
                      }

                    }
                  }
                )
              ])

            }
          },
          {
            title: '离职时间', key: 'dimissionTime', sortable: true, minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('DatePicker', {
                    props: {
                      value: params.row.dimissionTime,
                      placement: 'bottom',
                      transfer: true,
                      editable: false
                    },
                    on: {
                      'on-change': (a, b) => {
                        this.tableData6[params.index].dimissionTime = a
                      }

                    }
                  }
                )
              ])
            }
          },
          {
            title: '安全行驶里程', key: 'safeMileage', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('InputNumber', {
                    props: {
                      value: params.row.safeMileage
                    },
                    on: {
                      'on-change': (e) => {
                        let data = params.row
                        data.safeMileage = e
                        this.tableData6[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '违章记录', key: 'illegalRecord', sortable: true, minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.illegalRecord
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.illegalRecord = e.target.value
                        this.tableData6[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '事故记录', key: 'accidentRecord', sortable: true, minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.accidentRecord
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.accidentRecord = e.target.value
                        this.tableData6[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          }, {
            title: '其他投诉', key: 'otherComplaints', sortable: true, minWidth: 120,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.otherComplaints
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.otherComplaints = e.target.value
                        this.tableData6[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          }
        ],
        columns5: [
          { type: 'selection', width: 50 },
          {
            title: '事故日期', key: 'accidentDate', sortable: true, minWidth: 105,
            render: (h, params) => {
              return h('div', [
                h('DatePicker', {
                    props: {
                      value: params.row.accidentDate,
                      placement: 'bottom',
                      transfer: true,
                      editable: false
                    },
                    on: {
                      'on-change': (a, b) => {
                        this.tableData5[params.index].accidentDate = a
                      }

                    }
                  }
                )
              ])

            }
          }, {
            title: '事故地址', key: 'accidentAddr', sortable: true, minWidth: 105,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.accidentAddr
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.accidentAddr = e.target.value
                        this.tableData5[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '事故性质', key: 'accidentNature', sortable: true, minWidth: 105,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.accidentNature
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.accidentNature = e.target.value
                        this.tableData5[params.index] = data
                      }

                    }
                  }
                )
              ])

            }
          },
          {
            title: '事故责任', key: 'accidentResponsibility', sortable: true, minWidth: 105,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.accidentResponsibility
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.accidentResponsibility = e.target.value
                        this.tableData5[params.index] = data
                      }

                    }
                  }
                )
              ])

            }
          },
          {
            title: '事故种类及车辆损坏情况', key: 'accidentDescription', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.accidentDescription
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.accidentDescription = e.target.value
                        this.tableData5[params.index] = data
                      }

                    }
                  }
                )
              ])

            }
          },
          {
            title: '企业直接经济损失(元)', key: 'economicLosses', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('InputNumber', {
                    props: {
                      value: params.row.economicLosses
                    },
                    on: {
                      'on-change': (e) => {
                        let data = params.row
                        data.economicLosses = e
                        this.tableData5[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '登记人', key: 'accidentRegistrant', sortable: true, minWidth: 105,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.accidentRegistrant
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.accidentRegistrant = e.target.value
                        this.tableData5[params.index] = data
                      }

                    }
                  }
                )
              ])

            }
          }
        ],
        columns3: [
          { type: 'selection', width: 50 },
          {
            title: '变更日期', key: 'changeDate', sortable: true, minWidth: 105,
            render: (h, params) => {
              return h('div', [
                h('DatePicker', {
                    props: {
                      value: params.row.changeDate,
                      placement: 'bottom',
                      transfer: true,
                      editable: false
                    },
                    on: {
                      'on-change': (a, b) => {
                        this.tableData3[params.index].changeDate = a
                      }

                    }
                  }
                )
              ])

            }
          }, {
            title: '变更原因', key: 'changeReason', sortable: true, minWidth: 105,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.changeReason,
                      placement: 'bottom',
                      transfer: true
                    },
                    on: {
                      'on-blur': (e) => {
                        this.tableData3[params.index].changeReason = e.target.value
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '变更事项', key: 'changeItem', sortable: true, minWidth: 105,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.changeItem,
                      placement: 'bottom',
                      transfer: true
                    },
                    on: {
                      'on-blur': (e) => {
                        this.tableData3[params.index].changeItem = e.target.value
                      }

                    }
                  }
                )
              ])

            }
          }
        ],
        columns4: [
          { type: 'selection', width: 50 },
          {
            title: '时间', key: 'usesTime', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('DatePicker', {
                    props: {
                      value: params.row.usesTime,
                      placement: 'bottom',
                      transfer: true,
                      editable: false
                    },
                    on: {
                      'on-change': (a, b) => {
                        this.tableData4[params.index].usesTime = a
                      }

                    }
                  }
                )
              ])

            }
          }, {
            title: '行驶里程(KM)', key: 'mileage', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('InputNumber', {
                    props: {
                      value: params.row.mileage,
                      min: 0
                    },
                    on: {
                      'on-change': (e) => {
                        let data = params.row
                        data.mileage = e
                        this.tableData4[params.index] = data
                      }
                    }
                  }
                )
              ])

            }
          },
          {
            title: '间隔里程(KM)', key: 'intervalMileage', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('InputNumber', {
                    props: {
                      value: params.row.intervalMileage,
                      min: 0
                    },
                    on: {
                      'on-change': (e) => {
                        let data = params.row
                        data.intervalMileage = e
                        this.tableData4[params.index] = data
                      }

                    }
                  }
                )
              ])

            }
          },
          {
            title: '燃油消耗(升)', key: 'fuelConsumption', sortable: true, minWidth: 150,
            render: (h, params) => {
              return h('div', [
                h('InputNumber', {
                    props: {
                      value: params.row.fuelConsumption,
                      min: 0
                    },
                    on: {
                      'on-change': (e) => {
                        let data = params.row
                        data.fuelConsumption = e
                        this.tableData4[params.index] = data
                      }

                    }
                  }
                )
              ])

            }
          },
          {
            title: '定额', key: 'quota', sortable: true, minWidth: 100,
            render: (h, params) => {
              return h('div', [
                h('InputNumber', {
                    props: {
                      value: params.row.quota,
                      min: 0
                    },
                    on: {
                      'on-change': (e) => {
                        let data = params.row
                        data.quota = e
                        this.tableData4[params.index] = data
                      }

                    }
                  }
                )
              ])

            }
          },
          {
            title: '余', key: 'surplus', sortable: true, minWidth: 100,
            render: (h, params) => {
              return h('div', [
                h('InputNumber', {
                    props: {
                      value: params.row.surplus,
                      min: 0
                    },
                    on: {
                      'on-change': (e) => {
                        let data = params.row
                        data.surplus = e
                        this.tableData4[params.index] = data
                      }

                    }
                  }
                )
              ])

            }
          },
          {
            title: '亏', key: 'deficit', sortable: true, minWidth: 100,
            render: (h, params) => {
              return h('div', [
                h('InputNumber', {
                    props: {
                      value: params.row.deficit,
                      min: 0
                    },
                    on: {
                      'on-change': (e) => {
                        let data = params.row
                        data.deficit = e
                        this.tableData4[params.index] = data
                      }

                    }
                  }
                )
              ])
            }
          }, {
            title: '使用单位', key: 'useUnit', sortable: true, minWidth: 105,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.useUnit
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.useUnit = e.target.value
                        this.tableData4[params.index] = data
                      }

                    }
                  }
                )
              ])
            }
          }, {
            title: '司机姓名', key: 'driverName', sortable: true, minWidth: 105,
            render: (h, params) => {
              return h('div', [
                h('Input', {
                    props: {
                      value: params.row.driverName
                    },
                    on: {
                      'on-blur': (e) => {
                        let data = params.row
                        data.driverName = e.target.value
                        this.tableData4[params.index] = data
                      }

                    }
                  }
                )
              ])
            }
          }
        ],
        rule1: {
          corpName: [{ required: true, message: '请选择维修企业' }],
          plateNum: [{ required: true, message: '必填项不能为空' }, {
            type: 'string',
            pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1,2}$/,
            message: '请输入正确的车牌号码',
            trigger: 'change,blur'
          }],
          plateColor: [{ required: true, message: '必填项不能为空' },
            { validator: validateColor, trigger: 'blur' }
          ],
          vehicleType: [{ required: true, message: '必填项不能为空' },
            { validator: validateType, trigger: 'blur' }],
          certDate: [{ required: true, message: '必填项不能为空' }]
        },
        rule2: {
          productionDate: [{ required: true, message: '必填项不能为空' }]
        },
        loading: false,
        showTable: false,
        showModal: false,
        indexName: 'm1',
        title: '新增技术档案',
        page: 1,
        limit: 10,
        total: 0,
        tableData: [],
        area: [],
        list: '',
        clearTableSelect: false,
        columns: [
          {
          title: '档案号', key: 'recordNo', sortable: true, minWidth: 100
        },
          { title: '车牌号', key: 'plateNum', sortable: true, minWidth: 100 },
          {
            title: '车牌颜色', key: 'plateColor', sortable: true, minWidth: 105,
            render: (h, params) => h('span', this.getName(this.colorList, params.row.plateColor))
          },
          { title: '所属运输企业', key: 'corpName', sortable: true, minWidth: 130 },
          {
            title: '车辆类型', key: 'vehicleType', sortable: true, minWidth: 105,
            render: (h, params) => h('span', this.getName(this.cartList, params.row.vehicleType))
          },
          { title: '驾驶员', key: 'unitName', sortable: true, minWidth: 105 },
          {
            title: '预警状态', key: 'warnType', sortable: true, minWidth: 105,
            render: (h, params) => h('span', this.getName(this.warnList, params.row.warnType))
          },
          { title: '发证日期', key: 'certDate', sortable: true, minWidth: 110 },
          { title: '上次维修时间', key: 'lastRepairDate', sortable: true, minWidth: 130 },
          { title: '上次评定时间', key: 'lastCheckDate', sortable: true, minWidth: 130 },
          {
            title: '营运状态', key: 'status', sortable: true, minWidth: 105,
            render: (h, params) => h('span', this.getName(this.manageList, params.row.status))
          }
        ],
        search: {
          PLATE_COLOR_eq: '0',
          VEHICLE_TYPE_eq: '0',
          WARN_TYPE_eq: '0',
          STATUS_eq: '0',
          PLATE_NUM_lk: '',
          RECORD_NO_lk: '',
          IS_SINGLE_eq: '0'
        },
        colorList: [
          { code: '0', name: '全部' },
          { code: '10061001', name: '黄' },
          { code: '10061002', name: '蓝' },
          { code: '10061003', name: '白' },
          { code: '10061004', name: '黑' }
        ],
        colorList2: [
          { code: '0', name: '请选择' },
          { code: '10061001', name: '黄' },
          { code: '10061002', name: '蓝' },
          { code: '10061003', name: '白' },
          { code: '10061004', name: '黑' }
        ],
        cartList: [
          { code: '0', name: '全部' },
          { code: '10071001', name: '出租车' },
          { code: '10071002', name: '普通货运' },
          { code: '10071003', name: '危险货运' },
          { code: '10071004', name: '客运班车' },
          { code: '10071005', name: '旅游包车' },
          { code: '10071006', name: '教练车' }
        ],
        cartList2: [
          { code: '0', name: '请选择' },
          { code: '10071001', name: '出租车' },
          { code: '10071002', name: '普通货运' },
          { code: '10071003', name: '危险货运' },
          { code: '10071004', name: '客运班车' },
          { code: '10071005', name: '旅游包车' },
          { code: '10071006', name: '教练车' }
        ],
        warnList: [
          { code: '0', name: '全部' },
          { code: '10171001', name: '已逾期' },
          { code: '10171002', name: '即将逾期' },
          { code: '10171003', name: '未提交维护计划' },
          { code: '10171004', name: '不存在维修记录' },
          { code: '10171005', name: '正在维修' }
        ],
        manageList: [
          { code: '0', name: '全部' },
          { code: '10081001', name: '营运' },
          { code: '10081002', name: '停运' }
        ],
        manageList2: [
          { code: '0', name: '请选择' },
          { code: '10081001', name: '营运' },
          { code: '10081002', name: '停运' }
        ],
        unitList: [
          { code: '0', name: '全部' },
          { code: '10041001', name: '是' },
          { code: '10041002', name: '否' }
        ],
        unitList2: [
          { code: '0', name: '请选择' },
          { code: '10041001', name: '是' },
          { code: '10041002', name: '否' }
        ],
        fuelList: [
          { code: '0', name: '请选择' },
          { code: '10111001', name: '汽油' },
          { code: '10111002', name: '柴油' },
          { code: '10111003', name: '天然气' },
          { code: '10111004', name: '电力' },
          { code: '10111005', name: '混合动力' }
        ],
        arrangeList: [
          { code: '0', name: '请选择' },
          { code: '2+2', name: '2+2' },
          { code: '2+1', name: '2+1' },
          { code: '1+1+1', name: '1+1+1' },
          { code: '1+1', name: '1+1' }
        ],
        letList: [
          { code: '0', name: '请选择' },
          { code: '国II', name: '国II' },
          { code: '国III', name: '国III' }
        ],
        //变速器选项...
        shiftingList: [
          { code: '0', name: '请选择' },
          { code: '自动', name: '自动' },
          { code: '手动', name: '手动' },
          { code: '手自动一体化', name: '手自动一体化' }
        ],
        //缓速器...
        slowList: [
          { code: '0', name: '请选择' },
          { code: '电磁式', name: '电磁式' },
          { code: '液力式', name: '液力式' }
        ],
        //转向器...
        turnList: [
          { code: '0', name: '请选择' },
          { code: '动力转向', name: '动力转向' },
          { code: '非动力转向', name: '非动力转向' }
        ],
        //制动....
        brakeList: [
          { code: '0', name: '请选择' },
          { code: '气', name: '气' },
          { code: '液', name: '液' },
          { code: '气-液', name: '气-液' }
        ],
        //车辆基本信息...
        formData: {},
        storeData: {
          'corpName': '',
          'transCorpId': '',
          'plateNum': '',
          'plateColor': '0',
          'vehicleType': '0',
          'vender': '',
          'brand': '',
          'xm': '',
          'loadCertNum': '',
          'certDate': '',
          'status': '0',
          'county': '0',
          'fuelType': '0',
          'chassisNum': '',
          'engineNum': '',
          'useType': '',
          'tonnage': '',
          'seat': '',
          'checkDate': '',
          'firstMileage': 0,
          'lastRepairDate': '',
          'lastCheckDate': '',
          'unitName': '',
          'regDate': '',
          'single': '0',
          'ownerName': '',
          'ownerPhone': '',
          'drivingLicensePic': '',
          'tradingCardPic': '',
          'trafficPermitPic': '',
          'guaranteeSlipPic': '',
          'vehicleId': ''
        },
        formData2: {},
        storeData2: {
          'axleNumber': 0,
          'brakeType': '',
          'brandModel': '',
          'busLevel': '',
          'driveType': '',
          'emissionStandard': '',
          'engineBrand': '',
          'engineDisplacement': 0,
          'enginePower': 0,
          'headlightType': '',
          'occupantNumber': 0,
          'productionDate': '',
          'productionPlace': '',
          'qtpz': '',
          'retarder': '',
          'seatArrangement': '0',
          'steeringGear': '',
          'suspensionType': '',
          'totalMass': 0,
          'tractionMass': 0,
          'transmissionType': '',
          'tyreNumber': 0,
          'vehicleDimensions': '',
          'vehicleId': '',
          'paramId': ''
        },
        //车辆技术参数......
        img1: [],
        img2: [],
        img3: [],
        img4: []

      }
    },
    computed: {
      canDo() {
        return this.list == ''
      },
      canEdit() {
        return this.formData.vehicleId == ''
      },
      canDo3() {
        return this.select3.length == 0
      },
      canDo4() {
        return this.select4.length == 0
      },
      canDo5() {
        return this.select5.length == 0
      },
      canDo6() {
        return this.select6.length == 0
      }
    },
    watch:{
      'formData.certDate'(val){
        console.log(val);
      }
    },
    mounted() {
      this.getList()
      this.getAreaList()
    },
    methods: {
      getDriver(id) {
        //获取驾驶员登记
        this.$axios.post('/manage/vehicle/driver/list', {
          pageNo: 1,
          pageSize: 10,
          vehicleId: id
        }).then((res) => {
          this.tableData6 = []
          for (let i = 0; i < res.data.items.length; i++) {
            res.data.items[i]['xid'] = i
            res.data.items[i].dimissionTime = new Date(res.data.items[i].dimissionTime)
            res.data.items[i].entryTime = new Date(res.data.items[i].entryTime)
            this.tableData6.push(res.data.items[i])
          }
        })
      },
      getChange(id) {
        //获取变更记录.....
        ///manage/vehicle/vehiclebase/changeList
        this.$axios.post('/manage/vehicle/change/list', {
          pageNo: 1,
          pageSize: 10,
          vehicleId: id
        }).then((res) => {
          this.tableData3 = []
          for (let i = 0; i < res.data.items.length; i++) {
            res.data.items[i]['xid'] = i
            res.data.items[i].changeDate = new Date(res.data.items[i].changeDate)
            this.tableData3.push(res.data.items[i])
          }
        })
      },
      getAccident(id) {
        this.$axios.post('/manage/vehicle/accident/list', {
          pageNo: 1,
          pageSize: 10,
          vehicleId: id
        }).then((res) => {
          this.tableData5 = []
          for (let i = 0; i < res.data.items.length; i++) {
            res.data.items[i]['xid'] = i
            res.data.items[i].accidentDate = new Date(res.data.items[i].accidentDate)
            this.tableData5.push(res.data.items[i])
          }
        })
      },
      getUseRecord(id) {
        //车辆使用登记...
        this.$axios.post('/manage/vehicle/uses/list', {
          pageNo: 1,
          pageSize: 10,
          vehicleId: id
        }).then((res) => {
          this.tableData4 = []
          for (let i = 0; i < res.data.items.length; i++) {
            res.data.items[i]['xid'] = i
            res.data.items[i].usesTime = new Date(res.data.items[i].usesTime)
            this.tableData4.push(res.data.items[i])
          }
        })
      },
      edit() {
        // this.indexName = "m1";
        // this.$refs.formData.resetFields()
        this.formData = {};
        this.formData = deepClone(this.list)

        this.formData.plateColor = this.formData.plateColor || '0'
        this.formData.vehicleType = this.formData.vehicleType || '0'
        this.formData.status = this.formData.status || '0'
        this.formData.county = this.formData.county || '0'
        this.formData.fuelType = this.formData.fuelType || '0'
        this.formData.single = this.formData.single || '0'
        //查询车辆技术参数
        this.getParameter(this.list.vehicleId)
        //获取变更记录....
        this.getChange(this.list.vehicleId)
        //获取车辆使用记录....
        this.getUseRecord(this.list.vehicleId)
        //获取交通事故...
        this.getAccident(this.list.vehicleId)
        //查询车辆驾驶员...
        this.getDriver(this.list.vehicleId)
        this.imgData1 = this.toObj(this.list.drivingLicensePic.split(';'))
        this.imgData2 = this.toObj(this.list.tradingCardPic.split(';'))
        this.imgData3 = this.toObj(this.list.trafficPermitPic.split(';'))
        this.imgData4 = this.toObj(this.list.guaranteeSlipPic.split(';'))
        //img
        this.img1 = this.toObj(this.list.drivingLicensePic.split(';'))
        this.img2 = this.toObj(this.list.tradingCardPic.split(';'))
        this.img3 = this.toObj(this.list.trafficPermitPic.split(';'))
        this.img4 = this.toObj(this.list.guaranteeSlipPic.split(';'))
        this.showModal = true
      },
      toObj(arr) {
        let data = []
        for (let i in arr) {
          if (arr[i] != '') {
            data.push({ url: arr[i] })
          }
        }
        return data
      },
      getParameter(id) {
        ///manage/vehicle/vehiclebase/vehicleParam
        this.$axios.get('/manage/vehicle/param/get/' + id).then((res) => {
          this.formData2 = res.data.item || deepClone(this.storeData2)
          // console.log(JSON.stringify(res.data.item));
        })
      },
      changeSelect3(row) {
        this.select3 = row
      },
      changeSelect4(row) {
        this.select4 = row
      },
      changeSelect5(row) {
        this.select5 = row
      },
      changeSelect6(row) {
        this.select6 = row
      },
      add3() {
        let xid = ''
        if (this.tableData4.length == 0) {
          xid = 0
        } else {
          xid = this.tableData4[this.tableData4.length - 1].xid + 1
        }
        this.tableData3.push({ xid: xid, changeDate: '', changeReason: '', changeItem: '' })
      },
      del3() {
        for (let i in this.select3) {
          for (let a in this.tableData3) {
            if (this.select3[i].xid == this.tableData3[a].xid) {
              this.tableData3.splice(a, 1)
              break
            }
          }
        }
        this.select3 = []
      },
      add4() {
        let xid = ''
        if (this.tableData4.length == 0) {
          xid = 0
        } else {
          xid = this.tableData4[this.tableData4.length - 1].xid + 1
        }
        this.tableData4.push({
          xid: xid,
          deficit: 0,
          driverName: '',
          fuelConsumption: 0,
          intervalMileage: 0,
          mileage: 0,
          quota: 0,
          surplus: 0,
          useUnit: '',
          usesTime: ''
        })
      },
      del4() {
        for (let i in this.select4) {
          for (let a in this.tableData4) {
            if (this.select4[i].xid == this.tableData4[a].xid) {
              this.tableData4.splice(a, 1)
              break
            }
          }
        }
        this.select4 = []
      },
      add5() {
        let xid = ''
        if (this.tableData5.length == 0) {
          xid = 0
        } else {
          xid = this.tableData5[this.tableData5.length - 1].xid + 1
        }
        this.tableData5.push({
          xid: xid,
          accidentAddr: '',
          accidentDate: '',
          accidentDescription: '',
          accidentNature: '',
          accidentRegistrant: '',
          accidentResponsibility: '',
          economicLosses: 0
        })
      },
      del5() {
        for (let i in this.select5) {
          for (let a in this.tableData5) {
            if (this.select5[i].xid == this.tableData5[a].xid) {
              this.tableData5.splice(a, 1)
              break
            }
          }
        }
        this.select5 = []
      },
      add6() {
        let xid = ''
        if (this.tableData6.length == 0) {
          xid = 0
        } else {
          xid = this.tableData6[this.tableData6.length - 1].xid + 1
        }
        this.tableData6.push({
          xid: xid,
          accidentRecord: '',
          certificateNum: '',
          certificateType: '',
          dimissionTime: '',
          driverName: '',
          entryTime: '',
          idNum: '',
          illegalRecord: '',
          licenceNum: '',
          licenceType: '',
          otherComplaints: '',
          safeMileage: 0
        })
      },
      del6() {
        for (let i in this.select6) {
          for (let a in this.tableData6) {
            if (this.select6[i].xid == this.tableData6[a].xid) {
              this.tableData6.splice(a, 1)
              break
            }
          }
        }
        this.select6 = []
      },
      changeOk(res) {
        this.formData.corpName = res.corpName
        this.formData.transCorpId = res.corpId
      },
      visibleChange() {
        this.clear()
      },
      addPost(name, code) {
        switch (code) {
          case 1:
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.$Modal.confirm({
                  title: '系统提示', content: '确认保存吗?', onOk: () => {
                    console.log(this.formData.certDate);
                    let formData = deepClone(this.formData)
                    formData.drivingLicensePic = this.pjUrl(this.img1)
                    formData.firstMileage = this.formData.firstMileage || 0
                    formData.tradingCardPic = this.pjUrl(this.img2)
                    formData.trafficPermitPic = this.pjUrl(this.img3)
                    formData.guaranteeSlipPic = this.pjUrl(this.img4)
                    //0转空....
                    formData.plateColor = this.formData.plateColor == 0 ? '' : this.formData.plateColor
                    formData.vehicleType = this.formData.vehicleType == 0 ? '' : this.formData.vehicleType
                    formData.status = this.formData.status == 0 ? '' : this.formData.status
                    formData.county = this.formData.county == 0 ? '' : this.formData.county
                    formData.fuelType = this.formData.fuelType == 0 ? '' : this.formData.fuelType
                    formData.single = this.formData.single == 0 ? '' : this.formData.single
                    if(typeof(formData.certDate)=='string'){
                      formData.certDate =  new Date(formData.certDate);
                    }
                    if(typeof(formData.checkDate)=='string'){
                      formData.checkDate =  new Date(formData.checkDate);
                    }
                    if(typeof(formData.lastCheckDate)=='string'){
                      formData.lastCheckDate =  new Date(formData.lastCheckDate);
                    }
                    if(typeof(formData.lastRepairDate)=='string'){
                      formData.lastRepairDate =  new Date(formData.lastRepairDate);
                    }
                    if(typeof(formData.regDate)=='string'){
                      formData.regDate =  new Date(formData.regDate);
                    }
                     //xieruixiang
                    this.$axios.post('/manage/vehicle/base/save', formData).then((res) => {
                      if (res.data.code == '0') {
                        if (this.formData.vehicleId == '') {
                          this.$Message.success('新增成功')
                          this.formData.vehicleId = res.data.id
                        } else {
                          this.$Message.success('修改成功')
                        }
                        this.getList()
                      }
                    })
                  }
                })
              } else {
                this.$Message.error('请校对红框信息')
              }
            })
            break
          case 2:
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.formData2.vehicleId = this.formData.vehicleId
                this.$Modal.confirm({
                  title: '系统提示', content: '确认保存吗?', onOk: () => {
                    //inputNumber null 过滤....
                    this.formData2.axleNumber = this.formData2.axleNumber || 0
                    this.formData2.engineDisplacement = this.formData2.engineDisplacement || 0
                    this.formData2.enginePower = this.formData2.enginePower || 0
                    this.formData2.occupantNumber = this.formData2.occupantNumber || 0
                    this.formData2.totalMass = this.formData2.totalMass || 0
                    this.formData2.tractionMass = this.formData2.tractionMass || 0
                    this.formData2.tyreNumber = this.formData2.tyreNumber || 0
                    //0转空....
                    this.formData2.seatArrangement = this.formData2.seatArrangement == 0 ? '' : this.formData2.seatArrangement
                    this.formData2.emissionStandard = this.formData2.emissionStandard == 0 ? '' : this.formData2.emissionStandard
                    this.formData2.transmissionType = this.formData2.transmissionType == 0 ? '' : this.formData2.transmissionType
                    this.formData2.retarder = this.formData2.retarder == 0 ? '' : this.formData2.retarder
                    this.formData2.steeringGear = this.formData2.steeringGear == 0 ? '' : this.formData2.steeringGear
                    this.formData2.brakeType = this.formData2.brakeType == 0 ? '' : this.formData2.brakeType
                    this.$axios.post('/manage/vehicle/param/save', this.formData2).then((res) => {
                      if (res.data.code == '0') {
                        if (this.formData2.paramId == '') {
                          this.$Message.success('新增车辆技术成功')
                        } else {
                          this.$Message.success('修改车辆技术成功')
                        }
                        this.formData2.paramId = res.data.id
                      }
                    })
                  }
                })
              } else {
                this.$Message.error('请校对红框信息')
              }
            })
            break
          case 3:
            let data = { data: this.tableData3, vehicleId: this.formData.vehicleId }
            // let data = {data:this.tableData3,vehicleId:this.formData.vehicleId};
            this.$axios.post('/manage/vehicle/change/save', data).then((res) => {
              if (res.data.code == '0') {
                this.$Message.success('保存成功')
                this.getChange(this.formData.vehicleId)
              }
            })
            break
          case 4:
            for (let i in this.tableData4) {
              this.tableData4[i].mileage = this.tableData4[i].mileage || 0
              this.tableData4[i].intervalMileage = this.tableData4[i].intervalMileage || 0
              this.tableData4[i].fuelConsumption = this.tableData4[i].fuelConsumption || 0
              this.tableData4[i].quota = this.tableData4[i].quota || 0
              this.tableData4[i].surplus = this.tableData4[i].surplus || 0
              this.tableData4[i].deficit = this.tableData4[i].deficit || 0
            }
            let data3 = { data: this.tableData4, vehicleId: this.formData.vehicleId }
            this.$axios.post('/manage/vehicle/uses/save', data3).then((res) => {
              if (res.data.code == '0') {
                this.$Message.success('保存成功')
                this.getUseRecord(this.formData.vehicleId)
              }
            })
            break
          case 5:
            let data5 = { data: this.tableData5, vehicleId: this.formData.vehicleId }
            this.$axios.post('/manage/vehicle/accident/save', data5).then((res) => {
              if (res.data.code == '0') {
                this.$Message.success('保存成功')
                this.getAccident(this.formData.vehicleId)
              }
            })
            break
          case 6:
            let data6 = { data: this.tableData6, vehicleId: this.formData.vehicleId }
            this.$axios.post('/manage/vehicle/driver/save', data6).then((res) => {
              if (res.data.code == '0') {
                this.$Message.success('保存成功')
                this.getDriver(this.formData.vehicleId)
              }
            })
            break
        }
      },
      pjUrl(data) {
        let store = []
        for (let i in data) {
          store.push(data[i].url)
        }
        return store.join(';')
      },
      success1(res) {
        this.img1 = res
      },
      success2(res) {
        this.img2 = res
      },
      success3(res) {
        this.img3 = res
      },
      success4(res) {
        this.img4 = res
      },
      add() {
        this.indexName = 'm1'
        this.formData = deepClone(this.storeData)
        this.formData2 = deepClone(this.storeData2)
        this.imgData1 = []
        this.imgData2 = []
        this.imgData3 = []
        this.imgData4 = []
        this.tableData3 = []
        this.tableData4 = []
        this.tableData5 = []
        this.tableData6 = []
        this.$refs.formData.resetFields()
        this.showModal = true
      },
      del() {
        this.$Modal.confirm({
          title: '系统提示', content: '确认删除吗', onOk: () => {
            this.$axios.post('/manage/vehicle/base/delete', [this.list.vehicleId]).then((res) => {
              if (res.data.code == '0') {
                this.$Message.success('删除成功')
                this.getList()
              }
            })
          }
        })
      },
      clear() {
        this.list = ''
        this.clearTableSelect = Math.random()
      },
      rowClick(row) {
        this.list = row
      },
      getList() {
        this.loading = true
        this.clear()
        this.$axios.post('/manage/vehicle/base/list', {
          plateColor: this.search.PLATE_COLOR_eq == 0 ? '' : this.search.PLATE_COLOR_eq,
          vehicleType: this.search.VEHICLE_TYPE_eq == 0 ? '' : this.search.VEHICLE_TYPE_eq,
          warnType: this.search.WARN_TYPE_eq == 0 ? '' : this.search.WARN_TYPE_eq,
          status: this.search.STATUS_eq == 0 ? '' : this.search.STATUS_eq,
          plateNum: this.search.PLATE_NUM_lk,
          recordNo: this.search.RECORD_NO_lk,
          isSingle: this.search.IS_SINGLE_eq == 0 ? '' : this.search.IS_SINGLE_eq,
          pageNo: this.page,
          pageSize: this.limit
        }).then((res) => {
          if (res.data.code == '0') {
            this.total = res.data.total
            this.tableData = res.data.items
            this.loading = false
          }
        })
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
      },
      changePage(page) {
        this.page = page
        this.getList()
      },
      getName(data, code) {
        let name = ''
        for (let i in data) {
          if (data[i].code == code) {
            name = data[i].name
            break
          }
        }
        return name
      },
      getAreaList() {
        this.$axios.post('/area/region/list', {
          areaName: process.env.config.areaName
        }).then((res) => {
          if (res.data.code == '0') {
            this.area = res.data.items
            this.area.unshift({ regionCode: '0', shortName: '请选择' })
          }
        })
      }
    },

  }
</script>
