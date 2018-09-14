package com.lanto.shqixiu.shcheck.controller.sys;
//package com.armysoft.wgpt.controller.sys;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.annotation.Resource;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.apache.log4j.Logger;
//import org.snaker.engine.entity.WorkItem;
//import org.softbase.controller.BaseCon;
//import org.softbase.model.ClientLoginInfo;
//import org.softbase.utils.CommonUtils;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.armysoft.wgpt.common.WebCache;
//import com.armysoft.wgpt.model.bean.TreeNode;
//import com.armysoft.wgpt.service.sys.HomePageService;
//import com.armysoft.wgpt.util.Constant;
//
//
//@Controller
//@RequestMapping(value="client/sys/homepage",produces = "text/html;charset=UTF-8")
//public class HomePageController extends BaseCon{
//
//	private Logger logger = Logger.getLogger(HomePageController.class);// 日志
//
//	@Resource
//	private HomePageService service;
//	
//
//	@RequestMapping("getHomePage")
//	@ResponseBody
//	public Object getHomePage(HttpServletRequest request,HttpServletResponse response) {
//		try{
//			ClientLoginInfo info = super.getClientLoginInfo();
//			Map a = service.getAObject(info.getUserCode());
//			List listc = service.getCList(info.getUserCode());
//			List<WorkItem> listd = getTask(info);
////			List liste = service.getEList(info.getCorpId());
//			List listg = service.getGList();
//			//String c = toHtmlByC(listc,"OPERATE_CONTENT","OPERATE_TIME","");
//			TreeNode c = getTree();
//			String d = toHtmlByTask(listd,"name","time","");
//	//		String e = toHtmlByE(liste);
//			String g = toHtmlByG(listg);
//			Map data = new HashMap();
//			data.put("A", a);
//			data.put("C", c);
//			data.put("D", d);
//	//		data.put("E", e);
//			data.put("G", g);
//			return super.getOutData(data);
//		}catch(Exception e){
//			e.printStackTrace();
//			logger.error(e);
//			return super.getOutException(e,"查询出错");
//		}
//	}
//	
//	@RequestMapping("sya")
//	@ResponseBody
//	public Object sya(HttpServletRequest request,HttpServletResponse response) {
//		try{
//			ClientLoginInfo info = super.getClientLoginInfo();
//			List lista = service.getAList();
//			String a = toHtmlByA(lista,"CODE_DESC","CORP_COUNT","家");
//			return super.getOutData(a);
//		}catch(Exception e){
//			e.printStackTrace();
//			logger.error(e);
//			return super.getOutException(e,"查询出错");
//		}
//	}
//	
//	@RequestMapping("syc")
//	@ResponseBody
//	public Object syc(HttpServletRequest request,HttpServletResponse response) {
//		try{
//			TreeNode root = getTree();
//			return super.getOutData(root);
//		}catch(Exception e){
//			e.printStackTrace();
//			logger.error(e);
//			return super.getOutException(e,"查询出错");
//		}
//	}
//	
////	@RequestMapping("syc")
////	@ResponseBody
////	public Object syc(HttpServletRequest request,HttpServletResponse response) {
////		try{
////			ClientLoginInfo info = super.getClientLoginInfo();
////			List listc = service.getCList(info.getUserCode());
////			String c = toHtmlByC(listc,"OPERATE_CONTENT","OPERATE_TIME","");
////			return super.getOutData(c);
////		}catch(Exception e){
////			e.printStackTrace();
////			logger.error(e);
////			return super.getOutException(e,"查询出错");
////		}
////	}
//	
//	@RequestMapping("syd")
//	@ResponseBody
//	public Object syd(HttpServletRequest request,HttpServletResponse response) {
//		try{
//			ClientLoginInfo info = super.getClientLoginInfo();
//			List<WorkItem> listd = getTask(info);
//			String d = toHtmlByTask(listd,"name","time","");
//			return super.getOutData(d);
//		}catch(Exception e){
//			e.printStackTrace();
//			logger.error(e);
//			return super.getOutException(e,"查询出错");
//		}
//	}
//	
//	
//	
//	
//	@RequestMapping("getUnReNotice")
//	@ResponseBody
//	public Object getUnReNotice(HttpServletRequest request,HttpServletResponse response) {
//		try{
//			ClientLoginInfo info = super.getClientLoginInfo();
//			List list = service.getUnReNotice(info.getCorpId());
//			return super.getOutData(list);
//		}catch(Exception e){
//			e.printStackTrace();
//			logger.error(e);
//			return super.getOutException(e,"查询出错");
//		}
//	}
//	
//	@RequestMapping("syg")
//	@ResponseBody
//	public Object syg(HttpServletRequest request,HttpServletResponse response) {
//		try{
//			ClientLoginInfo info = super.getClientLoginInfo();
//			List listg = service.getGList();
//			String g = toHtmlByG(listg);
//			return super.getOutData(g);
//		}catch(Exception e){
//			e.printStackTrace();
//			logger.error(e);
//			return super.getOutException(e,"查询出错");
//		}
//	}
//	
//
//	
//	@RequestMapping("getContent")
//	@ResponseBody
//	public Object getContent(HttpServletRequest request,HttpServletResponse response) {
//		try{
//			String id = CommonUtils.checkNull(request.getParameter("NOTICE_ID"));
//			ClientLoginInfo info = super.getClientLoginInfo();
//			Map notice = service.getNoticeModel(id);
//			byte[] data = service.updateAndGetContent(id,info.getCorpId());
//			String content = new String(data,"UTF-8");
//			notice.put("content", content);
//			return super.getOutData(notice);
//		}catch(Exception e){
//			e.printStackTrace();
//			logger.error(e);
//			return super.getOutException(e,"获取通知内容出错");
//		}
//	}
//	
//	@RequestMapping("getInfoContent")
//	@ResponseBody
//	public Object getInfoContent(HttpServletRequest request,HttpServletResponse response) {
//		try{
//			String id = CommonUtils.checkNull(request.getParameter("INFO_ID"));
//			ClientLoginInfo info = super.getClientLoginInfo();
//			Map notice = service.getInfoModel(id);
//			byte[] data = service.getInfoContent(id);
//			String content = new String(data,"UTF-8");
//			notice.put("content", content);
//			return super.getOutData(notice);
//		}catch(Exception e){
//			e.printStackTrace();
//			logger.error(e);
//			return super.getOutException(e,"获取行业信息内容出错");
//		}
//	}
//	
//	@RequestMapping("getChartLine")
//	@ResponseBody
//	public Object getChartLine(HttpServletRequest request,HttpServletResponse response) {
//		try{
//			List list =service.getChartLine();
//			return super.getOutData(list);
//		}catch(Exception e){
//			e.printStackTrace();
//			logger.error(e);
//			return super.getOutException(e,"获取图表数据出错");
//		}
//	}
//	
//	private TreeNode getTree(){
//		ClientLoginInfo info = super.getClientLoginInfo();
//		Integer busCount1 = service.getBusCount1(info.getCorpId());
//		Integer busCount2 = service.getBusCount2(info.getCorpId());
//		
//		Integer proCount1 = service.getProCount1(info.getCorpId());
//		Integer proCount2 = service.getProCount2(info.getCorpId());
//		
//		String proSecure = service.getSecure(info.getCorpId());		
//		Integer proBase = service.getBase(info.getCorpId());	
//		
//		TreeNode root = new TreeNode("root","0","");
//		TreeNode busRoot = new TreeNode("<i class=\"icon-calendar bigger-120 blue\"></i> 维修业务检查","business","");
//		TreeNode busCheck = new TreeNode("<i class=\"icon-check bigger-120 blue\"></i> ( <font color=\"red\">" + busCount1 + "</font> )项待企业提交整改报告<a href=\"javascript:app.utils.ButtonUtils.viewCheck('business_1',1)\" style=\"color:#478fca;float:right;margin-right:20px;\"><i class=\"icon-double-angle-right bigger-120 blue\" ></i> 查看详情</a>","business_1","");
//		TreeNode busReform = new TreeNode("<i class=\"icon-time bigger-120 red\"></i> 其中有( <font color=\"red\">" + busCount2 + "</font> )项整改时间已超限<a href=\"javascript:app.utils.ButtonUtils.viewCheck('business_2',1)\"  style=\"color:#ff892a;float:right;margin-right:20px;\"><i class=\"icon-double-angle-right bigger-120 orange\" ></i> 查看详情</a>","business_2","");
//		busRoot.addChildren(busCheck);
//		busRoot.addChildren(busReform);
//		
//		TreeNode proRoot = new TreeNode("<i class=\"icon-calendar bigger-120 blue\"></i> 安全生产工作","product","");
//		TreeNode proCheck_1 = new TreeNode("<i class=\"icon-check bigger-120 blue\"></i> " +  "发现存在隐患，需按时完成整改<a href=\"javascript:app.utils.ButtonUtils.viewCheck('product_1',2)\"  style=\"color:#478fca;float:right;margin-right:20px;\"><i class=\"icon-double-angle-right bigger-120 blue\" ></i> 查看详情</a>","product_1","");
//		TreeNode proCheck_2 = new TreeNode("<i class=\"icon-check bigger-120 blue\"></i> 尚未填报( <font color=\"red\">" + proSecure + "</font> )月份事故隐患排查治理信息","product_2","");
//		proRoot.addChildren(proCheck_1);
//		proRoot.addChildren(proCheck_2);
//		
//		//proRoot.addChildren(proCheck_3);
//		if (proBase==0 ) {
//			TreeNode proCheck_3 = new TreeNode("<i class=\"icon-check bigger-120 blue\"></i> " +  "尚未填报企业安全生产基础信息","product_1","");						
//			proRoot.addChildren(proCheck_3);
//	    }
//
//		root.addChildren(busRoot);
//		root.addChildren(proRoot);
//		return root;
//	}
//	
//	private String toHtmlByA(List<Map> list,String fielda,String fieldb,String unit){
//		StringBuffer html = new StringBuffer();
//		html.append("<ul class=\"ListTitle\">");
//		for(Map item : list){
//			html.append("<li class=\"homepageli\" onmouseover=\"this.className='homepageli_haver'\" onmouseout=\"this.className='homepageli'\" title=\"" + CommonUtils.checkNull(item.get(fielda)) + "\"><span style=\"float:right\" title=\"" + CommonUtils.checkNull(item.get(fielda)) + "\"> " + CommonUtils.checkNull(item.get(fieldb)) + " " + unit + " </span> " +
//					"<div class=\"homelidiv\"><img src=\"images/index_24.png\" width=\"11\" height=\"11\"> " + CommonUtils.checkNull(item.get(fielda)) + "</div></li>");
//		}
//		html.append("</ul>");
//		html.append("<div id=\"syb-clearEl\" class=\"x-clear\" role=\"presentation\"></div>");
//		return html.toString();
//	}
//	
//	private String toHtmlByC(List<Map> list,String fielda,String fieldb,String unit) throws Exception{
//		StringBuffer html = new StringBuffer();
//		html.append("<ul class=\"ListTitle\">");
//		for(Map item : list){
//			html.append("<li class=\"homepageli\" onmouseover=\"this.className='homepageli_haver'\" onmouseout=\"this.className='homepageli'\" id=\"scrollMsg\" title=\"" + CommonUtils.checkNull(item.get(fielda)) + "\"><span style=\"float:right\" > " + CommonUtils.printDateTime(CommonUtils.parseDateTime(CommonUtils.checkNull(item.get(fieldb)))) + " " + unit + " </span> " +
//					"<div class=\"homelidiv\"><img src=\"images/index_24.png\" width=\"11\" height=\"11\"> " + CommonUtils.checkNull(item.get(fielda)) + "</div></li>");
//		}
//		html.append("</ul>");
//		html.append("<div id=\"syb-clearEl\" class=\"x-clear\" role=\"presentation\"></div>");
//		return html.toString();
//	}
//	
//	private String toHtmlByE(List<Map> list) throws Exception{
//		StringBuffer html = new StringBuffer();
//		html.append("<ul class=\"ListTitle attach\">");
//		for(Map item : list){
//			String isview = "<font color='red'>未查看</font>";
//			String is_view = CommonUtils.checkNull(item.get("IS_SEE"));
//			if(Constant.IF_TYPE_YES.equals(is_view)){
//				isview = "<font color='blue'>已查看</font>";
//			}
//			html.append("<li class=\"homepageli\" onmouseover=\"this.className='homepageli_haver'\" onmouseout=\"this.className='homepageli'\"  title=\"" + CommonUtils.checkNull(item.get("NOTICE_TITLE")) + "\"><span style=\"float:right\" > " + isview + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + CommonUtils.printDateTime(CommonUtils.parseDateTime(CommonUtils.checkNull(item.get("SEND_DATE")))) + " </span> " +
//					"<div class=\"homelidiv\"><img src=\"images/index_24.png\" width=\"11\" height=\"11\"> " +
//							"<a href=\"javascript:app.utils.ButtonUtils.viewNotice('" + item.get("NOTICE_ID") + "','" + item.get("NOTICE_TITLE") + "')\">" + item.get("NOTICE_TITLE") + "</a>" +
//					"</div></li>");
//		}
//		html.append("</ul>");
//		html.append("<div id=\"syb-clearEl\" class=\"x-clear\" role=\"presentation\"></div>");
//		return html.toString();
//	}
//	
//	private String toHtmlByG(List<Map> list) throws Exception{
//		StringBuffer html = new StringBuffer();
//		html.append("<ul class=\"ListTitle attach\">");
//		for(Map item : list){
//			html.append("<li class=\"homepageli\" onmouseover=\"this.className='homepageli_haver'\" onmouseout=\"this.className='homepageli'\" title=\"" + CommonUtils.checkNull(item.get("TITLE")) + "\"><span style=\"float:right\" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + CommonUtils.printDateTime(CommonUtils.parseDateTime(CommonUtils.checkNull(item.get("CREATE_TIME")))) + " </span> " +
//					"<div class=\"homelidiv\"><img src=\"images/index_24.png\" width=\"11\" height=\"11\"> " +
//							"<a href=\"javascript:app.utils.ButtonUtils.viewInfo('" + item.get("INFO_ID") + "','" + item.get("TITLE") + "')\"> [ " + WebCache.getDictDescById(CommonUtils.checkNull(item.get("INFO_TYPE"))) + " ] " + CommonUtils.checkNull(item.get("TITLE"))  + "</a>" +
//					"</div></li>");
//		}
//		html.append("</ul>");
//		html.append("<div id=\"syb-clearEl\" class=\"x-clear\" role=\"presentation\"></div>");
//		return html.toString();
//	}
//	
//	private String toHtmlByTask(List<WorkItem> list,String fielda,String fieldb,String unit){
//		StringBuffer html = new StringBuffer();
//		html.append("<ul class=\"ListTitle attach\">");
//		for(WorkItem item : list){
//			html.append("<li class=\"homepageli\" onmouseover=\"this.className='homepageli_haver'\" onmouseout=\"this.className='homepageli'\" title=\"" + item.getProcessName() + " --> " + item.getTaskName() + " [" + item.getOrderNo() + "]" + "\"><span style=\"float:right\" title=\"" + item.getProcessName() + " --> " + item.getTaskName() + " [" + item.getOrderNo() + "]" + "\"> " + CommonUtils.checkNull(item.getTaskCreateTime()) + " " + unit + " </span> " +
//					"<div class=\"homelidiv\"><img src=\"images/index_24.png\" width=\"11\" height=\"11\"> " +
//					"<a href=\"javascript:app.utils.ButtonUtils.doTask('" + CommonUtils.checkNull(item.getTaskKey()) + "','" + 
//					CommonUtils.checkNull(item.getProcessName()) + "','" +
//					CommonUtils.checkNull(item.getTaskName()) + "','" +
//					CommonUtils.checkNull(item.getOrderId()) + "','" +
//					CommonUtils.checkNull(item.getInstanceUrl()) + "');\" >" +
//					item.getProcessName() + " --> " + item.getTaskName() + " [<font color='#4f99c6'>" + item.getOrderNo() + "</font>]" + "</a></div></li>");
//		}
//		html.append("</ul>");
//		html.append("<div id=\"syb-clearEl\" class=\"x-clear\" role=\"presentation\"></div>");
//		return html.toString();
//	}
//
//}
//
