package com.lanto.shqixiu.shwgc.service.credit;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.bean.ExamFileScore;
import com.lanto.shqixiu.shwgc.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgc.model.po.TbExamFileFgs;
import com.lanto.shqixiu.shwgc.model.po.TbExamFileInfo;
import com.lanto.shqixiu.shwgc.model.po.TbExamFileScore;
import com.lanto.shqixiu.shwgc.service.common.CreateNumberService;


@Service
public class TbExamFileInfoService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private CreateNumberService createNumberService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("FILE_ID");
		return swdb.getPageList(uSql, page, "TB_EXAM_FILE_INFO","FILE_ID");
	}
	
	public List getFgsList(String fileId){
		String sql = "select * from TB_EXAM_FILE_FGS where FILE_ID=?";
		return swdb.findAll(sql, fileId);
	}
	
	public List<TbExamFileFgs> getFgsListByPo(String fileId){
		String sql = "select * from TB_EXAM_FILE_FGS where FILE_ID=?";
		return swdb.findAll(TbExamFileFgs.class,sql, fileId);
	}
	
	public List getZpList(String fileId,String typeId){
		String sql = "select I.*,S.ID,S.FILE_ID,S.SELF_SCORE,S.ZJ_SCORE," +
				"S.FIRST_SCORE,S.SEC_SCORE from V_EXAM_ITEM I left join " +
				"(select * from TB_EXAM_FILE_SCORE where FILE_ID=?) S ON I.ITEM_ID=S.ITEM_ID WHERE I.TYPE_ID=? ORDER BY I.ORDER_ID";
		return swdb.findAll(sql, fileId,typeId);
	}
	
	public List<ExamFileScore> getZpListByPo(String fileId,String examType){
		String sql = "select I.*,S.ID,S.FILE_ID,S.SELF_SCORE,S.ZJ_SCORE," +
				"S.FIRST_SCORE,S.SEC_SCORE from (select * from V_EXAM_ITEM where EXAM_TYPE=?) I left join " +
				"(select * from TB_EXAM_FILE_SCORE where FILE_ID=?) S ON I.ITEM_ID=S.ITEM_ID ORDER BY I.TYPE_ORDER ASC,I.ORDER_ID ASC";
		return swdb.findAll(ExamFileScore.class,sql,examType, fileId);
	}

	public void save(TbExamFileInfo pojo ,List<TbExamFileFgs> fgs) throws Exception{
		String fileId = createNumberService.createNumber("examFileNo");
		System.out.println(fileId);
		pojo.setFileId(fileId);
		swdb.savePojo(pojo);
		updateFgs(fileId,fgs);
	}
	
	public void saveZiPing(String  fileId ,List<TbExamFileScore> zp){
		for(TbExamFileScore sc : zp){
			if(!CommonUtils.checkIsNotNullAndZero(sc.getId())){
				sc.setFileId(fileId);
				swdb.savePojo(sc, "ID");
			}else{
				swdb.updatePojo(sc, "ID");
			}
		}
	}

	public void update(TbExamFileInfo pojo,List<TbExamFileFgs> fgs){
		swdb.updatePojo(pojo,"FILE_ID");
		updateFgs(pojo.getFileId(),fgs);
	}
	
	public void update(TbExamFileInfo pojo){
		swdb.updatePojo(pojo,"FILE_ID");
	}
	
	public TbExamFileInfo getModelByPo(TbExamFileInfo po){
		return swdb.getModelByPo(po);
	}
	
	public void updateFgs(String fileId,List<TbExamFileFgs> fgs){
		TbExamFileFgs del = new TbExamFileFgs();
		del.setFileId(fileId);
		swdb.deleteByPo(del);
		for(TbExamFileFgs po : fgs){
			po.setFileId(fileId);
			swdb.savePojo(po, "ID");
		}
	}
	
	public List getAllType(String type,String year){
		String sql = "select * from TB_BD_EXAM_TYPE where EXAM_TYPE=? AND VERSION_NO=? ORDER BY ORDER_ID";
		return swdb.findAll(sql, type,year);
	}
	
	public TbCorpInfo getCorpInfo(String corpId){
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(corpId);
		corp = swdb.getModelByPo(corp);
		return corp;
	}


	public void delete(String ids){
		swdb.delete("delete from TB_EXAM_FILE_INFO where FILE_ID in (" + ids + ")");
	}
	
}
