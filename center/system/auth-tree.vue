<template>
  <div class="auth-tree">
    <div style="background:none;line-height:25px;">
      <div style="width:30%;text-align:left;float:left;">
        <div ref="abc" style="width:20px;height:20px;float:left;"></div>
        <div style="cursor:pointer;width:15px;height:15px;float:left;" @click="unfold">{{arrows}}</div>
        <div style="float:left">
          <Checkbox @on-change="onChange" :value="checked"></Checkbox>
        </div>
        <div style="float:left;cursor: pointer" @click="unfold">{{text}}</div>
      </div>
      <div class="middle" style="width:40%;float:left;text-align:left;" v-html="button"></div>
      <div style="width:30%;float:left;text-align:center;">
        <Dropdown trigger="custom" placement="bottom-start" :visible="visible" v-if="buttonShow"
                 @on-clickoutside="visible= false">
          <a :class="{gray: !checked}"  @click="clickDropdown" >
            <Icon type="ios-arrow-down"></Icon>选择权限
          </a>
          <DropdownMenu slot="list">
            <div style="text-align:left;margin:10px;max-height:300px;overflow:auto;">
              <div v-for="item in funcButton" :key="'checkbox-'+ item.id">
                <Checkbox @on-change="changeButton(item.id)" :value="item.selected" :disabled="!checked">
                  {{item.name}}</Checkbox>

              </div>
            </div>
          </DropdownMenu>
        </Dropdown>
        <slot name="level1" v-if="level==1"></slot>

      </div>
      <div style="clear:both;"></div>
    </div>
    <auth-tree v-for="item in data" :key="'role-'+item.id" :expand="item.expand"
               :text="item.name" :funcId="item.id" v-show="expand"
                :level="level+1" :data="item.children" :funcButton="item.functions" :checked="item.selected"
               @unfoldId="unfoldId" @pushButtonId="pushButtonId" @changeMenu="changeMenu"
               @spliceId="spliceId" @checkTrue="checkTrue" @pushIds="pushIds"
                 @checkFalse="checkFalse" ></auth-tree>
  </div>
</template>
<script>
  export default {
    name: "authTree",
    props: [ 'text', 'funcId', 'data', 'checked', 'level', 'expand', 'funcButton'],
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
        if (this.data && this.data.length) {
          this.$emit('unfoldId', this.funcId);
        }else{
          this.$emit('changeMenu', !this.checked, this.funcId);
        }

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
      clickDropdown(){
        if(this.checked){
          this.visible= !this.visible
        }
      },
      handleClose() {
        this.visible = false;
      },
      onChange(type) {
        // if (type) {
        //   this.$emit('checkTrue', this.funcId);
        //   this.$emit('pushIds', [this.funcId]);
        // } else {
        //   this.$emit('checkFalse', this.funcId);
        //   this.$emit('spliceId', [this.funcId]);
        // }
        this.$emit('changeMenu', type, this.funcId);
      },
      changeMenu(type, id){
        this.$emit('changeMenu', type, id);
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
        if (this.data && this.data.length) {
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
          if (data[i].selected ) {
            init += ( arrows+ '<span class="role-tag">' + data[i].name+'</span>');
            arrows = '&nbsp;|&nbsp;'
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

<style lang="less">
  .auth-tree{
    .middle{
      word-break: break-all;
      .role-tag{
          white-space: nowrap;
        }
    }
    .gray{
      color: #8e8e8e;
    }
  }

</style>
