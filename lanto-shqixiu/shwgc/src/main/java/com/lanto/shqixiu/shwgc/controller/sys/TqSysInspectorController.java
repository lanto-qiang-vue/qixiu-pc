package com.lanto.shqixiu.shwgc.controller.sys;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgc.model.po.TqSysInspector;
import com.lanto.shqixiu.shwgc.service.sys.TqSysInspectorService;
import com.lanto.shqixiu.shwgc.util.Constant;


@Controller
@RequestMapping(value="client/sys/tqsysinspector",produces = "text/html;charset=UTF-8")
public class TqSysInspectorController extends BaseCon{

	private Logger logger = Logger.getLogger(TqSysInspectorController.class);// 日志

	@Resource
	private TqSysInspectorService service;

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
	@RequestMapping("list_station")
	@ResponseBody
	public Object list_station(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList_station(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询工位出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TqSysInspector po = json.getPojo(data, TqSysInspector.class);
			ClientLoginInfo info = super.getClientLoginInfo();
			String corpId = info.getCorpId();	//企业id
			po.setCorpId(Integer.parseInt(corpId));
			if(po.getId()!=null){
				service.update(po, info);
			}else{
				boolean b = service.certNumUsable(po.getCertNum());
				if(!b){
					return super.getOutData("证件号码已经存在,保存出错");
				}

				service.save(po, info);
			}
			return super.getOutData("保存成功");
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
		String certNum = CommonUtils.checkNull(request.getParameter("CERT_NUM"));
		String name = CommonUtils.checkNull(request.getParameter("NAME"));
		String corpId = super.getCookieValue(Constant.CLINET_LOGIN_CORPID_COOKIE_VALUE, request);
		if(!CommonUtils.isNullString(corpId)){
			sList.add(new SqlUnit("corpId", " and CORP_Id = ?", corpId));
		}
		if (!CommonUtils.isNullString(certNum)){
			sList.add(new SqlUnit("certNum", " and CERT_NUM like ? ","%" + certNum.trim() + "%"));
		}
		if (!CommonUtils.isNullString(name)){
			sList.add(new SqlUnit("name", " and NAME like ? ","%" + name.trim() + "%"));
		}
	}
}

