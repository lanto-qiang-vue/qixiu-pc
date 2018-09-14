package com.lanto.shqixiu.shwgm.controller.notice;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.TbNotice;
import com.lanto.shqixiu.shwgm.service.notice.TbNoticeService;


@Controller
@RequestMapping(value="manage/notice/tbnotice",produces = "text/html;charset=UTF-8")
public class TbNoticeController extends BaseCon{

	private Logger logger = Logger.getLogger(TbNoticeController.class);// 日志

	@Resource
	private TbNoticeService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request,"0");
			List list = service.getList(sList, pUnit);
			for(int i=0;i<list.size();i++){
				Map map=(Map)list.get(i);
				long sumNotice = (Long)map.get("SUM_NOTICE");
				long seeNum = (Long)map.get("SEE_NUM");
				long notSeeNum=sumNotice-seeNum;
				map.put("NOT_SEE_NUM", notSeeNum);
			}
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	@RequestMapping("list_ys")
	@ResponseBody
	public Object list_ys(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request,"1");
			List list = service.getList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}	
	@RequestMapping("resultList")
	@ResponseBody
	public Object resultList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String noticeId = CommonUtils.checkNull(request.getParameter("NOTICE_ID"));
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			sList.add(new SqlUnit("noticeId", " and NOTICE_ID = ? ", noticeId));
			List list = service.getResultList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}

	@RequestMapping("receiveInfo")
	@ResponseBody
	public Object receiveInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			String noticeId = CommonUtils.checkNull(request.getParameter("NOTICE_ID"));
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			sList.add(new SqlUnit("noticeId", " and NOTICE_ID = ? ", noticeId));
			List list = service.getReceiveInfo(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			String content = CommonUtils.checkNull(request.getParameter("content"));
			String sendto = CommonUtils.checkNull(request.getParameter("sendto"));
			ManageLoginInfo info = super.getManageLoginInfo();
			TbNotice po = json.getPojo(data, TbNotice.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getNoticeId())){
				service.update(po,content,info);
			}else{
				po.setCreateDate(new Date());
				po.setCreator(info.getUserCode());
				po.setDataFrom("维管平台政府端");
				po.setStatus("10291001");
				po.setSendTo(sendto);
				service.save(po,content,info);
			}
			return super.getOutData(po);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("send")
	@ResponseBody
	public Object send(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			String content = CommonUtils.checkNull(request.getParameter("content"));
			ManageLoginInfo info = super.getManageLoginInfo();
			TbNotice po = json.getPojo(data, TbNotice.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getNoticeId())){
				po.setSendBy(info.getUserName());
				po.setSendDate(new Date());
				po.setStatus("10291002");
				service.updateSend(po,content,info);
			}
			return super.getOutData(po);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}

	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	@RequestMapping("getContent")
	@ResponseBody
	public Object getContent(HttpServletRequest request,HttpServletResponse response) {
		try{
			String id = CommonUtils.checkNull(request.getParameter("NOTICE_ID"));
			byte[] data = service.getContent(id);
			String content = new String(data,"UTF-8");
			return super.getOutData(content);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取通知内容出错");
		}
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request,String sendto){
		String noticeTitle = CommonUtils.checkNull(request.getParameter("NOTICE_TITLE"));
		String sendBy = CommonUtils.checkNull(request.getParameter("SEND_BY"));
		String dataFrom = CommonUtils.checkNull(request.getParameter("DATA_FROM"));
		String creator = CommonUtils.checkNull(request.getParameter("CREATOR"));
		String isResult = CommonUtils.checkNull(request.getParameter("IS_RESULT"));
		String content = CommonUtils.checkNull(request.getParameter("CONTENT"));
		String status = CommonUtils.checkNull(request.getParameter("STATUS"));
		String sendDate_gte = CommonUtils.checkNull(request.getParameter("SEND_DATE_gte"));
		String sendDate_lte = CommonUtils.checkNull(request.getParameter("SEND_DATE_lte"));
		
		ManageLoginInfo info = super.getManageLoginInfo();
		sList.add(new SqlUnit("creator", " and CREATOR = ? ", info.getUserCode()));
		
		sList.add(new SqlUnit("sendto", " and  send_to=?",sendto ));
		
		if (!CommonUtils.isNullString(noticeTitle)){
			sList.add(new SqlUnit("noticeTitle", " and NOTICE_TITLE like ? ","%" + noticeTitle.trim() + "%"));
		}
		if (!CommonUtils.isNullString(sendBy)){
			sList.add(new SqlUnit("sendBy", " and SEND_BY like ? ","%" + sendBy.trim() + "%"));
		}
		if (!CommonUtils.isNullString(dataFrom)){
			sList.add(new SqlUnit("dataFrom", " and DATA_FROM like ? ","%" + dataFrom.trim() + "%"));
		}
		if (!CommonUtils.isNullString(creator)){
			sList.add(new SqlUnit("creator", " and CREATOR like ? ","%" + creator.trim() + "%"));
		}
		if (!CommonUtils.isNullString(isResult)){
			sList.add(new SqlUnit("isResult", " and IS_RESULT like ? ","%" + isResult.trim() + "%"));
		}
		if (!CommonUtils.isNullString(content)){
			sList.add(new SqlUnit("content", " and CONTENT like ? ","%" + content.trim() + "%"));
		}
		if (!CommonUtils.isNullString(status)){
			sList.add(new SqlUnit("status", " and STATUS like ? ","%" + status.trim() + "%"));
		}
		if (!CommonUtils.isEmpty(sendDate_gte)){
			sList.add(new SqlUnit("sendDate", " and datediff(SEND_DATE,?) >= 0 ", sendDate_gte.trim() ));
		}
		if (!CommonUtils.isEmpty(sendDate_lte)){
			sList.add(new SqlUnit("sendDate", " and datediff(SEND_DATE,?) <= 0 ", sendDate_lte.trim() ));
		}
	}
}

