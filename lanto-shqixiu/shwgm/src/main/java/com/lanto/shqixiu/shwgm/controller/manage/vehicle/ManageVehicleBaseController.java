package com.lanto.shqixiu.shwgm.controller.manage.vehicle;

import java.awt.Color;
import java.io.File;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.controller.ParamInit;
import org.softbase.model.ManageLoginInfo;
import org.softbase.model.TransLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.reflect.TypeToken;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.lanto.shqixiu.shwgm.model.bean.TcCheckFunc;
import com.lanto.shqixiu.shwgm.model.po.TvVehicleBase;
import com.lanto.shqixiu.shwgm.model.po.TvVehicleParam;
import com.lanto.shqixiu.shwgm.service.manage.vehicle.ManageVehicleBaseService;
import com.lanto.shqixiu.shwgm.util.Constant;
import com.lanto.shqixiu.shwgm.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="manage/vehicle/vehiclebase",produces = "text/html;charset=UTF-8")
public class ManageVehicleBaseController extends BaseCon{

	private Logger logger = Logger.getLogger(ManageVehicleBaseController.class);// 日志

	@Resource
	private ManageVehicleBaseService service;

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
		//	TransLoginInfo info = super.getTransLoginInfo();
			List<TcCheckFunc> list = new ArrayList<TcCheckFunc>();
			list = gson.fromJson(array, new TypeToken<List<TcCheckFunc>>(){}.getType());
			TvVehicleBase po = json.getPojo(data, TvVehicleBase.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getVehicleId())){
				po.setUpdateDate(new Date());
			//	po.setTransCorpId(info.getCorpId());
				service.update(po);
			}else{
				po.setUpdateDate(new Date());
			//	po.setTransCorpId(info.getCorpId());
				service.save(po);
			}
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("repairList")
	@ResponseBody
	public Object repairList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			List list = service.getRepairList(vehId);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修记录出错");
		}
	} 
	
	@RequestMapping("checkList")
	@ResponseBody
	public Object checkList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			List list = service.getCheckList(vehId);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修记录出错");
		}
	} 
	
	@RequestMapping("checkYearList")
	@ResponseBody
	public Object checkYearList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			String year = CommonUtils.checkNull(request.getParameter("YEAR"));
			List list = service.getCheckList(vehId,year);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修记录出错");
		}
	}
	
	@RequestMapping("partList")
	@ResponseBody
	public Object partList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{	
			String billCode = CommonUtils.checkNull(request.getParameter("billCode"));
			List list = service.getPartList(billCode);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"维修配件查询出错");
		}
		
	}
	
	@RequestMapping("updateCase")
	@ResponseBody
	public Object updateCase(HttpServletRequest request,HttpServletResponse response) {
		try{
			String plateNum = CommonUtils.checkNull(request.getParameter("plateNum"));
			String plateColor = CommonUtils.checkNull(request.getParameter("plateColor"));
			TransLoginInfo info = super.getTransLoginInfo();
			service.updateCase(plateNum, plateColor, info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"关联失败");
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
	
	@RequestMapping("getPic")
	@ResponseBody
	public Object getPic(HttpServletRequest request,HttpServletResponse response) {
		try{
			Map out = new HashMap();			
			String corpId = CommonUtils.checkNull(request.getParameter("CORP_ID"));
			String billCode = CommonUtils.checkNull(request.getParameter("BILL_CODE"));	
			List list =service.getPic(corpId, billCode,0);
			Map<String, Object> map1;
			if (list.size() > 0 ) {
			  map1 = (Map) list.get(0);		
			  out.put("pic1", map1.get("IMAGE1"));

			  Map map2 = (Map) list.get((int)Math.ceil(list.size()/2));		
			  out.put("pic2", map2.get("IMAGE1"));

			  Map map3 = (Map) list.get(list.size()-1);		
			  out.put("pic3", map3.get("IMAGE1"));
			}
			
			List list_1 =service.getPic(corpId, billCode,1);
			if (list_1.size() > 0 ) {
			  map1 = (Map) list_1.get(0);		
			  out.put("pic4", map1.get("IMAGE1"));

			  Map map2 = (Map) list_1.get((int)Math.ceil(list_1.size()/2));		
			  out.put("pic5", map2.get("IMAGE1"));

			  Map map3 = (Map) list_1.get(list_1.size()-1);		
			  out.put("pic6", map3.get("IMAGE1"));
			}			
		    return super.getOutData(out);
		
		}catch(Exception e){
			e.printStackTrace();
			logger.error("获取图片失败", e);
			return super.getOutException(e, "获取图片失败");
		}		

	}

	@RequestMapping("uploadImage")
	@ResponseBody
	public Object uploadEditor(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			MultipartFile file = multipartRequest.getFile("upload");
			String fileName = file.getOriginalFilename();
			String uploadFileId = fileName.substring(fileName.lastIndexOf("."));
			String year = CommonUtils.printDate("yyyy", new Date());
			String mothYear = CommonUtils.printDate("yyyy-MM", new Date());
			String mothYearDay = CommonUtils
					.printDate("yyyy-MM-dd", new Date());
			String uName = UUID.randomUUID() + uploadFileId;
			String fid = Constant.ATTACH_FILE_UPLOAD_PROJECT + year + "/" + mothYear + "/" + mothYearDay + "/"
					+ uName;
			String fileUrl = ParamInit.attachFileUploadPath + fid;
			File newFile = new File(fileUrl);
			if (!newFile.getParentFile().exists()) {
				newFile.getParentFile().mkdirs();
			}
			file.transferTo(newFile);

			return super.getOutData(fid);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "上传附件信息失败");
		}
	}
	

	@RequestMapping("doExport")
	@ResponseBody
	public Object doExport(HttpServletRequest request,HttpServletResponse response) {
		try{
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List<Map<String, Object>> data = service.doExport(sList);
			String[] title = { "车辆ID","厂家","品牌","车型","车牌号","车牌颜色","车辆类型","营运状态","区县","道路运输证号","驾驶员","底盘号","发动机号","燃料类型","车辆吨位","座（卧）位","使用类别","发证日期","审验日期","审验结果" };
			String[] column = { "VEHICLE_ID","VENDER","BRAND","XM","PLATE_NUM","PLATE_COLOR","VEHICLE_TYPE","STATUS","COUNTY","LOAD_CERT_NUM","UNIT_NAME","CHASSIS_NUM","ENGINE_NUM","FUEL_TYPE","TONNAGE","SEAT","USE_TYPE","CERT_DATE","CHECK_DATE","CHECK_RESULT" };
			//数据字典中的字段需转化成中文（如果导出的字段中有字典数据的请自行添加）
			String[] recolumn = {"PLATE_COLOR", "VEHICLE_TYPE","STATUS","FUEL_TYPE"};
			String fileName = "车辆基本档案";
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
//	@RequestMapping("doPrint")
//	@ResponseBody
//	public Object doPrint1(HttpServletRequest request,HttpServletResponse response) {
//		try{	
//			String data = CommonUtils.checkNull(request.getParameter("data"));
//			String recordNo = CommonUtils.checkNull(request.getParameter("record_no"));
//			
//			TvVehicleBase base = json.getPojo(data, TvVehicleBase.class);
//			base.setVehicleType(WebCache.getDictDescById(base.getVehicleType()));			
//			base.setPlateColor(WebCache.getDictDescById(base.getPlateColor()));
//			base.setFuelType(WebCache.getDictDescById(base.getFuelType()));
//			
//		    if (!"".equals(base.getXm())) {
//			  DbRepairStandard dbR = new DbRepairStandard();
//			  dbR.setId(Integer.parseInt(base.getXm()));
//			  dbR = service.getModel_DbR(dbR);
//			  base.setXm(dbR.getName());
//		    }
//		    
//		    TvVehicleParam param = new TvVehicleParam(); 
//		    param.setVehicleId(base.getVehicleId());
//		    param = service.getModel_VehicleParam(param);
//			List paramList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_param");		    
//			List regList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tr_repair_gene_manage");	
//			List partChangeList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tr_repair_gene_part");	
//			List checkList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_check");			
//			List changeList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_change");
//			List usesList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_uses");
//			List accidentList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_accident");	
//			List driverList = service.getVehicleItemList_Print(String.valueOf(base.getVehicleId()),"tv_vehicle_driver");	
//			
//			String out = service.createReportXml(base,param,regList,partChangeList,checkList,changeList,usesList,accidentList,driverList);			
//			return super.getOutData(out);
//		}catch(Exception e){
//			e.printStackTrace();
//			logger.error(e);
//			return super.getOutException(e,"打印出错");
//		}
//		
//	}		
	
	
	@RequestMapping("doPrint")
	@ResponseBody
	public Object doPrint(HttpServletRequest request,HttpServletResponse response) {
		OutputStream os = null;
		try{	
			os = response.getOutputStream();
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			String fileName = new String("车辆技术档案.pdf".getBytes("UTF-8"), "UTF-8"); // 导出的文字编码
			String filename = URLEncoder.encode(fileName, "UTF-8"); // 导出的文字编码
			//response.getWriter().flush();
			response.addHeader("Content-disposition", ";filename=" + filename);
			//response.addHeader("title",filename);
			
			
			BaseFont bfChinese = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
	        Font FontChinese = new Font(bfChinese, 12, Font.NORMAL);

	        // 第一步，创建document对象
	        Rectangle rectPageSize = new Rectangle(PageSize.A4);
	        
	        //下面代码设置页面横置
	        rectPageSize = rectPageSize.rotate();
	        
	        //创建document对象并指定边距
	        Document document = new Document(rectPageSize,50,50,50,50);
	       // Document document = new Document(new RectangleReadOnly(842F,595F));
	        try
	        {
	            // 第二步,将Document实例和文件输出流用PdfWriter类绑定在一起
	            //从而完成向Document写，即写入PDF文档
	            PdfWriter.getInstance(document,os);
	            //第3步,打开文档
	            document.open();
	            //第3步,向文档添加文字. 文档由段组成
	            Paragraph paragraph = new Paragraph("Hello World");
	            paragraph.setAlignment(Element.ALIGN_CENTER); 
	            paragraph.setSpacingAfter(60);  

	            
	            document.add(paragraph);
	            
	            Paragraph par = new Paragraph("世界你好",FontChinese);
	            par.setSpacingAfter(60);  
	            par.setAlignment(Element.ALIGN_CENTER); 
	            document.add(par);

	            PdfPTable table = new PdfPTable(3);
	            for(int i=0;i<12;i++)
	            {
	                if (i == 0)
	                {
	                    PdfPCell cell = new PdfPCell();
	                    cell.setColspan(3);
	                    cell.setBackgroundColor(new Color(180,180,180));
	                    cell.addElement(new Paragraph("表格头" , FontChinese));
	                    table.addCell(cell);
	                }
	                else
	                {
	                    PdfPCell cell = new PdfPCell();
	                    cell.addElement(new Paragraph("表格内容" , FontChinese));
	                    table.addCell(cell);
	                }
	            }
	            document.add(table);

	        }
	        catch (DocumentException de)
	        {
	            System.err.println(de.getMessage());
	        }
	        //关闭document
	        document.close();
	        os.flush();
	        os.close();
	        System.out.println("生成HelloPdf成功！");
			
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"打印出错");
		}
		
	}		
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
	@RequestMapping("save_reg")
	@ResponseBody
	public Object save_reg(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.saveReg(parray,Integer.parseInt(vehicleId),login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆普通维修登记保存出错");
		}
	}	
	@RequestMapping("regList")
	@ResponseBody
	public Object regList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_reg");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修登记出错");
		}
	} 
	@RequestMapping("save_change")
	@ResponseBody
	public Object save_change(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.saveChange(parray,Integer.parseInt(vehicleId),login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆变更保存出错");
		}
	}	
	@RequestMapping("changeList")
	@ResponseBody
	public Object changeList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_change");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询车辆变更出错");
		}
	} 	
	@RequestMapping("save_uses")
	@ResponseBody
	public Object save_uses(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.saveUses(parray,Integer.parseInt(vehicleId),login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆使用记录保存出错");
		}
	}
	
	
	
	@RequestMapping("usesList")
	@ResponseBody
	public Object usesList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_uses");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询使用记录出错");
		}
	} 	
	
	@RequestMapping("save_driver")
	@ResponseBody
	public Object save_driver(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.saveDriver(parray,Integer.parseInt(vehicleId),login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆驾驶员保存出错");
		}
	}	
	@RequestMapping("driverList")
	@ResponseBody
	public Object driverList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_driver");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询驾驶员列表出错");
		}
	} 
	
	@RequestMapping("save_accident")
	@ResponseBody
	public Object save_accident(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.saveAccident(parray,Integer.parseInt(vehicleId),login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆交通事故登记保存出错");
		}
	}	
	@RequestMapping("accidentList")
	@ResponseBody
	public Object accidentList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tv_vehicle_accident");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询交通事故列表出错");
		}
	} 
	
	@RequestMapping("deleteVehicleItems")
	@ResponseBody
	public Object deleteVehicleItems(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			String pid = CommonUtils.checkNull(request.getParameter("pid"));
			String tableName = CommonUtils.checkNull(request.getParameter("tableName"));
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicleId"));
			service.deleteVehicleItems(ids,vehicleId,pid,tableName);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	@RequestMapping("partChangeList")
	@ResponseBody
	public Object partChangeList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			List list = service.getVehicleItemList(vehId, "tr_repair_gene_part");
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询主要部件变更列表出错");
		}
	} 
	@RequestMapping("save_partChange")
	@ResponseBody
	public Object save_partChange(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			ManageLoginInfo login=super.getManageLoginInfo();
			service.savePartChange(parray,Integer.parseInt(vehicleId));
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆主要部件变更保存出错");
		}
	}

	@RequestMapping("save_param")
	@ResponseBody
	public Object save_param(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			String parray = CommonUtils.checkNull(request.getParameter("parray"));
			TvVehicleParam pojo = json.getPojo(parray, TvVehicleParam.class);
			Integer paramId =service.saveOrUpdateParam(pojo, vehicleId);
			if(paramId!=null){
				pojo.setParamId(paramId);
			}
			return super.getOutData(json.toMap(pojo));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆技术参数保存出错");
		}
	}		
	
	@RequestMapping("vehicleParam")
	@ResponseBody
	public Object vehicleParam(HttpServletRequest request,HttpServletResponse response){
		try{	
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicle_id"));
			TvVehicleParam po = new TvVehicleParam();
			po.setVehicleId(Integer.parseInt(vehicleId));
			po = service.getTvVehicleParam(po);
			if(po!=null){
				return super.getOutData(json.toMap(po));
			}else{
				return super.getOutData(null);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆技术参数获取出错");
		}
	}
}

