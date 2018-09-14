package com.lanto.shqixiu.shwgm.controller.manage.credit;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.bean.ExamItemNode;
import com.lanto.shqixiu.shwgm.model.po.TbBdExamItem;
import com.lanto.shqixiu.shwgm.model.po.TbBdExamType;
import com.lanto.shqixiu.shwgm.service.manage.credit.TbBdExamItemService;


@Controller
@RequestMapping(value="manage/credit/tbbdexamitem",produces = "text/html;charset=UTF-8")
public class TbBdExamItemController extends BaseCon{

	private Logger logger = Logger.getLogger(TbBdExamItemController.class);// 日志

	@Resource
	private TbBdExamItemService service;

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
	
	@RequestMapping("getTree")
	@ResponseBody
	public Object getTree(HttpServletRequest request,HttpServletResponse response) {
		try{
			String VERSION_NO = CommonUtils.checkNull(request.getParameter("VERSION_NO"));
			String EXAM_TYPE = CommonUtils.checkNull(request.getParameter("EXAM_TYPE"));
			List<TbBdExamType> list = service.getTypeList(VERSION_NO,EXAM_TYPE);
			
			TbBdExamType type = new TbBdExamType();
			type.setTypeName("<font color='red'>" + VERSION_NO + "年度</font>" + WebCache.getDictDescById(EXAM_TYPE));
			ExamItemNode root = new ExamItemNode(type,null);
			List<ExamItemNode> children = new ArrayList<ExamItemNode>();
			for(TbBdExamType node : list){
				ExamItemNode ch = new ExamItemNode(node,"images/read.png");
				ch.setText(ch.getText() + "(<font color='blue'>" + ch.getTypeScore() + "</font>分)");
				children.add(ch);
			}
			root.setChildren(children);
			return super.getOutData(root);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"大项查询出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbBdExamItem po = json.getPojo(data, TbBdExamItem.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getItemId())){
				service.update(po);
			}else{
				service.save(po);
			}
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("saveType")
	@ResponseBody
	public Object saveType(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbBdExamType po = json.getPojo(data, TbBdExamType.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getTypeId())){
				service.updateType(po);
			}else{
				service.saveType(po);
			}
			return super.getOutData(json.toMap(po));
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
	
	@RequestMapping("deleteType")
	@ResponseBody
	public Object deleteType(HttpServletRequest request,HttpServletResponse response) {
		try{
			String typeId = CommonUtils.checkNull(request.getParameter("typeId"));
			service.deleteType(typeId);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String versionNo = CommonUtils.checkNull(request.getParameter("VERSION_NO"));
		String examType = CommonUtils.checkNull(request.getParameter("EXAM_TYPE"));
		String typeId = CommonUtils.checkNull(request.getParameter("TYPE_ID"));


		if (!CommonUtils.isNullString(versionNo)){
			sList.add(new SqlUnit("versionNo", " and VERSION_NO = ? ",versionNo.trim()));
		}
		if (!CommonUtils.isNullString(examType)){
			sList.add(new SqlUnit("examType", " and EXAM_TYPE = ? ",examType.trim()));
		}
		if (!CommonUtils.isNullString(typeId)){
			sList.add(new SqlUnit("typeId", " and TYPE_ID = ? ",typeId.trim()));
		}
	}
}

