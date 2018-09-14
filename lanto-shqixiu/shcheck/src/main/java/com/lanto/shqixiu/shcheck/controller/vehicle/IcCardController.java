package com.lanto.shqixiu.shcheck.controller.vehicle;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

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

import com.lanto.shqixiu.shcheck.model.po.TvVehicleIccard;
import com.lanto.shqixiu.shcheck.service.vehicle.IcCardService;
import com.lanto.shqixiu.shcheck.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="client/vehicle/iccard",produces = "text/html;charset=UTF-8")
public class IcCardController extends BaseCon{

	private Logger logger = Logger.getLogger(IcCardController.class);// 日志

	@Resource
	private IcCardService service;

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
			TvVehicleIccard po = json.getPojo(data, TvVehicleIccard.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getCardId())){
				po.setUpdateDate(new Date());
				po.setCardStatus("10301002");
				service.update(po);
			}else{
				ClientLoginInfo info = super.getClientLoginInfo();
				po.setCorpId(info.getCorpId());
				po.setCreateDate(new Date());
				po.setCardStatus("10301001");
				service.save(po);
			}
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	

	@RequestMapping("getCardInfo")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			Map out = service.getCardInfo(vehId);
			if(out == null){
				throw new Exception("IC卡资料不存在!");
			}
			return super.getOutData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"读取失败");
		}
	}
	
	@RequestMapping("doExport")
	@ResponseBody
	public Object doExport(HttpServletRequest request,HttpServletResponse response) {
		try{
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List<Map<String, Object>> data = service.doExport(sList);
			String[] title = { "检测站名称","检测站简称","联系方式","传真","检测站地址","所属辖区" };
			String[] column = { "STATION_NAME","STATION_NAME_JC","STATION_TEL","STATION_FAL","STATION_ADDRESS","STATION_AREA" };
			//数据字典中的字段需转化成中文（如果导出的字段中有字典数据的请自行添加）
			String[] recolumn = {  };
			String fileName = "综合性能检测站";
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

