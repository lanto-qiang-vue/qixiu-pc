package com.lanto.shqixiu.shwgm.controller.manage.sys;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.bean.DbRepairStandardBean;
import com.lanto.shqixiu.shwgm.model.bean.StandardTreeNode;
import com.lanto.shqixiu.shwgm.model.po.DbRepairStandard;
import com.lanto.shqixiu.shwgm.service.manage.sys.RepairStandardService;
import com.lanto.shqixiu.shwgm.util.excel.ExcelParseInterface;
import com.lanto.shqixiu.shwgm.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="manage/sys/repairstandard",produces = "text/html;charset=UTF-8")
public class RepairStandardController extends BaseCon{

	private Logger logger = Logger.getLogger(RepairStandardController.class);// 日志

	@Resource
	private RepairStandardService service;

	@RequestMapping("treelist")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			List<DbRepairStandardBean> data = service.getStandardTree();
			for(DbRepairStandardBean ds: data){
				if("1".equals(ds.getType())){
					ds.setIcon("images/menus/100202.png");
				}
				if("2".equals(ds.getType())){
					ds.setIcon("images/menus/1002.png");
				}
				if("3".equals(ds.getType())){
					ds.setIcon("images/menus/100904.png");
				}
			}
			DbRepairStandardBean root = new DbRepairStandardBean();
			root.setName("所有厂家");
			root.setType("0");
			root.setId(0);
			root.setIcon("images/menus/menu0.png");
			StandardTreeNode rootNode = new StandardTreeNode(root);
			rootNode = buildTree(rootNode,data);
			return super.getOutData(rootNode);
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
			DbRepairStandard po = json.getPojo(data, DbRepairStandard.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getId())){
				service.update(po);
			}else{
				po.setCreateDate(new Date());
				service.save(po);
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
	
	@RequestMapping("downloadTemple")
	@ResponseBody
	public Object downloadTemple(HttpServletRequest request,HttpServletResponse response){
		try {
			
			// 用于下载传参的集合
			List<List<String>> list = new LinkedList<List<String>>();
			
			//标题
			List<String> listHead = new LinkedList<String>();
			listHead.add("厂家");
			listHead.add("品牌");
			listHead.add("型号");
			listHead.add("维护周期(整数)");
			listHead.add("维护里程(整数)");
			list.add(listHead);
			// 导出的文件名
			String fileName = "车辆维修标准导入模板_" + CommonUtils.printDate("yyyyMMdd_HHmmss", new Date());
			
			ExcelWriterPoiWriter.writeExcel(list, fileName, fileName,response);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"下载模板出错");
		}
	}
	
	@RequestMapping("doImport")
	@ResponseBody
	public Object doImport(HttpServletRequest request,HttpServletResponse response){
		try {
			response.setContentType("text/html;charset=UTF-8");
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			MultipartFile file = multipartRequest.getFile("uploadFile");
			String fileName = file.getOriginalFilename();
			
			Map<String, Object> checkResult = service.checkExcelFile(file);
			List<Map<String, Object>> errorList = (List<Map<String, Object>>) checkResult.get("errorList");
			if(null != errorList && errorList.size() > 0) {
				Map out = new HashMap();
				out.put("returnValue", "1");
				out.put("errorList", errorList);
				return super.getOutData(out);
			}else {
				ExcelParseInterface parse = (ExcelParseInterface) checkResult.get("parse");	
				service.excelImportDB(parse);
				return super.getOutData(true);
			}
			
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"导入出错");
		}
	}
	
	@RequestMapping("doExport")
	@ResponseBody
	public Object doExport(HttpServletRequest request,HttpServletResponse response) {
		try{	
			List<Map<String, Object>> data = service.doExport();
			
			String[] title = { "厂家","品牌","型号","维护周期","维护里程"};
			String[] column = { "CJ_NAME","PP_NAME","NAME","REPAIR_CYCLE","REPAIR_MILEAGE"};
			
			String[] recolumn = {};
			
			String fileName = "车辆维护标准导出";
			if (data != null) {
				List<String> titleList = Arrays.asList(title);
				List<String> columnList = Arrays.asList(column);
				List<String> recolumnList = Arrays.asList(recolumn);
				ExcelWriterPoiWriter.writeExcel(titleList, data, fileName, fileName, columnList, null,recolumnList,response);
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"导出出错");
		}
		
	}
	
	private StandardTreeNode getTree(List<DbRepairStandardBean> list) throws Exception {
		if(list==null||list.size()<1)	return null;
		return buildTree(getRoot(list),list);
	}
	
	private StandardTreeNode buildTree(StandardTreeNode pnode, List<DbRepairStandardBean> nodes) throws Exception {
		List<StandardTreeNode> childs = new ArrayList<StandardTreeNode>();
		for( DbRepairStandardBean tmp : nodes ){
			if( pnode.getId().equals(tmp.getParId()) ){
				childs.add(new StandardTreeNode(tmp));
			}
		}
		
		if( childs.size()>0 ){
			pnode.setChildren(childs);
			for( StandardTreeNode ptmp : childs ){
				buildTree(ptmp, nodes);
			}
		}
		return pnode;
	}
	
	private StandardTreeNode getRoot(List<DbRepairStandardBean> list) {
		for (DbRepairStandardBean po : list){
			if(po.getId() == 10L){
				return new StandardTreeNode(po);
			}
		}
		return null;
	}
}

