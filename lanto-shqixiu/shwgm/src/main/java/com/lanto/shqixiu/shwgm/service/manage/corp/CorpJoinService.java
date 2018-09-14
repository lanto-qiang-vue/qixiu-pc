package com.lanto.shqixiu.shwgm.service.manage.corp;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgm.model.po.TbCorpJoin;
import com.lanto.shqixiu.shwgm.model.po.TbCorpJoinPhoto;
import com.lanto.shqixiu.shwgm.service.common.CreateNumberService;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class CorpJoinService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory swdb;
	@Resource
	private CreateNumberService createNumService;
	@Resource
	private TmSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page,String areaCode) throws SQLException{
		page.setOrderByColumn("JOIN_ID");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "(SELECT A.*,B.CORP_NUM,B.CORP_NAME,B.CORP_AREA,B.MAGOR_BRANDS,B.LINK_MAN,B.LINK_TEL,B.CORP_ADD"
				+ " FROM TB_CORP_JOIN A LEFT JOIN TB_CORP_INFO B ON A.CORP_ID=B.CORP_ID WHERE B.CORP_AREA LIKE '%"+areaCode+"%') T","JOIN_ID");
	}

	public void save(TbCorpJoin po,List<TbCorpJoinPhoto> images,ManageLoginInfo info) throws Exception{
		if(CommonUtils.checkIsNotNullAndZero(po.getJoinId())){
			swdb.updatePojo(po, "JOIN_ID");
			TbCorpJoin pojo=new TbCorpJoin();
			pojo.setJoinId(po.getJoinId());
			po=swdb.getModelByPo(pojo);
		}else{
			po.setRecordNo(createNumService.createNumber("flowNo"));
			Integer id = swdb.savePojoRtPkId(po, "JOIN_ID");
			po.setJoinId(id);
		}
		savePhotos(po,images);
		String logcontent = "用户【%s】修改企业入网资料【%s】 ";
		logcontent = String.format(logcontent, info.getUserName(),po.getRecordNo());
		logService.addOperatorLog(info, "入网资料申请", logcontent);
	}
	
	public void updateCheck(TbCorpJoin po,ManageLoginInfo info) throws Exception{
		TbCorpJoin con = new TbCorpJoin();
		con.setJoinId(po.getJoinId());
		con = swdb.getModelByPo(con);
		if(con == null){
			throw new Exception("入网资料不存在!");
		}
		
		if("10321003".equals(po.getStatus())){
			TbCorpInfo corp = new TbCorpInfo();
			corp.setCorpId(con.getCorpId());
			corp.setJoinId(con.getJoinId());
			corp.setIsJoin("10041001");
			corp.setLongitude(con.getLongitude());
			corp.setLatitude(con.getLatitude());
			swdb.updatePojo(corp, "CORP_ID");
		}
		
		po.setCheckDate(new Date());
		po.setCheckPerson(info.getUserName());
		swdb.updatePojo(po, "JOIN_ID");
		String logcontent = "用户【%s】审核了企业入网资料【 %s】 审核结果为：【%s】";
		logcontent = String.format(logcontent, info.getUserName(),con.getRecordNo(),WebCache.getDictDescById(po.getStatus()));
		logService.addOperatorLog(info, "入网资料申请", logcontent);
	}
	
	public void updateBack(TbCorpJoin po,ManageLoginInfo info) throws Exception{
		TbCorpJoin con = new TbCorpJoin();
		con.setJoinId(po.getJoinId());
		con = swdb.getModelByPo(con);
		if(con == null){
			throw new Exception("入网资料不存在!");
		}
		
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(con.getCorpId());
		corp.setJoinId(0);
		corp.setIsJoin("10041002");
		swdb.updatePojo(corp, "CORP_ID");
		
		po.setBackDate(new Date());
		po.setStatus("10321005");
		swdb.updatePojo(po, "JOIN_ID");
		String logcontent = "用户【%s】将企业入网资料【 %s】退网";
		logcontent = String.format(logcontent, info.getUserName(),con.getRecordNo());
		logService.addOperatorLog(info, "入网资料申请", logcontent);
	}
	
	
	private void savePhotos(TbCorpJoin po,List<TbCorpJoinPhoto> images){
		TbCorpJoinPhoto con = new TbCorpJoinPhoto();
		con.setJoinId(po.getJoinId());
		swdb.deleteByPo(con);
		for(TbCorpJoinPhoto photo : images){
			photo.setCorpId(po.getCorpId());
			photo.setJoinId(po.getJoinId());
			photo.setCreateDate(new Date());
			swdb.savePojo(photo, "PHOTO_ID");
		}
	}
	
	public TbCorpJoin getModel(String joinId){
		TbCorpJoin join = new TbCorpJoin();
		join.setJoinId(Integer.valueOf(joinId));
		join = swdb.getModelByPo(join);
		if(join == null){
			return new TbCorpJoin();
		}
		return join;
	}
	
	public List getPhotos(String joinId){
		String sql = "select * from tb_corp_join_photo where join_id=? order by photo_id asc";
		return swdb.findAll(sql, joinId);
	}
	
	public TbCorpInfo getCorpInfo(String corpId){
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(Integer.valueOf(corpId));
		corp = swdb.getModelByPo(corp);
		if(corp == null){
			return new TbCorpInfo();
		}
		return corp;
	}

}
