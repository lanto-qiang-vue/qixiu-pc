package com.lanto.shqixiu.shwgc.controller.repair;

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
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgc.model.po.TrParameter;
import com.lanto.shqixiu.shwgc.model.po.TrParameterCorp;
import com.lanto.shqixiu.shwgc.service.repair.TcParameterService;


@Controller
@RequestMapping(value="client/repair/tcparameter",produces = "text/html;charset=UTF-8")
public class TcParameterController extends BaseCon{

	private Logger logger = Logger.getLogger(TcParameterController.class);// 日志

	@Resource
	private TcParameterService service;

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
			String isEdit = CommonUtils.checkNull(request.getParameter("isEdit"));
			ClientLoginInfo info = super.getClientLoginInfo();
			if("add".equals(isEdit)){
				TrParameter po = json.getPojo(data, TrParameter.class);
				po.setPeratorId(info.getUserId().toString());
				service.saveParams(po);
			}else{
				TrParameterCorp po = json.getPojo(data, TrParameterCorp.class);
				if(po.getId() != null && !"0".equals(po.getId().toString())){
					service.update(po);
				}else{
					po.setCorpId(info.getCorpId());
					po.setPeratorId(info.getUserId().toString());
					service.saveParameterByUnit(po);
				}
			}
			return super.getOutData(true);
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
	
	@RequestMapping("createToken")
	@ResponseBody
	public Object createToken(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			return super.getOutData(SecurityEncode.encoderByDES(info.getCorpId(), SecurityEncode.DES_KEY));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"生成TOKEN出错");
		}
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String paramsCode = CommonUtils.checkNull(request.getParameter("PARAMS_CODE"));
		String paramsName = CommonUtils.checkNull(request.getParameter("PARAMS_NAME"));
		String paramsUnit = CommonUtils.checkNull(request.getParameter("PARAMS_UNIT"));
		String isStop = CommonUtils.checkNull(request.getParameter("IS_STOP"));
		
		ClientLoginInfo info = super.getClientLoginInfo();
		sList.add(new SqlUnit(" ", " ", info.getCorpId() ));
		
		if (!CommonUtils.isNullString(paramsCode)){
			sList.add(new SqlUnit("paramsCode", " and PARAMS_CODE like ? ","%" + paramsCode.trim() + "%"));
		}
		if (!CommonUtils.isNullString(paramsName)){
			sList.add(new SqlUnit("paramsName", " and PARAMS_NAME like ? ","%" + paramsName.trim() + "%"));
		}
		if (!CommonUtils.isNullString(paramsUnit)){
			sList.add(new SqlUnit("paramsUnit", " and PARAMS_UNIT = ? ", paramsUnit.trim()));
		}
		if (!CommonUtils.isNullString(isStop)){
			sList.add(new SqlUnit("isStop", " and IS_STOP = ? ", isStop.trim()));
		}
	}
}

