package com.lanto.shqixiu.shwgc.service.corp;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgc.model.po.TbCorpJoin;
import com.lanto.shqixiu.shwgc.model.po.TbCorpJoinPhoto;
import com.lanto.shqixiu.shwgc.service.common.CreateNumberService;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;


@Service
public class CorpJoinService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory swdb;
	@Resource
	private CreateNumberService createNumService;
	@Resource
	private TqSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("JOIN_ID");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "(SELECT A.*,B.CORP_NUM,B.CORP_NAME,B.CORP_AREA,B.LINK_MAN,B.LINK_TEL,B.CORP_ADD"
				+ " FROM TB_CORP_JOIN A LEFT JOIN TB_CORP_INFO B ON A.CORP_ID=B.CORP_ID) T","JOIN_ID");
	}

	public void save(TbCorpJoin po,List<TbCorpJoinPhoto> images,ClientLoginInfo info) throws Exception{
		po.setApplyPerson(info.getUserName());
		po.setApplyDate(new Date());
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
		String logcontent = "用户【%s】入网资料 %s【%s】 ";
		logcontent = String.format(logcontent, info.getUserName(), "10321002".equals(po.getStatus())?"提交":"暂存" ,po.getRecordNo());
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

	public void delete(String ids){
		String [] childs = ids.split(",");
		for(String child:childs){
			TbCorpJoinPhoto photos = new TbCorpJoinPhoto();
			photos.setJoinId(Integer.valueOf(child));
			swdb.deleteByPo(photos);
			
			TbCorpJoin join = new TbCorpJoin();
			join.setJoinId(Integer.valueOf(child));
			swdb.deleteByPo(join);
		}
		
	}
	
	public TbCorpInfo getCorpInfo(String corpId){
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(corpId);
		corp = swdb.getModelByPo(corp);
		if(corp == null){
			return new TbCorpInfo();
		}
		return corp;
	}
}
