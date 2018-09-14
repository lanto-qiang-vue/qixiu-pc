package com.lanto.shqixiu.shwgm.controller.manage.sys;

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

import com.lanto.shqixiu.shwgm.model.po.TbBdCode;
import com.lanto.shqixiu.shwgm.service.manage.sys.TbBdCodeService;


@Controller
@RequestMapping(value="manage/sys/tbbdcode",produces = "text/html;charset=UTF-8")
public class TbBdCodeController extends BaseCon{

	private Logger logger = Logger.getLogger(TbBdCodeController.class);// 日志

	@Resource
	private TbBdCodeService service;

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
	
	@RequestMapping("newType")
	@ResponseBody
	public Object newType(HttpServletRequest request,HttpServletResponse response) {
		try{
			Integer data = service.newType();
			return super.getOutData(data + 1);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询新类型出错");
		}
	}
	
	@RequestMapping("newCode")
	@ResponseBody
	public Object newCode(HttpServletRequest request,HttpServletResponse response) {
		try{
			String type = CommonUtils.checkNull(request.getParameter("type"));
			Integer[] data = service.newCode(type);
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询参数最新编号、最新序号出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbBdCode po = json.getPojo(data, TbBdCode.class);
			TbBdCode con = new TbBdCode();
			con.setCodeId(po.getCodeId());
			con = service.getModel(con);
			ManageLoginInfo info = super.getManageLoginInfo();
			if(con != null){
				po.setUpdateBy(info.getUserName());
				po.setUpdateDate(new Date());
				service.update(po);
			}else{
				po.setCreateBy(info.getUserName());
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

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String codeId = CommonUtils.checkNull(request.getParameter("CODE_ID"));
		String type = CommonUtils.checkNull(request.getParameter("TYPE"));
		String typeName = CommonUtils.checkNull(request.getParameter("TYPE_NAME"));
		String codeDesc = CommonUtils.checkNull(request.getParameter("CODE_DESC"));
		String num = CommonUtils.checkNull(request.getParameter("NUM"));
		String status = CommonUtils.checkNull(request.getParameter("STATUS"));
		String createBy = CommonUtils.checkNull(request.getParameter("CREATE_BY"));
		String updateBy = CommonUtils.checkNull(request.getParameter("UPDATE_BY"));

		if (!CommonUtils.isNullString(codeId)){
			sList.add(new SqlUnit("codeId", " and CODE_ID like ? ","%" + codeId.trim() + "%"));
		}
		if (!CommonUtils.isNullString(type)){
			sList.add(new SqlUnit("type", " and TYPE like ? ","%" + type.trim() + "%"));
		}
		if (!CommonUtils.isNullString(typeName)){
			sList.add(new SqlUnit("typeName", " and TYPE_NAME like ? ","%" + typeName.trim() + "%"));
		}
		if (!CommonUtils.isNullString(codeDesc)){
			sList.add(new SqlUnit("codeDesc", " and CODE_DESC like ? ","%" + codeDesc.trim() + "%"));
		}
		if (!CommonUtils.isNullString(num)){
			sList.add(new SqlUnit("num", " and NUM = ? ",num.trim()));
		}
		if (!CommonUtils.isNullString(status)){
			sList.add(new SqlUnit("status", " and STATUS = ? ",status.trim()));
		}
		if (!CommonUtils.isNullString(createBy)){
			sList.add(new SqlUnit("createBy", " and CREATE_BY = ? ",createBy.trim()));
		}
		if (!CommonUtils.isNullString(updateBy)){
			sList.add(new SqlUnit("updateBy", " and UPDATE_BY = ? ",updateBy.trim()));
		}
	}
}

