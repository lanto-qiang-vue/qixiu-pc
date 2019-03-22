<template>
<div>
  <butt-joint ref="butt"></butt-joint>
  <Modal
    v-model="schoolAgreementModal"
    title="合作协议"
    width="540"
    :closable="false"
    :transfer="false"
    :footer-hide="false"
    :mask-closable="false"
    :z-index="1000"
    :transition-names="['', '']">

    <div slot="footer">
      <Button type="success" @click="schoolAgreementAgree">同意协议</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import buttJoint from '~/components/extra/butt-joint.vue'
export default {
  name: "contacts-form",
  components: { buttJoint},
  data(){
    return {
      schoolAgreementModal: false
    }
  },
  computed:{
    buttShow(){
      return this.$store.state.app.butt.show
    }
  },
  watch:{
    buttShow(){
      this.showButt(this.$store.state.app.butt.data, this.$store.state.app.butt.type)
    }
  },
  mounted(){
    let roles= JSON.stringify(this.$store.state.user.userInfo.roles);
    // console.log('roles', roles)
    if(roles.indexOf('weixiuqiye')>=0) this.checkWeixiuButt();
    if(roles.indexOf('jiaxiao')>=0) this.checkJiaxiaoButt();
  },
  methods:{
    showButt(data, type){
      this.$refs.butt.show(data, type)
    },
    checkWeixiuButt(){
      this.$axios.get('/monitoring/config/company-docking/query/companyCode').then((res) => {
        if( !res.data.content || !res.data.content.length){
          this.showButt({}, 'weixiuqiye')
        }
      })
    },
    checkJiaxiaoButt(){
      this.$axios.$get('/training/sysuser/driving').then((res) => {
        console.log(res)
        if(res.agreement){

        }else{

        }
      })
    },
    schoolAgreementAgree(){

    },
  }
}
</script>

<style scoped>

</style>
