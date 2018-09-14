package com.lanto.shqixiu.shwgm.service.corp;

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
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.bean.VCorpPosition;
import com.lanto.shqixiu.shwgm.model.po.TbBdArea;
import com.lanto.shqixiu.shwgm.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgm.model.po.TbCorpPosition;
import com.lanto.shqixiu.shwgm.model.po.TbExamHis;
import com.lanto.shqixiu.shwgm.model.po.TbTransCorpInfo;
import com.lanto.shqixiu.shwgm.model.po.TmSysOperateLog;
import com.lanto.shqixiu.shwgm.model.report.DataSet;
import com.lanto.shqixiu.shwgm.model.report.NodeInfo;
import com.lanto.shqixiu.shwgm.model.report.ObjectToXML;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;
import com.lanto.shqixiu.shwgm.util.Constant;


@Service
public class YsCorpInfoService {

	@Resource
	private SwdbFactory service;
	@Resource
	private TmSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CORP_ID");
		return service.getPageList(uSql, page, "tb_trans_corp_info","CORP_ID");
	}
	
	public List getHistoryList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("APPLY_DATE");
		page.setOrderByType("DESC");
		return service.getPageList(uSql, page, "V_CORP_HISTORY","ORDER_NO");
	}
	
	public List getVideoList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("ADD_TIME");
		page.setOrderByType("desc");
		return service.getPageList(uSql, page, "v_corp_vehicle_video","CORP_ID");
	}
	
	public List doExport(List<SqlUnit> uSql){
		return service.getList("select * from tb_trans_corp_info where 1=1 ", uSql);
	}
	
	public List getCheckList(String corpId){
		return service.findAll("SELECT * FROM TB_EXAM_HIS WHERE CORP_ID=?", corpId);
	}
	
	public TbTransCorpInfo getModel(TbTransCorpInfo po){
		return service.getModelByPo(po);
	}
	
	public void save(TbTransCorpInfo pojo){
		service.savePojo(pojo);
	}
	public void saveTrans(TbTransCorpInfo pojo){
		Integer id = service.savePojoRtPkId(pojo,"CORP_ID");
		//service.savePojo(pojo);
	}
	public void update(TbCorpInfo pojo,List<TbExamHis> exams,ManageLoginInfo login){
		pojo.setUpdateDate(new Date());
		service.updatePojo(pojo,"CORP_ID");
		//updateExam(exams,pojo.getCorpId());
		String remoteAddr = login.getRequest().getRemoteAddr();
		TmSysOperateLog log = new TmSysOperateLog();
		log.setMachineId(remoteAddr);
		log.setModuleName("企业资料管理");
		log.setOperateTime(new Date());
		log.setOperatorId(login.getUserCode());
		log.setOperateContent(login.getUserName() + " 修改了企业编号为【" + pojo.getCorpNum() + "】的企业基本资料成功！");
		logService.save(log);
	}
	
	public void update(TbTransCorpInfo pojo){
		pojo.setUpdateDate(new Date());
		service.updatePojo(pojo,"CORP_ID");
	}
	public void updateTrans(TbTransCorpInfo pojo){
		pojo.setUpdateDate(new Date());
		service.updatePojo(pojo,"CORP_ID");
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
	
	public Map getPosition(String corpId){
		String sql = "select * from V_CORP_POSITION WHERE CORP_ID=?";
		List list = service.findAll(sql, corpId);
		System.out.println(list.size());
		if(list != null && list.size()>0){
			return (Map)list.get(0);
		}
		return null;
	}
	
	public List getAllArea(){
		String sql = "select * from TB_BD_AREA";
		List list = service.findAll(TbBdArea.class,sql);
		return list;
	}
	
	public List getAllPosition(String corpArea){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from V_CORP_POSITION WHERE 1=1 ");
		List<Object> param = new ArrayList<Object>();
		if(!CommonUtils.checkIsNullStr(corpArea)){
			sql.append(" AND CORP_AREA=?");
			param.add(corpArea);
		}
		List list = service.findAll(sql.toString(),param.toArray());
		return list;
	}
	
	public List<VCorpPosition> getAllPositionToPo(String corpArea){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from V_CORP_POSITION WHERE LONGITUDE IS NOT NULL AND LATITUDE IS NOT NULL ");
		List<Object> param = new ArrayList<Object>();
		if(!CommonUtils.checkIsNullStr(corpArea)){
			sql.append(" AND CORP_AREA=?");
			param.add(corpArea);
		}
		List list = service.findAll(VCorpPosition.class,sql.toString(),param.toArray());
		return list;
	}
	
	public TbCorpPosition getPositionByPo(TbCorpPosition con){
		return service.getModelByPo(con);
	}
	
	public void savePosition(TbCorpPosition pojo){
		service.savePojo(pojo);
	}
	
	public void updatePosition(TbCorpPosition pojo){
		service.updatePojo(pojo, "CORP_ID");
	}

	public void delete(String ids){
		String [] corpIds = ids.split(",");
		for(String id : corpIds){
			TbCorpInfo po = new TbCorpInfo();
			po.setCorpId(Integer.parseInt(id));
			service.deleteByPo(po);
		}
	}
	
	public String createReportXml(TbCorpInfo corp , String type,ManageLoginInfo login) throws Exception{
		String title = "道路运输证正证打印";
		String reportId = Constant.REPORT_ID_CORP_INFO_ZB;
		if("fb".equals(type)){
			title = "道路运输证副证打印";
			reportId = Constant.REPORT_ID_CORP_INFO_FB;
		}
		corp.setCorpType(WebCache.getDictDescById(corp.getCorpType()));
	//	corp.setCorpStype(WebCache.getDictDescById(corp.getCorpStype()));
	//	corp.setEconomicNature(WebCache.getDictDescById(corp.getEconomicNature()));
		addOperatorLog(corp,login,type);
		
		NodeInfo node = new NodeInfo(reportId,title,"sa","0");
		DataSet master = new DataSet("MASTER",corp,TbCorpInfo.class);
		return ObjectToXML.toReportXML(node, master);
	}
	
	private void addOperatorLog(TbCorpInfo corp,ManageLoginInfo login,String type){
		String remoteAddr = login.getRequest().getRemoteAddr();
		TmSysOperateLog log = new TmSysOperateLog();
		log.setMachineId(remoteAddr);
		log.setModuleName("企业资料管理");
		log.setOperateTime(new Date());
		log.setOperatorId(login.getUserCode());
		String name = "正证";
		if("fb".equals(type)){
			name = "副证";
		}
		log.setOperateContent(login.getUserName() + " 打印了企业编号为【" + corp.getCorpNum() + "】的企业的道路运输证 "+ name + "！");
		logService.save(log);
	}
	public Integer getCorpNum(String new_corp_num){
		String sql = "SELECT * FROM TB_CORP_INFO  where corp_num=?";
		List list = service.findAll(sql, new_corp_num);		
		if(list != null && list.size() > 0){
			return 1;
		}else{
			return 0;
		}
				
	}
	public void saveCorpNum(String corp_id,String new_corp_num){
	  String upsql = "update TB_CORP_INFO set corp_num=? where corp_id=? ";
	  service.update(upsql, new_corp_num,corp_id);

	}	
}
