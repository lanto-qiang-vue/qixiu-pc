<template>
  <div>
    <div style="background:none;cursor: pointer;line-height:25px;">
      <div style="width:30%;text-align:left;float:left;">
        <div ref="abc" style="width:20px;height:20px;float:left;"></div>
        <div style="cursor:pointer;width:15px;height:15px;float:left;" @click="unfold">{{arrows}}</div>
        <div style="float:left">
          <Checkbox @on-change="onChange" :value="checked"></Checkbox>
        </div>
        <div style="float:left;" @click="unfold">{{text}}</div>
      </div>
      <div style="width:40%;float:left;text-align:left;" v-html="button"></div>
      <div style="width:30%;float:left;text-align:center;">
        <Dropdown trigger="custom" :visible="visible" @on-clickoutside="handleClose" v-if="buttonShow">
          <a href="javascript:void(0)" @click="handleOpen">
            <Icon type="ios-arrow-down"></Icon>
            选择权限
          </a>
          <DropdownMenu slot="list">
            <div style="text-align:left;margin:10px;max-height:300px;overflow:auto;">
              <div v-for="item in funcButton">
                <Checkbox @on-change="changeButton(item.BTN_ID)" :value="item.IS_CHECK == 1">
                  {{item.BTN_NAME}}</Checkbox>

              </div>
            </div>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div style="clear:both;"></div>
    </div>
    <auth-tree v-for="item in data" :expand="item.expand" :indexId="0" :text="item.text" :funcId="item.funcId"
                v-show="expand"
                :level="level+1" :data="item.children" @spliceId="spliceId" :funcButton="item.funcButton"
                :checked="item.checked" @checkTrue="checkTrue" @pushIds="pushIds" @pushButtonId="pushButtonId"
                @unfoldId="unfoldId" @checkFalse="checkFalse"></auth-tree>
  </div>
</template>
<script>
  export default {
    name: "authTree",
    props: ['indexId', 'text', 'funcId', 'data', 'checked', 'level', 'expand', 'funcButton'],
    data() {
      return {
        visible: false,
      }
    },
    mounted() {
      this.$refs.abc.style.width = (this.level - 1) * 20 + "px";
    },
    methods: {
      unfold() {
        //展开控制
        this.$emit('unfoldId', this.funcId);
      },
      unfoldId(id) {
        this.$emit('unfoldId', id);
      },
      changeButton(id) {
        this.$emit('pushButtonId', {funcId: this.funcId, buttonId: id});
      },
      pushButtonId(row) {
        this.$emit('pushButtonId', row);
      },
      handleOpen() {
        this.visible = true;
      },
      handleClose() {
        this.visible = false;
      },
      onChange(type) {
        if (type) {
          this.$emit('checkTrue', this.funcId);
          this.$emit('pushIds', [this.funcId]);
        } else {
          this.$emit('checkFalse', this.funcId);
          this.$emit('spliceId', [this.funcId]);
        }
      },
      checkTrue(row) {
        this.$emit('checkTrue', row);
      },
      checkFalse(row) {
        this.$emit('checkFalse', row);
      },
      spliceId(ids) {
        ids.push(this.funcId);
        this.$emit('spliceId', ids);
      },
      pushIds(ids) {
        ids.unshift(this.funcId);
        this.$emit('pushIds', ids);
      },
    },
    computed: {
      arrows() {
        if (this.data) {
          if (this.expand) {
            return '▼';
          } else {
            return '▶';
          }
        } else {
          return '';
        }
      },
      button() {
        let init = '&nbsp;';
        let arrows = '';
        let data = this.funcButton;
        for (let i in data) {
          if (data[i].IS_CHECK == 1) {
            init += arrows + data[i].BTN_NAME;
            arrows = "<span style='color:blue'>&nbsp;|&nbsp;</span>";
          }
        }
        return init;
      },
      buttonShow() {
        if (this.funcButton) {
          if (this.funcButton.length == 0) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
    },
  }
</script>

<style scoped>

</style>
