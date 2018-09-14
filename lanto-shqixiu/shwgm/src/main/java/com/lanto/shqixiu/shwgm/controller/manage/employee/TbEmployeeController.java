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
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.TbEmployeeBaseInfo;
import com.lanto.shqixiu.shwgm.service.manage.employee.TbEmployeeService;
import com.lanto.shqixiu.shwgm.util.CommonUtils;
import com.lanto.shqixiu.shwgm.util.Constant;
import com.lanto.shqixiu.shwgm.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="manage/employee/tbemployee",produces = "text/html;charset=UTF-8")
public class TbEmployeeController extends BaseCon{

	private Logger logger = Logger.getLogger(TbEmployeeController.class);// 日志

	@Resource
	private TbEmployeeService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			ManageLoginInfo info = super.getManageLoginInfo();
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList(sList, pUnit,info.getAreaCode());
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
			String array = CommonUtils.checkNull(request.getParameter("array"));
			TbEmployeeBaseInfo po = json.getPojo(data, TbEmployeeBaseInfo.class);
			if(po.getEmployeeId() != null ){
				System.out.println(po.toString());
				service.update(po,array);
			}else{
				service.save(po,array);
			}
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("certList")
	@ResponseBody
	public Object certList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String idNum = CommonUtils.checkNull(request.getParameter("ID_NUM"));
			List list = service.getCertList(idNum);
			return super.getOutData(list);
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
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
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
		String employeeCode = CommonUtils.checkNull(request.getParameter("ID_NUM"));
		String employeeName = CommonUtils.checkNull(request.getParameter("NAME"));
		String corpId = CommonUtils.checkNull(request.getParameter("CORP_ID"));
		String corpNum = CommonUtils.checkNull(request.getParameter("CORP_NUM"));
		String corpName = CommonUtils.checkNull(request.getParameter("CORP_NAME"));
		String sex = CommonUtils.checkNull(request.getParameter("SEX"));
		String isCert = CommonUtils.checkNull(request.getParameter("IS_CERT"));
		String degree = CommonUtils.checkNull(request.getParameter("DEGREE"));
		String post = CommonUtils.checkNull(request.getParameter("POST"));
		String corpArea = CommonUtils.checkNull(request.getParameter("CORP_AREA"));
		String corpType = CommonUtils.checkNull(request.getParameter("CORP_TYPE"));
		
		
		if (!CommonUtils.isNullString(corpId)){
			sList.add(new SqlUnit("corpId", " and CORP_ID = ? ", corpId.trim() ));
		}
		if (!CommonUtils.isNullString(degree)){
			sList.add(new SqlUnit("degree", " and DEGREE = ? ", degree.trim() ));
		}
		if (!CommonUtils.isNullString(post)){
			sList.add(new SqlUnit("post", " and POST = ? ", post.trim() ));
		}
		if (!CommonUtils.isNullString(corpArea)){
			sList.add(new SqlUnit("corpArea", " and CORP_AREA = ? ", corpArea.trim() ));
		}
		if (!CommonUtils.isNullString(corpType)){
			sList.add(new SqlUnit("corpType", " and CORP_TYPE = ? ", corpType.trim() ));
		}
		if (!CommonUtils.isNullString(corpNum)){
			sList.add(new SqlUnit("corpNum", " and CORP_NUM like ? ", "%" + corpNum.trim() + "%" ));
		}
		if (!CommonUtils.isNullString(corpName)){
			sList.add(new SqlUnit("corpName", " and CORP_NAME like ? ", "%" + corpName.trim() + "%" ));
		}
		if (!CommonUtils.isNullString(employeeName)){
			sList.add(new SqlUnit("employeeName", " and NAME like ? ", "%" + employeeName.trim() + "%" ));
		}
		if (!CommonUtils.isNullString(sex)){
			sList.add(new SqlUnit("sex", " and SEX = ? ", sex.trim()  ));
		}
		if (!CommonUtils.isNullString(employeeCode)){
			sList.add(new SqlUnit("employeeCode", " and ID_NUM like ? ", "%" + employeeCode.trim() + "%" ));
		}
		if(Constant.IF_TYPE_YES.equals(isCert)){
			sList.add(new SqlUnit("isCert", " and ID_NUM in (select ID_NUM from TB_EMPLOYEE_CERT where CERT_NAME like ? or  CERT_NAME like ? " +
					"or CERT_NAME like ? or CERT_NAME like ? or CERT_NAME like ? or CERT_NAME like ? or CERT_NAME like ? or CERT_NAME like ?) ", "%机动车维修机修%" ));
			sList.add(new SqlUnit("isCert", "", "%机动车维修电器%" ));
			sList.add(new SqlUnit("isCert", "", "%机动车维修钣金%" ));
			sList.add(new SqlUnit("isCert", "", "%机动车维修涂漆%" ));
			
			sList.add(new SqlUnit("isCert", "", "%机修技术人员%" ));
			sList.add(new SqlUnit("isCert", "", "%涂漆（车身涂装）技术人员%" ));
			sList.add(new SqlUnit("isCert", "", "%钣金（车身修复）技术人员%" ));
			sList.add(new SqlUnit("isCert", "", "%电器维修技术人员%" ));			
		}
		
	}
}

