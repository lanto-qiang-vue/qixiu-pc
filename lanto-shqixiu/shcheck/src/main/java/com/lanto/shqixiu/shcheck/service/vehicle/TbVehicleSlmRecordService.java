package com.lanto.shqixiu.shcheck.service.vehicle;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.controller.ParamInit;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.Json;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.bean.CorpTransNumBean;
import com.lanto.shqixiu.shcheck.model.po.TbCorpInfo;
import com.lanto.shqixiu.shcheck.model.po.TbVehicleSlmQc;
import com.lanto.shqixiu.shcheck.model.po.TbVehicleSlmQcTp;
import com.lanto.shqixiu.shcheck.model.po.TbVehicleSlmRecord;


@Service
public class TbVehicleSlmRecordService {

	@Resource
	private SwdbFactory service;
	
	private Json json = new Json();

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("SLM_ID");
		page.setOrderByType("DESC");
		return service.getPageList(uSql, page, "TB_VEHICLE_SLM_RECORD","SLM_ID");
	}
	
	public List doExport(List<SqlUnit> uSql){
		return service.getList("select * from TB_VEHICLE_SLM_RECORD where 1=1 ", uSql);
	}
	
	public TbVehicleSlmRecord getSlmRecord(String slmId){
		TbVehicleSlmRecord con = new TbVehicleSlmRecord();
		con.setSlmId(slmId);
		return service.getModelByPo(con);
	}

	public void save(TbVehicleSlmRecord pojo,TbVehicleSlmQc qc,Map<String,Object> jcpo,Map<String,Object> ccpo,Map<String,Object> sgpo) throws Exception{
		String orderNo = getOrderNo();
		pojo.setSlmId(orderNo);
		qc.setSlmId(orderNo);
		TbVehicleSlmQcTp tp = new TbVehicleSlmQcTp();
		tp.setCreateDate(new Date());
		tp.setSlmId(orderNo);
		service.savePojo(pojo);
		service.savePojo(qc);
		service.savePojo(tp);
		updateFile(orderNo,jcpo,ccpo,sgpo);
	}
	
	public void saveOpen(TbVehicleSlmRecord pojo,TbVehicleSlmQc qc) throws Exception{
		String orderNo = getOrderNo();
		pojo.setSlmId(orderNo);
		qc.setSlmId(orderNo);
		service.savePojo(pojo);
		service.savePojo(qc);
	}
	
	public void updateOpen(TbVehicleSlmRecord pojo,TbVehicleSlmQc qc) throws Exception{
		service.updatePojo(pojo,"SLM_ID");
		service.updatePojo(qc,"SLM_ID");
	}
	
	public CorpTransNumBean getTransData(String corpId){
		String sql = "select DAY_TRANS_NUM,YEAR_TRANS_NUM from tb_corp_trans_num where corp_id=?";
		List<CorpTransNumBean> list = service.findAll(CorpTransNumBean.class, sql, corpId);
		if(list != null && list.size()>0){
			return list.get(0);
		}
		return null;
	}
	
	public CorpTransNumBean getTransCount(String corpId){
		String date =  CommonUtils.printDate(new Date());
		String month = CommonUtils.printDate("MM", new Date());
		String year = CommonUtils.printDate("YYYY", new Date());
		String sql = "select count(*) from TB_VEHICLE_SLM_RECORD where corp_id=? and state=? and TRANS_DATE>=? and TRANS_DATE<=?";
		Integer dayTrans = (Integer)service.findRtObject(sql, Integer.class,  corpId,"10251004",date,date + " 23:59:59.999");
		String gte = "";
		String lte = "";
		int m = Integer.valueOf(month);
		if(m > 6){
			gte = year + "-07-01";
			lte = year + "-12-31 23:59:59.999";
		}else{
			gte = year + "-01-01";
			lte = year + "-06-30 23:59:59.999";
		}
		String ysql = "select count(*) from TB_VEHICLE_SLM_RECORD where corp_id=? and state=? and TRANS_DATE>=? and TRANS_DATE<=?";
		Integer yearTrans = (Integer)service.findRtObject(sql, Integer.class,  corpId,"10251004",gte,lte);
		CorpTransNumBean trans = new CorpTransNumBean();
		trans.setDayTransNum(dayTrans);
		trans.setYearTransNum(yearTrans);
		return trans;
	}
	
	public TbCorpInfo getCorpModel(String corpId){
		TbCorpInfo po = new TbCorpInfo();
		po.setCorpId(corpId);
		po = service.getModelByPo(po);
		return po;
	}

	public void update(TbVehicleSlmRecord pojo,TbVehicleSlmQc qc,TbVehicleSlmQcTp tpo) throws Exception{
		service.updatePojo(pojo,"SLM_ID");
		service.updatePojo(qc,"SLM_ID");
		TbVehicleSlmQcTp tp = new TbVehicleSlmQcTp();
		tp.setSlmId(pojo.getSlmId());
		tp = service.getModelByPo(tp);
		if(tp == null){
			tpo.setSlmId(pojo.getSlmId());
			tpo.setCreateDate(new Date());
			service.savePojo(tpo);
		}else{
			tpo.setSlmId(pojo.getSlmId());
			service.updatePojo(tpo, "SLM_ID");
		}
	}
	
	public void updateState(TbVehicleSlmRecord pojo){
		pojo.setTransDate(new Date());
		pojo.setCertificationId(getCertNo());
		service.updatePojo(pojo,"SLM_ID");
	}
	
	public String getCertNo(){
		String sql = "{call Sp_SYS_GetBillID(?,?)}";
		return  (String)service.findRtObject(sql, String.class, new Object[]{"slmCert",""});	
	}

	public void delete(String ids){
		String[] sids = ids.split(",");
		for(String id : sids){
			TbVehicleSlmRecord record = new TbVehicleSlmRecord();
			record.setSlmId(id);
			TbVehicleSlmQc qc = new TbVehicleSlmQc();
			qc.setSlmId(id);
			TbVehicleSlmQcTp tp = new TbVehicleSlmQcTp();
			tp.setSlmId(id);
			service.deleteByPo(record);
			service.deleteByPo(qc);
			service.deleteByPo(tp);
		}
	}
	
	public Map getQc(String slmId) throws Exception{
		TbVehicleSlmQc po = new TbVehicleSlmQc();
		po.setSlmId(slmId);
		po = service.getModelByPo(po);
		if(po != null){
			return json.toMap(po);
		}
		return null;
	}
	
	public Map getVehicleInfo(String num) throws Exception{
		String sql = "select * from tb_vehicle_base_info where VECHILE_NUM=?";
		List<Map> list = service.findAll(sql, num);
		if(list != null && list.size()>0){
			return list.get(0);
		}
		return null;
	}
	
	public Map getTp(String slmId) throws Exception{
		TbVehicleSlmQcTp po = new TbVehicleSlmQcTp();
		po.setSlmId(slmId);
		po = service.getModelByPo(po);
		if(po != null){
			return json.toMap(po);
		}
		return null;
	}
	
	public int getCert(String certNo,String corpId){
		String sql = "select count(*) certno from TB_CERTIFICATE_SEND where END_NUMBER >=? and BEGIN_NUMBER <=? and CORP_ID=?";
		Integer num = (Integer)service.findRtObject(sql, Integer.class, certNo,certNo,corpId);
		return num.intValue();
	}
	
	public int getUseCert(String certNo,String corpId){
		String sql = "select count(*) certno from TB_CERTIFICATE_USE where CERTIFICATE_ID = ? and CORP_ID=?";
		Integer num = (Integer)service.findRtObject(sql, Integer.class, certNo,corpId);
		return num.intValue();
	}
	
	public InputStream getFile(String id,String field){
		String sql = "select " + field + " from TB_VEHICLE_SLM_QC_TP where SLM_ID=?";
		return service.getFile(sql, field, id);
	}
	
	public String getOrderNo(){
		String sql = "{call Sp_SYS_GetBillID(?,?)}";
		return  (String)service.findRtObject(sql, String.class, new Object[]{"004",""});	
	}
	
	public void updateFile(String orderNo,Map<String,Object> jcpo,Map<String,Object> ccpo,Map<String,Object> sgpo) throws Exception{
		if(jcpo != null){
			String jcpath = CommonUtils.checkNull(jcpo.get("photopath"));
			String jcZpZpSj = CommonUtils.checkNull(jcpo.get("JC_ZP_ZP_SJ"));
			if(!CommonUtils.checkIsNullStr(jcZpZpSj)){
				TbVehicleSlmQcTp tp = new TbVehicleSlmQcTp();
				if(jcZpZpSj.indexOf(":") == -1){
					jcZpZpSj = jcZpZpSj + " 00:00:00";
				}
				tp.setJcZpZpSj(CommonUtils.parseDateTime(jcZpZpSj));
				tp.setSlmId(orderNo);
				service.updatePojo(tp, "SLM_ID");
			}
			if(!CommonUtils.checkIsNullStr(jcpath)){
				File file = new File(ParamInit.attachFileUploadPath + jcpath);
				InputStream read = new FileInputStream(file);
				String sql = "update TB_VEHICLE_SLM_QC_TP set JC_ZP=? where SLM_ID=?";
				service.updateFile(sql, read, orderNo);
			}
		}
		if(ccpo != null){
			String ccpath = CommonUtils.checkNull(ccpo.get("photopath"));
			String ccZpZpSj = CommonUtils.checkNull(ccpo.get("CC_ZP_ZP_SJ"));
			if(!CommonUtils.checkIsNullStr(ccZpZpSj)){
				TbVehicleSlmQcTp tp = new TbVehicleSlmQcTp();
				if(ccZpZpSj.indexOf(":") == -1){
					ccZpZpSj = ccZpZpSj + " 00:00:00";
				}
				tp.setCcZpZpSj(CommonUtils.parseDateTime(ccZpZpSj));
				tp.setSlmId(orderNo);
				service.updatePojo(tp, "SLM_ID");
			}
			if(!CommonUtils.checkIsNullStr(ccpath)){
				File file = new File(ParamInit.attachFileUploadPath + ccpath);
				InputStream read = new FileInputStream(file);
				String sql = "update TB_VEHICLE_SLM_QC_TP set CC_ZP=? where SLM_ID=?";
				service.updateFile(sql, read, orderNo);
			}
		}
		if(sgpo != null){
			String sgpath = CommonUtils.checkNull(sgpo.get("photopath"));
			String sgZpZpSj = CommonUtils.checkNull(sgpo.get("SG_ZP_ZP_SJ"));
			if(!CommonUtils.checkIsNullStr(sgZpZpSj)){
				TbVehicleSlmQcTp tp = new TbVehicleSlmQcTp();
				if(sgZpZpSj.indexOf(":") == -1){
					sgZpZpSj = sgZpZpSj + " 00:00:00";
				}
				tp.setSgZpZpSj(CommonUtils.parseDateTime(sgZpZpSj));
				tp.setSlmId(orderNo);
				service.updatePojo(tp, "SLM_ID");
			}
			if(!CommonUtils.checkIsNullStr(sgpath)){
				File file = new File(ParamInit.attachFileUploadPath + sgpath);
				InputStream read = new FileInputStream(file);
				String sql = "update TB_VEHICLE_SLM_QC_TP set SG_ZP=? where SLM_ID=?";
				service.updateFile(sql, read, orderNo);
			}
		}
	}
}
