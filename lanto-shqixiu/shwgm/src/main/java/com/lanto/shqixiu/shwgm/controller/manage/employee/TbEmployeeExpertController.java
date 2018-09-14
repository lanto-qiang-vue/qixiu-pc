package com.lanto.shqixiu.shwgm.controller.manage.employee;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

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

import com.lanto.shqixiu.shwgm.model.po.TbEmployeeExpert;
import com.lanto.shqixiu.shwgm.service.manage.employee.TbEmployeeExpertService;
import com.lanto.shqixiu.shwgm.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="manage/employee/tbemployeeexpert",produces = "text/html;charset=UTF-8")
public class TbEmployeeExpertController extends BaseCon{

	private Logger logger = Logger.getLogger(TbEmployeeExpertController.class);// 日志

	@Resource
	private TbEmployeeExpertService service;

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

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbEmployeeExpert po = json.getPojo(data, TbEmployeeExpert.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getExpertId())){
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
	
	
	
	@RequestMapping("doExport")
	@ResponseBody
	public Object doExport(HttpServletRequest request,HttpServletResponse response) {
		try{
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List<Map<String, Object>> data = service.doExport(sList);
			String[] title = { "姓名","身份证号","性别","出生日期","学历","工作岗位","联系电话","住址","人员简介","从业资格证书编号","质检员标志","维修工标志" };
			String[] column = { "NAME","ID_NUM","SEX","BIRTH_DATE","DEGREE","POST","TELPHONE","ADDRESS","REMARK","PAPERNUMBER","ISEXAMINER","ISREPAIRMAN" };
			//数据字典中的字段需转化成中文（如果导出的字段中有字典数据的请自行添加）
			String[] recolumn = {"SEX","DEGREE","POST"};
			String fileName = "人业人员资料";
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
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

