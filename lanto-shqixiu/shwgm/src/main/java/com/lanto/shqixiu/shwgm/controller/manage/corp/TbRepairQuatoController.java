package com.lanto.shqixiu.shwgm.controller.manage.corp;

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
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgm.model.po.TbRepairQuato;
import com.lanto.shqixiu.shwgm.service.manage.corp.TbCorpInfoService;
import com.lanto.shqixiu.shwgm.service.manage.corp.TbCorpQuatoService;


@Controller
@RequestMapping(value="manage/corp/corpquato",produces = "text/html;charset=UTF-8")
public class TbRepairQuatoController extends BaseCon{

	private Logger logger = Logger.getLogger(TbRepairQuatoController.class);// 日志

	@Resource
	private TbCorpQuatoService service;
	@Resource
	private TbCorpInfoService corpService;

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
			TbRepairQuato po = json.getPojo(data, TbRepairQuato.class);
			ManageLoginInfo info = super.getManageLoginInfo();
			po.setCreateTime(new Date());
			po.setCreateUser(info.getUserName());
			service.save(po,info);
			corpService.updateQuato(po, info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("getquato")
	@ResponseBody
	public Object getQuato(HttpServletRequest request,HttpServletResponse response) {
		try {
			String corpId = CommonUtils.checkNull(request.getParameter("CORP_ID"));
			TbCorpInfo corp = corpService.getModel(corpId);
			
			String quatoStr = SecurityEncode.decoderByDES(corp.getCreateQuatoCount(), SecurityEncode.DES_KEY);
			if(quatoStr==null || "".equals(quatoStr)){
				corp.setCreateQuatoNum(0);
			}else{
				if(!quatoStr.split(",")[1].equals(String.valueOf(corp.getCorpId()))){
					corp.setCreateQuatoNum(0);
				}else{
					corp.setCreateQuatoNum(Integer.parseInt(quatoStr.split(",")[0]));
				}
			}
			
			quatoStr = SecurityEncode.decoderByDES(corp.getUploadQuatoCount(), SecurityEncode.DES_KEY);
			if(quatoStr==null || "".equals(quatoStr)){
				corp.setUploadQuatoNum(0);
			}else{
				if(!quatoStr.split(",")[1].equals(String.valueOf(corp.getCorpId()))){
					corp.setUploadQuatoNum(0);
				}else{
					corp.setUploadQuatoNum(Integer.parseInt(quatoStr.split(",")[0]));
				}
			}
			
			quatoStr = SecurityEncode.decoderByDES(corp.getSearchQuatoCount(), SecurityEncode.DES_KEY);
			if(quatoStr==null || "".equals(quatoStr)){
				corp.setSearchQuatoNum(0);
			}else{
				if(!quatoStr.split(",")[1].equals(String.valueOf(corp.getCorpId()))){
					corp.setSearchQuatoNum(0);
				}else{
					corp.setSearchQuatoNum(Integer.parseInt(quatoStr.split(",")[0]));
				}
			}
			return super.getOutData(corp);
		} catch (Exception e) {
			e.printStackTrace();
			return super.getOutException(e,"配额查询出错");
		}
	}
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

