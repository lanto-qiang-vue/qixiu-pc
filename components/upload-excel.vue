<template>
  <div>
    <Modal :transition-names="['', '']" v-model="show" :mask-closable="false" width="400" @on-cancel="uploadClose">
      <p slot="header">
        <span>{{title}}</span>
      </p>

      <div style="text-align: center;line-height: 24px;" v-show="exportNum.count">
        <h3>导入结果</h3>
        <p class="content">导入成功数：{{exportNum.count-exportNum.errorCount}}</p>
        <p class="content">导入失败数：{{exportNum.errorCount}}</p>
        <p class="content">导入失败行号：{{exportNum.errorRows}}</p>
      </div>
      <div style="text-align:left;">
        <Upload
          ref="upload"
          :before-upload="beforeUpload"
          :name="uploadName"
          :show-upload-list="false"
          :on-format-error="handleFormatError"
          :on-success="uploadSuccess"
          :headers="token"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          :format="['xls','xlsx','xlsm']"
          type="drag"
          :action="actionUrl">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <div style="clear:both;"></div>
            <p v-for="item in description">{{item.des}}</p>
          </div>
        </Upload>
        <div>{{filename}}</div>
      </div>
      <div slot="footer">
        <!--<Button type="success" @click="down" style="float:left;">下载模板</Button>-->
        <Button type="primary" @click="upload">确定</Button>
        <Button type="error" @click="uploadClose">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'upload-excel',
    data() {
      return {
        filename: '请选择文件',
        token: {token: ''},
        baseUrl: '',
        show: false,
        exportNum:{},//导入数量计算-----

      }
    },
    mounted() {
      this.token.token = this.$store.state.user.token
    },
    props: {
      type: {},//默认隐藏
      success: {
        type: String, default() {
          return ''
        }
      },//成功上传传递函数
      uploadName: {
        type: String, default() {
          return 'file'
        }
      },
      actionUrl: {
        type: String, default() {
          return '/tenant/basedata/ttcustomerfile/doImport'
        }
      },
      downUrl: {
        type: String, default() {
          return "/resources/excel/customer.xls"
        }
      },
      title: {
        type: String, default() {
          return '客户档案导入'
        }
      },
      description:{
        type:Array,
        default(){
          return [{des:'1、点击当前区域，找到您所要导入的Excel文件,请确保文件按照模板中导入说明的要求填写。'},{des:'2、选择好文件后, 点“确定”按钮完成导入'}];
        }
      }
    },
    watch: {
      type() {
        if(this.type != false) {
          this.filename = "请选择文件";
          this.show = true;
          this.exportNum={};
        }else{
          this.show = false;
        }
      }
    },
    methods: {
      handleFormatError() {
        this.$Notice.warning({
          title: '错误提示',
          desc: '只允许上传EXCEL文件'
        })
      },
      beforeUpload(files) {
        this.filename = files.name;
        this.file = files;
        return false;
      },
      upload() {
        if (this.filename == '请选择文件') {
          this.$Message.error('请选择文件');
          return;
        }
        this.$Spin.show();
        this.$refs.upload.post(this.file);
      },
      uploadClose() {
        this.show = false
      },
      uploadSuccess(res) {
        this.$Spin.hide();

        // console.log('upload 数据',res);
        if(res.code=="0"){
          this.exportNum=res.item;
        }else{
          this.$Message.error(res.status);
        }
        this.filename = "请选择文件";
      },
      down() {
        window.location.href =  this.downUrl;
      },
    }
  }
</script>
<style scoped lang="less">
  .content {
    width: 100%;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;
}

</style>
