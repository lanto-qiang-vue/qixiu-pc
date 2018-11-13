<template>
  <cdf-question-list :flag="true"></cdf-question-list>
</template>

<script>
  import CdfQuestionList from '~/components/cdf-question-list.vue'
	export default {
		name: "cdf",
    	layout: 'common',
    components: {
      CdfQuestionList,
    },
		data () {
			return {
				form: {
					userName: '',
					password: ''
				},
				single: false,
                isAnonymous:'是',//是否匿名
                selectP:'',//
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: ''

			}
		},
		methods: {
			handleSubmit(){

			},
		}
	}
</script>

<style scoped lang="less">
.problem {
    width: 1000px;
    min-height: 752px;
    margin: 10px auto;
    overflow: hidden;
}
/*--------------左边样式------------*/
.problem_l{
	width: 690px;
	height: 100%;
	border: 1px solid #d4d4d4;
	float: left;
	background:#FFFFFF;
	padding-left: 10px;
	padding-right: 10px;
}
.pro_t{
	height: 52px;
	border-bottom: 2px solid #4ba7f5;
	line-height: 52px;
}


.pro_t .wenti{
	/*background:url(../images/w.png) no-repeat left center;*/
	padding-left: 26px;
	font-size: 16px;
	color: #4ba7f5;
	float: left;
}

.pro_t .quest{
	/*background:url(../images/w.png) no-repeat left center;*/
	padding-left: 26px;
	font-size: 16px;
	color: #4ba7f5;
	float: left;
}

.pro_t .weizhi{
	float: right;
	color: #999;
}

.pro_t .weizhi a{
	color: #4ba7f5;
}

.jianjie{
	width: 100%;
	overflow: hidden;
    padding: 0 20px;
	margin: 10px auto;
	border: 1px solid #ededed;
}
.consult .biaoge{

	height: 555px;
    overflow: auto;
}
.biaoge .question{

}
.biaoge .question a{
	display: block;
	padding: 10px;
	overflow: hidden;
	border-bottom: 1px solid #ededed;
}
.biaoge .question a:hover{
	background-color: #f4f4f4;
}
.biaoge .question a:hover p{
	color: #4ba7f5;
}
.biaoge .question a p{
	font-size: 16px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 40px;
	margin-bottom: 5px;
}
.biaoge .question a label{
	padding: 5px 10px;
	background-color: #f2c400;
	border-radius: 5px;
	font-size: 12px;
	color: white;
}
.biaoge .question a div>span{
	margin: 0 5px;
	color: #9595a1;
	font-size: 12px;
}

/*------------右边样式--------------*/
.problem_r{
	width: 280px;
	height: 100%;
	border: 1px solid #d4d4d4;
	float: right;
	overflow: hidden;
}
.problem_r>div{
	height: 365px;
	width: 280px;
	padding-left: 10px;
	padding-right: 10px;
	background:#FFFFFF;
}
.consult .hangye_t {
    height: 633px;
    width: 278px;
}
/*头部*/
.hangye_t .pro_t{
	height: 40px;
	line-height: 40px;
	font-size: 14px;
	border-bottom: 1px solid #eaeaea;
}
.problem .hangye_t .wenti{
	color: #020202;
}
.pro_t .weizhi {
    float: right;
    color: #999;
}
/*头部ending*/

/*尾部*/
.consult .consult_b{
	width: 100%;
	height: 593px;
	overflow: hidden;
}

.consult .consult_b .lb{
	width: 100%;
}

.consult .consult_b .lb li{
	height: 99px;
	width: 310px;
	border-bottom: 1px solid #eee;
	padding-top: 11px;
}

.consult .consult_b .lb .a1{
	width: 74px;
	height: 74px;
	border-radius:2px;
	float: left;
	border: 1px solid #eee;
}

.consult .consult_b .lb .a1 img{
	width: 70px;
	height: 75px;
	border-radius:2px;
	margin: 1px 0 0 1px;
}

.consult .consult_b .lb .lb_r{
	float: left;
	margin-left: 10px;
}

.consult .consult_b .lb_r .a2{
	/*background:url(../images/r.jpg) no-repeat left center;*/
	padding-left: 18px;
	color: #020202;
}

.consult .consult_b .a2 span{
	width: 16px;
	height: 16px;
	display: inline-block;
	/*background:url(../images/vip.png) no-repeat;*/
	margin-left:  5px;
}

.consult .consult_b p{
	margin-top: 5px;
	color: #c2c2c2;
	overflow: hidden;
    width: 170px;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.consult .consult_b .a3{
	width: 72px;
	height: 23px;
	border: 1px solid #eaeaea;
	text-align: center;
	line-height: 23px;
	font-size: 12px;
	color: #4ba7f5;
	display: block;
	margin-top: 6px;
	border-radius:2px;
}
/*尾部ending*/





</style>
<style lang="less">
  .problem{
      .ivu-form-item {
            margin-bottom: 12px;
            vertical-align: middle;

        }
  }
</style>
