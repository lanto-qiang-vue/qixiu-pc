package com.lanto.shqixiu.shwgm.controller.manage.publicservice;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

import com.lanto.shqixiu.shwgm.model.po.TbComplaint;
import com.lanto.shqixiu.shwgm.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgm.service.manage.publicservice.CommentManageService;
import com.lanto.shqixiu.shwgm.service.manage.publicservice.CommentService;
import com.lanto.shqixiu.shwgm.service.manage.publicservice.ComplaintService;
import com.lanto.shqixiu.shwgm.service.notice.InfoPublicService;


@Controller
@RequestMapping(value="manage/publicservice/comment",produces = "text/html;charset=UTF-8")
public class CommentController extends BaseCon{

	private Logger logger = Logger.getLogger(CommentController.class);// 日志

	@Resource
	private CommentService service;

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


	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			ManageLoginInfo info = super.getManageLoginInfo();
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids,info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

