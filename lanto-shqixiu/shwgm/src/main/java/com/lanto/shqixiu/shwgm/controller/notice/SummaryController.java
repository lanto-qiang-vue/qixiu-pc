package com.lanto.shqixiu.shwgm.controller.notice;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.TbAssociationSummary;
import com.lanto.shqixiu.shwgm.model.po.TgSysUser;
import com.lanto.shqixiu.shwgm.service.notice.SummaryService;


@Controller
@RequestMapping(value="notice/summary",produces = "text/html;charset=UTF-8")
public class SummaryController extends BaseCon{

	private Logger logger = Logger.getLogger(SummaryController.class);// 日志

	@Resource
	private SummaryService service;

	@RequestMapping("getinfo")
	@ResponseBody
	public Object getInfo(HttpServletRequest request,HttpServletResponse response) {
		try{	
			TbAssociationSummary po = new TbAssociationSummary();
			po.setId(1);
			po=service.getInfo(po);
			if(po!=null){
				return super.getOutData(json.toMap(po));
			}else{
				return super.getOutData(null);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"协会简介获取出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String summary = CommonUtils.checkNull(request.getParameter("SUMMARY"));
			String function = CommonUtils.checkNull(request.getParameter("FUNCTION"));
			TbAssociationSummary po = new TbAssociationSummary();
			po.setId(1);
			po.setSummary(summary);
			po.setFunction(function);
			TbAssociationSummary temp = new TbAssociationSummary();
			temp.setId(1);
			temp = service.getInfo(temp);
			ManageLoginInfo info=super.getManageLoginInfo();
			if(temp!=null){
				service.update(po, info);
			}else{
				service.save(po, info);
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"协会信息保存出错");
		}
	}
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

