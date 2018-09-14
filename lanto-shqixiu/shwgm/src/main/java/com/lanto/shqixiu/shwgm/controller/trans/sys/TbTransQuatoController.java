package com.lanto.shqixiu.shwgm.controller.trans.sys;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.TransLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.TbTransCorpInfo;
import com.lanto.shqixiu.shwgm.service.corp.TransCorpInfoService;
import com.lanto.shqixiu.shwgm.service.manage.corp.TbTransCorpQuatoService;


@Controller
@RequestMapping(value="trans/sys/corpquato",produces = "text/html;charset=UTF-8")
public class TbTransQuatoController extends BaseCon{

	private Logger logger = Logger.getLogger(TbTransQuatoController.class);// 日志

	@Resource
	private TbTransCorpQuatoService service;
	@Resource
	private TransCorpInfoService corpService;

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
	
	@RequestMapping("getquato")
	@ResponseBody
	public Object getQuato(HttpServletRequest request,HttpServletResponse response) {
		try {
			TransLoginInfo info = super.getTransLoginInfo();
			TbTransCorpInfo corp = corpService.getModel(info.getCorpId());
			
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

