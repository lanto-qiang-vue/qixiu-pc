package com.lanto.shqixiu.shwgm.service.manage.corp;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.bean.DbRepairStandardBean;
import com.lanto.shqixiu.shwgm.model.bean.VCorpPosition;
import com.lanto.shqixiu.shwgm.model.po.TbBdArea;
import com.lanto.shqixiu.shwgm.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgm.model.po.TbCorpPosition;
import com.lanto.shqixiu.shwgm.model.po.TbExamHis;
import com.lanto.shqixiu.shwgm.model.po.TbRepairQuato;
import com.lanto.shqixiu.shwgm.model.po.TmSysOperateLog;
import com.lanto.shqixiu.shwgm.model.report.DataSet;
import com.lanto.shqixiu.shwgm.model.report.NodeInfo;
import com.lanto.shqixiu.shwgm.model.report.ObjectToXML;
import com.lanto.shqixiu.shwgm.service.common.CreateNumberService;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;
import com.lanto.shqixiu.shwgm.util.Constant;


@Service
public class TbCorpInfoService {

	@Resource
	private SwdbFactory service;
	@Resource
	private CreateNumberService createNumberService;
	@Resource
	private TmSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page,String areaCode) throws SQLException{
		page.setOrderByColumn("CORP_ID");
		return service.getPageList(uSql, page, "(SELECT * FROM TB_CORP_INFO WHERE CORP_AREA LIKE '%"+areaCode+"%') T","CORP_ID");
	}
	
	public List getHistoryList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("APPLY_DATE");
		page.setOrderByType("DESC");
		return service.getPageList(uSql, page, "V_CORP_HISTORY","ORDER_NO");
	}
	
	public List getVideoList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("UPDATE_TIME");
		page.setOrderByType("desc");
		return service.getPageList(uSql, page, "V_CORP_VIDEO","CORP_ID");
	}
	
	public List doExport(List<SqlUnit> uSql){
		return service.getList("select * from TB_CORP_INFO where 1=1 ", uSql);
	}
	
	
	public List getCheckList(String corpId){
		return service.findAll("SELECT * FROM TB_EXAM_HIS WHERE CORP_ID=?", corpId);
	}
	
	public void save(TbCorpInfo pojo,ManageLoginInfo login) throws Exception{
		pojo.setCorpNum(createNumberService.createNumber("corpNum"));
		pojo.setUpdateDate(new Date());
		service.savePojo(pojo);
		logService.addOperatorLog(login,"维修企业管理",login.getUserName() + " 新增了企业编号为【" + pojo.getCorpNum() + "】的企业基本资料成功！");
	}
	
	public void updateQuato(TbRepairQuato pojo,ManageLoginInfo login){
		TbCorpInfo po=new TbCorpInfo();
		po.setCorpId(pojo.getCorpId());
		TbCorpInfo corp=getModel(String.valueOf(pojo.getCorpId()));
		if(corp.getCreateQuatoCount()==null || "".equals(corp.getCreateQuatoCount())){
			String quatoStr=pojo.getCreateQuato()+","+pojo.getCorpId();
			String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
			po.setCreateQuatoCount(quatoCode);
		}else{
			String count = SecurityEncode.decoderByDES(corp.getCreateQuatoCount(), SecurityEncode.DES_KEY);
			Integer quato=0;
			if(Integer.parseInt(count.split(",")[1])==corp.getCorpId()){
				quato=Integer.parseInt(count.split(",")[0]);
			}
			String quatoStr=quato+pojo.getCreateQuato()+","+pojo.getCorpId();
			String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
			po.setCreateQuatoCount(quatoCode);
		}
		
		if(corp.getUploadQuatoCount()==null || "".equals(corp.getUploadQuatoCount())){
			String quatoStr=pojo.getUploadQuato()+","+pojo.getCorpId();
			String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
			po.setUploadQuatoCount(quatoCode);
		}else{
			String count = SecurityEncode.decoderByDES(corp.getUploadQuatoCount(), SecurityEncode.DES_KEY);
			Integer quato=0;
			if(Integer.parseInt(count.split(",")[1])==corp.getCorpId()){
				quato=Integer.parseInt(count.split(",")[0]);
			}
			String quatoStr=quato+pojo.getUploadQuato()+","+pojo.getCorpId();
			String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
			po.setUploadQuatoCount(quatoCode);
		}
		
		if(corp.getSearchQuatoCount()==null || "".equals(corp.getSearchQuatoCount())){
			String quatoStr=pojo.getSearchQuato()+","+pojo.getCorpId();
			String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
			po.setSearchQuatoCount(quatoCode);
		}else{
			String count = SecurityEncode.decoderByDES(corp.getSearchQuatoCount(), SecurityEncode.DES_KEY);
			Integer quato=0;
			if(Integer.parseInt(count.split(",")[1])==corp.getCorpId()){
				quato=Integer.parseInt(count.split(",")[0]);
			}
			String quatoStr=quato+pojo.getSearchQuato()+","+pojo.getCorpId();
			String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
			po.setSearchQuatoCount(quatoCode);
		}
		
		service.updatePojo(po,"CORP_ID");
		logService.addOperatorLog(login,"维修企业配额管理",login.getUserName() + " 修改了企业编号为【" + pojo.getCorpId() + "】的配额！");
	}
	
	public void update(TbCorpInfo pojo,ManageLoginInfo login){
		pojo.setUpdateDate(new Date());
		service.updatePojo(pojo,"CORP_ID");
		//updateExam(exams,pojo.getCorpId());
		logService.addOperatorLog(login,"维修企业管理",login.getUserName() + " 修改了企业编号为【" + pojo.getCorpNum() + "】的企业基本资料成功！");
	}


	
	
	public TbCorpInfo getModel(String corpId){
		TbCorpInfo con = new TbCorpInfo();
		con.setCorpId(Integer.valueOf(corpId));
		return service.getModelByPo(con);
	}
	


	public void delete(String ids){
		String [] corpIds = ids.split(",");
		for(String id : corpIds){
			TbCorpInfo po = new TbCorpInfo();
			po.setCorpId(Integer.parseInt(id));
			service.deleteByPo(po);
		}
	}
	
}
