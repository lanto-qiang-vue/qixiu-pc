package com.lanto.shqixiu.shwgm.service.manage.credit;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbBdExamScore;
import com.lanto.shqixiu.shwgm.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgm.model.po.TbExamFileFgs;
import com.lanto.shqixiu.shwgm.model.po.TbExamFileInfo;
import com.lanto.shqixiu.shwgm.model.po.TbExamFileScore;
import com.lanto.shqixiu.shwgm.util.Constant;


@Service
public class TbExamFileInfoService {

	@Resource
	private SwdbFactory swdb;

	public List getList(List<SqlUnit> uSql, PageUnit page,String areaCode) throws SQLException{
		page.setOrderByColumn("FILE_ID");
		
		return swdb.getPageList(uSql, page, "(SELECT T1.*,T2.CORP_AREA,T2.IS_SEC_MAINTAIN,"+
				"T2.IS_WYCL,T2.IS4S FROM TB_EXAM_FILE_INFO T1 LEFT JOIN TB_CORP_INFO T2 ON T1.CORP_ID=T2.CORP_ID WHERE T2.CORP_AREA LIKE '%"+areaCode+"%') T","FILE_ID");
	}
	
	public List getFgsList(String fileId,String fileIds){
		String sql = "select * from TB_EXAM_FILE_FGS where 1=1 ";
		String[] ids = fileIds.split(",");
		List<Object> params = new ArrayList<Object>();
		
		if(!CommonUtils.checkIsNullStr(fileIds)){
			String wh = "";
			for(int i =0;i<ids.length;i++){
				if(i == 0){
					wh = wh + "?";
				}else{
					wh = wh + ",?";
				}
				params .add(ids[i]);
			}
			sql = sql + " AND FILE_ID in (" + wh + ")";
		}
		if(!CommonUtils.checkIsNullStr(fileId)){
			sql = sql + " AND FILE_ID = ?";
			params .add(fileId);
		}
		return swdb.findAll(sql, params.toArray());
	}
	
	
	public List getZpList(String fileId,String typeId){
		String sql = "select I.*,S.ID,S.FILE_ID,S.SELF_SCORE,S.ZJ_SCORE," +
				"S.FIRST_SCORE,S.SEC_SCORE from V_EXAM_ITEM I left join " +
				"(select * from TB_EXAM_FILE_SCORE where FILE_ID=?) S ON I.ITEM_ID=S.ITEM_ID WHERE I.TYPE_ID=? ORDER BY I.ORDER_ID";
		return swdb.findAll(sql, fileId,typeId);
	}
	
	public void save(TbExamFileInfo pojo ,List<TbExamFileFgs> fgs){
		String fileId = getOrderNo();
		System.out.println(fileId);
		pojo.setFileId(fileId);
		swdb.savePojo(pojo);
		updateFgs(fileId,fgs);
	}
	
	public Integer getFPScore(String id){
		String sql="select sum(sec_score) from tb_exam_file_score where file_id=?";
		return  (Integer)swdb.findRtObject(sql, Integer.class, new Object[]{id});	
	}
	
	public TbBdExamScore getBdScore(){
		TbBdExamScore po = new TbBdExamScore();
		po.setId(1);
		return swdb.getModelByPo(po);
	}
	
	public void savePF(String  fileId ,List<TbExamFileScore> zp,String type,String ope,Integer corpId,Integer examYear){
		TbExamFileInfo info = new TbExamFileInfo();
		info.setFileId(fileId);
		if("zj".equals(type)){
			info.setIsZjExam(Constant.IF_TYPE_YES);
			info.setZjOper(ope);
			info.setJzDate(new Date());
			info.setZjExamLevel("B");
		}else if("first".equals(type)){
			info.setFirstDate(new Date());
			info.setIsFirstExam(Constant.IF_TYPE_YES);
			info.setFirstExamLevel("B");
			info.setFirstOper(ope);
		}else if("sec".equals(type)){
			info.setSecDate(new Date());
			info.setSecOper(ope);
			info.setIsSecExam(Constant.IF_TYPE_YES);
		}
		update(info);
		for(TbExamFileScore sc : zp){
			if(!CommonUtils.checkIsNotNullAndZero(sc.getId())){
				sc.setFileId(fileId);
				swdb.savePojo(sc, "ID");
			}else{
				swdb.updatePojo(sc, "ID");
			}
		}
		Integer score=getFPScore(fileId);
		String level="";
		TbBdExamScore po=getBdScore();
		if(score>=po.getAAA()){
			level="AAA";
		}else if(score>=po.getAA()){
			level="AA";
		}else if(score>=po.getA()){
			level="A";
		}else{
			level="B";
		}
		info.setSecExamLevel(level);
		update(info);
		updateCorpCredit(corpId,level,examYear);
	}
	
	public void updateCorpCredit(Integer corpId,String creditLevel,Integer creditYear){
		TbCorpInfo po = new TbCorpInfo();
		po.setCorpId(corpId);
		po.setCreditLevel(creditLevel);
		po.setCreditYear(creditYear);
		swdb.updatePojo(po, "CORP_ID");
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
		corp.setCorpId(Integer.valueOf(corpId));
		corp = swdb.getModelByPo(corp);
		return corp;
	}


	public void delete(String ids){
		swdb.delete("delete from TB_EXAM_FILE_INFO where FILE_ID in (" + ids + ")");
	}
	
	public String getOrderNo(){
		String sql = "{call Sp_SYS_GetBillID(?,?)}";
		return  (String)swdb.findRtObject(sql, String.class, new Object[]{"005",""});	
	}
}
