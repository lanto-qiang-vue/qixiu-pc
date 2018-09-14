package com.lanto.shqixiu.shwgm.controller.trans.notice;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.TransLoginInfo;
import org.softbase.model.TransLoginInfo;
import org.softbase.model.TransLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.TbNoticeResult;
import com.lanto.shqixiu.shwgm.service.trans.notice.TbTransNoticeReceiveService;
import com.lanto.shqixiu.shwgm.util.Constant;


@Controller
@RequestMapping(value="trans/notice/tbnoticereceive",produces = "text/html;charset=UTF-8")
public class TbTransNoticeReceiveController extends BaseCon{

	private Logger logger = Logger.getLogger(TbTransNoticeReceiveController.class);// 日志

	@Resource
	private TbTransNoticeReceiveService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	@RequestMapping("getContent")
	@ResponseBody
	public Object getContent(HttpServletRequest request,HttpServletResponse response) {
		try{
			String id = CommonUtils.checkNull(request.getParameter("NOTICE_ID"));
			TransLoginInfo info = super.getTransLoginInfo();
			byte[] data = service.updateAndGetContent(id,info.getCorpId());
			String content = new String(data,"UTF-8");
			return super.getOutData(content);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取通知内容出错");
		}
	}
	
	@RequestMapping("saveResult")
	@ResponseBody
	public Object saveResult(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TransLoginInfo info = super.getTransLoginInfo();
			TbNoticeResult po = json.getPojo(data, TbNoticeResult.class);
			po.setIsAlreadResult(Constant.IF_TYPE_YES);
			po.setResultBy(info.getCorpName());
			po.setResultByCode(info.getCorpId());
			po.setResultDate(new Date());
			po.setResultType("10021002");
			service.saveResult(po);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存回执信息出错");
		}
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String noticeTitle = CommonUtils.checkNull(request.getParameter("NOTICE_TITLE"));
		String sendBy = CommonUtils.checkNull(request.getParameter("SEND_BY"));
		String dataFrom = CommonUtils.checkNull(request.getParameter("DATA_FROM"));
		String creator = CommonUtils.checkNull(request.getParameter("CREATOR"));
		String isResult = CommonUtils.checkNull(request.getParameter("IS_RESULT"));
		String content = CommonUtils.checkNull(request.getParameter("CONTENT"));
		String status = CommonUtils.checkNull(request.getParameter("STATUS"));
		String sendDate_gte = CommonUtils.checkNull(request.getParameter("SEND_DATE_gte"));
		String sendDate_lte = CommonUtils.checkNull(request.getParameter("SEND_DATE_lte"));
		
		TransLoginInfo info = super.getTransLoginInfo();
		sList.add(new SqlUnit("RESULT_BY_CODE", "", info.getCorpId()));
		sList.add(new SqlUnit("ACTOR_ID", "", info.getCorpId()));
		sList.add(new SqlUnit("actorId", " and ACTOR_ID in (?,?) ", info.getCorpId()));
		sList.add(new SqlUnit("actorId", "", "all"));

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

