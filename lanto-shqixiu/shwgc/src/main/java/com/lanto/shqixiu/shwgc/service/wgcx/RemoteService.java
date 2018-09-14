package com.lanto.shqixiu.shwgc.service.wgcx;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.common.WebCache;
import com.lanto.shqixiu.shwgc.model.po.TbBdCode;
import com.lanto.shqixiu.shwgc.model.po.TbBdVideoSet;
import com.lanto.shqixiu.shwgc.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgc.model.po.TbEmployeeBaseInfo;
import com.lanto.shqixiu.shwgc.model.po.TrParameter;
import com.lanto.shqixiu.shwgc.model.po.TrRepairGeneDetail;
import com.lanto.shqixiu.shwgc.model.po.TrRepairGeneManage;
import com.lanto.shqixiu.shwgc.model.po.TrRepairGenePart;
import com.lanto.shqixiu.shwgc.model.po.TrRepairGenePhoto;
import com.lanto.shqixiu.shwgc.model.po.TrRepairImage;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleBase;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleCheck;
import com.lanto.shqixiu.shwgc.model.report.CertRecord;
import com.lanto.shqixiu.shwgc.model.report.DataSet;
import com.lanto.shqixiu.shwgc.model.report.NodeInfo;
import com.lanto.shqixiu.shwgc.model.report.ObjectToXML;
import com.lanto.shqixiu.shwgc.service.common.CreateNumberService;
import com.lanto.shqixiu.shwgc.test.JsonTest;
import com.lanto.shqixiu.shwgc.util.Constant;


@Service
public class RemoteService{
	
	@Resource
	private SwdbFactory service;
	@Resource
	private CreateNumberService createNumberService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("GENE_ID");
		page.setOrderByType("DESC");
		String table = "(select a.*,b.OLD_PHOTO,b.NEW_PHOTO,b.REPAIR_PHOTO from TR_REPAIR_GENE_MANAGE a left join tr_repair_gene_photo b on a.bill_code=b.bill_code) t";
		return service.getPageList(uSql, page,table,"GENE_ID");
	}
	
	public List vehicleSelList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("VEHICLE_ID");
		page.setOrderByType("DESC");
		String table = "(select a.*,b.CORP_NAME DELEGATE_NAME from tv_vehicle_base a left join tb_trans_corp_info b on a.TRANS_CORP_ID=b.corp_id) t";
		return service.getPageList(uSql, page,table,"GENE_ID");
	}
	
	public List getDetailList(String billCode){
		return service.findAll("select * from TR_REPAIR_GENE_DETAIL where BILL_CODE = ? order by repair_type", billCode.trim());
	}
	
	public List getPartList(String billCode){
		return service.findAll("select * from tr_repair_gene_part where BILL_CODE = ?", billCode.trim());
	}
	
	public void save(TrRepairGeneManage gene,String parray,TrRepairGenePhoto pic) throws Exception{
		Integer id = service.savePojoRtPkId(gene,"GENE_ID");
		gene.setGeneId(id.longValue());
//		saveDetails(array,gene.getBillCode());
		saveParts(parray,gene.getBillCode());
		savePic(pic,gene.getBillCode());
	}
	
	
	public TrRepairGeneManage getModelById(String id) throws Exception{
		TrRepairGeneManage po = new TrRepairGeneManage();
		po.setGeneId(Long.valueOf(id));
		return service.getModelByPo(po);
	}
	public TbBdCode getModel_Code(TbBdCode po) throws Exception{
		return service.getModelByPo(po);
		
	}
	public TvVehicleBase getModel_VehicleBase(TvVehicleBase po) throws Exception{
		return service.getModelByPo(po);
		
	}
	public TbBdVideoSet getModel_VideoSet(TbBdVideoSet po) throws Exception{
		return service.getModelByPo(po);
		
	}		
	public TbCorpInfo getModel_Corp(TbCorpInfo po) throws Exception{
		return service.getModelByPo(po);
		
	}		
	public void update(TrRepairGeneManage gene,String parray,TrRepairGenePhoto pic) throws Exception{
		service.updatePojo(gene,"GENE_ID");
//		saveDetails(array,gene.getBillCode());
		saveParts(parray,gene.getBillCode());
		savePic(pic,gene.getBillCode());
	}
	
	public void savePojoCheck(TvVehicleCheck po) throws Exception{
		service.savePojo(po, "CHECK_ID");
		TvVehicleBase veh = new TvVehicleBase();
		veh.setVehicleId(po.getVehicleId());
		veh.setLastCheckDate(po.getCheckDate());
		service.updatePojo(veh, "VEHICLE_ID");
	}
	public void savePojoRepairImage(TrRepairImage po) throws Exception{
		service.savePojo(po, "IMAGE_ID");
	}	
	private void savePic(TrRepairGenePhoto pic,String billCode){
		TrRepairGenePhoto photo = new TrRepairGenePhoto();
		photo.setBillCode(billCode);
		photo = service.getModelByPo(photo);
		pic.setBillCode(billCode);
		pic.setCreateTime(new Date());
		if(photo == null){
			service.savePojo(pic);
		}else{
			service.updatePojo(pic,"BILL_CODE");
		}
	}
	
	private void saveParts(String parray,String billCode) throws Exception{
		service.delete("delete from tr_repair_gene_part where BILL_CODE = ?", new Object[]{billCode});
		if(!CommonUtils.checkIsNullStr(parray)){
			JsonTest json = new JsonTest();
			List<TrRepairGenePart> parts = json.getPojoList(parray, TrRepairGenePart.class);
			for(TrRepairGenePart de : parts){
				de.setBillCode(billCode);
				service.savePojo(de , "PART_ID");
			}
		}
	}
	
	public void delete(String[] ids){
		for(String id : ids){
			service.delete("delete from TR_REPAIR_GENE_MANAGE where BILL_CODE=?", id);
			deleteDetails(id);
		}
	}
	
	public TbEmployeeBaseInfo getEmployeeByID(String id){
		TbEmployeeBaseInfo em = new TbEmployeeBaseInfo();
		em.setEmployeeId(Integer.valueOf(id));
		return service.getModelByPo(em);
	}
	
	public void deleteRemote(String id) throws Exception{
		TrRepairGeneManage con = new TrRepairGeneManage();
		con.setGeneId(Long.valueOf(id));
		con = service.getModelByPo(con);
		if(con == null){
			throw new Exception("维修数据不存在!");
		}
		if("10091002".equals(con.getStatus())){
			throw new Exception("该维修数据已经提交，不能删除！");
		}
		service.delete("delete from TR_REPAIR_GENE_MANAGE where GENE_ID=?", id);
		deleteDetails(con.getBillCode());
	}
	
	public List getEmployee(boolean tag,String corpId){
		String sql = "select EMPLOYEE_ID EXAMINER,NAME from tb_employee_base_info where corp_id=? and id_num in (select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? ) "+
				"union SELECT EMPLOYEE_ID EXAMINER,NAME FROM tb_employee_examiner where  corp_id=? and status='已审核'";
				
		
//		if(tag){
//			sql = sql + "and ISEXAMINER=1";
//		}else{
//			sql = sql + "and ISREPAIRMAN=1";
//		}
		return service.findAll(sql, corpId,"机动车维修质量检验员","机动车维修质量总检验员","质量检验员","机动车维修质量检验员(安全例检)","质量总检验员证","机动车维修质量检验员安全例检人员","机动车维修质量检验人员",corpId);
	}
	
	public List getEmployeeApp(String corpId){
		System.out.println(corpId);
		String sql = "select NAME CODE,NAME NAME from tb_employee_base_info where corp_id=? and id_num in (select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? " +
				"union all select id_num from tb_employee_cert where CERT_NAME = ? )";
		return service.findAll(sql, corpId,"机动车维修质量检验员","机动车维修质量总检验员","质量检验员","机动车维修质量检验员(安全例检)","质量总检验员证","机动车维修质量检验员安全例检人员","机动车维修质量检验人员");
	}
	
	public List getDictByType(String type){
		String sql = "select code_id CODE,code_desc NAME from tb_bd_code where type=? and status=?";
		return service.findAll(sql, type,"10011001");
	}
	
	public List getDBCode(String type){
		String sql = "select CODE_ID,CODE_DESC from TB_BD_CODE where type=? and STATUS=? ORDER BY NUM ASC";
		return service.findAll(sql, type,"10011001");
	}

	public void doCancel(String ids){
		service.update("update TR_REPAIR_GENE_MANAGE set status=? where GENE_ID in (" + ids + ")",Constant.SUBMIT_STATUS_01);
	}
	
	public void doStop(String ids){
		service.update("update TR_REPAIR_GENE_MANAGE set status=? where GENE_ID in (" + ids + ")",Constant.SUBMIT_STATUS_03);
	}
	
	public void deleteDetails(String geneId){
		service.delete("delete from TR_REPAIR_GENE_DETAIL where BILL_CODE = ?", new Object[]{geneId});
		service.delete("delete from tr_repair_gene_part where BILL_CODE = ?", new Object[]{geneId});
		service.delete("delete from tr_repair_gene_photo where BILL_CODE = ?", new Object[]{geneId});
	}
	
	private void saveDetails(String array,String billCode) throws Exception{
		service.delete("delete from TR_REPAIR_GENE_DETAIL where BILL_CODE = ?", new Object[]{billCode});
		if(!CommonUtils.checkIsNullStr(array)){
			JsonTest json = new JsonTest();
			List<TrRepairGeneDetail> details = json.getPojoList(array, TrRepairGeneDetail.class);
			for(TrRepairGeneDetail de : details){
				de.setBillCode(billCode);
				service.savePojo(de , "DETAIL_ID");
			}
		}
	}
	
	public String getBillID() throws Exception{
		return createNumberService.createNumber("gd");	
	}
	
	public String getCertNo() throws Exception{
		return createNumberService.createNumber("geneCert");	
	}
	
	public String updatePrintStatus(String userId,String corpId,String tag,String geneId) throws Exception{
		
		String sql = "select * from V_REPAIR_GENE_MANAGE where GENE_ID = ?";
		List<Map> list =  service.findAll(sql, geneId);
		Map gene = new HashMap();
		if(list != null && list.size()>0){
			gene = list.get(0); 
		}
		String certNo = CommonUtils.checkNull(gene.get("CERT_SN"));
//		if(CommonUtils.checkIsNullStr(certNo)){
//			certNo = getCertNo(); 
//			gene.put("CERT_SN", certNo);
//		}
		List<Map> details = getDetailList(CommonUtils.checkNull(gene.get("BILL_CODE")));
		String repairTypes = "";
		boolean zcwf = false;
		boolean ejwf = false;
		boolean xxwf = false;
		String p1 = "100";
		String p2 = "20000";
		if(details != null && details.size() > 0){
			String zcTotalItemStr = "";
			boolean isZc = false;
			for(Map detail : details){
				String repairType = CommonUtils.checkNull(detail.get("REPAIR_TYPE"));
				if("10111001".equals(repairType)){
					isZc = true;
					if(CommonUtils.checkIsNullStr(zcTotalItemStr)){
						zcTotalItemStr = WebCache.getDictDescById(CommonUtils.checkNull(detail.get("REPAIR_ITEM")));
					}else{
						zcTotalItemStr = zcTotalItemStr + "、" + WebCache.getDictDescById(CommonUtils.checkNull(detail.get("REPAIR_ITEM")));
					}
				}
			}
			if(isZc){
				repairTypes = WebCache.getDictDescById("10111001") + "(" + zcTotalItemStr + ")";
			}
			for(Map detail : details){
				String repairType = CommonUtils.checkNull(detail.get("REPAIR_TYPE"));
				if(!"10111001".equals(repairType)){
					String repairTypeName = WebCache.getDictDescById(repairType);
					if(CommonUtils.checkIsNullStr(repairTypes)){
						repairTypes = repairTypeName;
					}else{
						repairTypes = repairTypes + "," + repairTypeName;
					}
				}
				if("10111001".equals(repairType) || "10111002".equals(repairType)){
					zcwf = true;
				}else if("10111003".equals(repairType)){
					ejwf = true;
				}else{
					xxwf = true;
				}
			}
		}
		if(zcwf){
			TrParameter po1 = getParamsByCode(corpId,"001");
			TrParameter po2 = getParamsByCode(corpId,"002");
			if(po1 != null){
				p1 = po1.getParamsValue().toString();
			}
			if(po2 != null){
				p2 = po2.getParamsValue().toString();
			}
		}else if(ejwf && !zcwf){
			TrParameter po1 = getParamsByCode(corpId,"003");
			TrParameter po2 = getParamsByCode(corpId,"004");
			if(po1 != null){
				p1 = po1.getParamsValue().toString();
			}
			if(po2 != null){
				p2 = po2.getParamsValue().toString();
			}
		}else if(xxwf && !zcwf && !ejwf){
			TrParameter po1 = getParamsByCode(corpId,"005");
			TrParameter po2 = getParamsByCode(corpId,"006");
			if(po1 != null){
				p1 = po1.getParamsValue().toString();
			}
			if(po2 != null){
				p2 = po2.getParamsValue().toString();
			}
		}
		gene.put("P1", p1);
		gene.put("P2", p2);
		gene.put("REPAIR_TYPE", repairTypes);
		//置为已打印
		service.update("update TR_REPAIR_GENE_MANAGE set is_print=? where GENE_ID =?",Constant.PRINT_STATUS_02,geneId);
		CertRecord dr = new CertRecord();
		dr.setCertSn(CommonUtils.checkNull(gene.get("CERT_SN")));
		dr.setCorpName(CommonUtils.checkNull(gene.get("CORP_NAME")));
		dr.setCostSum(CommonUtils.checkNull(gene.get("COST_SUM")));
		dr.setDelegateName(CommonUtils.checkNull(gene.get("DELEGATE_NAME")));
		dr.setLeaveDate(CommonUtils.printDate(CommonUtils.parseDate(CommonUtils.checkNull(gene.get("LEAVE_DATE")), "yyyy-MM-dd")));
		dr.setLeaveMileage(CommonUtils.checkNull(gene.get("LEAVE_MILEAGE")));
		dr.setP1(CommonUtils.checkNull(gene.get("P1")));
		dr.setP2(CommonUtils.checkNull(gene.get("P2")));
		dr.setPlateNumColor(CommonUtils.checkNull(gene.get("PLATE_NUM_ALL")) + "(" + CommonUtils.checkNull(gene.get("PLATE_COLOR")) + ")");
		dr.setRepiarType(CommonUtils.checkNull(gene.get("REPAIR_TYPE")));
		dr.setVehicleType(WebCache.getDictDescById(CommonUtils.checkNull(gene.get("VEHICLE_TYPE"))));
		dr.setExaminer(CommonUtils.checkNull(gene.get("EXAMINER")));
		
		NodeInfo node = new NodeInfo(Constant.REPORT_ID_GENE_REPAIR,"合格证打印","sa",tag);
		DataSet master = new DataSet("MASTER",dr,CertRecord.class);
		return ObjectToXML.toReportXML(node, master);
	}
	
public CertRecord updatePrintByPage(String corpId,String geneId) throws Exception{
		
		String sql = "select * from V_REPAIR_GENE_MANAGE where GENE_ID = ?";
		List<Map> list =  service.findAll(sql, geneId);
		Map gene = new HashMap();
		if(list != null && list.size()>0){
			gene = list.get(0); 
		}
		String certNo = CommonUtils.checkNull(gene.get("CERT_SN"));
		if(CommonUtils.checkIsNullStr(certNo)){
			certNo = getCertNo();
			gene.put("CERT_SN", certNo);
		}
		List<Map> details = getDetailList(CommonUtils.checkNull(gene.get("BILL_CODE")));
		String repairTypes = "";
		boolean zcwf = false;
		boolean ejwf = false;
		boolean xxwf = false;
		String p1 = "100";
		String p2 = "20000";
		if(details != null && details.size() > 0){
			String zcTotalItemStr = "";
			boolean isZc = false;
			for(Map detail : details){
				String repairType = CommonUtils.checkNull(detail.get("REPAIR_TYPE"));
				if("10111001".equals(repairType)){
					isZc = true;
					if(CommonUtils.checkIsNullStr(zcTotalItemStr)){
						zcTotalItemStr = WebCache.getDictDescById(CommonUtils.checkNull(detail.get("REPAIR_ITEM")));
					}else{
						zcTotalItemStr = zcTotalItemStr + "、" + WebCache.getDictDescById(CommonUtils.checkNull(detail.get("REPAIR_ITEM")));
					}
				}
			}
			if(isZc){
				repairTypes = WebCache.getDictDescById("10111001") + "(" + zcTotalItemStr + ")";
			}
			for(Map detail : details){
				String repairType = CommonUtils.checkNull(detail.get("REPAIR_TYPE"));
				if(!"10111001".equals(repairType)){
					String repairTypeName = WebCache.getDictDescById(repairType);
					if(CommonUtils.checkIsNullStr(repairTypes)){
						repairTypes = repairTypeName;
					}else{
						repairTypes = repairTypes + "," + repairTypeName;
					}
				}
				if("10111001".equals(repairType) || "10111002".equals(repairType)){
					zcwf = true;
				}
//				else if("10111003".equals(repairType)){
//					ejwf = true;
//				}
				else{
					xxwf = true;
				}
			}
		}
		if(zcwf){
			TrParameter po1 = getParamsByCode(corpId,"001");
			TrParameter po2 = getParamsByCode(corpId,"002");
			if(po1 != null){
				p1 = po1.getParamsValue().toString();
			}
			if(po2 != null){
				p2 = po2.getParamsValue().toString();
			}
		}else if(ejwf && !zcwf){
			TrParameter po1 = getParamsByCode(corpId,"003");
			TrParameter po2 = getParamsByCode(corpId,"004");
			if(po1 != null){
				p1 = po1.getParamsValue().toString();
			}
			if(po2 != null){
				p2 = po2.getParamsValue().toString();
			}
		}else if(xxwf && !zcwf && !ejwf){
			TrParameter po1 = getParamsByCode(corpId,"005");
			TrParameter po2 = getParamsByCode(corpId,"006");
			if(po1 != null){
				p1 = po1.getParamsValue().toString();
			}
			if(po2 != null){
				p2 = po2.getParamsValue().toString();
			}
		}
		gene.put("P1", p1);
		gene.put("P2", p2);
		gene.put("REPAIR_TYPE", repairTypes);
		//置为已打印
		service.update("update TR_REPAIR_GENE_MANAGE set is_print=?,CERT_SN=? where GENE_ID =?",Constant.PRINT_STATUS_02,certNo,geneId);
		CertRecord dr = new CertRecord();
		dr.setCertSn(CommonUtils.checkNull(gene.get("CERT_SN")));
		dr.setCorpName(CommonUtils.checkNull(gene.get("CORP_NAME")));
		dr.setCostSum(CommonUtils.checkNull(gene.get("COST_SUM")));
		dr.setDelegateName(CommonUtils.checkNull(gene.get("DELEGATE_NAME")));
		dr.setLeaveDate(CommonUtils.printDate(CommonUtils.parseDate(CommonUtils.checkNull(gene.get("LEAVE_DATE")), "yyyy-MM-dd")));
		dr.setLeaveMileage(CommonUtils.checkNull(gene.get("LEAVE_MILEAGE")));
		dr.setP1(CommonUtils.checkNull(gene.get("P1")));
		dr.setP2(CommonUtils.checkNull(gene.get("P2")));
		dr.setPlateNumColor(CommonUtils.checkNull(gene.get("PLATE_NUM_ALL")) + "(" + WebCache.getDictDescById(CommonUtils.checkNull(gene.get("PLATE_COLOR"))) + ")");
		dr.setRepiarType(CommonUtils.checkNull(gene.get("REPAIR_TYPE")));
		dr.setVehicleType(WebCache.getDictDescById(CommonUtils.checkNull(gene.get("VEHICLE_TYPE"))));
		dr.setExaminer(CommonUtils.checkNull(gene.get("EXAMINER")));
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(corpId);
		corp = service.getModelByPo(corp);
		dr.setHotLine(corp.getServiceHotline());
		return dr;
	}
	
	public List getReportXml(String tag,String billid){
		String sql = "{call sp_report_xml(?,?)}";
		return service.findAll(sql, new Object[]{tag,billid});
	}
	
	public List doExport(List<SqlUnit> uSql){
		return service.getList("select * from TR_REPAIR_GENE_MANAGE where 1=1 ", uSql);
	}
	
	public TrParameter getParamsByCode(String corpId,String paramsCode){
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT P.PARAMS_CODE,\n" );
		sql.append("       P.PARAMS_ID,\n" );
		sql.append("       P.PARAMS_NAME,\n" );
		sql.append("       P.PARAMS_UNIT,\n" );
		sql.append("       P.IS_STOP,\n" );
		sql.append("       P.PERATOR_ID,\n" );
		sql.append("       U.ID,\n" );
		sql.append("       U.CORP_ID,\n" );
		sql.append("       CASE WHEN U.PARAMS_VALUE IS NULL THEN P.PARAMS_VALUE ELSE U.PARAMS_VALUE END PARAMS_VALUE\n" );
		sql.append("  FROM TR_PARAMETER P\n" );
		sql.append("  LEFT JOIN (SELECT * FROM TR_PARAMETER_CORP WHERE CORP_ID=?) U ON P.PARAMS_ID = U.PARAMS_ID WHERE P.PARAMS_CODE=? AND P.IS_STOP=?");
		List<TrParameter> list =  service.findAll(TrParameter.class, sql.toString(),corpId,paramsCode,Constant.STATUS_ENABLE);
		if(list != null && list.size()>0){
			return list.get(0);
		}
		return null;
	}
	public List getManageList(String billCode) {
		String SQL = "SELECT a.CORP_ID,BILL_CODE,a.CORP_NAME,DELEGATE_NAME,CONCAT(PLATE_NUMA,PLATE_NUMB,'.',PLATE_NUM) AS  PLATE_NUM,";
		 SQL = SQL +" PLATE_COLOR,VEHICLE_TYPE,VEHICLE_NATURE,LEAVE_DATE,LEAVE_MILEAGE,";
		 SQL = SQL +" CERT_SN,TEL_PHONE,IS_CHANGE_PART,EXAMINER,SERVICE_HOTLINE";
		 SQL = SQL +" from tr_repair_gene_manage a left join tb_corp_info b on a.corp_id=b.corp_id where BILL_CODE=?";
		
		return service.findAll(SQL,billCode);
	}
	public List getSLMRecord(String plateNum,String plateColor) {
		 String SQL = "SELECT GENE_ID,a.CORP_ID,d.AREA_NAME,BILL_CODE,b.CORP_NUM,a.CORP_NAME,DELEGATE_NAME,PLATE_NUM,";
		 SQL = SQL +" PLATE_NUM,c.CODE_DESC as PLATE_COLOR,a.CREATED,VEHICLE_TYPE,VEHICLE_NATURE,LEAVE_DATE,LEAVE_MILEAGE,";
		 SQL = SQL +" CERT_SN,ADD_TIME,a.REMARK,BUSINESS_NUM";
		 //String SQL = "SELECT a.CORP_ID,BILL_CODE";
		 SQL = SQL +" from tr_repair_gene_manage a left join tb_corp_info b on a.corp_id=b.corp_id ";
		 SQL = SQL +"  LEFT JOIN tb_bd_code c ON a.PLATE_COLOR=c.code_id";
		 SQL = SQL +"  LEFT JOIN tb_bd_area d ON b.CORP_AREA=d.area_code";
		
		 SQL = SQL +" where 1=1 ";
		 if (!CommonUtils.isEmpty(plateNum)){
			   SQL = SQL +" and PLATE_NUM like '"+"%" + plateNum.trim() + "%'";
			 }
	     if (!CommonUtils.isEmpty(plateColor)){
				   SQL = SQL +" and CODE_DESC  like '"+"%" + plateColor.trim() + "%'";
			}				 
		return service.findAll(SQL);
	}	
	public List getVehicleBase(String plateNum,String plateColor) {
		 String SQL =" SELECT RECORD_NO,PLATE_NUM,c.CODE_DESC as PLATE_COLOR";
		 SQL = SQL +" from tv_vehicle_base a ";
		 SQL = SQL +"  LEFT JOIN tb_bd_code c ON a.PLATE_COLOR=c.code_id";
	     SQL = SQL +" where 1=1";
		 if (!CommonUtils.isEmpty(plateNum)){
		   SQL = SQL +" and PLATE_NUM like '"+"%" + plateNum.trim() + "%'";
		 }
		 if (!CommonUtils.isEmpty(plateColor)){
			   SQL = SQL +" and CODE_DESC  like '"+"%" + plateColor.trim() + "%'";
			 }			
		 SQL = SQL +"  order by PLATE_NUM";		
		return service.findAll(SQL); 
	}	

	public TbBdVideoSet GetVideoServer(String corpId){
		TbBdVideoSet em = new TbBdVideoSet();
		em.setCorpId(corpId);
		return service.getModelByPo(em);
	}	
}
