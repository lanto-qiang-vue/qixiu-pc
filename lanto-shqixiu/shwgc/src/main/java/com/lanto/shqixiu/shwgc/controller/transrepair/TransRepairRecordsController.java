package com.lanto.shqixiu.shwgc.controller.transrepair;

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

import com.lanto.shqixiu.shwgc.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgc.model.po.TbTransRepairRecords;
import com.lanto.shqixiu.shwgc.service.corp.TbCorpInfoService;
import com.lanto.shqixiu.shwgc.service.transrepair.TransRepairRecordsService;


@Controller
@RequestMapping(value="transrepair/repairrecords",produces = "text/html;charset=UTF-8")
public class TransRepairRecordsController extends BaseCon{

	private Logger logger = Logger.getLogger(TransRepairRecordsController.class);// 日志

	@Resource
	private TransRepairRecordsService service;
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


	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids,info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	@RequestMapping("submit")
	@ResponseBody
	public Object submit(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.submit(ids,info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"提交出错");
		}
	}
	
	@RequestMapping("getInfo")
	@ResponseBody
	public Object getInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			Integer vehicleId = Integer.parseInt(CommonUtils.checkNull(request.getParameter("VEHICLE_ID")));
			TbTransRepairRecords po=new TbTransRepairRecords();
			po.setVehicleId(vehicleId);
			po=service.getInfo(po);
			if(po!=null){
				return super.getOutData(json.toMap(po));
			}else{
				return super.getOutData(null);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"提交出错");
		}
	}
	
	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			Integer recordId=0;
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbTransRepairRecords po = json.getPojo(data, TbTransRepairRecords.class);
			ClientLoginInfo info = super.getClientLoginInfo();
			if(CommonUtils.checkIsNotNullAndZero(po.getRecordId())){
				service.update(po,info);
			}else{
				//验证建档配额
				TbCorpInfo corp=corpService.getModel(super.getClientLoginInfo().getCorpId());
				if(corp.getUploadQuatoCount()==null || "".equals(corp.getUploadQuatoCount())){
					return super.getOutException(null,"未设置维修记录配额，请与系统运营商联系！");
				}else{
					String quatoStr = SecurityEncode.decoderByDES(corp.getUploadQuatoCount(), SecurityEncode.DES_KEY);
					if(!quatoStr.split(",")[1].equals(corp.getCorpId())){
						return super.getOutException(null,"维修记录配额验证错误，请与系统运营商联系！");
					}else if(Integer.parseInt(quatoStr.split(",")[0])<1){
						return super.getOutException(null,"维修记录配额不足，请与系统运营商联系！");
					}else{
						if(corpService.uploadQuatoMinus1(corp.getCorpId(),po.getPlateNum(),super.getClientLoginInfo())){
							recordId=service.save(po,info);
						}
					}
				}
				/*if(result != null){
					return super.getOutException(null,result);
				}*/
			}
			return super.getOutData(recordId);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

