package com.lanto.shqixiu.shcheck.service.corp;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.CheckLoginInfo;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.po.TbCorpInfo;
import com.lanto.shqixiu.shcheck.model.po.TbExamHis;
import com.lanto.shqixiu.shcheck.model.po.TbRepairQuato;
import com.lanto.shqixiu.shcheck.service.sys.TjSysOperateLogService;


@Service
public class TbCorpInfoService {

	@Resource
	private SwdbFactory service;
	@Resource
	private TjSysOperateLogService logService;
	@Resource
	private TbCorpQuatoService quatoService;


	public void save(TbCorpInfo pojo){
		service.savePojo(pojo,"CORP_ID");
	}
	
	public TbCorpInfo getModel(TbCorpInfo po){
		return service.getModelByPo(po);
	}
	public TbCorpInfo getCorpInfo(String corpId){
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(corpId);
		corp = service.getModelByPo(corp);
		return corp;
	}
	public List getCheckList(String corpId){
		return service.findAll("SELECT * FROM TB_EXAM_HIS WHERE CORP_ID=?", corpId);
	}
	
	public List getLogList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("LOG_ID");
		page.setOrderByType("DESC");
		return service.getPageList(uSql, page, "V_CORP_QUALIFICATION_LOG","LOG_ID");
	}
	
	public void update(TbCorpInfo pojo,List<TbExamHis> exams,CheckLoginInfo login){
		pojo.setUpdateDate(new Date());
		service.updatePojo(pojo,"CORP_ID");
		updateExam(exams,pojo.getCorpId());
		String content = login.getUserCode() + " 修改了企业编号为【" + pojo.getCorpNum() + "】的企业基本资料成功！";
		logService.addOperatorLog(login, "企业基本资料", content);
	}
	
	//建档配额减1
	public boolean createQuatoMinus1(String corpId,String plateNum,CheckLoginInfo login){
		TbCorpInfo corp=getModel(corpId);
		String quaCode=SecurityEncode.decoderByDES(corp.getCreateQuatoCount(), SecurityEncode.DES_KEY);
		if(!quaCode.split(",")[1].equals(corpId)){
			return false;
		}
		Integer quato=Integer.parseInt(quaCode.split(",")[0])-1;
		String quatoStr=quato+","+corpId;
		String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
		corp.setCreateQuatoCount(quatoCode);
		service.updatePojo(corp,"CORP_ID");
		//添加配额使用记录
		TbRepairQuato po=new TbRepairQuato();
		po.setCreateQuato(-1);
		po.setType("10421002");
		po.setRemark(plateNum);
		po.setCreateTime(new Date());
		po.setCreateUser(login.getUserName());
		po.setCorpId(Integer.parseInt(corpId));
		try {
			quatoService.save(po, login);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	//维修记录配额减1
	public boolean uploadQuatoMinus1(String corpId,String plateNum,CheckLoginInfo login){
		TbCorpInfo corp=getModel(corpId);
		String quaCode=SecurityEncode.decoderByDES(corp.getUploadQuatoCount(), SecurityEncode.DES_KEY);
		if(!quaCode.split(",")[1].equals(corpId)){
			return false;
		}
		Integer quato=Integer.parseInt(quaCode.split(",")[0])-1;
		String quatoStr=quato+","+corpId;
		String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
		corp.setUploadQuatoCount(quatoCode);
		service.updatePojo(corp,"CORP_ID");
		//添加配额使用记录
		TbRepairQuato po=new TbRepairQuato();
		po.setUploadQuato(-1);
		po.setType("10421003");
		po.setRemark(plateNum);
		po.setCreateTime(new Date());
		po.setCreateUser(login.getUserName());
		po.setCorpId(Integer.parseInt(corpId));
		try {
			quatoService.save(po, login);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	//查询配额减1
	public boolean searchQuatoMinus1(String corpId,String plateNum,CheckLoginInfo login){
		TbCorpInfo corp=getModel(corpId);
		String quaCode=SecurityEncode.decoderByDES(corp.getSearchQuatoCount(), SecurityEncode.DES_KEY);
		if(!quaCode.split(",")[1].equals(corpId)){
			return false;
		}
		Integer quato=Integer.parseInt(quaCode.split(",")[0])-1;
		String quatoStr=quato+","+corpId;
		String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
		corp.setSearchQuatoCount(quatoCode);
		service.updatePojo(corp,"CORP_ID");
		//添加配额使用记录
		TbRepairQuato po=new TbRepairQuato();
		po.setSearchQuato(-1);
		po.setType("10421004");
		po.setRemark(plateNum);
		po.setCreateTime(new Date());
		po.setCreateUser(login.getUserName());
		po.setCorpId(Integer.parseInt(corpId));
		try {
			quatoService.save(po, login);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public void updateQuato(TbRepairQuato pojo,CheckLoginInfo login){
		TbCorpInfo po=new TbCorpInfo();
		po.setCorpId(String.valueOf(pojo.getCorpId()));
		TbCorpInfo corp=getModel(String.valueOf(pojo.getCorpId()));
		if(corp.getCreateQuatoCount()!=null){
			String count = SecurityEncode.decoderByDES(corp.getCreateQuatoCount(), SecurityEncode.DES_KEY);
			Integer quato=0;
			if(count.split(",")[1].equals(corp.getCorpId())){
				quato=Integer.parseInt(count.split(",")[0]);
			}
			String quatoStr=quato+pojo.getCreateQuato()+","+pojo.getCorpId();
			String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
			po.setCreateQuatoCount(quatoCode);
		}
		if(corp.getUploadQuatoCount()!=null){
			String count = SecurityEncode.decoderByDES(corp.getUploadQuatoCount(), SecurityEncode.DES_KEY);
			Integer quato=0;
			if(count.split(",")[1].equals(corp.getCorpId())){
				quato=Integer.parseInt(count.split(",")[0]);
			}
			String quatoStr=quato+pojo.getUploadQuato()+","+pojo.getCorpId();
			String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
			po.setUploadQuatoCount(quatoCode);
		}
		if(corp.getSearchQuatoCount()!=null){
			String count = SecurityEncode.decoderByDES(corp.getSearchQuatoCount(), SecurityEncode.DES_KEY);
			Integer quato=0;
			if(count.split(",")[1].equals(corp.getCorpId())){
				quato=Integer.parseInt(count.split(",")[0]);
			}
			String quatoStr=quato+pojo.getSearchQuato()+","+pojo.getCorpId();
			String quatoCode = SecurityEncode.encoderByDES(quatoStr, SecurityEncode.DES_KEY);
			po.setSearchQuatoCount(quatoCode);
		}
		
		service.updatePojo(po,"CORP_ID");
		logService.addOperatorLog(login,"维修企业配额管理",login.getUserName() + " 修改了企业编号为【" + pojo.getCorpId() + "】的配额！");
	}

	public void updateExam(List<TbExamHis> exams , String corpId){
		TbExamHis his = new TbExamHis();
		his.setCorpId(corpId);
		service.deleteByPo(his);
		for(TbExamHis exam : exams){
			exam.setCorpId(corpId);
			service.savePojo(exam, "HIS_ID");
		}
	}
	
	public TbCorpInfo getModel(String corpId){
		TbCorpInfo con = new TbCorpInfo();
		con.setCorpId(corpId);
		return service.getModelByPo(con);
	}
}
