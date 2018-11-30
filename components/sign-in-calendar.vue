<template>
  <Modal
    v-model="showModal"
    :mask-closable="false"
    title="签到详情"
    width="740px"
    :transfer="false"
    :footer-hide="false"
    :transition-names="['', '']">
    <div style="overflow: hidden;padding-bottom: 10px">
      <h1 style="text-align: center;margin-bottom: 10px">{{data.name}}</h1>
      <div id="calendar"></div>
    </div>
  </Modal>
</template>

<script>
  import { formatDate } from '@/static/tools.js'
	export default {
		name: "sign-in-calendar",
    props: ['data', 'show', 'type'],
    // head () {
    //   return {
    //     script: [
    //       { type: 'text/javascript', src: '/libs/calendar/simple-calendar.js'},
    //     ],
    //     link: [
    //       {rel:"stylesheet", href: '/libs/calendar/simple-calendar.css'}
    //     ]
    //   }
    // },
    data(){
		  return{
        showModal: false,
        myCalendar: null,
        records: {}
      }
    },
    watch:{
      show(){
        let month= formatDate(new Date(), 'yyyy-MM')
        this.createCalendar()
        this.records[month]=true
        this.query(month)
        this.showModal= true
      }
    },
    mounted(){
      $("head").append("<link rel='stylesheet'  href='/libs/calendar/simple-calendar.css'>")
      $.getScript('/libs/calendar/simple-calendar.js',()=>{
        this.createCalendar()
      });
    },
    methods:{
		  createCalendar(){
        this.myCalendar = new SimpleCalendar('#calendar',{
          width: '700px',
          height: '500px',
          showLunarCalendar: false, //阴历
          showHoliday: true, //休假
          showFestival: true, //节日
          showLunarFestival: true, //农历节日
          showSolarTerm: true, //节气
          showMark: true, //标记
          mark: {}
        });

        $("#calendar .sc-select-year, #calendar .sc-select-month").change( ()=> {
          let month= $("#calendar .sc-select-year").val()+"-"+this.numAdd0($("#calendar .sc-select-month").val())
          if(this.records[month]) return
          this.records[month]=true
          this.query(month)
        })
        $("#calendar .sc-yleft, #calendar .sc-yright, #calendar .sc-mleft, #calendar .sc-mright, #calendar .sc-return-today").click( ()=> {
          let month= $("#calendar .sc-select-year").val()+"-"+this.numAdd0($("#calendar .sc-select-month").val())
          if(this.records[month]) return
          this.records[month]=true
          this.query(month)
        })
      },
		  query(month){
        this.$axios.$post('/user/loginRecords/list/days', {
          "companyId": this.type=='company'? this.data.id : '',
          "userId": this.type=='company'? '' : this.data.id,
          "id": '',
          "loginMethod": "",
          "loginTime": month,
          "pageNo": 1,
          "pageSize": 31
        }).then( (res) => {
          if(res.code=='0'){
            let obj = {}, flag = 1
            for (let i = 1; i <= 31; i++) {
              let data = month + '-' + (Array(2).join(0) + i).slice(-2)
              for (let j in res.items) {
                if (data == res.items[j]) {
                  obj[this.dateRemove0(res.items[j])] =  this.type=='company'?'已签到': '有登录'
                  flag = 0
                }
              }
              flag = 1
            }
            console.log(obj)
            this.myCalendar.addMarks(obj, parseInt(month.split('-')[1]), month.split('-')[0])

          }
        })
      },
      dateRemove0(val) {
        let arr=val.split('-')
        return arr[0]+'-'+parseInt(arr[1])+'-'+parseInt(arr[2])
      },
      numAdd0(val) {
        return (Array(2).join(0) + parseInt(val)).slice(-2)
      }
    }
	}
</script>

<style scoped>

</style>
