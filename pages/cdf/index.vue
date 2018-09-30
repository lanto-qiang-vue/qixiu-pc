<template>

<div style="width:100%;height:100%;">
    <div class="problem consult">
            <div class="problem_l">
                    <div class="pro_t">
                        <span class="quest">车大夫门诊</span>
                        <span class="weizhi">我所在的位置：<a href="/index">首页</a> &gt; <span>车大夫门诊</span></span>
                        <input type="text" id="ctx" name="ctx" style="display:none;" value="">
                    </div>
                    <div class="jianjie">
                        <Form>
                            <FormItem style="width: 100%">
                               <p style="color: #4ba7f5;font-size: 16px;margin-top:12px; ">问题咨询</p>
                            </FormItem>
                            <FormItem style="width: 100%">
                                <Input type="textarea" placeholder="" :rows="3"/>
                            </FormItem>
                            <FormItem label="选择问题分类：">
                                <RadioGroup v-model="selectP" type="button">
                                    <Radio label="发动机"></Radio>
                                    <Radio label="变速箱"></Radio>
                                    <Radio label="空调"></Radio>
                                    <Radio label="传动转向"></Radio>
                                    <Radio label="车身车架"></Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="是否匿名：">
                                <RadioGroup v-model="isAnonymous">
                                    <Radio label="是"></Radio>
                                    <Radio label="否"></Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="上传图片：">
                                <Upload action="//jsonplaceholder.typicode.com/posts/">
                                    <Button icon="ios-cloud-upload-outline">添加图片</Button>
                                     <span>（仅支持jpg、png、bmp）</span>
                                </Upload>
                               
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="" style="float: right;">提交问题</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div class="pro_t">
                        <span class="wenti">问题集锦</span>
                        <span class="weizhi"><a href="/questSearch">查看更多&gt;&gt;</a></span>
                    </div>
                    <div class="jianjie">
                        <div class="biaoge">
                            <ul class="question" id="question">
                                <a href="/cdf/answerQuestion?id=369"> 
                                <p>请问专家，火花塞多少公里需要更换？</p>
                                <div><label>发动机</label><span>2018-09-27 11:46:22</span><span>13次查看</span></div>
                                </a>
                                <a href="/cdf/answerQuestion?id=369"> 
                                <p>请问专家，火花塞多少公里需要更换？</p>
                                <div><label>发动机</label><span>2018-09-27 11:46:22</span><span>13次查看</span></div>
                                </a>
                                <a href="/cdf/answerQuestion?id=369"> 
                                <p>请问专家，火花塞多少公里需要更换？</p>
                                <div><label>发动机</label><span>2018-09-27 11:46:22</span><span>13次查看</span></div>
                                </a>
                                <a href="/cdf/answerQuestion?id=369"> 
                                <p>请问专家，火花塞多少公里需要更换？</p>
                                <div><label>发动机</label><span>2018-09-27 11:46:22</span><span>13次查看</span></div>
                                </a>
                                
                            </ul>
                            <div style="margin: 5px auto;">
                                <Page  :total="1000" />
                            </div>
                            
			            </div>
                        
                    </div>
	        </div>


            <div class="problem_r">
                <div class="hangye_t">
                    <div class="pro_t">
                        <span class="wenti">问答专家团</span>
                        <span class="weizhi"><a href="/specialist">更多&gt;&gt;</a></span>
                    </div>
                    <div class="consult_b" id="expertlist">
                        <ul class="lb" id="expertlist1">
                            
                                <li>
                                    <a class="a1" href="/cdf/expert/1"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511880735373.jpg" alt=""></a>
                                    <div class="lb_r">
                                        <a class="a2" href="/cdf/expert/1">洪永楠<span></span></a>
                                        <p>高级技师 注册工程师</p>
                                        <a class="a3" href="/cdf/expert/1">向TA提问</a>
                                    </div>
                                </li>
                                <li>
                                    <a class="a1" href="/cdf/expert/1"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511880735373.jpg" alt=""></a>
                                    <div class="lb_r">
                                        <a class="a2" href="/cdf/expert/1">洪永楠<span></span></a>
                                        <p>高级技师注册工程师</p>
                                        <a class="a3" href="/cdf/expert/1">向TA提问</a>
                                    </div>
                                </li>
                                <li>
                                    <a class="a1" href="/cdf/expert/1"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511880735373.jpg" alt=""></a>
                                    <div class="lb_r">
                                        <a class="a2" href="/cdf/expert/1">洪永楠<span></span></a>
                                        <p>高级技师注册工程师</p>
                                        <a class="a3" href="/cdf/expert/1">向TA提问</a>
                                    </div>
                                </li>
                                <li>
                                    <a class="a1" href="/cdf/expert/1"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511880735373.jpg" alt=""></a>
                                    <div class="lb_r">
                                        <a class="a2" href="/cdf/expert/1">洪永楠<span></span></a>
                                        <p>高级技师注册工程师</p>
                                        <a class="a3" href="/cdf/expert/1">向TA提问</a>
                                    </div>
                                </li>
                            
                            
                        </ul>
                        <ul class="lb" id="expertlist2">
                            
                                <li>
                                    <a class="a1" href="/cdf/expert/1"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511880735373.jpg" alt=""></a>
                                    <div class="lb_r">
                                        <a class="a2" href="/cdf/expert/1">洪永楠<span></span></a>
                                        <p>高级技师注册工程师</p>
                                        <a class="a3" href="/cdf/expert/1">向TA提问</a>
                                    </div>
                                </li>
                                <li>
                                    <a class="a1" href="/cdf/expert/1"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511880735373.jpg" alt=""></a>
                                    <div class="lb_r">
                                        <a class="a2" href="/cdf/expert/1">洪永楠<span></span></a>
                                        <p>高级技师注册工程师</p>
                                        <a class="a3" href="/cdf/expert/1">向TA提问</a>
                                    </div>
                                </li>
                                <li>
                                    <a class="a1" href="/cdf/expert/1"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511880735373.jpg" alt=""></a>
                                    <div class="lb_r">
                                        <a class="a2" href="/cdf/expert/1">洪永楠<span></span></a>
                                        <p>高级技师注册工程师</p>
                                        <a class="a3" href="/cdf/expert/1">向TA提问</a>
                                    </div>
                                </li>
                                <li>
                                    <a class="a1" href="/cdf/expert/1"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511880735373.jpg" alt=""></a>
                                    <div class="lb_r">
                                        <a class="a2" href="/cdf/expert/1">洪永楠<span></span></a>
                                        <p>高级技师注册工程师</p>
                                        <a class="a3" href="/cdf/expert/1">向TA提问</a>
                                    </div>
                                </li>
                                <li>
                                    <a class="a1" href="/cdf/expert/1"><img src="https://static.shanghaiqixiu.org/images/2017/10/28/pic_1511880735373.jpg" alt=""></a>
                                    <div class="lb_r">
                                        <a class="a2" href="/cdf/expert/1">洪永楠<span></span></a>
                                        <p>高级技师注册工程师</p>
                                        <a class="a3" href="/cdf/expert/1">向TA提问</a>
                                    </div>
                                </li>

                        </ul>
                    </div>
                </div>
            </div>
    </div>

</div>
</template>

<script>
	export default {
		name: "cdf",
    	layout: 'common',
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
    width: 982px;
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
