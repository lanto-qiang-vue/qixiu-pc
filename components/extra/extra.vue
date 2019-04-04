<template>
<div>
  <butt-joint ref="butt"></butt-joint>
  <Modal
    v-model="schoolAgreementModal"
    title="合作协议"
    width="90"
    :closable="false"
    :transfer="false"
    :footer-hide="false"
    :mask-closable="false"
    :z-index="1000"
    class="table-modal-detail"
    :transition-names="['', '']">
    <div v-html="protocol"></div>
    <div slot="footer">
      <Button type="primary" @click="schoolAgreementAgree">同意协议</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import { signIn} from '~/static/util.js'
import buttJoint from '~/components/extra/butt-joint.vue'
export default {
  name: "contacts-form",
  components: { buttJoint},
  data(){
    return {
      schoolAgreementModal: false,
      protocol: ''
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
    if(this.$store.state.user.userInfo.roles){
      let roles= JSON.stringify(this.$store.state.user.userInfo.roles);
      // console.log('roles', roles)
      if(roles.indexOf('weixiuqiye')>=0) {
        this.sigin()
        this.checkWeixiuButt()
      }
      if(roles.indexOf('jiaxiao')>=0) this.checkJiaxiaoContacts();
    }
    
  },
  methods:{
    showButt(data, type){
      this.$refs.butt.show(data, type)
    },
    sigin(){
      signIn({
        route: this.$route,
        store: this.$store,
        $axios: this.$axios,
        Message: this.$Message,
        Modal: this.$Modal,
        Spin: this.$Spin
      }, ()=>{
        this.$router.replace({
          path: '/'
        })
      })
    },
    checkWeixiuButt(){
      this.$axios.get('/monitoring/config/company-docking/query/companyCode').then((res) => {
        if( res.data.content && !res.data.content.length){
          this.showButt(null, 'weixiuqiye')
        }
      })
    },
    checkJiaxiaoButt(){
      this.$axios.$get('/training/sysuser/driving').then((res) => {
        console.log(res)
        if(res.agreement){
          this.checkJiaxiaoContacts()
        }else{
          this.$axios.$post('/infopublic/detail/school-protocol').then((res) => {
            this.protocol= res.item.content
            this.schoolAgreementModal= true
          })
        }
      })
    },
    checkJiaxiaoContacts(){
      this.$axios.$get('/training/center/driving').then((res) => {
        console.log(res)
        if(!res.contactMobile){
          this.showButt(null, 'jiaxiao')
        }
      })
    },
    schoolAgreementAgree(){
      this.$axios.$put('/training/sysuser/agreement').then((res) => {
        if(res.code=='0'){
          this.schoolAgreementModal= false
          this.checkJiaxiaoContacts()
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
